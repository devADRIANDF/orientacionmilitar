// Almacenamiento de Orientación Militar sobre Netlify Blobs.
//
// Para que nunca se pierda nada aunque lleguen muchas peticiones a la vez:
//   - Cada contacto nuevo se guarda en su propia clave:  nuevos/<id>
//   - Cada visita o evento se guarda en su propia clave:  ev/<AAAA-MM-DD>/<id>
//   - compactarLeads() pasa los contactos a  leads/<AAAA-MM>  (lo llama el panel al cargar).
//   - compactarEventos() suma los eventos en  stats/<AAAA-MM-DD>  (lo llama la función programada cada hora).

import { getStore } from '@netlify/blobs';
import crypto from 'node:crypto';

export const ZONA = 'Europe/Madrid';
export const tienda = () => getStore({ name: 'om', consistency: 'strong' });
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

export function fechaMadrid(d = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: ZONA, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
}

export function ultimosDias(n) {
  const hoy = new Date(`${fechaMadrid()}T12:00:00Z`);
  const lista = [];
  for (let i = n - 1; i >= 0; i--) lista.push(new Date(hoy.getTime() - i * 86400000).toISOString().slice(0, 10));
  return lista;
}

export const idUnico = (prefijo = '') => `${prefijo}${Date.now().toString(36)}${crypto.randomBytes(4).toString('hex')}`;

// Lee y reescribe un JSON con control de versión cuando el almacén lo ofrece.
// fn recibe una copia del valor actual (o null) y devuelve el nuevo valor, o undefined si no hay cambios.
export async function actualizarJSON(clave, fn, intentos = 8) {
  const s = tienda();
  for (let i = 0; i < intentos; i++) {
    const actual = await s.getWithMetadata(clave, { type: 'json' });
    const nuevo = fn(actual ? structuredClone(actual.data) : null);
    if (nuevo === undefined) return actual ? actual.data : null;
    let r;
    if (!actual) r = await s.setJSON(clave, nuevo, { onlyIfNew: true });
    else if (actual.etag) r = await s.setJSON(clave, nuevo, { onlyIfMatch: actual.etag });
    else r = await s.setJSON(clave, nuevo);
    if (r.modified) return nuevo;
    await esperar(30 + Math.random() * 150);
  }
  throw new Error(`No se pudo guardar ${clave} tras varios intentos`);
}

async function leerVarios(claves, lote = 40) {
  const s = tienda();
  const salida = [];
  for (let i = 0; i < claves.length; i += lote) {
    const parte = await Promise.all(claves.slice(i, i + lote).map(async (k) => ({ k, v: await s.get(k, { type: 'json' }) })));
    salida.push(...parte);
  }
  return salida;
}

async function borrarVarios(claves, lote = 40) {
  const s = tienda();
  for (let i = 0; i < claves.length; i += lote) await Promise.all(claves.slice(i, i + lote).map((k) => s.delete(k)));
}

// ---------- Contactos ----------

export async function guardarLeadNuevo(lead) {
  await tienda().setJSON(`nuevos/${lead.id}`, lead);
}

export async function compactarLeads() {
  const s = tienda();
  const { blobs } = await s.list({ prefix: 'nuevos/' });
  if (!blobs.length) return 0;
  const leidos = (await leerVarios(blobs.map((b) => b.key))).filter((x) => x.v && x.v.id && x.v.mes);
  const porMes = new Map();
  for (const x of leidos) {
    if (!porMes.has(x.v.mes)) porMes.set(x.v.mes, []);
    porMes.get(x.v.mes).push(x);
  }
  const hechos = [];
  for (const [mes, grupo] of porMes) {
    await actualizarJSON(`leads/${mes}`, (lista) => {
      const l = Array.isArray(lista) ? lista : [];
      const ids = new Set(l.map((x) => x.id));
      for (const { v } of grupo.sort((a, b) => String(a.v.creado).localeCompare(String(b.v.creado)))) {
        if (ids.has(v.id)) continue;
        if (v.tipo === 'checklist') {
          const previo = l.find((x) => x.tipo === 'checklist' && x.email === v.email);
          if (previo) {
            if (v.avisos && !previo.avisos) {
              previo.avisos = true;
              previo.actualizado = v.creado;
            }
            continue;
          }
        }
        l.push(v);
        ids.add(v.id);
      }
      return l;
    });
    hechos.push(...grupo.map((x) => x.k));
  }
  await borrarVarios(hechos);
  return hechos.length;
}

