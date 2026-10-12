// Pruebas de la API contra el servidor local. Uso: node herramientas/pruebas/prueba-api.mjs
import assert from 'node:assert/strict';
import { arrancar, PASSWORD_PRUEBA } from './servidor.mjs';

const s = await arrancar({ puerto: 8890 });
const U = s.url;
let fallos = 0;
let pasos = 0;

async function paso(nombre, fn) {
  pasos++;
  try {
    await fn();
    console.log(`  ok  ${nombre}`);
  } catch (e) {
    fallos++;
    console.log(`  MAL ${nombre}\n      ${e.message}`);
  }
}

const post = (ruta, cuerpo, cabeceras = {}) =>
  fetch(U + ruta, { method: 'POST', headers: { 'Content-Type': 'application/json', ...cabeceras }, body: JSON.stringify(cuerpo) });
const origen = { fuente: 'ref:soldadojuan', ref: 'soldadojuan', pagina: '/' };
let token = '';
let datos = null;
const leer = async (t = token) => {
  const r = await fetch(`${U}/api/panel/datos?dias=7`, { headers: { Authorization: `Bearer ${t}` } });
  return { status: r.status, cuerpo: await r.json() };
};

await paso('salud responde', async () => {
  const r = await fetch(`${U}/api/salud`);
  assert.equal(r.status, 200);
});

await paso('reserva válida se guarda', async () => {
  const r = await post('/api/lead', {
    tipo: 'reserva', nombre: 'Laura Prueba', telefono: '+34 600 111 222', email: 'Laura@Ejemplo.com',
    plan: 'acompanamiento', fecha_examen: '2026-11-20', destinos: 'UME o Legión', codigo: 'SOLDADOJUAN',
    privacidad: 'si', origen,
  });
  assert.equal(r.status, 200, await r.text());
});

await paso('reserva sin email se rechaza con mensaje claro', async () => {
  const r = await post('/api/lead', { tipo: 'reserva', nombre: 'X', telefono: '600111222', email: 'no-es-email', privacidad: 'si' });
  assert.equal(r.status, 400);
  assert.match((await r.json()).error, /email válido/);
});

await paso('sin aceptar privacidad se rechaza', async () => {
  const r = await post('/api/lead', { tipo: 'checklist', email: 'a@b.com' });
  assert.equal(r.status, 400);
});

await paso('el honeypot no guarda nada', async () => {
  const r = await post('/api/lead', { tipo: 'checklist', email: 'bot@spam.com', privacidad: 'si', bot: 'soy un bot' });
  assert.equal(r.status, 200);
});

await paso('checklist válida y sin duplicados; los avisos se actualizan', async () => {
  for (const avisos of ['no', 'no', 'si']) {
    const r = await post('/api/lead', { tipo: 'checklist', email: 'pepe@ejemplo.com', avisos, privacidad: 'si', perfil: 'Unidades operativas', origen: { fuente: 'google', pagina: '/blog/x/' } });
    assert.equal(r.status, 200);
  }
});

await paso('colaborador válido se guarda', async () => {
  const r = await post('/api/lead', { tipo: 'colaborador', nombre: 'Juan', red: 'TikTok', usuario: '@soldadojuan', seguidores: '25000', contacto: 'juan@ejemplo.com', privacidad: 'si' });
  assert.equal(r.status, 200);
});

await paso('visitas y eventos (los bots no cuentan)', async () => {
  for (let i = 0; i < 3; i++) assert.equal((await post('/api/evento', { tipo: 'visita', ruta: '/?ref=x', fuente: 'google', dispositivo: 'movil' })).status, 204);
  await post('/api/evento', { tipo: 'whatsapp', ruta: '/' });
  await post('/api/evento', { tipo: 'test', perfil: 'Especialidades técnicas' });
  await post('/api/evento', { tipo: 'visita', ruta: '/' }, { 'User-Agent': 'Googlebot/2.1' });
  await post('/api/evento', { tipo: 'inventado', ruta: '/' });
});

await paso('20 visitas simultáneas no se pierden', async () => {
  await Promise.all(Array.from({ length: 20 }, () => post('/api/evento', { tipo: 'visita', ruta: '/blog/', fuente: 'directo' })));
});

await paso('login con contraseña mala falla', async () => {
  const r = await post('/api/panel/login', { password: 'mala' });
  assert.equal(r.status, 401);
});

await paso('login correcto da token', async () => {
  const r = await post('/api/panel/login', { password: PASSWORD_PRUEBA });
  assert.equal(r.status, 200);
  token = (await r.json()).token;
  assert.ok(token.includes('.'));
});

await paso('datos sin token -> 401', async () => {
  assert.equal((await leer('basura.firma')).status, 401);
});

