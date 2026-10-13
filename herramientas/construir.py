#!/usr/bin/env python3
"""Genera las partes automáticas de la web de Orientación Militar.

Uso:  python3 herramientas/construir.py

Qué hace (sin dependencias externas, solo Python 3):
  - Inyecta la configuración pública (WhatsApp, email, precios, enlaces) en sitio/comun.js.
  - Ajusta la URL base y los datos estructurados de la portada.
  - Genera las páginas legales y la 404 con los datos de herramientas/config.json.
  - Genera el blog a partir de contenido/blog/*.html: artículos, índice, posts.json y feed RSS.
  - Pinta las últimas guías en la portada.
  - Genera sitemap.xml y robots.txt.
Si encuentra un error (por ejemplo, un artículo sin fuentes), lo dice y termina con código 1.
"""
import html
import json
import math
import pathlib
import re
import sys
from datetime import date, datetime, timezone
from email.utils import format_datetime

RAIZ = pathlib.Path(__file__).resolve().parent.parent
SITIO = RAIZ / 'sitio'
CONTENIDO = RAIZ / 'contenido' / 'blog'
CONFIG = json.loads((RAIZ / 'herramientas' / 'config.json').read_text('utf-8'))
URL = CONFIG['url'].rstrip('/')
HOY = date.today()
MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
errores, avisos = [], []


def e(s):
    return html.escape(str(s), quote=True)


def fecha_larga(d):
    return f'{d.day} de {MESES[d.month - 1]} de {d.year}'


def slugify(texto):
    t = texto.lower()
    for a, b in (('á', 'a'), ('é', 'e'), ('í', 'i'), ('ó', 'o'), ('ú', 'u'), ('ü', 'u'), ('ñ', 'n')):
        t = t.replace(a, b)
    t = re.sub(r'<[^>]+>', '', t)
    t = re.sub(r'[^a-z0-9]+', '-', t).strip('-')
    return t[:60] or 'seccion'


def escribir(ruta, contenido):
    ruta.parent.mkdir(parents=True, exist_ok=True)
    ruta.write_text(contenido, encoding='utf-8')


# ---------------------------------------------------------------- Plantilla común

MARCA = '''<a class="marca" href="/">
      <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="14.4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M16 1.6v3.2M30.4 16h-3.2M16 30.4v-3.2M1.6 16h3.2" stroke="currentColor" stroke-width="1.3"/><path d="M16 6.2 19.4 16 16 14.3 12.6 16Z" fill="currentColor"/><path d="M16 25.8 12.6 16 16 17.7 19.4 16Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
      <span>Orientación Militar</span>
    </a>'''


def cabecera(actual=''):
    blog = ' aria-current="page"' if actual == 'blog' else ''
    return f'''<header class="cabecera">
    {MARCA}
    <nav class="nav" aria-label="Secciones">
      <a href="/#test">Test gratis</a>
      <a href="/#como-funciona">Cómo funciona</a>
      <a href="/#precios">Precios</a>
      <a href="/blog/"{blog}>Blog</a>
    </nav>
    <a class="btn btn-sm" href="/#precios"><span>Reservar<span class="solo-ancho"> llamada</span></span></a>
  </header>'''


def pie():
    return f'''<footer class="pie">
    <p>Orientación Militar es un servicio privado e independiente. No tiene relación con el Ministerio de Defensa ni con las Fuerzas Armadas. La información oficial sobre convocatorias, requisitos y plazos está en el <a href="https://reclutamiento.defensa.gob.es/" rel="noopener">portal de reclutamiento de Defensa</a>.</p>
    <p class="pie-contacto"><span>Contacto: <span class="sel" data-dato="email" hidden></span></span><a data-wa="Hola, tengo una duda sobre Orientación Militar: " hidden>WhatsApp <span data-dato="whatsapp_visible"></span></a></p>
    <nav class="pie-legal" aria-label="Enlaces">
      <a href="/blog/">Blog</a>
      <a href="/aviso-legal.html">Aviso legal</a>
      <a href="/privacidad.html">Política de privacidad</a>
      <a href="/cookies.html">Cookies</a>
      <a href="/condiciones.html">Condiciones de contratación</a>
    </nav>
    <p>© {HOY.year} Orientación Militar</p>
  </footer>'''


def pagina(titulo, descripcion, ruta, cuerpo, robots='index, follow', cabeza_extra='', og_tipo='website', actual=''):
    canonical = f'{URL}{ruta}'
    return f'''<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(titulo)}</title>
<meta name="description" content="{e(descripcion)}">
<meta name="robots" content="{robots}">
<link rel="canonical" href="{e(canonical)}">
<meta name="theme-color" content="#E8EAE1" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#131811" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="{og_tipo}">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="Orientación Militar">
<meta property="og:title" content="{e(titulo)}">
<meta property="og:description" content="{e(descripcion)}">
<meta property="og:url" content="{e(canonical)}">
<meta property="og:image" content="{URL}/og.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/archivo.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/estilo.css">
<link rel="alternate" type="application/rss+xml" title="Blog de Orientación Militar" href="/blog/feed.xml">
{cabeza_extra}</head>
<body>
<a class="saltar" href="#contenido">Saltar al contenido</a>
<div class="hoja">
  {cabecera(actual)}
  <main id="contenido">
{cuerpo}
  </main>
  {pie()}
</div>
<script src="/comun.js"></script>
</body>
</html>
'''


