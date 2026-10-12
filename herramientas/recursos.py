#!/usr/bin/env python3
"""Genera los recursos gráficos con Chromium (Playwright): checklist-examen.pdf, og.png y apple-touch-icon.png.
Solo hace falta ejecutarlo si cambias la checklist, la imagen para redes o el dominio.
Uso: python3 herramientas/recursos.py   (necesita: pip install playwright)"""
import asyncio, json, pathlib, shutil, subprocess, sys, time
from playwright.async_api import async_playwright

RAIZ = pathlib.Path(__file__).resolve().parent.parent
SITIO = RAIZ / 'sitio'
FUENTES = RAIZ / 'herramientas' / 'recursos'
TMP = SITIO / '_recursos'
CONFIG = json.loads((RAIZ / 'herramientas' / 'config.json').read_text('utf-8'))
DOMINIO = CONFIG['url'].split('://', 1)[-1].rstrip('/')


async def main(url):
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1280, 'height': 900}, device_scale_factor=2)
        await pg.goto(url + '/')
        await pg.wait_for_timeout(2600)
        await (await pg.query_selector('.mapa-hoja')).screenshot(path=str(TMP / 'map.png'))
        await pg.close()
        pg = await b.new_page(viewport={'width': 1200, 'height': 630})
        await pg.goto(url + '/_recursos/og.html')
        await pg.wait_for_timeout(700)
        await pg.screenshot(path=str(SITIO / 'og.png'))
        await pg.close()
        pg = await b.new_page(viewport={'width': 180, 'height': 180})
        await pg.goto(url + '/_recursos/icon.html')
        await pg.wait_for_timeout(200)
        await pg.screenshot(path=str(SITIO / 'apple-touch-icon.png'))
        await pg.close()
        pg = await b.new_page()
        await pg.goto(url + '/_recursos/checklist.html')
        await pg.wait_for_timeout(700)
        await pg.pdf(path=str(SITIO / 'checklist-examen.pdf'), format='A4', print_background=True, prefer_css_page_size=True)
        await b.close()


if TMP.exists():
    shutil.rmtree(TMP)
shutil.copytree(FUENTES, TMP)
for f in TMP.glob('*.html'):
    f.write_text(f.read_text('utf-8').replace('{{DOMINIO}}', DOMINIO), 'utf-8')
srv = subprocess.Popen([sys.executable, '-m', 'http.server', '8799', '--bind', '127.0.0.1'], cwd=SITIO,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)
try:
    asyncio.run(main('http://127.0.0.1:8799'))
    print('Recursos generados: checklist-examen.pdf, og.png, apple-touch-icon.png')
finally:
    srv.terminate()
    shutil.rmtree(TMP, ignore_errors=True)