await paso('datos con token: leads y estadísticas correctas', async () => {
  const r = await leer();
  assert.equal(r.status, 200);
  datos = r.cuerpo;
  const tipos = datos.leads.map((l) => l.tipo).sort();
  assert.deepEqual(tipos, ['checklist', 'colaborador', 'reserva']);
  const chk = datos.leads.find((l) => l.tipo === 'checklist');
  assert.equal(chk.avisos, true);
  assert.equal(chk.origen.fuente, 'google');
  const res = datos.leads.find((l) => l.tipo === 'reserva');
  assert.equal(res.email, 'laura@ejemplo.com');
  assert.equal(res.origen.fuente, 'ref:soldadojuan');
  const hoy = datos.dias[datos.dias.length - 1];
  assert.equal(datos.dias.length, 7);
  assert.equal(hoy.visitas, 23, `visitas=${hoy.visitas}`);
  assert.equal(hoy.rutas['/'], 3);
  assert.equal(hoy.rutas['/blog/'], 20);
  assert.equal(hoy.eventos.whatsapp, 1);
  assert.equal(hoy.perfiles['Especialidades técnicas'], 1);
});

await paso('editar estado, importe y notas', async () => {
  const res = datos.leads.find((l) => l.tipo === 'reserva');
  const r = await post('/api/panel/lead', { id: res.id, mes: res.mes, cambios: { estado: 'pagado', importe: '149', notas: 'Paga por Bizum' } }, { Authorization: `Bearer ${token}` });
  assert.equal(r.status, 200);
  const l = (await r.json()).lead;
  assert.equal(l.estado, 'pagado');
  assert.equal(l.importe, 149);
  assert.equal(l.historial.length, 2);
  const r2 = await post('/api/panel/lead', { id: res.id, mes: res.mes, cambios: { estado: 'inventado' } }, { Authorization: `Bearer ${token}` });
  assert.equal((await r2.json()).lead.estado, 'pagado');
});

await paso('borrar un contacto', async () => {
  const col = datos.leads.find((l) => l.tipo === 'colaborador');
  const r = await post('/api/panel/borrar', { id: col.id, mes: col.mes }, { Authorization: `Bearer ${token}` });
  assert.equal(r.status, 200);
  assert.equal((await leer()).cuerpo.leads.length, 2);
});

await paso('la compactación horaria mantiene las cifras', async () => {
  const { compactarEventos } = await import('../../netlify/lib/almacen.mjs');
  const r = await compactarEventos();
  assert.equal(r.procesados, 25);
  const d = (await leer()).cuerpo;
  const hoy = d.dias[d.dias.length - 1];
  assert.equal(hoy.visitas, 23);
  assert.equal(hoy.eventos.whatsapp, 1);
  assert.equal((await compactarEventos()).procesados, 0);
});

await paso('10 reservas simultáneas no se pierden', async () => {
  const rs = await Promise.all(Array.from({ length: 10 }, (_, i) => post('/api/lead', {
    tipo: 'reserva', nombre: `Persona ${i}`, telefono: '600000000', email: `p${i}@ejemplo.com`, privacidad: 'si',
  }, { 'x-ip-prueba': `10.1.0.${i}` })));
  assert.ok(rs.every((r) => r.status === 200));
  const d = (await leer()).cuerpo;
  assert.equal(d.leads.filter((l) => l.tipo === 'reserva').length, 11);
});

await paso('límite de 12 envíos por hora y por IP', async () => {
  const estados = [];
  for (let i = 0; i < 13; i++) {
    const r = await post('/api/lead', { tipo: 'checklist', email: `x${i}@ejemplo.com`, privacidad: 'si' }, { 'x-ip-prueba': '10.0.0.9' });
    estados.push(r.status);
  }
  assert.equal(estados.filter((x) => x === 200).length, 12);
  assert.equal(estados[12], 429);
});

await paso('bloqueo tras 8 intentos fallidos de login', async () => {
  const estados = [];
  for (let i = 0; i < 9; i++) estados.push((await post('/api/panel/login', { password: 'mala' }, { 'x-ip-prueba': '10.0.0.7' })).status);
  assert.equal(estados[8], 429);
});

await paso('cambiar contraseña invalida las sesiones antiguas', async () => {
  const mal = await post('/api/panel/password', { actual: 'mala', nueva: 'otra-contraseña-larga' }, { Authorization: `Bearer ${token}` });
  assert.equal(mal.status, 400);
  const r = await post('/api/panel/password', { actual: PASSWORD_PRUEBA, nueva: 'otra-contraseña-larga' }, { Authorization: `Bearer ${token}` });
  assert.equal(r.status, 200);
  const nuevo = (await r.json()).token;
  assert.equal((await leer()).status, 401);
  assert.equal((await leer(nuevo)).status, 200);
  const l = await post('/api/panel/login', { password: 'otra-contraseña-larga' });
  assert.equal(l.status, 200);
});

await s.cerrar();
console.log(`\n${pasos - fallos}/${pasos} pruebas correctas`);
process.exit(fallos ? 1 : 0);