# ---------------------------------------------------------------- Configuración pública

def inyectar_config():
    publica = {k: CONFIG.get(k) for k in ('whatsapp', 'whatsapp_visible', 'whatsapp_mensaje', 'email', 'precios', 'enlaces')}
    ruta = SITIO / 'comun.js'
    js = ruta.read_text('utf-8')
    nuevo, n = re.subn(r'/\*CONFIG\*/.*?/\*FIN CONFIG\*/', lambda m: '/*CONFIG*/' + json.dumps(publica, ensure_ascii=False) + '/*FIN CONFIG*/', js, flags=re.S)
    if n != 1:
        errores.append('comun.js: no encuentro el bloque /*CONFIG*/ ... /*FIN CONFIG*/')
        return
    escribir(ruta, nuevo)


# ---------------------------------------------------------------- Portada

def ajustar_portada(posts):
    ruta = SITIO / 'index.html'
    doc = ruta.read_text('utf-8')
    m = re.search(r'<link rel="canonical" href="(https?://[^"]+?)/?">', doc)
    if m and m.group(1).rstrip('/') != URL:
        doc = doc.replace(m.group(1).rstrip('/'), URL)

    verif = CONFIG.get('google_verificacion', '').strip()
    doc = re.sub(r'<meta name="google-site-verification"[^>]*>\n?', '', doc)
    if verif:
        doc = doc.replace('<link rel="canonical"', f'<meta name="google-site-verification" content="{e(verif)}">\n<link rel="canonical"', 1)

    limpiar = lambda s: html.unescape(re.sub(r'<[^>]+>', '', s)).strip()
    faq = [{'@type': 'Question', 'name': limpiar(q), 'acceptedAnswer': {'@type': 'Answer', 'text': limpiar(a)}}
           for q, a in re.findall(r'<details>\s*<summary>(.*?)</summary>\s*<p>(.*?)</p>\s*</details>', doc, re.S)]
    precios = CONFIG['precios']
    ld = {'@context': 'https://schema.org', '@graph': [
        {'@type': 'ProfessionalService', 'name': 'Orientación Militar', 'url': f'{URL}/', 'areaServed': 'ES',
         'image': f'{URL}/og.png', 'email': CONFIG.get('email') or None,
         'description': 'Llamadas 1:1 con exmilitares para elegir plazas y destino en las Fuerzas Armadas.',
         'makesOffer': [
             {'@type': 'Offer', 'name': 'Llamada 1:1 con un exmilitar', 'price': str(precios['llamada']), 'priceCurrency': 'EUR'},
             {'@type': 'Offer', 'name': 'Acompañamiento', 'price': str(precios['acompanamiento']), 'priceCurrency': 'EUR'},
             {'@type': 'Offer', 'name': 'Checklist para el examen', 'price': '0', 'priceCurrency': 'EUR'}]},
        {'@type': 'FAQPage', 'mainEntity': faq}]}
    ld['@graph'][0] = {k: v for k, v in ld['@graph'][0].items() if v is not None}
    bloque = '<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False) + '</script>'
    doc, n = re.subn(r'<script type="application/ld\+json">.*?</script>', lambda _: bloque, doc, count=1, flags=re.S)
    if n != 1:
        errores.append('index.html: no encuentro el bloque de datos estructurados')

    if posts:
        tarjetas = '\n'.join(
            f'        <li class="guia"><span class="guia-cat">{e(p["categoria"])}</span><a href="/blog/{p["slug"]}/">{e(p["titulo"])}</a><p>{e(p["descripcion"])}</p></li>'
            for p in posts[:3])
        seccion = f'''<!--BLOG:INICIO-->
    <section class="seccion" id="guias" aria-labelledby="t-guias">
      <div class="sec-cab">
        <h2 id="t-guias">Guías para elegir bien</h2>
        <p class="intro">Lo que conviene saber antes de pedir plaza, explicado sin rodeos y con las fuentes oficiales.</p>
      </div>
      <ul class="guias">
{tarjetas}
      </ul>
      <p><a class="guias-todas" href="/blog/">Ver todas las guías</a></p>
    </section>
    <!--BLOG:FIN-->'''
    else:
        seccion = '<!--BLOG:INICIO--><!--BLOG:FIN-->'
    doc, n = re.subn(r'<!--BLOG:INICIO-->.*?<!--BLOG:FIN-->', lambda _: seccion, doc, flags=re.S)
    if n != 1:
        errores.append('index.html: no encuentro las marcas <!--BLOG:INICIO--> y <!--BLOG:FIN-->')
    escribir(ruta, doc)


