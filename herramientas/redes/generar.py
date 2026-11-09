"""Genera piezas para Instagram (carrusel 1080x1350 y reel 1080x1920) a partir de un JSON en piezas/.

Uso: python3 herramientas/redes/generar.py herramientas/redes/piezas/<pieza>.json
Salida: herramientas/redes/salida/<slug>/carrusel-01.png ... y reel.mp4

El texto de cada pieza tiene que salir de un artículo del blog ya publicado (con sus fuentes oficiales).
"""
import json, subprocess, sys, html, base64
from pathlib import Path
from playwright.sync_api import sync_playwright

RAIZ = Path(__file__).resolve().parents[2]
FUENTE = base64.b64encode((RAIZ / 'sitio/fonts/archivo.woff2').read_bytes()).decode()
BRUJULA = ('<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="14.4" fill="none" stroke="currentColor" stroke-width="1.6"/>'
           '<path d="M16 1.6v3.2M30.4 16h-3.2M16 30.4v-3.2M1.6 16h3.2" stroke="currentColor" stroke-width="1.3"/>'
           '<path d="M16 6.2 19.4 16 16 14.3 12.6 16Z" fill="currentColor"/>'
           '<path d="M16 25.8 12.6 16 16 17.7 19.4 16Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>')

CSS = '''
@font-face{font-family:"Archivo";src:url(data:font/woff2;base64,%s) format("woff2");font-weight:400 900;font-stretch:62%% 100%%}
html,body{margin:0}
body{box-sizing:border-box;width:%dpx;height:%dpx;padding:%dpx 88px;display:flex;flex-direction:column;
 background:#E8EAE1;color:#1C2318;font-family:"Archivo",Arial,sans-serif;position:relative;overflow:hidden}
body.oscuro{background:#33422A;color:#F3F4EE}
.mapa{position:absolute;inset:0;opacity:.22;pointer-events:none}
.marca{display:flex;align-items:center;gap:14px;font-weight:800;font-stretch:82%%;font-size:32px;position:relative}
.marca svg{width:46px;height:46px}
.cuerpo{flex:1;display:flex;flex-direction:column;justify-content:center;gap:40px;position:relative}
.ante{display:inline-block;align-self:flex-start;background:#F2CF3A;color:#1C2318;padding:8px 18px;border-radius:4px;font-weight:800;font-size:34px;font-stretch:86%%}
h1{margin:0;font-size:118px;line-height:.95;font-stretch:66%%;font-weight:850;text-wrap:balance}
h2{margin:0;font-size:96px;line-height:.98;font-stretch:66%%;font-weight:850}
.num{font-size:40px;font-weight:800;color:#2A6787;font-stretch:86%%}
.oscuro .num{color:#F2CF3A}
p{margin:0;font-size:48px;line-height:1.3;font-weight:500;text-wrap:pretty}
ul{margin:0;padding:0;list-style:none;display:grid;gap:22px}
li{font-size:46px;font-weight:600;line-height:1.2;padding-left:44px;position:relative}
li::before{content:"";position:absolute;left:0;top:.42em;width:22px;height:22px;background:#F2CF3A;border:2px solid #1C2318}
.pie{display:flex;justify-content:space-between;align-items:center;font-size:32px;font-weight:700;font-stretch:86%%;position:relative}
.pag{opacity:.6}
'''

MAPA = ('<svg class="mapa" viewBox="0 0 100 100" preserveAspectRatio="none">'
        + ''.join(f'<path d="M-5 {y} C 25 {y-8}, 45 {y+9}, 105 {y-4}" fill="none" stroke="currentColor" stroke-width=".18"/>' for y in range(6, 100, 7))
        + '</svg>')


def diapositiva(d, i, total, alto):
    e = html.escape
    oscuro = d['tipo'] in ('portada', 'cierre')
    if d['tipo'] == 'portada':
        cuerpo = f'<span class="ante">{e(d["antetitulo"])}</span><h1>{e(d["titulo"])}</h1>'
    elif d['tipo'] == 'cierre':
        cuerpo = f'<h1>{e(d["titulo"])}</h1><p>{e(d["texto"])}</p>'
    elif d['tipo'] == 'lista':
        cuerpo = f'<span class="num">{e(d["num"])}</span><h2>{e(d["titulo"])}</h2><ul>' + ''.join(f'<li>{e(x)}</li>' for x in d['items']) + '</ul>'
    else:
        cuerpo = f'<span class="num">{e(d["num"])}</span><h2>{e(d["titulo"])}</h2><p>{e(d["texto"])}</p>'
    pie = e(d.get('pie', 'orientacionmilitar.com'))
    pad = 96 if alto == 1350 else 220  # en el reel deja sitio a la interfaz de Instagram
    return (f'<!doctype html><html lang="es"><head><meta charset="utf-8"><style>{CSS % (FUENTE, 1080, alto, pad)}</style></head>'
            f'<body class="{"oscuro" if oscuro else ""}">{MAPA}<div class="marca">{BRUJULA}Orientación Militar</div>'
            f'<div class="cuerpo">{cuerpo}</div><div class="pie"><span>{pie}</span><span class="pag">{i}/{total}</span></div></body></html>')


def main(ruta):
    pieza = json.loads(Path(ruta).read_text())
    salida = Path(__file__).parent / 'salida' / pieza['slug']
    salida.mkdir(parents=True, exist_ok=True)
    ds = pieza['diapositivas']
    with sync_playwright() as p:
        nav = p.chromium.launch()
        for alto, prefijo in ((1350, 'carrusel'), (1920, 'reel')):
            pag = nav.new_page(viewport={'width': 1080, 'height': alto})
            for i, d in enumerate(ds, 1):
                pag.set_content(diapositiva(d, i, len(ds), alto))
                pag.wait_for_timeout(150)
                pag.screenshot(path=str(salida / f'{prefijo}-{i:02d}.png'))
        nav.close()
    # Reel: cada diapositiva 3,5 s con fundido de 0,5 s. La voz se añade aparte (voz.mp3) si existe.
    dur, fade, n = 3.5, 0.5, len(ds)
    entradas, filtros, ultimo = [], [], '[0:v]'
    for i in range(n):
        entradas += ['-loop', '1', '-t', str(dur), '-i', str(salida / f'reel-{i + 1:02d}.png')]
    for i in range(1, n):
        off = round(i * (dur - fade), 2)
        filtros.append(f'{ultimo}[{i}:v]xfade=transition=slideleft:duration={fade}:offset={off}[v{i}]')
        ultimo = f'[v{i}]'
    filtros.append(f'{ultimo}format=yuv420p[out]')
    voz = salida / 'voz.mp3'
    audio = ['-i', str(voz)] if voz.exists() else ['-f', 'lavfi', '-t', str(n * (dur - fade) + fade), '-i', 'anullsrc=r=44100:cl=stereo']
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *entradas, *audio, '-filter_complex', ';'.join(filtros),
                    '-map', '[out]', '-map', f'{n}:a', '-r', '30', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20',
                    '-c:a', 'aac', '-shortest', str(salida / 'reel.mp4')], check=True)
    print(f'Listo: {salida}')


if __name__ == '__main__':
    main(sys.argv[1])