export async function leerLeads(maxMeses = 24) {
  const s = tienda();
  const { blobs } = await s.list({ prefix: 'leads/' });
  const claves = blobs.map((b) => b.key).sort().slice(-maxMeses);
  const meses = await leerVarios(claves);
  return meses
    .flatMap((x) => (Array.isArray(x.v) ? x.v : []))
    .sort((a, b) => String(b.creado).localeCompare(String(a.creado)));
}

// ---------- Visitas y eventos ----------

export async function guardarEvento(evento) {
  await tienda().setJSON(`ev/${fechaMadrid()}/${idUnico('e')}`, evento);
}

const sumar = (obj, k, n = 1) => {
  if (!k) return;
  if (!(k in obj) && Object.keys(obj).length >= 300) return;
  obj[k] = (obj[k] || 0) + n;
};

export function statsVacias() {
  return { visitas: 0, rutas: {}, fuentes: {}, dispositivos: {}, eventos: {}, perfiles: {} };
}

export function aplicarEvento(st, e) {
  if (e.tipo === 'visita') {
    st.visitas = (st.visitas || 0) + 1;
    sumar(st.rutas, e.ruta);
    sumar(st.fuentes, e.fuente);
    sumar(st.dispositivos, e.dispositivo);
  } else {
    sumar(st.eventos, e.tipo);
    if (e.tipo === 'test' && e.perfil) sumar(st.perfiles, e.perfil);
  }
  return st;
}

export function unirStats(a, b) {
  const x = { ...statsVacias(), ...structuredClone(a || {}) };
  for (const k of ['rutas', 'fuentes', 'dispositivos', 'eventos', 'perfiles']) x[k] ||= {};
  x.visitas = (x.visitas || 0) + (b?.visitas || 0);
  for (const k of ['rutas', 'fuentes', 'dispositivos', 'eventos', 'perfiles']) {
    for (const [c, n] of Object.entries(b?.[k] || {})) sumar(x[k], c, n);
  }
  return x;
}

// Eventos aún sin sumar, agrupados por día (para mostrarlos en el panel sin esperar a la compactación).
export async function eventosPendientes(maximo = 3000) {
  const s = tienda();
  const { blobs } = await s.list({ prefix: 'ev/' });
  const claves = blobs.map((b) => b.key).sort();
  const parte = claves.slice(0, maximo);
  const leidos = await leerVarios(parte);
  const porDia = {};
  for (const { k, v } of leidos) {
    if (!v) continue;
    const dia = k.split('/')[1];
    porDia[dia] ||= statsVacias();
    aplicarEvento(porDia[dia], v);
  }
  return { porDia, claves: parte.filter((k, i) => leidos[i]?.v), restantes: claves.length - parte.length };
}

// Suma los eventos pendientes en stats/<día> y los borra. Pensado para un único ejecutor (la función programada).
export async function compactarEventos(maximo = 5000) {
  const { porDia, claves, restantes } = await eventosPendientes(maximo);
  for (const [dia, st] of Object.entries(porDia)) {
    await actualizarJSON(`stats/${dia}`, (actual) => unirStats(actual, st));
  }
  await borrarVarios(claves);
  return { procesados: claves.length, restantes };
}

export async function leerStats(dias) {
  const s = tienda();
  const fechas = ultimosDias(dias);
  const guardadas = await Promise.all(fechas.map(async (f) => [f, await s.get(`stats/${f}`, { type: 'json' })]));
  const { porDia, restantes } = await eventosPendientes();
  return {
    dias: guardadas.map(([f, st]) => ({ fecha: f, ...unirStats(st, porDia[f]) })),
    pendientesSinLeer: restantes,
  };
}

export async function limpiarLimites() {
  const s = tienda();
  const franja = Math.floor(Date.now() / 3600000);
  const { blobs } = await s.list({ prefix: 'limite/' });
  const viejas = blobs.filter((b) => {
    const m = b.key.match(/-(\d+)$/);
    return m && Number(m[1]) < franja - 2;
  });
  await borrarVarios(viejas.slice(0, 400).map((b) => b.key));
}