# ---------------------------------------------------------------- Blog

def leer_post(ruta):
    texto = ruta.read_text('utf-8')
    m = re.match(r'\s*<!--(.*?)-->(.*)', texto, re.S)
    nombre = ruta.name
    if not m:
        errores.append(f'{nombre}: falta el bloque de datos <!-- ... --> al principio')
        return None
    meta, fuentes, en_fuentes = {}, [], False
    for linea in m.group(1).splitlines():
        if not linea.strip():
            continue
        if en_fuentes and linea.strip().startswith('- '):
            partes = linea.strip()[2:].rsplit('|', 1)
            if len(partes) != 2 or not partes[1].strip().startswith('http'):
                errores.append(f'{nombre}: fuente mal escrita, usa «- Título | https://...»: {linea.strip()}')
            else:
                fuentes.append((partes[0].strip(), partes[1].strip()))
            continue
        clave, _, valor = linea.partition(':')
        clave = clave.strip().lower()
        en_fuentes = clave == 'fuentes'
        if not en_fuentes:
            meta[clave] = valor.strip()
    slug = ruta.stem
    post = {'slug': slug, 'archivo': nombre, 'cuerpo': m.group(2).strip(), 'fuentes': fuentes,
            'titulo': meta.get('titulo', ''), 'descripcion': meta.get('descripcion', ''),
            'categoria': meta.get('categoria', 'Guías'), 'borrador': meta.get('borrador', '').lower() in ('si', 'sí', 'true')}
    if not re.fullmatch(r'[a-z0-9]+(-[a-z0-9]+)*', slug):
        errores.append(f'{nombre}: el nombre del archivo debe ir en minúsculas y con guiones (ej. como-elegir-plazas.html)')
    try:
        post['fecha'] = date.fromisoformat(meta.get('fecha', ''))
        post['actualizado'] = date.fromisoformat(meta['actualizado']) if meta.get('actualizado') else post['fecha']
    except ValueError:
        errores.append(f'{nombre}: fecha o actualizado no tienen el formato AAAA-MM-DD')
        return None
    if post['actualizado'] < post['fecha']:
        errores.append(f'{nombre}: «actualizado» no puede ser anterior a «fecha»')
    if not post['titulo']:
        errores.append(f'{nombre}: falta el título')
    elif len(post['titulo']) > 70:
        avisos.append(f'{nombre}: el título tiene {len(post["titulo"])} caracteres; Google corta a partir de unos 60-65')
    if not 70 <= len(post['descripcion']) <= 165:
        avisos.append(f'{nombre}: la descripción tiene {len(post["descripcion"])} caracteres; lo ideal son 120-160')
    if not fuentes:
        errores.append(f'{nombre}: falta al menos una fuente')
    if re.search(r'<h1[\s>]', post['cuerpo']):
        errores.append(f'{nombre}: el cuerpo no puede llevar <h1>; el título ya lo pone la plantilla')
    h2s = re.findall(r'<h2[^>]*>(.*?)</h2>', post['cuerpo'], re.S)
    if len(h2s) < 3:
        errores.append(f'{nombre}: necesita al menos 3 secciones <h2>')
    palabras = len(re.sub(r'<[^>]+>', ' ', post['cuerpo']).split())
    post['palabras'] = palabras
    if palabras < 600:
        avisos.append(f'{nombre}: solo {palabras} palabras; para posicionar conviene pasar de 800')
    return post


def preparar_cuerpo(post):
    cuerpo = post['cuerpo']
    indice, usados = [], set()

    def poner_id(m):
        attrs, texto = m.group(1), m.group(2)
        ident = slugify(texto)
        base, i = ident, 2
        while ident in usados:
            ident, i = f'{base}-{i}', i + 1
        usados.add(ident)
        indice.append((ident, re.sub(r'<[^>]+>', '', texto).strip()))
        attrs = re.sub(r'\sid="[^"]*"', '', attrs)
        return f'<h2{attrs} id="{ident}">{texto}</h2>'

    cuerpo = re.sub(r'<h2([^>]*)>(.*?)</h2>', poner_id, cuerpo, flags=re.S)

    def enlace(m):
        etiqueta = m.group(0)
        href = re.search(r'href="([^"]+)"', etiqueta)
        if href and href.group(1).startswith('http') and not href.group(1).startswith(URL):
            if 'rel=' not in etiqueta:
                etiqueta = etiqueta[:-1] + ' rel="noopener">'
        return etiqueta

    cuerpo = re.sub(r'<a\s[^>]*>', enlace, cuerpo)
    cuerpo = re.sub(r'(?<!<div class="tabla-art">)\s*<table>(.*?)</table>', r'\n<div class="tabla-art"><table>\1</table></div>', cuerpo, flags=re.S)

    posiciones = [m.start() for m in re.finditer(r'<h2[\s>]', cuerpo)]
    if len(posiciones) >= 3:
        mini = '''<aside class="cta-mini">
  <p>¿Te presentas en el próximo ciclo y no tienes clara tu lista de plazas?</p>
  <div class="acciones"><a class="btn btn-sm" href="/#test">Haz el test gratis</a><a class="btn btn-sec btn-sm" href="/#precios">Habla con un exmilitar</a></div>
</aside>
'''
        p = posiciones[2]
        cuerpo = cuerpo[:p] + mini + cuerpo[p:]
    return cuerpo, indice


