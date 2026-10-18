#!/usr/bin/env python3
"""Descarga las métricas de Google Search Console y las guarda en herramientas/metricas/.

Lo ejecuta la GitHub Action «Métricas de Search Console» dos veces por semana.
Necesita la variable de entorno GSC_CREDENCIALES con el JSON de la cuenta de servicio
(la cuenta tiene que estar añadida como usuario en Search Console).

Genera:
  - herramientas/metricas/search-console.json  (datos completos)
  - herramientas/metricas/RESUMEN.md           (resumen legible para quien escribe el blog)
"""
import json
import os
import pathlib
import sys
from datetime import date, timedelta
from urllib.parse import quote

from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession

RAIZ = pathlib.Path(__file__).resolve().parent.parent
SALIDA = RAIZ / 'herramientas' / 'metricas'
CONFIG = json.loads((RAIZ / 'herramientas' / 'config.json').read_text('utf-8'))
DOMINIO = CONFIG['url'].split('://', 1)[1].rstrip('/')
PROPIEDADES = [f'sc-domain:{DOMINIO}', f'https://{DOMINIO}/']
DIAS = 90


def consultar(sesion, propiedad, inicio, fin, dimensiones, filas=1000):
    url = f'https://searchconsole.googleapis.com/webmasters/v3/sites/{quote(propiedad, safe="")}/searchAnalytics/query'
    r = sesion.post(url, json={'startDate': inicio, 'endDate': fin, 'dimensions': dimensiones,
                               'rowLimit': filas, 'type': 'web', 'dataState': 'all'})
    if r.status_code != 200:
        raise RuntimeError(f'{r.status_code}: {r.text[:300]}')
    salida = []
    for f in r.json().get('rows', []):
        fila = dict(zip(dimensiones, f.get('keys', [])))
        fila.update(clics=f['clicks'], impresiones=f['impressions'],
                    ctr=round(f['ctr'] * 100, 1), posicion=round(f['position'], 1))
        salida.append(fila)
    return salida


def main():
    credenciales = os.environ.get('GSC_CREDENCIALES', '').strip()
    if not credenciales:
        sys.exit('Falta la variable GSC_CREDENCIALES')
    cred = service_account.Credentials.from_service_account_info(
        json.loads(credenciales), scopes=['https://www.googleapis.com/auth/webmasters.readonly'])
    sesion = AuthorizedSession(cred)

    fin = date.today() - timedelta(days=2)
    inicio = fin - timedelta(days=DIAS - 1)
    ini_s, fin_s = inicio.isoformat(), fin.isoformat()

    propiedad, ultimo_error = None, None
    for p in PROPIEDADES:
        try:
            consultar(sesion, p, ini_s, fin_s, ['date'], 1)
            propiedad = p
            break
        except RuntimeError as err:
            ultimo_error = err
    if not propiedad:
        sys.exit(f'La cuenta de servicio no tiene acceso a {PROPIEDADES}: {ultimo_error}')

    consultas = consultar(sesion, propiedad, ini_s, fin_s, ['query'])
    paginas = consultar(sesion, propiedad, ini_s, fin_s, ['page'])
    consulta_pagina = consultar(sesion, propiedad, ini_s, fin_s, ['query', 'page'], 2000)
    dias = consultar(sesion, propiedad, ini_s, fin_s, ['date'], 500)

    datos = {'generado': date.today().isoformat(), 'propiedad': propiedad, 'desde': ini_s, 'hasta': fin_s,
             'totales': {'clics': sum(d['clics'] for d in dias), 'impresiones': sum(d['impresiones'] for d in dias)},
             'consultas': consultas, 'paginas': paginas, 'consulta_pagina': consulta_pagina, 'dias': dias}
    SALIDA.mkdir(parents=True, exist_ok=True)
    (SALIDA / 'search-console.json').write_text(json.dumps(datos, ensure_ascii=False, indent=1) + '\n', 'utf-8')
    (SALIDA / 'RESUMEN.md').write_text(resumen(datos), 'utf-8')
    print(f'{propiedad}: {len(consultas)} consultas, {len(paginas)} páginas ({ini_s} a {fin_s})')


def tabla(filas, columnas):
    cab = '| ' + ' | '.join(n for n, _ in columnas) + ' |\n|' + '---|' * len(columnas) + '\n'
    return cab + ''.join('| ' + ' | '.join(str(f[c]) for _, c in columnas) + ' |\n' for f in filas) if filas else '_Sin datos todavía._\n'


def resumen(d):
    corta = lambda u: u.split(DOMINIO, 1)[-1] or '/'
    paginas = sorted((dict(p, page=corta(p['page'])) for p in d['paginas']), key=lambda p: -p['impresiones'])
    por_impr = sorted(d['consultas'], key=lambda f: -f['impresiones'])
    # Consultas que ya enseñan la web pero lejos de arriba: candidatas a artículo propio o a reforzar uno.
    oportunidades = [f for f in por_impr if f['posicion'] > 10][:40]
    # Páginas cerca de la primera página o con CTR bajo: mejorar título, descripción o contenido.
    mejorar = sorted([p for p in paginas if 4 <= p['posicion'] <= 30], key=lambda p: -p['impresiones'])[:20]
    cp = sorted(d['consulta_pagina'], key=lambda f: -f['impresiones'])[:60]
    cp = [dict(f, page=corta(f['page'])) for f in cp]
    return f"""# Métricas de Search Console

Generado el {d['generado']} con datos del {d['desde']} al {d['hasta']} ({d['propiedad']}).
Totales: {d['totales']['clics']} clics y {d['totales']['impresiones']} impresiones.

Cómo usarlo: ver la sección «Usar las métricas» de herramientas/GUIA-BLOG.md.

## Consultas con más impresiones

{tabla(por_impr[:40], [('Consulta', 'query'), ('Impr.', 'impresiones'), ('Clics', 'clics'), ('CTR %', 'ctr'), ('Posición', 'posicion')])}
## Oportunidades: consultas donde salimos más allá de la posición 10

{tabla(oportunidades, [('Consulta', 'query'), ('Impr.', 'impresiones'), ('Posición', 'posicion')])}
## Páginas

{tabla(paginas, [('Página', 'page'), ('Impr.', 'impresiones'), ('Clics', 'clics'), ('CTR %', 'ctr'), ('Posición', 'posicion')])}
## Páginas que conviene reforzar (posición 4 a 30)

{tabla(mejorar, [('Página', 'page'), ('Impr.', 'impresiones'), ('CTR %', 'ctr'), ('Posición', 'posicion')])}
## Qué consulta lleva a qué página

{tabla(cp, [('Consulta', 'query'), ('Página', 'page'), ('Impr.', 'impresiones'), ('Posición', 'posicion')])}"""


if __name__ == '__main__':
    main()
