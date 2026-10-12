# Orientación Militar

Web, panel de clientes y blog de Orientación Militar. Rama de producción: `web`. La rama `main` guarda la web antigua (Next.js) y no se usa.

## Qué hay en cada carpeta

| Carpeta | Qué contiene |
|---|---|
| `sitio/` | La web publicada: portada, blog generado, panel (`/panel/`), páginas legales, PDF y recursos. |
| `netlify/functions/` | `api.mjs` (formularios, visitas y panel) y `compactar.mjs` (tarea de cada hora). |
| `netlify/lib/` | Almacenamiento en Netlify Blobs. |
| `contenido/blog/` | Los artículos del blog, uno por archivo. |
| `herramientas/` | `config.json` (datos que cambian), `construir.py`, `recursos.py`, guía y temas del blog, pruebas. |

## Cambiar datos (WhatsApp, precios, titular, dominio)

1. Edita `herramientas/config.json`.
2. Ejecuta `python3 herramientas/construir.py`.
3. Si cambias el dominio, ejecuta también `python3 herramientas/recursos.py` (regenera la checklist en PDF y la imagen para redes).
4. Haz commit y push a `web`. Netlify publica solo.

Para que los botones de reserva lleven directos a reservar y pagar (por ejemplo, un evento de pago de Cal.com o un enlace de pago de Stripe), pon esos enlaces en `enlaces` dentro de `config.json`. Si están vacíos, se abre el formulario de reserva y la solicitud llega al panel.

## Panel

- Dirección: `/panel/`.
- La contraseña inicial está en la variable de entorno `PANEL_PASSWORD_HASH` de Netlify y se cambia desde el propio panel, en Ajustes.
- `PANEL_SECRET` firma las sesiones. Si la cambias, se cierran todas.
- Los datos se guardan en Netlify Blobs (almacén `om`). Desde el panel puedes exportarlos en CSV.

## Blog

- Formato y reglas: `herramientas/GUIA-BLOG.md`.
- Temas pendientes: `herramientas/temas.md`.
- Una tarea programada escribe y publica un artículo cada martes siguiendo esa guía.

## Pruebas en local

```
npm install
npm run prueba        # pruebas de la API
npm run servidor      # web, panel y API en http://localhost:8888 (contraseña: prueba-panel-123)
```