def pagina_post(post, todos):
    cuerpo, indice = preparar_cuerpo(post)
    minutos = max(1, math.ceil(post['palabras'] / 220))
    url_post = f'{URL}/blog/{post["slug"]}/'
    actualizado = post['actualizado'] != post['fecha']
    meta = (f'Actualizado el {fecha_larga(post["actualizado"])}' if actualizado else f'Publicado el {fecha_larga(post["fecha"])}')
    toc = ''
    if len(indice) >= 3:
        toc = '<nav class="indice" aria-label="Índice"><p>En esta guía</p><ol>' + ''.join(
            f'<li><a href="#{i}">{e(t)}</a></li>' for i, t in indice) + '</ol></nav>'
    relacionados = [p for p in todos if p['slug'] != post['slug'] and p['categoria'] == post['categoria']]
    relacionados += [p for p in todos if p['slug'] != post['slug'] and p not in relacionados]
    rel_html = ''
    if relacionados:
        rel_html = '<section class="relacionados"><h2>Sigue leyendo</h2><ul>' + ''.join(
            f'<li><a href="/blog/{p["slug"]}/">{e(p["titulo"])}</a></li>' for p in relacionados[:3]) + '</ul></section>'
    fuentes = '<section class="fuentes"><h2>Fuentes</h2><ul>' + ''.join(
        f'<li><a href="{e(u)}" rel="noopener">{e(t)}</a></li>' for t, u in post['fuentes']) + '</ul></section>'
    ld = {'@context': 'https://schema.org', '@graph': [
        {'@type': 'Article', 'headline': post['titulo'], 'description': post['descripcion'],
         'datePublished': post['fecha'].isoformat(), 'dateModified': post['actualizado'].isoformat(),
         'inLanguage': 'es-ES', 'mainEntityOfPage': url_post, 'image': f'{URL}/og.png',
         'author': {'@type': 'Organization', 'name': 'Orientación Militar', 'url': f'{URL}/'},
         'publisher': {'@type': 'Organization', 'name': 'Orientación Militar', 'logo': {'@type': 'ImageObject', 'url': f'{URL}/apple-touch-icon.png'}}},
        {'@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Inicio', 'item': f'{URL}/'},
            {'@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': f'{URL}/blog/'},
            {'@type': 'ListItem', 'position': 3, 'name': post['titulo'], 'item': url_post}]}]}
    extra = (f'<meta property="article:published_time" content="{post["fecha"].isoformat()}">\n'
             f'<meta property="article:modified_time" content="{post["actualizado"].isoformat()}">\n'
             f'<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>\n')
    lateral = ''
    if toc:
        lateral = ('<aside class="art-lateral" aria-label="Navegación de la guía"><div class="lateral-pegado">'
                   + toc.replace('class="indice"', 'class="indice-lat"', 1).replace('aria-label="Índice"', 'aria-label="Índice lateral"', 1)
                   + '<div class="lateral-cta"><p class="lateral-tit">Checklist gratis para el examen</p>'
                   '<p>Qué llevar, cómo se calcula tu nota y la plantilla para tus 10 plazas. 7 páginas en PDF.</p>'
                   '<a class="btn btn-sm" href="/#precios">Descargar gratis</a>'
                   '<a class="lateral-link" href="/#test">O haz el test de destino en 2 minutos</a></div>'
                   '</div></aside>')
    contenido = f'''    <div class="progreso" aria-hidden="true"><span></span></div>
    <div class="art-rejilla">
    <article class="articulo">
      <nav class="migas" aria-label="Estás en"><ol><li><a href="/">Inicio</a></li><li><a href="/blog/">Blog</a></li><li>{e(post["categoria"])}</li></ol></nav>
      <h1>{e(post["titulo"])}</h1>
      <p class="art-meta"><span>{meta}</span><span>{minutos} min de lectura</span></p>
      <p class="art-entradilla">{e(post["descripcion"])}</p>
      {toc}
      <div class="art-cuerpo">
{cuerpo}
      </div>
      <aside class="cta-art">
        <h2>Antes de firmar tu lista de plazas, habla con alguien que ha estado dentro</h2>
        <p>Media hora con un exmilitar para resolver tus dudas sobre destinos y llegar al examen con la lista decidida.</p>
        <div class="acciones"><a class="btn" href="/#precios">Reservar llamada</a><a class="btn btn-sec" href="/#test">Hacer el test gratis</a></div>
      </aside>
      {fuentes}
      <p class="aviso-art">Esta guía es orientativa y se basa en las fuentes oficiales citadas. Las convocatorias cambian: comprueba siempre las bases de tu ciclo en el BOE y en el portal de reclutamiento de Defensa.</p>
      {rel_html}
    </article>
    {lateral}
    </div>
    <script>
    (function () {{
      var barra = document.querySelector('.progreso span');
      var art = document.querySelector('.articulo');
      function pintar() {{
        var r = art.getBoundingClientRect();
        var total = r.height - window.innerHeight;
        var k = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
        barra.style.transform = 'scaleX(' + k + ')';
      }}
      window.addEventListener('scroll', pintar, {{ passive: true }});
      window.addEventListener('resize', pintar);
      pintar();
      var enlaces = [].slice.call(document.querySelectorAll('.indice-lat a'));
      var titulos = [].slice.call(document.querySelectorAll('.art-cuerpo h2[id]'));
      var actual = null;
      function marcar() {{
        var linea = window.innerHeight * 0.3, id = null;
        titulos.forEach(function (h) {{ if (h.getBoundingClientRect().top < linea) id = h.id; }});
        if (id === actual) return;
        actual = id;
        enlaces.forEach(function (a) {{
          if (id && a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        }});
      }}
      if (enlaces.length) {{
        window.addEventListener('scroll', marcar, {{ passive: true }});
        marcar();
      }}
    }})();
    </script>'''
    return pagina(f'{post["titulo"]} | Orientación Militar', post['descripcion'], f'/blog/{post["slug"]}/', contenido,
                  cabeza_extra=extra, og_tipo='article', actual='blog')


