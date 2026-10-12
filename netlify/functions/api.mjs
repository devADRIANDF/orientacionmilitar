// API de Orientación Militar (Netlify Functions v2 + Netlify Blobs).
//
// Rutas públicas:
//   POST /api/lead     Guarda una reserva, una descarga de la checklist o una solicitud de colaboración.
//   POST /api/evento   Cuenta visitas y eventos (sin cookies y sin guardar la IP).
//   GET  /api/salud    Comprobación rápida.
// Rutas del panel (requieren token):
//   POST /api/panel/login      { password } -> { token, exp }
//   GET  /api/panel/datos      ?dias=30 -> { leads, dias }
//   POST /api/panel/lead       { id, mes, cambios: { estado, notas, importe } }
//   POST /api/panel/borrar     { id, mes }
//   POST /api/panel/password   { actual, nueva } -> { token }
//
// Variables de entorno: PANEL_SECRET (firma las sesiones) y PANEL_PASSWORD_HASH (contraseña inicial).

import crypto from 'node:crypto';
import {
  tienda,
  fechaMadrid,
  idUnico,
  actualizarJSON,
  guardarLeadNuevo,
  compactarLeads,
  leerLeads,
  guardarEvento,
  leerStats,
  limpiarLimites,
} from '../lib/almacen.mjs';

export const config = { path: '/api/*' };

const TIPOS = ['reserva', 'checklist', 'colaborador'];
const PLANES = ['llamada', 'acompanamiento'];
const REDES = ['TikTok', 'Instagram', 'YouTube', 'Otra'];
const ESTADOS = {
  reserva: ['nuevo', 'contactado', 'pagado', 'hecha', 'descartado'],
  checklist: ['nuevo', 'contactado', 'descartado'],
  colaborador: ['nuevo', 'contactado', 'activo', 'descartado'],
};
const EVENTOS = ['visita', 'whatsapp', 'test', 'checklist_pdf', 'reserva_abierta'];
const BOT_UA = /bot|crawl|spider|slurp|facebookexternalhit|preview|lighthouse|headless|pingdom|uptime|monitor|curl|wget|python-requests/i;
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;
const FUENTE_RE = /^[a-z0-9:._-]{1,60}$/;
const ITERACIONES = 210000;
const SESION_DIAS = 30;

const env = (n) => process.env[n] || globalThis.Netlify?.env?.get?.(n) || '';
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

function json(datos, status = 200) {
  return new Response(JSON.stringify(datos), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
const vacio = () => new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });

const txt = (v, max) =>
  String(v ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);

