/* Orientación Militar: código común de las páginas públicas.
   - Detecta de dónde viene la visita (código de colaborador, utm o web de origen) sin cookies ni almacenamiento.
   - Cuenta la visita en el panel.
   - Pinta el botón de WhatsApp y rellena los datos de contacto.
   La configuración se inyecta desde herramientas/config.json al ejecutar construir.py. */
(() => {
  'use strict';
  const CONFIG = /*CONFIG*/{"whatsapp": "34611738398", "whatsapp_visible": "+34 611 738 398", "whatsapp_mensaje": "Hola, tengo una duda sobre Orientación Militar: ", "email": "soporteorientacionmilitar@gmail.com", "precios": {"llamada": 79, "acompanamiento": 149}, "enlaces": {"llamada": "", "acompanamiento": ""}}/*FIN CONFIG*/;

  const MAPA_REFERERS = [
    [/(^|\.)google\./, 'google'], [/(^|\.)bing\.com$/, 'bing'], [/duckduckgo\.com$/, 'duckduckgo'],
    [/(^|\.)yahoo\./, 'yahoo'], [/ecosia\.org$/, 'ecosia'], [/(^|\.)instagram\.com$/, 'instagram'],
    [/(^|\.)tiktok\.com$/, 'tiktok'], [/(^|\.)youtube\.com$|(^|\.)youtu\.be$/, 'youtube'],
    [/(^|\.)facebook\.com$|(^|\.)fb\.com$/, 'facebook'], [/(^|\.)t\.co$|(^|\.)x\.com$|(^|\.)twitter\.com$/, 'x'],
    [/whatsapp\.(com|net)$/, 'whatsapp'], [/(^|\.)reddit\.com$/, 'reddit'], [/(^|\.)t\.me$|telegram\.org$/, 'telegram'],
    [/chatgpt\.com$|openai\.com$/, 'chatgpt'], [/perplexity\.ai$/, 'perplexity'], [/forocoches\.com$/, 'forocoches'],
  ];
  const limpiar = (s, max) => String(s || '').toLowerCase().replace(/[^a-z0-9:._-]/g, '').slice(0, max);

  function fuenteDeReferer(host) {
    for (const [re, nombre] of MAPA_REFERERS) if (re.test(host)) return nombre;
    return limpiar(host.replace(/^www\./, ''), 60) || 'directo';
  }

  const params = new URLSearchParams(location.search);
  const ref = (params.get('ref') || params.get('codigo') || '').trim().slice(0, 40);
  let fuente = limpiar(params.get('o'), 60);
  if (!fuente) {
    if (ref) fuente = 'ref:' + limpiar(ref, 40);
    else if (params.get('utm_source')) fuente = limpiar(params.get('utm_source'), 60);
    else if (document.referrer) {
      try {
        const h = new URL(document.referrer).hostname;
        if (h && h !== location.hostname) fuente = fuenteDeReferer(h);
      } catch (e) { /* referer no válido */ }
    }
  }
  if (!fuente) fuente = 'directo';
  const medio = (params.get('utm_medium') || '').slice(0, 60);
  const campana = (params.get('utm_campaign') || '').slice(0, 80);
  const dispositivo = (window.matchMedia('(max-width: 760px)').matches || /Mobi|Android/i.test(navigator.userAgent)) ? 'movil' : 'escritorio';

  // Mantiene el origen al pasar de una página a otra (sin guardar nada en el navegador).
  function propagarOrigen() {
    const extra = {};
    if (fuente !== 'directo') extra.o = fuente;
    if (ref) extra.ref = ref;
    if (!Object.keys(extra).length) return;
    document.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      let u;
      try { u = new URL(href, location.href); } catch (e) { return; }
      if (u.origin !== location.origin) return;
      if (/^\/(panel|api)(\/|$)/.test(u.pathname) || /\.(pdf|png|svg|xml|json|txt)$/i.test(u.pathname)) return;
      for (const [k, v] of Object.entries(extra)) if (!u.searchParams.has(k)) u.searchParams.set(k, v);
      a.setAttribute('href', u.pathname + u.search + u.hash);
    });
  }

  function evento(tipo, extra) {
    const cuerpo = JSON.stringify(Object.assign({ tipo, ruta: location.pathname, fuente, dispositivo }, extra || {}));
    try {
      if (navigator.sendBeacon && navigator.sendBeacon('/api/evento', new Blob([cuerpo], { type: 'application/json' }))) return;
    } catch (e) { /* sigue con fetch */ }
    fetch('/api/evento', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: cuerpo, keepalive: true }).catch(() => {});
  }

  const origen = () => ({ fuente, ref, medio, campana, pagina: location.pathname });

  function whatsappURL(texto) {
    if (!CONFIG.whatsapp) return '';
    return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto || CONFIG.whatsapp_mensaje || '')}`;
  }

  const ICONO_CHAT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2c-4.9 0-8.8 3.6-8.8 8.1 0 1.7.6 3.3 1.6 4.6L3.9 20.6l4.9-1.6c1 .4 2.1.6 3.2.6 4.9 0 8.8-3.6 8.8-8.2S16.9 3.2 12 3.2Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8.3 11.4h.01M12 11.4h.01M15.7 11.4h.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';

  function botonWhatsapp() {
    if (!CONFIG.whatsapp || document.body.hasAttribute('data-sin-whatsapp')) return;
    const estilo = document.createElement('style');
    estilo.textContent = `
      .wa-boton{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:35;display:inline-flex;align-items:center;gap:8px;min-height:48px;padding:10px 16px 10px 13px;border-radius:999px;background:var(--paper-2,#F3F4EE);color:var(--ink,#1C2318);border:1.5px solid var(--ink,#1C2318);box-shadow:0 6px 20px rgba(19,24,17,.18);font-family:var(--display,Arial,sans-serif);font-stretch:86%;font-weight:700;font-size:.98rem;text-decoration:none;transition:transform .15s,bottom .2s}
      .wa-boton:hover{transform:translateY(-2px)}
      .wa-boton svg{width:22px;height:22px;flex:none}
      .wa-boton.wa-arriba{bottom:calc(84px + env(safe-area-inset-bottom,0px))}
      @media (max-width:520px){.wa-boton{min-height:44px;padding:8px 13px 8px 11px;font-size:.92rem;gap:6px}.wa-boton svg{width:20px;height:20px}}
      @media (prefers-reduced-motion: reduce){.wa-boton{transition:none}}`;
    document.head.appendChild(estilo);
    const a = document.createElement('a');
    a.className = 'wa-boton';
    a.href = whatsappURL();
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', 'Escríbenos por WhatsApp');
    a.innerHTML = `${ICONO_CHAT}<span>WhatsApp</span>`;
    document.body.appendChild(a);
    const barra = document.getElementById('barra-movil');
    if (barra) {
      const ajustar = () => a.classList.toggle('wa-arriba', !barra.hidden && window.matchMedia('(max-width: 760px)').matches);
      new MutationObserver(ajustar).observe(barra, { attributes: true, attributeFilter: ['hidden'] });
      window.addEventListener('resize', ajustar);
      ajustar();
    }
  }

  function rellenarContacto(raiz) {
    (raiz || document).querySelectorAll('[data-wa]').forEach((el) => {
      const url = whatsappURL(el.getAttribute('data-wa') || '');
      if (!url) { el.hidden = true; return; }
      el.setAttribute('href', url);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
      el.hidden = false;
    });
    (raiz || document).querySelectorAll('[data-si-whatsapp]').forEach((el) => { el.hidden = !CONFIG.whatsapp; });
    (raiz || document).querySelectorAll('[data-dato]').forEach((el) => {
      const v = CONFIG[el.getAttribute('data-dato')];
      if (v) { el.textContent = v; el.hidden = false; } else el.hidden = true;
    });
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    if (/wa\.me\//.test(a.href)) evento('whatsapp');
    else if (/\.pdf($|\?)/.test(a.getAttribute('href') || '')) evento('checklist_pdf');
  });

  window.OM = { config: CONFIG, fuente, ref, origen, evento, whatsappURL, rellenarContacto };

  function iniciar() {
    rellenarContacto();
    propagarOrigen();
    botonWhatsapp();
    evento('visita');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