def construir_blog():
    posts = []
    for ruta in sorted(CONTENIDO.glob('*.html')):
        p = leer_post(ruta)
        if not p:
            continue
        if p['borrador']:
            avisos.append(f'{p["archivo"]}: es un borrador, no se publica')
            continue
        if p['fecha'] > HOY:
            avisos.append(f'{p["archivo"]}: programado para el {p["fecha"].isoformat()}, aún no se publica')
            continue
        posts.append(p)
    posts.sort(key=lambda p: (p['fecha'], p['slug']), reverse=True)
    slugs = {p['slug'] for p in posts}
    for p in posts:
        for destino in re.findall(r'href="/blog/([a-z0-9-]+)/?"', p['cuerpo']):
            if destino not in slugs:
                avisos.append(f'{p["archivo"]}: enlaza a /blog/{destino}/, que no existe')

    salida = SITIO / 'blog'
    for viejo in salida.glob('*/index.html'):
        if viejo.parent.name not in slugs:
            viejo.unlink()
            try:
                viejo.parent.rmdir()
            except OSError:
                pass
    for p in posts:
        escribir(salida / p['slug'] / 'index.html', pagina_post(p, posts))

    cats = [c for c in ['Convocatorias', 'Pruebas', 'Plazas y destinos', 'Unidades', 'Carrera y salidas', 'Vida militar'] if any(p['categoria'] == c for p in posts)]
    filtro = ''
    if len(cats) > 1:
        filtro = ('<div class="filtro" role="group" aria-label="Filtrar por tema"><button type="button" aria-pressed="true" data-cat="">Todas</button>'
                  + ''.join(f'<button type="button" aria-pressed="false" data-cat="{e(c)}">{e(c)}</button>' for c in cats) + '</div>')
    filas = '\n'.join(f'''        <li class="post-fila" data-cat="{e(p["categoria"])}">
          <span class="post-fecha">{fecha_larga(p["fecha"])}</span>
          <div class="post-cuerpo"><span class="post-cat">{e(p["categoria"])}</span><h2><a href="/blog/{p["slug"]}/">{e(p["titulo"])}</a></h2><p>{e(p["descripcion"])}</p></div>
        </li>''' for p in posts) or '        <li class="post-fila"><p>Pronto publicaremos la primera guía.</p></li>'
    indice = f'''    <header class="blog-cab">
      <h1>Guías de Tropa y Marinería</h1>
      <p>Requisitos, cita previa, pruebas, plazas y destinos: cómo funciona el proceso para entrar en el Ejército como soldado o marinero y qué preguntar antes de firmar tu lista de plazas. Con las fuentes oficiales de cada dato.</p>
      {filtro}
    </header>
    <ol class="blog-lista" reversed>
{filas}
    </ol>
    <script>
    (function () {{
      var botones = document.querySelectorAll('.filtro button');
      botones.forEach(function (b) {{
        b.addEventListener('click', function () {{
          botones.forEach(function (x) {{ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }});
          var c = b.dataset.cat;
          document.querySelectorAll('.post-fila').forEach(function (f) {{ f.hidden = !!c && f.dataset.cat !== c; }});
        }});
      }});
    }})();
    </script>'''
    escribir(salida / 'index.html', pagina('Guías de Tropa y Marinería: requisitos, plazas y pruebas | Orientación Militar',
                                           'Guías para entrar en el Ejército como soldado o marinero: requisitos, cita previa, prueba de aptitudes, plazas y destinos, con fuentes oficiales.',
                                           '/blog/', indice, actual='blog'))

    escribir(salida / 'posts.json', json.dumps([
        {'slug': p['slug'], 'titulo': p['titulo'], 'descripcion': p['descripcion'], 'categoria': p['categoria'],
         'fecha': p['fecha'].isoformat(), 'actualizado': p['actualizado'].isoformat(), 'palabras': p['palabras']}
        for p in posts], ensure_ascii=False, indent=1))

    items = ''.join(f'''
  <item>
    <title>{e(p["titulo"])}</title>
    <link>{URL}/blog/{p["slug"]}/</link>
    <guid isPermaLink="true">{URL}/blog/{p["slug"]}/</guid>
    <pubDate>{format_datetime(datetime(p["fecha"].year, p["fecha"].month, p["fecha"].day, 8, 0, tzinfo=timezone.utc))}</pubDate>
    <description>{e(p["descripcion"])}</description>
  </item>''' for p in posts[:30])
    escribir(salida / 'feed.xml', f'''<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Blog de Orientación Militar</title>
  <link>{URL}/blog/</link>
  <description>Guías para elegir plaza y destino en las Fuerzas Armadas</description>
  <language>es-es</language>{items}
</channel>
</rss>
''')
    return posts