function normalizarRuta(r) {
  const s = txt(r, 300);
  if (!s.startsWith('/')) return '/';
  return s.split(/[?#]/)[0].slice(0, 120) || '/';
}

function limpiarFuente(f) {
  const x = txt(f, 60).toLowerCase();
  return FUENTE_RE.test(x) ? x : 'directo';
}

function origenLimpio(o) {
  const x = o && typeof o === 'object' ? o : {};
  return {
    fuente: limpiarFuente(x.fuente),
    ref: txt(x.ref, 40),
    medio: txt(x.medio, 60),
    campana: txt(x.campana, 80),
    pagina: normalizarRuta(x.pagina),
  };
}

function hashIP(ip) {
  return crypto
    .createHmac('sha256', env('PANEL_SECRET') || 'om')
    .update(String(ip || 'sin-ip'))
    .digest('hex')
    .slice(0, 24);
}

async function permitir(clave, maximo, ventanaMin = 60) {
  const s = tienda();
  const franja = Math.floor(Date.now() / (ventanaMin * 60000));
  const k = `limite/${clave}-${franja}`;
  const actual = (await s.get(k, { type: 'json' })) || { n: 0 };
  if (actual.n >= maximo) return false;
  await s.setJSON(k, { n: actual.n + 1 });
  return true;
}

// ---------- Contactos ----------

async function nuevoLead(req, context) {
  let b;
  try {
    b = await req.json();
  } catch {
    return json({ error: 'Formato no válido.' }, 400);
  }
  if (txt(b.bot, 200)) return json({ ok: true });
  const tipo = TIPOS.includes(b.tipo) ? b.tipo : null;
  if (!tipo) return json({ error: 'Tipo de formulario no válido.' }, 400);
  if (b.privacidad !== 'si' && b.privacidad !== true) {
    return json({ error: 'Marca la casilla de privacidad para poder continuar.' }, 400);
  }

  const ahora = new Date().toISOString();
  const lead = {
    id: idUnico('L'),
    tipo,
    creado: ahora,
    actualizado: ahora,
    mes: fechaMadrid().slice(0, 7),
    estado: 'nuevo',
    notas: '',
    importe: null,
    historial: [{ fecha: ahora, estado: 'nuevo' }],
    origen: origenLimpio(b.origen),
  };

  if (tipo === 'reserva') {
    lead.nombre = txt(b.nombre, 80);
    lead.telefono = txt(b.telefono, 30);
    lead.email = txt(b.email, 120).toLowerCase();
    lead.plan = PLANES.includes(b.plan) ? b.plan : 'llamada';
    lead.fecha_examen = /^\d{4}-\d{2}-\d{2}$/.test(txt(b.fecha_examen, 10)) ? b.fecha_examen : '';
    lead.destinos = txt(b.destinos, 1500);
    lead.codigo = txt(b.codigo, 40);
    if (!lead.nombre) return json({ error: 'Escribe tu nombre.' }, 400);
    if (lead.telefono.replace(/\D/g, '').length < 9) {
      return json({ error: 'Escribe un teléfono válido, con al menos 9 cifras.' }, 400);
    }
    if (!EMAIL_RE.test(lead.email)) return json({ error: 'Escribe un email válido, por ejemplo nombre@gmail.com.' }, 400);
  } else if (tipo === 'checklist') {
    lead.email = txt(b.email, 120).toLowerCase();
    lead.avisos = b.avisos === 'si' || b.avisos === true;
    lead.perfil = txt(b.perfil, 60);
    lead.rama = txt(b.rama, 20);
    lead.momento = txt(b.momento, 20);
    lead.respuestas = txt(b.respuestas, 700);
    if (!EMAIL_RE.test(lead.email)) return json({ error: 'Escribe un email válido, por ejemplo nombre@gmail.com.' }, 400);
  } else {
    lead.nombre = txt(b.nombre, 80);
    lead.red = REDES.includes(b.red) ? b.red : 'Otra';
    lead.usuario = txt(b.usuario, 80);
    lead.seguidores = txt(b.seguidores, 20);
    lead.contacto = txt(b.contacto, 120);
    lead.mensaje = txt(b.mensaje, 1500);
    if (!lead.nombre || !lead.usuario || !lead.contacto) {
      return json({ error: 'Rellena tu nombre, tu usuario y cómo contactarte.' }, 400);
    }
  }

  if (!(await permitir(`lead-${hashIP(context?.ip)}`, 12))) {
    return json({ error: 'Has enviado demasiadas solicitudes seguidas. Prueba de nuevo dentro de una hora.' }, 429);
  }
  await guardarLeadNuevo(lead);
  return json({ ok: true });
}

// ---------- Visitas y eventos ----------

async function nuevoEvento(req) {
  if (BOT_UA.test(req.headers.get('user-agent') || '')) return vacio();
  let b;
  try {
    b = await req.json();
  } catch {
    return vacio();
  }
  if (!EVENTOS.includes(b?.tipo)) return vacio();
  await guardarEvento({
    tipo: b.tipo,
    ruta: normalizarRuta(b.ruta),
    fuente: limpiarFuente(b.fuente),
    dispositivo: b.dispositivo === 'movil' ? 'movil' : 'escritorio',
    perfil: txt(b.perfil, 60),
  });
  return vacio();
}

// ---------- Sesiones del panel ----------

function firmar(payload) {
  const p = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const f = crypto.createHmac('sha256', env('PANEL_SECRET')).update(p).digest('base64url');
  return `${p}.${f}`;
}

function leerToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.') || !env('PANEL_SECRET')) return null;
  const [p, f] = token.split('.');
  const esperado = Buffer.from(crypto.createHmac('sha256', env('PANEL_SECRET')).update(p).digest('base64url'));
  const recibido = Buffer.from(f || '');
  if (recibido.length !== esperado.length || !crypto.timingSafeEqual(recibido, esperado)) return null;
  try {
    const d = JSON.parse(Buffer.from(p, 'base64url').toString('utf8'));
    return d.exp && d.exp > Date.now() / 1000 ? d : null;
  } catch {
    return null;
  }
}

function crearHash(password) {
  const sal = crypto.randomBytes(16);
  const h = crypto.pbkdf2Sync(String(password), sal, ITERACIONES, 32, 'sha256');
  return `pbkdf2$${ITERACIONES}$${sal.toString('base64')}$${h.toString('base64')}`;
}

function verificarHash(password, hash) {
  const [alg, iter, sal, h] = String(hash || '').split('$');
  if (alg !== 'pbkdf2' || !iter || !sal || !h || typeof password !== 'string' || !password) return false;
  const calculado = crypto.pbkdf2Sync(password, Buffer.from(sal, 'base64'), Number(iter), 32, 'sha256');
  const esperado = Buffer.from(h, 'base64');
  return esperado.length === calculado.length && crypto.timingSafeEqual(calculado, esperado);
}

async function credenciales() {
  const guardada = await tienda().get('seguridad/password', { type: 'json' });
  if (guardada?.hash) return { hash: guardada.hash, version: guardada.version || 1 };
  return { hash: env('PANEL_PASSWORD_HASH'), version: 1 };
}

async function autorizar(req) {
  const token = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const d = leerToken(token);
  if (!d) return null;
  const { version } = await credenciales();
  return d.v === version ? d : null;
}

const noAutorizado = () => json({ error: 'Tu sesión ha caducado. Vuelve a entrar.' }, 401);
const nuevaSesion = (version) => {
  const exp = Math.floor(Date.now() / 1000) + SESION_DIAS * 86400;
  return { token: firmar({ v: version, exp }), exp };
};

async function login(req, context) {
  const b = await req.json().catch(() => ({}));
  const { hash, version } = await credenciales();
  if (!env('PANEL_SECRET') || !hash) {
    return json({ error: 'El panel aún no está configurado en Netlify: faltan PANEL_SECRET o PANEL_PASSWORD_HASH.' }, 503);
  }
  const s = tienda();
  const clave = `seguridad/intentos/${hashIP(context?.ip)}`;
  const intentos = (await s.get(clave, { type: 'json' })) || { n: 0, desde: Date.now() };
  if (Date.now() - intentos.desde > 15 * 60000) {
    intentos.n = 0;
    intentos.desde = Date.now();
  }
  if (intentos.n >= 8) return json({ error: 'Demasiados intentos fallidos. Espera 15 minutos y vuelve a probar.' }, 429);
  if (!verificarHash(b.password, hash)) {
    intentos.n++;
    await s.setJSON(clave, intentos);
    await esperar(500);
    return json({ error: 'Contraseña incorrecta.' }, 401);
  }
  await s.delete(clave);
  return json(nuevaSesion(version));
}

async function datos(req, url) {
  if (!(await autorizar(req))) return noAutorizado();
  const dias = Math.min(Math.max(parseInt(url.searchParams.get('dias') || '30', 10) || 30, 1), 120);
  await compactarLeads();
  const [leads, stats] = await Promise.all([leerLeads(), leerStats(dias)]);
  limpiarLimites().catch(() => {});
  return json({ leads, dias: stats.dias, pendientes: stats.pendientesSinLeer, ahora: new Date().toISOString() });
}

async function editarLead(req) {
  if (!(await autorizar(req))) return noAutorizado();
  const b = await req.json().catch(() => ({}));
  const id = txt(b.id, 40);
  const mes = txt(b.mes, 7);
  if (!id || !/^\d{4}-\d{2}$/.test(mes)) return json({ error: 'Datos no válidos.' }, 400);
  const c = b.cambios && typeof b.cambios === 'object' ? b.cambios : {};
  await compactarLeads();
  let resultado = null;
  await actualizarJSON(`leads/${mes}`, (lista) => {
    if (!Array.isArray(lista)) return undefined;
    const l = lista.find((x) => x.id === id);
    if (!l) return undefined;
    const ahora = new Date().toISOString();
    if (c.estado && (ESTADOS[l.tipo] || []).includes(c.estado) && c.estado !== l.estado) {
      l.estado = c.estado;
      (l.historial ||= []).push({ fecha: ahora, estado: c.estado });
    }
    if ('notas' in c) l.notas = txt(c.notas, 4000);
    if ('importe' in c) {
      if (c.importe === '' || c.importe === null) l.importe = null;
      else {
        const n = Number(String(c.importe).replace(',', '.'));
        if (Number.isFinite(n) && n >= 0 && n < 100000) l.importe = Math.round(n * 100) / 100;
      }
    }
    l.actualizado = ahora;
    resultado = l;
    return lista;
  });
  return resultado ? json({ ok: true, lead: resultado }) : json({ error: 'No se ha encontrado ese contacto.' }, 404);
}

async function borrarLead(req) {
  if (!(await autorizar(req))) return noAutorizado();
  const b = await req.json().catch(() => ({}));
  const id = txt(b.id, 40);
  const mes = txt(b.mes, 7);
  if (!id || !/^\d{4}-\d{2}$/.test(mes)) return json({ error: 'Datos no válidos.' }, 400);
  await compactarLeads();
  let borrado = false;
  await actualizarJSON(`leads/${mes}`, (lista) => {
    if (!Array.isArray(lista)) return undefined;
    const resto = lista.filter((x) => x.id !== id);
    if (resto.length === lista.length) return undefined;
    borrado = true;
    return resto;
  });
  return borrado ? json({ ok: true }) : json({ error: 'No se ha encontrado ese contacto.' }, 404);
}

async function cambiarPassword(req) {
  if (!(await autorizar(req))) return noAutorizado();
  const b = await req.json().catch(() => ({}));
  const { hash, version } = await credenciales();
  if (!verificarHash(b.actual, hash)) return json({ error: 'La contraseña actual no es correcta.' }, 400);
  const nueva = String(b.nueva || '');
  if (nueva.length < 10) return json({ error: 'La nueva contraseña debe tener al menos 10 caracteres.' }, 400);
  const nv = version + 1;
  await tienda().setJSON('seguridad/password', { hash: crearHash(nueva), version: nv, cambiada: new Date().toISOString() });
  return json({ ok: true, ...nuevaSesion(nv) });
}

// ---------- Enrutado ----------

export default async (req, context) => {
  const url = new URL(req.url);
  const ruta = url.pathname.replace(/^\/api\/?/, '').replace(/\/$/, '');
  try {
    switch (`${req.method} ${ruta}`) {
      case 'GET salud':
        return json({ ok: true, hora: new Date().toISOString() });
      case 'POST lead':
        return await nuevoLead(req, context);
      case 'POST evento':
        return await nuevoEvento(req);
      case 'POST panel/login':
        return await login(req, context);
      case 'GET panel/datos':
        return await datos(req, url);
      case 'POST panel/lead':
        return await editarLead(req);
      case 'POST panel/borrar':
        return await borrarLead(req);
      case 'POST panel/password':
        return await cambiarPassword(req);
      default:
        return json({ error: 'No encontrado.' }, 404);
    }
  } catch (e) {
    console.error('Error en la API', ruta, e);
    return json({ error: 'Ha fallado algo en el servidor. Prueba de nuevo en un momento.' }, 500);
  }
};
