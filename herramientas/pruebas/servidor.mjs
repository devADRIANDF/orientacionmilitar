// Servidor local que imita Netlify: sirve sitio/, ejecuta la API con un almacén Blobs local
// y acepta los envíos de Netlify Forms. Uso: node herramientas/pruebas/servidor.mjs
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { BlobsServer } from '@netlify/blobs/server';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SITIO = path.join(RAIZ, 'sitio');
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.pdf': 'application/pdf', '.woff2': 'font/woff2',
};

export const PASSWORD_PRUEBA = 'prueba-panel-123';

export async function arrancar({ puerto = 8888, formularios = 200 } = {}) {
  const datos = path.join(RAIZ, 'herramientas/pruebas/.datos', String(puerto));
  await fs.rm(datos, { recursive: true, force: true });
  await fs.mkdir(datos, { recursive: true });
  const token = 'local';
  const blobs = new BlobsServer({ directory: datos, port: puerto + 1, token });
  await blobs.start();
  const edge = `http://localhost:${puerto + 1}`;
  process.env.NETLIFY_BLOBS_CONTEXT = Buffer.from(
    JSON.stringify({ edgeURL: edge, uncachedEdgeURL: edge, token, siteID: 'local', deployID: 'local' })
  ).toString('base64');
  process.env.PANEL_SECRET ||= 'secreto-de-pruebas';
  if (!process.env.PANEL_PASSWORD_HASH) {
    const sal = crypto.randomBytes(16);
    const h = crypto.pbkdf2Sync(PASSWORD_PRUEBA, sal, 210000, 32, 'sha256');
    process.env.PANEL_PASSWORD_HASH = `pbkdf2$210000$${sal.toString('base64')}$${h.toString('base64')}`;
  }
  const { default: api } = await import(pathToFileURL(path.join(RAIZ, 'netlify/functions/api.mjs')).href);
  const envios = [];

  const servidor = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, `http://localhost:${puerto}`);
      const trozos = [];
      for await (const t of req) trozos.push(t);
      const cuerpo = Buffer.concat(trozos);

      if (url.pathname.startsWith('/api/')) {
        const peticion = new Request(url, {
          method: req.method,
          headers: req.headers,
          body: ['GET', 'HEAD'].includes(req.method) ? undefined : cuerpo,
        });
        const r = await api(peticion, { ip: req.headers['x-ip-prueba'] || '127.0.0.1' });
        res.writeHead(r.status, Object.fromEntries(r.headers));
        res.end(Buffer.from(await r.arrayBuffer()));
        return;
      }
      if (req.method === 'POST' && url.pathname === '/') {
        envios.push(Object.fromEntries(new URLSearchParams(cuerpo.toString())));
        res.writeHead(formularios, { 'Content-Type': 'text/html' });
        res.end('ok');
        return;
      }
      let archivo = path.join(SITIO, decodeURIComponent(url.pathname));
      if (!archivo.startsWith(SITIO)) throw new Error('ruta');
      let st = await fs.stat(archivo).catch(() => null);
      if (st?.isDirectory()) {
        archivo = path.join(archivo, 'index.html');
        st = await fs.stat(archivo).catch(() => null);
      }
      if (!st) {
        if (url.pathname === '/panel') {
          res.writeHead(301, { Location: '/panel/' });
          res.end();
          return;
        }
        res.writeHead(404, { 'Content-Type': TIPOS['.html'] });
        res.end(await fs.readFile(path.join(SITIO, '404.html')).catch(() => 'No encontrado'));
        return;
      }
      res.writeHead(200, { 'Content-Type': TIPOS[path.extname(archivo)] || 'application/octet-stream' });
      res.end(await fs.readFile(archivo));
    } catch (e) {
      res.writeHead(500);
      res.end(String(e));
    }
  });
  await new Promise((r) => servidor.listen(puerto, r));
  return {
    url: `http://localhost:${puerto}`,
    envios,
    cerrar: async () => {
      await new Promise((r) => servidor.close(r));
      await blobs.stop();
    },
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const s = await arrancar({ puerto: Number(process.env.PUERTO || 8888) });
  console.log(`Servidor local en ${s.url} (contraseña del panel: ${PASSWORD_PRUEBA})`);
}