# ---------------------------------------------------------------- Legal

def dato(clave):
    v = (CONFIG.get('titular', {}).get(clave) or '').strip()
    return e(v) if v else 'Pendiente de completar'


def construir_legal():
    email = e(CONFIG.get('email') or 'Pendiente de completar')
    act = e(CONFIG.get('actualizado_legal') or fecha_larga(HOY))
    precios = CONFIG['precios']
    ident = f'''      <dl>
        <dt>Titular</dt><dd>{dato("nombre")}</dd>
        <dt>NIF</dt><dd>{dato("nif")}</dd>
        <dt>Domicilio</dt><dd>{dato("domicilio")}</dd>
        <dt>Email</dt><dd>{email}</dd>
      </dl>'''

    def legal(nombre, titulo, cuerpo):
        contenido = f'''    <div class="legal">
      <h1>{titulo}</h1>
      <p class="actualizado">Última actualización: {act}</p>
{cuerpo}
    </div>'''
        escribir(SITIO / nombre, pagina(f'{titulo} | Orientación Militar', f'{titulo} de Orientación Militar.', f'/{nombre}', contenido, robots='noindex, follow'))

    legal('aviso-legal.html', 'Aviso legal', f'''      <h2>Datos del titular</h2>
      <p>En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI), estos son los datos del titular de esta web:</p>
{ident}
      <h2>Qué es Orientación Militar</h2>
      <p>Orientación Militar es un servicio privado e independiente de orientación para personas que quieren acceder a las Fuerzas Armadas. No tiene relación con el Ministerio de Defensa ni con las Fuerzas Armadas y no utiliza sus emblemas. La información oficial y vinculante sobre convocatorias, requisitos, plazos y plazas es la que publica el Ministerio de Defensa en su <a href="https://reclutamiento.defensa.gob.es/" rel="noopener">portal de reclutamiento</a> y en el BOE.</p>
      <h2>Uso de la web</h2>
      <p>Al navegar por esta web te comprometes a usarla de forma lícita y de acuerdo con este aviso legal. No está permitido usarla para fines ilícitos ni para dañar la web o a terceros.</p>
      <h2>Contenidos</h2>
      <p>La información de esta web, del blog, del test de orientación y de la checklist es orientativa. El resultado del test es una primera aproximación y no sustituye a la información oficial ni a una valoración personalizada. Las convocatorias cambian, así que comprueba siempre la información oficial de tu ciclo.</p>
      <h2>Propiedad intelectual</h2>
      <p>Los textos, el diseño, el test, las guías y la checklist pertenecen al titular. No puedes copiarlos ni distribuirlos con fines comerciales sin permiso.</p>
      <h2>Enlaces a otras webs</h2>
      <p>Esta web enlaza a webs de terceros, como el BOE, el portal de reclutamiento del Ministerio de Defensa, WhatsApp o los proveedores de pago y reserva. No somos responsables de su contenido.</p>
      <h2>Ley aplicable</h2>
      <p>Este aviso legal se rige por la legislación española.</p>''')

    legal('privacidad.html', 'Política de privacidad', f'''      <p>Aquí te explicamos qué datos recogemos, para qué los usamos y qué derechos tienes, conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).</p>
      <h2>Responsable</h2>
{ident}
      <h2>Qué datos tratamos</h2>
      <ul>
        <li>Cuando solicitas una reserva: nombre, teléfono o WhatsApp, email, la opción que eliges, la fecha de tu examen si nos la das, lo que nos cuentes sobre tus dudas o destinos y el código de colaborador si lo usas.</li>
        <li>Cuando descargas la checklist o haces el test y nos dejas tu email: tu email, si quieres avisos de convocatorias, tus respuestas al test y el resultado.</li>
        <li>Cuando nos escribes para colaborar: tu nombre, tu perfil en redes, el número aproximado de seguidores, tu contacto y tu mensaje.</li>
        <li>En todos los formularios guardamos también de dónde llegaste a la web (por ejemplo, Google o el código de un colaborador) y la página desde la que enviaste el formulario.</li>
        <li>Si nos escribes por WhatsApp, tratamos los datos de esa conversación para responderte. WhatsApp (Meta) los trata además según su propia política de privacidad.</li>
        <li>Si pagas online, los datos de pago los gestiona directamente el proveedor de pago. No vemos ni guardamos los datos completos de tu tarjeta.</li>
      </ul>
      <h2>Estadísticas de visitas</h2>
      <p>Contamos las visitas de forma agregada: qué páginas se ven, desde qué tipo de dispositivo (móvil u ordenador) y de qué web llega la visita. No usamos cookies ni guardamos nada en tu navegador, no guardamos tu dirección IP y no creamos perfiles de visitantes.</p>
      <h2>Para qué los usamos y con qué base legal</h2>
      <ul>
        <li>Gestionar tu reserva, organizar la llamada y prestarte el servicio. Base legal: la ejecución del contrato o de las medidas precontractuales que nos pides (artículo 6.1.b del RGPD).</li>
        <li>Enviarte la checklist y el resultado del test. Base legal: tu consentimiento (artículo 6.1.a del RGPD).</li>
        <li>Avisarte de nuevas convocatorias, solo si marcas esa casilla. Base legal: tu consentimiento, que puedes retirar cuando quieras.</li>
        <li>Valorar propuestas de colaboración y pagar las comisiones de los colaboradores. Base legal: las medidas precontractuales o el contrato.</li>
        <li>Medir de forma agregada cómo se usa la web y proteger los formularios frente a abusos. Base legal: nuestro interés legítimo (artículo 6.1.f del RGPD). Para limitar envíos masivos usamos un identificador cifrado e irreversible de la conexión que se borra en pocas horas.</li>
        <li>Cumplir obligaciones legales, como las fiscales y de facturación. Base legal: obligación legal (artículo 6.1.c del RGPD).</li>
      </ul>
      <h2>Quién más accede a tus datos</h2>
      <ul>
        <li>La persona que te atiende en la llamada, solo con los datos necesarios para prepararla y hacerla.</li>
        <li>Netlify, Inc., que aloja la web y guarda los formularios. Puede tratar datos fuera del Espacio Económico Europeo, con las garantías que exige el RGPD para estas transferencias, como las cláusulas contractuales tipo de la Comisión Europea.</li>
        <li>Los proveedores de pago y de agenda que usemos para cobrar y reservar, solo cuando los utilices.</li>
      </ul>
      <p>No vendemos tus datos ni los cedemos a terceros, salvo obligación legal.</p>
      <h2>Cuánto tiempo los guardamos</h2>
      <ul>
        <li>Datos de reservas y clientes: mientras dure la relación y, después, durante los plazos que exige la ley, por ejemplo los fiscales.</li>
        <li>Email para la checklist y los avisos: hasta que te des de baja o retires tu consentimiento.</li>
        <li>Solicitudes que no terminan en reserva ni en colaboración: un máximo de 12 meses.</li>
      </ul>
      <h2>Tus derechos</h2>
      <p>Puedes pedir el acceso, la rectificación o la supresión de tus datos, oponerte a su tratamiento, pedir su limitación o su portabilidad y retirar tu consentimiento en cualquier momento escribiendo a {email}. Si crees que no hemos tratado bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos en <a href="https://www.aepd.es/" rel="noopener">aepd.es</a>.</p>
      <h2>Menores de edad</h2>
      <p>Si tienes menos de 14 años, necesitas que tu madre, tu padre o tu tutor den el consentimiento por ti (artículo 7 de la LOPDGDD).</p>
      <h2>Seguridad</h2>
      <p>Aplicamos medidas técnicas y organizativas razonables para proteger tus datos. La web funciona siempre con conexión cifrada (HTTPS) y el acceso a los datos está protegido con contraseña.</p>
      <h2>Cambios en esta política</h2>
      <p>Podemos actualizar esta política. La fecha de la última actualización aparece al principio de la página.</p>''')

    legal('cookies.html', 'Política de cookies', '''      <p>Esta web no utiliza cookies, ni propias ni de terceros, y no guarda nada en tu navegador. Las fuentes tipográficas se cargan desde nuestro propio servidor, sin conectar con servicios externos.</p>
      <p>Para saber cuántas visitas recibimos y de dónde llegan, contamos cada visita de forma agregada sin cookies, sin identificadores y sin guardar tu dirección IP. Lo explicamos en la <a href="/privacidad.html">política de privacidad</a>.</p>
      <p>Cuando pulsas un enlace de WhatsApp, de pago o de reserva, pasas a la web o la aplicación de ese proveedor, que tiene su propia política de cookies.</p>
      <p>Si en el futuro añadimos herramientas que usen cookies no necesarias, te pediremos el consentimiento antes de activarlas y actualizaremos esta política.</p>''')

    legal('condiciones.html', 'Condiciones de contratación', f'''      <h2>Quién presta el servicio</h2>
      <p>El titular identificado en el <a href="/aviso-legal.html">aviso legal</a>. Las llamadas las hace un exmilitar que colabora con Orientación Militar.</p>
      <h2>Servicios y precios</h2>
      <ul>
        <li>Llamada 1:1: 30 minutos por videollamada o teléfono. {precios["llamada"]} € con IVA incluido.</li>
        <li>Acompañamiento: llamada de 45 minutos, WhatsApp directo durante 30 días naturales desde la llamada y revisión de tu lista de plazas antes del examen. {precios["acompanamiento"]} € con IVA incluido.</li>
        <li>Checklist para el examen: gratuita.</li>
      </ul>
      <h2>Cómo se contrata</h2>
      <p>Puedes reservar desde la web. Si la reserva no incluye el pago en ese momento, te escribimos para acordar día y hora y te enviamos un enlace de pago seguro. La reserva queda confirmada cuando recibimos el pago.</p>
      <h2>Cambios y cancelaciones</h2>
      <p>Puedes cambiar la fecha de la llamada avisando con al menos 24 horas de antelación. Si no te conectas a la hora acordada y no has avisado, la llamada se considera realizada.</p>
      <h2>Garantía de satisfacción</h2>
      <p>Si sales de la llamada con las mismas dudas, escríbenos en las 48 horas siguientes y te devolvemos el importe íntegro.</p>
      <h2>Derecho de desistimiento</h2>
      <p>Como consumidor tienes 14 días naturales desde la contratación para desistir sin dar explicaciones. Si desistes antes de la llamada, te devolvemos el importe íntegro.</p>
      <p>Si pides que la llamada se haga antes de que terminen esos 14 días, aceptas que el servicio empiece en ese plazo y, una vez hecha la llamada, pierdes el derecho de desistimiento, según el artículo 103.a) del texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios. Si desistes del acompañamiento después de la llamada, te devolvemos la parte proporcional del servicio que falte por prestar.</p>
      <h2>Qué incluye y qué no</h2>
      <p>El servicio es de orientación e información basada en la experiencia de quien te atiende. No garantiza conseguir plaza ni un destino concreto y no sustituye a la información oficial del Ministerio de Defensa. La decisión sobre qué plazas pedir es siempre tuya.</p>
      <h2>Reclamaciones</h2>
      <p>Escríbenos a {email}. Si no quedas satisfecho con la respuesta, puedes acudir a los servicios de consumo de tu comunidad autónoma.</p>
      <h2>Ley aplicable</h2>
      <p>Estas condiciones se rigen por la legislación española.</p>''')

    escribir(SITIO / '404.html', pagina('Página no encontrada | Orientación Militar', 'Esta página no existe.', '/404.html', '''    <div class="aviso-404">
      <h1>Esta página no existe.</h1>
      <p>Puede que el enlace esté mal escrito o que la página se haya movido.</p>
      <a class="btn" href="/">Ir al inicio</a>
    </div>''', robots='noindex'))


# ---------------------------------------------------------------- Sitemap y robots

def construir_sitemap(posts):
    ultima = max([p['actualizado'] for p in posts], default=HOY).isoformat()
    urls = [(f'{URL}/', ultima), (f'{URL}/blog/', ultima)] + [(f'{URL}/blog/{p["slug"]}/', p['actualizado'].isoformat()) for p in posts]
    filas = ''.join(f'\n  <url>\n    <loc>{e(u)}</loc>\n    <lastmod>{d}</lastmod>\n  </url>' for u, d in urls)
    escribir(SITIO / 'sitemap.xml', f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{filas}\n</urlset>\n')
    escribir(SITIO / 'robots.txt', f'User-agent: *\nAllow: /\nDisallow: /panel/\nDisallow: /api/\n\nSitemap: {URL}/sitemap.xml\n')


if __name__ == '__main__':
    inyectar_config()
    posts = construir_blog()
    ajustar_portada(posts)
    construir_legal()
    construir_sitemap(posts)
    for a in avisos:
        print(f'Aviso: {a}')
    for err in errores:
        print(f'ERROR: {err}')
    print(f'{len(posts)} artículos publicados · {len(avisos)} avisos · {len(errores)} errores')
    sys.exit(1 if errores else 0)
