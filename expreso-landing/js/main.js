/* ═══════════════════════════════════════════════════════════════
   MÓDULO "MÁS POPULARES" — polling + reordenamiento con FLIP
   ───────────────────────────────────────────────────────────────
   Pega este bloque AL FINAL de tu js/main.js.
   Va aislado en su propio IIFE, no choca con el resto de main.js.

   Qué hace:
     · cada POLL ms pide la lista ordenada por lecturas/sesiones,
     · anima el cambio de posición (técnica FLIP),
     · muestra badge ▲/▼ del salto y flash en el contador,
     · marca "Nuevo" a las notas que entran a la lista,
     · se refresca al volver a la pestaña.

   ⭐ ÚNICO PUNTO A CAMBIAR PARA EL CMS: obtenerPopulares()
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* Demo: 8 s para ver el movimiento. Producción: 30000 (30 s). */
  var POLL = 8000;

  var list = document.getElementById('popList');
  if (!list) return; /* la página no tiene el bloque → no hace nada */

  /* Inserta un pequeño indicador "Act. HH:MM" en el encabezado */
  var status = null;
  var card = list.closest('.card');
  var head = card ? card.querySelector('.card-h') : null;
  if (head) {
    status = document.createElement('span');
    status.className = 'pop-status';
    head.appendChild(status);
  }

  var prevIds = [];

  /* ══════════════════════════════════════════════════════════════
     FUENTE DE DATOS  ← AQUÍ conectas el CMS (SacsPro)
     ──────────────────────────────────────────────────────────────
     Debe resolver un arreglo ordenado de MÁS a MENOS leído, así:
       { id, titulo, slug, img, seccion, pv }
        · id  → identificador único (para seguir la nota entre updates)
        · pv  → lecturas / sesiones (el número que define el orden)
     ══════════════════════════════════════════════════════════════ */

  /* --- SIMULACIÓN: 3 estados que rotan para demostrar el reorden --- */
  var MOCK = [
    [{ id: 1, titulo: 'Durazo presenta Plan Maestro de Desarrollo Urbano Hermosillo 2026', slug: '/noticias/hermosillo/plan-maestro', img: 'https://picsum.photos/seed/pop1/80/80', seccion: 'Hermosillo', pv: 12400 },
     { id: 2, titulo: 'Paciente sufre daños renales tras tratamiento con células madre', slug: '/noticias/sonora/celulas-madre', img: 'https://picsum.photos/seed/pop2/80/80', seccion: 'Sonora', pv: 9870 },
     { id: 3, titulo: 'SSP Sonora refuerza operativos nocturnos en zonas de riesgo', slug: '/noticias/seguridad/ssp', img: 'https://picsum.photos/seed/pop3/80/80', seccion: 'Seguridad', pv: 7210 },
     { id: 4, titulo: 'Naranjeros rompe récord de asistencia en la LMP 2026', slug: '/accion/beisbol/naranjeros', img: 'https://picsum.photos/seed/pop4/80/80', seccion: 'Béisbol', pv: 6550 },
     { id: 5, titulo: 'Washington aranceles a Asia; México analiza respuesta', slug: '/noticias/mundo/aranceles', img: 'https://picsum.photos/seed/pop5/80/80', seccion: 'Mundo', pv: 4320 }],

    [{ id: 2, titulo: 'Paciente sufre daños renales tras tratamiento con células madre', slug: '/noticias/sonora/celulas-madre', img: 'https://picsum.photos/seed/pop2/80/80', seccion: 'Sonora', pv: 11240 },
     { id: 1, titulo: 'Durazo presenta Plan Maestro de Desarrollo Urbano Hermosillo 2026', slug: '/noticias/hermosillo/plan-maestro', img: 'https://picsum.photos/seed/pop1/80/80', seccion: 'Hermosillo', pv: 12650 },
     { id: 3, titulo: 'SSP Sonora refuerza operativos nocturnos en zonas de riesgo', slug: '/noticias/seguridad/ssp', img: 'https://picsum.photos/seed/pop3/80/80', seccion: 'Seguridad', pv: 7890 },
     { id: 5, titulo: 'Washington aranceles a Asia; México analiza respuesta', slug: '/noticias/mundo/aranceles', img: 'https://picsum.photos/seed/pop5/80/80', seccion: 'Mundo', pv: 6100 },
     { id: 4, titulo: 'Naranjeros rompe récord de asistencia en la LMP 2026', slug: '/accion/beisbol/naranjeros', img: 'https://picsum.photos/seed/pop4/80/80', seccion: 'Béisbol', pv: 5980 }],

    [{ id: 1, titulo: 'Durazo presenta Plan Maestro de Desarrollo Urbano Hermosillo 2026', slug: '/noticias/hermosillo/plan-maestro', img: 'https://picsum.photos/seed/pop1/80/80', seccion: 'Hermosillo', pv: 13100 },
     { id: 6, titulo: 'Temperatura récord de 47°C en Hermosillo este miércoles', slug: '/noticias/sonora/temperatura-record', img: 'https://picsum.photos/seed/pop6/80/80', seccion: 'Sonora', pv: 9450 },
     { id: 2, titulo: 'Paciente sufre daños renales tras tratamiento con células madre', slug: '/noticias/sonora/celulas-madre', img: 'https://picsum.photos/seed/pop2/80/80', seccion: 'Sonora', pv: 9200 },
     { id: 3, titulo: 'SSP Sonora refuerza operativos nocturnos en zonas de riesgo', slug: '/noticias/seguridad/ssp', img: 'https://picsum.photos/seed/pop3/80/80', seccion: 'Seguridad', pv: 8100 },
     { id: 5, titulo: 'Washington aranceles a Asia; México analiza respuesta', slug: '/noticias/mundo/aranceles', img: 'https://picsum.photos/seed/pop5/80/80', seccion: 'Mundo', pv: 6800 }]
  ];
  var tick = 0;

  function obtenerPopulares() {
    /* ─── PRODUCCIÓN (CMS SacsPro): descomenta y ajusta la URL ───
    return fetch('/api/mas-populares?limit=5', { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();   // [{ id, titulo, slug, img, seccion, pv }, ...]
      });
    ────────────────────────────────────────────────────────────── */

    /* ─── SIMULACIÓN ─── */
    var data = MOCK[tick % MOCK.length];
    tick++;
    return Promise.resolve(data);
  }

  /* ══════════════════════════════════════════════════════════════
     De aquí para abajo NO necesitas tocar nada al conectar el CMS.
     ══════════════════════════════════════════════════════════════ */

  function fmt(n) { return n >= 1000 ? (n / 1000).toFixed(1) + 'k' : n.toLocaleString('es-MX'); }
  function now() { var d = new Date(); return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0'); }

  function rankBadge(delta, esNueva) {
    if (esNueva) return '<span class="rank-badge rank-new">Nuevo</span>';
    if (!delta) return '';
    return delta > 0
      ? '<span class="rank-badge rank-up-b">▲' + delta + '</span>'
      : '<span class="rank-badge rank-dn-b">▼' + Math.abs(delta) + '</span>';
  }

  /* Crea un .pop-item con el MISMO marcado que tu index */
  function createItem(item, idx, delta, esNueva) {
    var el = document.createElement('div');
    el.className = 'pop-item';
    el.dataset.id = item.id;
    var muted = idx >= 3 ? ' muted' : '';
    el.innerHTML =
      '<span class="pop-num' + muted + '">' + (idx + 1) + '</span>' +
      '<img class="pop-thumb" src="' + item.img + '" alt="" loading="lazy" decoding="async">' +
      '<div class="pop-body">' +
        '<div class="pop-title"><a href="' + item.slug + '" style="color:inherit;text-decoration:none">' + item.titulo + '</a></div>' +
        '<div class="pop-meta">' + item.seccion + ' · ' +
          '<span class="pv-num" data-id="' + item.id + '" data-val="' + item.pv + '">' + fmt(item.pv) + ' lecturas</span> ' +
          '<span class="rank-ind">' + rankBadge(delta, esNueva) + '</span>' +
        '</div>' +
      '</div>';
    return el;
  }

  /* Flash verde/rojo cuando cambia el contador */
  function flashCtr(item) {
    var el = list.querySelector('.pv-num[data-id="' + item.id + '"]');
    if (!el) return;
    var prev = parseInt(el.dataset.val || 0, 10);
    if (item.pv === prev) return;
    el.classList.remove('pv-up', 'pv-down'); void el.offsetWidth;
    el.classList.add(item.pv > prev ? 'pv-up' : 'pv-down');
    el.textContent = fmt(item.pv) + ' lecturas';
    el.dataset.val = item.pv;
    setTimeout(function () { el.classList.remove('pv-up', 'pv-down'); }, 1400);
  }

  /* Actualiza número + badge de una fila existente */
  function updateBadge(el, newIdx, oldIdx) {
    var n = el.querySelector('.pop-num');
    if (n) { n.textContent = newIdx + 1; n.className = 'pop-num' + (newIdx >= 3 ? ' muted' : ''); }
    var ind = el.querySelector('.rank-ind');
    if (!ind) return;
    var delta = oldIdx - newIdx;                 /* subió = positivo */
    if (delta === 0) { ind.innerHTML = ''; return; }
    ind.innerHTML = rankBadge(delta, false);
    setTimeout(function () {
      var bd = ind.querySelector('.rank-badge');
      if (bd) { bd.style.opacity = '0'; bd.style.transition = 'opacity .6s ease'; }
      setTimeout(function () { ind.innerHTML = ''; }, 650);
    }, 4000);
  }

  /* Primer render (reemplaza el marcado estático del index) */
  function firstRender(data) {
    list.innerHTML = '';
    data.forEach(function (item, idx) { list.appendChild(createItem(item, idx, 0, false)); });
  }

  /* Actualización con animación FLIP (First, Last, Invert, Play) */
  function flipUpdate(data) {
    var items = [].slice.call(list.querySelectorAll('.pop-item[data-id]'));
    var prevRankMap = new Map(items.map(function (el, i) { return [el.dataset.id, i]; }));

    var firstPos = new Map();                     /* FIRST: posiciones actuales */
    items.forEach(function (el) { firstPos.set(el.dataset.id, el.getBoundingClientRect().top); });

    var existingIds = new Set(items.map(function (el) { return el.dataset.id; }));
    var newIds = new Set(data.map(function (d) { return String(d.id); }));

    /* Altas: notas que entran */
    data.forEach(function (item, idx) {
      if (!existingIds.has(String(item.id))) {
        var el = createItem(item, idx, null, true);
        el.style.opacity = '0';
        list.appendChild(el);
        firstPos.set(String(item.id), el.getBoundingClientRect().top);
        setTimeout(function () {
          var b = el.querySelector('.rank-badge');
          if (b) { b.style.opacity = '0'; b.style.transition = 'opacity .6s ease'; }
          setTimeout(function () { var ind = el.querySelector('.rank-ind'); if (ind) ind.innerHTML = ''; }, 650);
        }, 5000);
      }
    });

    /* Bajas: notas que salen */
    items.forEach(function (el) {
      if (!newIds.has(el.dataset.id)) {
        el.style.transition = 'opacity .25s ease, transform .25s ease';
        el.style.transform = 'translateX(20px)';
        el.style.opacity = '0';
        setTimeout(function () { el.remove(); }, 260);
      }
    });

    /* Reordena el DOM + actualiza badges/contadores */
    data.forEach(function (item, newIdx) {
      var el = list.querySelector('.pop-item[data-id="' + item.id + '"]');
      if (!el) return;
      var oldIdx = prevRankMap.has(String(item.id)) ? prevRankMap.get(String(item.id)) : newIdx;
      list.appendChild(el);                       /* LAST: nuevo orden en el DOM */
      updateBadge(el, newIdx, oldIdx);
      flashCtr(item);
    });

    /* INVERT + PLAY: anima de la posición vieja a la nueva */
    data.forEach(function (item) {
      var el = list.querySelector('.pop-item[data-id="' + item.id + '"]');
      if (!el) return;
      var first = firstPos.get(String(item.id));
      var last = el.getBoundingClientRect().top;
      var delta = first - last;
      if (Math.abs(delta) < 2) {
        if (el.style.opacity === '0') { el.style.transition = 'opacity .3s ease'; el.style.opacity = '1'; }
        return;
      }
      el.style.transition = 'none';
      el.style.transform = 'translateY(' + delta + 'px)';
      el.style.opacity = el.style.opacity === '0' ? '0' : '1';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          el.style.transition = 'transform .42s cubic-bezier(.25,.46,.45,.94), opacity .35s ease';
          el.style.transform = 'translateY(0)';
          el.style.opacity = '1';
        });
      });
    });
  }

  /* Ciclo principal */
  function actualizar() {
    Promise.resolve(obtenerPopulares())
      .then(function (data) {
        if (!data || !data.length) return;
        var newIds = data.map(function (d) { return String(d.id); });
        var cambio = JSON.stringify(prevIds) !== JSON.stringify(newIds);

        if (prevIds.length === 0) firstRender(data);       /* primera vez */
        else if (cambio) flipUpdate(data);                 /* cambió el orden */
        else data.forEach(flashCtr);                       /* mismo orden, suben lecturas */

        prevIds = newIds;
        if (status) status.innerHTML = '<span class="pop-pulse"></span>Act. ' + now();
      })
      .catch(function (err) {
        console.warn('[Más populares] No se pudo actualizar:', err.message);
        /* En error se conserva lo último mostrado. */
      });
  }

  actualizar();
  setInterval(actualizar, POLL);
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) actualizar();
  });

})();


/* ═══════════════════════════════════════════════════════════════
   MÓDULO "EXPRESO VIDEO" — últimos videos del canal (auto)
   ───────────────────────────────────────────────────────────────
   Pega este bloque AL FINAL de tu js/main.js (después del anterior).
   Aislado en su propio IIFE; arranca solo si existe #videoMain.

   Qué hace:
     · trae los últimos videos del canal de YouTube,
     · pinta destacado + playlist (4) + tira inferior (3),
     · reproduce en un modal (iframe lazy que se destruye al cerrar),
     · marca "Nuevo" a los subidos en las últimas 6 h,
     · se refresca cada 5 min y al volver a la pestaña.

   ⭐ ÚNICO PUNTO A CAMBIAR PARA EL CMS / API: obtenerVideos()
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var vmain = document.getElementById('videoMain');
  if (!vmain) return; /* la página no trae el bloque de video */

  var playlistEl = document.getElementById('videoPlaylist');
  var stripEl    = document.querySelector('.video-strip');
  var subEl      = document.querySelector('.video-sub');

  var CHANNEL_ID = 'UCPW06iTrMYvw8ITy3W63mig';
  var RSS_URL    = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + CHANNEL_ID;
  var INTERVAL   = 5 * 60 * 1000; /* 5 minutos */

  /* Proxies CORS en cascada: si uno falla, se prueba el siguiente */
  var PROXIES = [
    function (u) { return 'https://api.allorigins.win/raw?url=' + encodeURIComponent(u); },
    function (u) { return 'https://corsproxy.io/?' + encodeURIComponent(u); },
    function (u) { return 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(u); }
  ];

  /* Fallback: IDs reales verificados del canal (si el RSS no responde) */
  var FALLBACK = [
    { id: 'E910LIwsr5Q', title: 'Noticias Expreso 24/7 desde Hermosillo — En vivo', published: '2025-09-24T09:00:00Z' },
    { id: 'C3V0PG-Fksc', title: 'Asesinan a joven en Hermosillo · Bienestar entrega tarjetas', published: '2025-09-23T14:00:00Z' },
    { id: 'cxXEXFyoN6E', title: 'Inauguración Mercado Municipal de Hermosillo · 8 Sep', published: '2025-09-08T12:00:00Z' },
    { id: '40lYeUI-F1I', title: 'Tropicalísimo Apache en Expogan Hermosillo 2025 — Parte 5', published: '2025-08-31T20:00:00Z' },
    { id: 'BYFaEXJ-vME', title: 'Crisis de accidentes viales: Hermosillo en 2do lugar nacional', published: '2025-08-12T10:00:00Z' },
    { id: 'lfeJ5SlBUyQ', title: 'Claudia Pavlovich de Barcelona a Panamá · Noticias Hermosillo', published: '2025-08-06T14:00:00Z' },
    { id: '7UwzegXFAgg', title: 'Fiscalía Anticorrupción contra Alito Moreno · 31 jul 2025', published: '2025-07-31T14:00:00Z' }
  ];

  /* ── Helpers ─────────────────────────────────────────── */
  function thumb(id, q) { return 'https://img.youtube.com/vi/' + id + '/' + (q || 'hqdefault') + '.jpg'; }

  function timeAgo(iso) {
    if (!iso) return '@expresoweb';
    var s = (Date.now() - new Date(iso)) / 1000;
    if (s < 60) return 'Hace un momento';
    if (s < 3600) return 'Hace ' + Math.floor(s / 60) + ' min';
    if (s < 86400) return 'Hace ' + Math.floor(s / 3600) + ' h';
    if (s < 604800) return 'Hace ' + Math.floor(s / 86400) + ' días';
    return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function isNew(iso) { return iso && (Date.now() - new Date(iso)) < 6 * 3600000; }

  function calcBars(arr) {
    var mx = Math.max.apply(null, arr.map(function (v) { return v.views || 0; }).concat([1]));
    return arr.map(function (v) { return Math.max(Math.round(((v.views || 0) / mx) * 100), 10); });
  }

  function esc(t) { return String(t).replace(/"/g, '&quot;'); }

  /* ── Parseo del RSS ──────────────────────────────────── */
  function parseRSS(xmlText) {
    var doc = new DOMParser().parseFromString(xmlText, 'application/xml');
    if (doc.querySelector('parsererror')) throw new Error('XML inválido');

    var entries = [].slice.call(doc.querySelectorAll('entry'));
    if (!entries.length) throw new Error('Sin entradas en el RSS');

    var videos = [];
    entries.forEach(function (e) {
      var idTag = e.querySelector('videoId') || e.querySelector('id');
      var raw = idTag ? idTag.textContent : '';
      var videoId = (raw.match(/video:([^<]+)/) || [])[1] || raw.split(':').pop() || '';
      if (!videoId || videoId.length < 5) return;

      var ch = e.querySelector('channelId');
      if (ch && ch.textContent.trim() !== CHANNEL_ID) return; /* descarta otros canales */

      videos.push({
        id: videoId,
        title: (e.querySelector('title') ? e.querySelector('title').textContent.trim() : 'Sin título'),
        published: (e.querySelector('published') ? e.querySelector('published').textContent : ''),
        views: parseInt((e.querySelector('statistics') && e.querySelector('statistics').getAttribute('views')) || 0, 10),
        author: (e.querySelector('author name') ? e.querySelector('author name').textContent : '@expresoweb')
      });
    });

    if (!videos.length) throw new Error('Ningún video válido del canal');
    videos.sort(function (a, b) { return new Date(b.published) - new Date(a.published); });
    return videos.slice(0, 7);
  }

  /* ── Fetch con proxies en cascada ────────────────────── */
  function fetchWithProxies(i) {
    i = i || 0;
    if (i >= PROXIES.length) return Promise.reject(new Error('Todos los proxies fallaron'));
    return fetch(PROXIES[i](RSS_URL), { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function (text) {
        if (text.indexOf('<feed') !== -1 || text.indexOf('<?xml') !== -1) return text;
        try {
          var json = JSON.parse(text);
          var xml = json.contents || json.content || '';
          if (xml.indexOf('<feed') === -1) throw new Error('No es RSS');
          return xml;
        } catch (err) { return fetchWithProxies(i + 1); }
      })
      .catch(function () { return fetchWithProxies(i + 1); });
  }

  /* ══════════════════════════════════════════════════════════════
     FUENTE DE DATOS  ← AQUÍ cambias el origen si hace falta
     ──────────────────────────────────────────────────────────────
     Por defecto lee el RSS público del canal (sin API key). Si falla,
     el ciclo de abajo reintenta antes de recurrir al FALLBACK. Si el
     CMS o la YouTube Data API van a servir los videos, reemplaza el
     cuerpo por tu fetch. Debe resolver un arreglo con la forma:
     { id, title, published, views, author }.
     ══════════════════════════════════════════════════════════════ */
  function obtenerVideos() {
    /* ─── PRODUCCIÓN alterna (CMS o API): descomenta y ajusta ───
    return fetch('/api/videos?limit=7', { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
    ────────────────────────────────────────────────────────────── */

    /* Intenta el RSS y LANZA error si falla (no cae solo al fallback):
       así el ciclo puede reintentar por los videos actuales, igual v5. */
    return fetchWithProxies(0).then(parseRSS);
  }

  /* ══════════════════════════════════════════════════════════════
     De aquí para abajo NO necesitas tocar nada.
     ══════════════════════════════════════════════════════════════ */

  var loadedVids = [];
  var activeIdx = 0;

  /* Carga la mejor miniatura disponible sin pixelear.
     Cadenas por tamaño de slot:
       · 'grande' (destacado): maxres → sd → hq → mq
       · 'medio'  (tira):       sd → hq → mq
       · 'chico'  (playlist):   mq → hq → default
     maxresdefault y mqdefault son 16:9 reales; hq/sd son 4:3 (se
     recortan con object-fit:cover). Probamos cada calidad con una
     imagen suelta y, si YouTube devuelve el gris de 120px (esa
     resolución no existe), pasamos a la siguiente. Al fijar el src
     definitivo, la imagen ya está en caché: no hay doble descarga. */
  var CADENAS = {
    grande: ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault'],
    medio:  ['sddefault', 'hqdefault', 'mqdefault'],
    chico:  ['mqdefault', 'hqdefault', 'default']
  };
  function cargarThumb(img, id, slot) {
    if (!img) return;
    var chain = CADENAS[slot] || CADENAS.chico;
    var i = 0;
    (function next() {
      if (i >= chain.length) return;
      var q = chain[i++];
      var probe = new Image();
      probe.onload = function () {
        if (probe.naturalWidth <= 120 && q !== 'default') { next(); return; } /* gris = no existe */
        img.removeAttribute('data-ph');
        img.src = probe.src;
      };
      probe.onerror = next;
      probe.src = 'https://img.youtube.com/vi/' + id + '/' + q + '.jpg';
    })();
  }

  /* Destacado */
  function renderFeatured(idx) {
    var v = loadedVids[idx];
    if (!v) return;
    activeIdx = idx;

    cargarThumb(vmain.querySelector('img'), v.id, 'grande');
    var h = vmain.querySelector('.video-caption h3');
    if (h) h.textContent = v.title;
    var m = vmain.querySelector('.video-caption .meta');
    if (m) m.textContent = timeAgo(v.published) + ' · ' + (v.author || '@expresoweb');

    var bar = vmain.querySelector('.video-progress .bar');
    if (bar) {
      var b = calcBars(loadedVids);
      bar.style.width = '0';
      requestAnimationFrame(function () { bar.style.width = (b[idx] || 15) + '%'; });
    }

    if (playlistEl) {
      [].slice.call(playlistEl.querySelectorAll('.pl-item')).forEach(function (el, i) {
        el.classList.toggle('active', i === idx);
      });
    }
  }

  /* Playlist lateral (4) */
  function renderPlaylist() {
    if (!playlistEl) return;
    playlistEl.innerHTML = loadedVids.slice(0, 4).map(function (v, i) {
      return '<div class="pl-item' + (i === activeIdx ? ' active' : '') + '" data-idx="' + i + '" role="button" tabindex="0" aria-label="Ver: ' + esc(v.title) + '">' +
        '<img class="pl-thumb" data-vid="' + v.id + '" alt="" decoding="async" data-ph>' +
        '<div class="pl-info">' +
          '<div class="pl-num">' + String(i + 1).padStart(2, '0') + '</div>' +
          '<div class="pl-title">' + v.title + '</div>' +
          '<div class="pl-meta">' + timeAgo(v.published) + (isNew(v.published) ? ' · <span class="video-new">Nuevo</span>' : '') + '</div>' +
        '</div>' +
      '</div>';
    }).join('');
    [].slice.call(playlistEl.querySelectorAll('.pl-thumb[data-vid]')).forEach(function (im) {
      cargarThumb(im, im.dataset.vid, 'chico');
    });
  }

  /* Tira inferior (3) */
  function renderStrip() {
    if (!stripEl) return;
    var b = calcBars(loadedVids);
    stripEl.innerHTML = loadedVids.slice(4, 7).map(function (v, i) {
      var realIdx = i + 4;
      return '<div class="strip-card" data-idx="' + realIdx + '" role="button" tabindex="0" aria-label="Reproducir: ' + esc(v.title) + '">' +
        '<img class="strip-thumb" data-vid="' + v.id + '" alt="" decoding="async" data-ph>' +
        '<div class="strip-body">' +
          '<div class="strip-title">' + v.title + (isNew(v.published) ? ' <span class="video-new">Nuevo</span>' : '') + '</div>' +
          '<div class="strip-meta">' + timeAgo(v.published) + '</div>' +
          '<div class="strip-bar"><div class="fill" style="width:' + (b[realIdx] || 10) + '%"></div></div>' +
        '</div>' +
      '</div>';
    }).join('');
    [].slice.call(stripEl.querySelectorAll('.strip-thumb[data-vid]')).forEach(function (im) {
      cargarThumb(im, im.dataset.vid, 'medio');
    });
  }

  /* ── Modal reproductor (se crea una vez, iframe lazy) ── */
  var modal, frame, barFill, titleEl, opener;

  function ensureModal() {
    if (modal) return;
    modal = document.createElement('div');
    modal.className = 'vid-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Reproductor de video Expreso');
    modal.innerHTML =
      '<div class="vid-modal-dialog">' +
        '<div class="vid-modal-frame"></div>' +
        '<div class="vid-modal-bar"><div></div></div>' +
        '<div class="vid-modal-body">' +
          '<div><div class="vid-modal-cat">Expreso Noticias · @expresoweb</div>' +
          '<div class="vid-modal-title"></div></div>' +
          '<button class="vid-modal-close" aria-label="Cerrar reproductor">&#10005;</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    frame   = modal.querySelector('.vid-modal-frame');
    barFill = modal.querySelector('.vid-modal-bar > div');
    titleEl = modal.querySelector('.vid-modal-title');

    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    modal.querySelector('.vid-modal-close').addEventListener('click', closeModal);
  }

  function openModal(idx) {
    var v = loadedVids[idx];
    if (!v) return;
    ensureModal();
    opener = document.activeElement;

    frame.innerHTML =
      '<iframe src="https://www.youtube.com/embed/' + v.id + '?autoplay=1&rel=0&modestbranding=1" ' +
      'title="' + esc(v.title) + '" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" ' +
      'allowfullscreen loading="lazy"></iframe>';

    titleEl.textContent = v.title;
    barFill.style.width = '0';
    requestAnimationFrame(function () { barFill.style.width = '45%'; });

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { modal.querySelector('.vid-modal-close').focus(); }, 50);
  }

  function closeModal() {
    if (!modal) return;
    frame.innerHTML = ''; /* detiene el audio */
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (opener) opener.focus();
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) closeModal();
  });

  /* ── Interacciones ───────────────────────────────────── */
  vmain.addEventListener('click', function () { openModal(activeIdx); });
  vmain.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(activeIdx); }
  });
  if (!vmain.hasAttribute('tabindex')) vmain.setAttribute('tabindex', '0');
  vmain.setAttribute('role', 'button');

  if (playlistEl) {
    playlistEl.addEventListener('click', function (e) {
      var it = e.target.closest('.pl-item'); if (!it) return;
      renderFeatured(parseInt(it.dataset.idx, 10));
    });
    playlistEl.addEventListener('keydown', function (e) {
      var it = e.target.closest('.pl-item'); if (!it) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); renderFeatured(parseInt(it.dataset.idx, 10)); }
    });
  }
  if (stripEl) {
    stripEl.addEventListener('click', function (e) {
      var c = e.target.closest('.strip-card'); if (!c) return;
      openModal(parseInt(c.dataset.idx, 10));
    });
    stripEl.addEventListener('keydown', function (e) {
      var c = e.target.closest('.strip-card'); if (!c) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(parseInt(c.dataset.idx, 10)); }
    });
  }

  /* ── Ciclo principal: reintenta el RSS antes de usar el respaldo,
     igual que la operativa de tu v5 (evita mostrar videos viejos ante
     un tropiezo puntual del proxy). ── */
  var MAX_RETRY = 3;
  var retryCount = 0;
  var rssOk = false;

  function pintar(videos) {
    if (!videos || !videos.length) return;
    loadedVids = videos;
    renderPlaylist();
    renderStrip();
    renderFeatured(0);
    if (subEl) {
      var n = new Date();
      subEl.textContent = '@expresoweb · Act. ' +
        n.getHours().toString().padStart(2, '0') + ':' + n.getMinutes().toString().padStart(2, '0');
    }
  }

  function actualizar() {
    obtenerVideos().then(function (videos) {
      pintar(videos);            /* RSS OK → videos actuales del canal */
      rssOk = true;
      retryCount = 0;
    }).catch(function (err) {
      console.warn('[Expreso Video] RSS falló:', err.message);
      /* Para que el bloque nunca se vea vacío, pintamos el respaldo de
         inmediato la primera vez; si un reintento posterior trae el RSS,
         se reemplaza solo por los videos actuales. */
      if (!rssOk && !loadedVids.length) pintar(FALLBACK.slice());
      retryCount++;
      if (retryCount <= MAX_RETRY) {
        setTimeout(actualizar, 10000);   /* sigue insistiendo por los actuales */
      } else {
        retryCount = 0;
      }
    });
  }

  /* CWV: no cargamos el bloque hasta que esté por entrar al viewport.
     Menos JS y red al inicio → mejor LCP e INP. */
  function arrancar() {
    actualizar();
    setInterval(actualizar, INTERVAL);
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) actualizar();
    });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      if (entries[0].isIntersecting) { obs.disconnect(); arrancar(); }
    }, { rootMargin: '400px' });
    io.observe(vmain);
  } else {
    arrancar();
  }

})();


/* ═══════════════════════════════════════════════════════════════
   MÓDULO "REDES SOCIALES" — feed de Instagram (@expresomx)
   ───────────────────────────────────────────────────────────────
   Pega este bloque AL FINAL de tu js/main.js.
   Aislado en su IIFE; arranca solo si existe .social-grid.

   IMPORTANTE: el frontend NUNCA habla directo con Instagram ni
   lleva el token. Habla con tu backend PHP (instagram.php), que
   guarda el token, llama a la Graph API y cachea. Ver ese archivo.

   ⭐ ÚNICO PUNTO A CAMBIAR PARA PRODUCCIÓN: obtenerInstagram()
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var grid = document.querySelector('.social-grid');
  if (!grid || grid.hasAttribute('data-static-social')) return;

  var POLL = 5 * 60 * 1000; /* 5 min: la Graph API no da push en tiempo real */
  var LIMIT = 4;

  /* ══════════════════════════════════════════════════════════════
     FUENTE DE DATOS  ← AQUÍ conectas tu proxy PHP
     ──────────────────────────────────────────────────────────────
     Debe resolver un arreglo normalizado (lo que devuelve
     instagram.php): { id, tipo, img, permalink, caption, timestamp }
       · tipo → IMAGE | VIDEO | CAROUSEL_ALBUM
       · img  → media_url (o thumbnail_url si es VIDEO)
     ══════════════════════════════════════════════════════════════ */

  /* --- SIMULACIÓN mientras no esté el endpoint --- */
  var MOCK = [
    { id: '1', tipo: 'IMAGE',          img: 'https://picsum.photos/seed/ig1/400/400', permalink: 'https://instagram.com/expresomx', caption: 'Gobernador Durazo presenta el Plan Maestro de Desarrollo Urbano de Hermosillo 2026.', timestamp: new Date(Date.now() - 25 * 60000).toISOString() },
    { id: '2', tipo: 'CAROUSEL_ALBUM', img: 'https://picsum.photos/seed/ig2/400/400', permalink: 'https://instagram.com/expresomx', caption: 'Naranjeros de Hermosillo anuncia tres refuerzos para la temporada 2026-27 de la LMP. 🔶⚾', timestamp: new Date(Date.now() - 2 * 3600000).toISOString() },
    { id: '3', tipo: 'VIDEO',          img: 'https://picsum.photos/seed/ig3/400/400', permalink: 'https://instagram.com/expresomx', caption: 'SSP Sonora refuerza operativos nocturnos en zonas de riesgo de Hermosillo y Cajeme.', timestamp: new Date(Date.now() - 5 * 3600000).toISOString() },
    { id: '4', tipo: 'IMAGE',          img: 'https://picsum.photos/seed/ig4/400/400', permalink: 'https://instagram.com/expresomx', caption: 'Plan Sonora de Energías Sostenibles impulsa la industria automotriz y aeroespacial.', timestamp: new Date(Date.now() - 22 * 3600000).toISOString() }
  ];

  function obtenerInstagram() {
    /* ─── PRODUCCIÓN: descomenta y apunta a tu proxy PHP ───
    return fetch('/api/instagram.php?limit=' + LIMIT, { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (j) { return j.posts || []; });
    ──────────────────────────────────────────────────────── */

    return Promise.resolve(MOCK);
  }

  /* ══════════════════════════════════════════════════════════════
     De aquí para abajo NO necesitas tocar nada.
     ══════════════════════════════════════════════════════════════ */

  function timeAgo(iso) {
    if (!iso) return '@expresomx';
    var s = (Date.now() - new Date(iso)) / 1000;
    if (s < 60) return 'Hace un momento';
    if (s < 3600) return 'Hace ' + Math.floor(s / 60) + ' min';
    if (s < 86400) return 'Hace ' + Math.floor(s / 3600) + ' h';
    if (s < 604800) return 'Hace ' + Math.floor(s / 86400) + ' días';
    return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
  }

  /* Escapa el texto del caption (viene del usuario) */
  function esc(t) {
    return String(t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function badge(tipo) {
    if (tipo === 'VIDEO') return '<span class="ig-badge">&#9654;</span>';
    if (tipo === 'CAROUSEL_ALBUM') return '<span class="ig-badge">&#9635;</span>';
    return '';
  }

  function render(posts) {
    grid.innerHTML = posts.slice(0, LIMIT).map(function (p) {
      var cap = (p.caption || '').replace(/\s+/g, ' ').trim();
      if (cap.length > 90) cap = cap.slice(0, 90).trim() + '…';
      return '<a class="social-card ig-post" href="' + p.permalink + '" target="_blank" rel="noopener noreferrer" aria-label="Ver publicación de Expreso en Instagram">' +
        '<span class="ig-thumb">' +
          '<img class="ig-img" src="' + p.img + '" alt="" loading="lazy" decoding="async">' +
          badge(p.tipo) +
        '</span>' +
        '<span class="ig-body">' +
          '<span class="ig-head"><span class="ig-ico"></span> @expresomx</span>' +
          (cap ? '<span class="ig-caption">' + esc(cap) + '</span>' : '') +
          '<span class="ig-meta">' + timeAgo(p.timestamp) + '</span>' +
        '</span>' +
      '</a>';
    }).join('');
  }

  function actualizar() {
    Promise.resolve(obtenerInstagram())
      .then(function (posts) {
        if (posts && posts.length) render(posts);
      })
      .catch(function (err) {
        console.warn('[Instagram] No se pudo actualizar:', err.message);
        /* En error se conserva lo último mostrado. */
      });
  }

  /* CWV: diferimos la carga hasta que el bloque esté por entrar al viewport. */
  function arrancar() {
    actualizar();
    setInterval(actualizar, POLL);
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) actualizar();
    });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      if (entries[0].isIntersecting) { obs.disconnect(); arrancar(); }
    }, { rootMargin: '400px' });
    io.observe(grid);
  } else {
    arrancar();
  }

})();


/* ═══════════════════════════════════════════════════════════════
   SIDEBAR GLOBAL · MISMA COLUMNA DERECHA DEL INDEX
   2026-08-15
   ----------------------------------------------------------------
   Unifica cualquier columna derecha interna que todavía conserve
   módulos antiguos. No toca el index y tampoco vuelve a construir
   una columna que ya tenga Mercado + Galería del día.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  if (document.body.classList.contains('home-page')) return;

  var sidebars = document.querySelectorAll(
    'aside.art-side, aside.section-sidebar, aside.mx-sidebar, aside.col-right'
  );

  if (!sidebars.length) return;

  function sidebarHTML() {
    return [
      '<div class="weather" data-expreso-weather>',
        '<div class="weather-hd">',
          '<div class="weather-city">📍 HERMOSILLO, SONORA</div>',
          '<div class="weather-main">',
            '<div class="weather-temp" id="weatherCardTemp" aria-live="polite">--°</div>',
            '<div class="weather-info">',
              '<div class="weather-desc">',
                '<img id="weatherCardIcon" class="weather-current-icon" src="" alt="" width="32" height="32" hidden>',
                '<span id="weatherCardDescription">Clima actual</span>',
              '</div>',
            '</div>',
          '</div>',
          '<div class="weather-days" id="weatherForecast" hidden></div>',
        '</div>',
        '<a href="/newsmedia/expreso-landing/clima.html" class="weather-cta">Revisar UV, calidad del aire y más →</a>',
      '</div>',

      '<div class="mock-ad mock-ad--rectangle" aria-label="Publicidad simulada">',
        '<img src="assets/ads-mock/mock-rectangle-300x250.svg" alt="Espacio publicitario simulado 300 por 250" loading="lazy" decoding="async">',
      '</div>',

      '<section class="card card-pad" id="cardMercado">',
        '<h2 class="card-h">Mercado</h2>',
        '<ul class="market">',
          '<li><span class="sym">USD/MXN</span><span class="val">$17.32</span><span class="chg down">Apertura</span></li>',
          '<li><span class="sym">Magna HMO</span><span class="val">$23.96</span><span class="chg up">por litro</span></li>',
          '<li><span class="sym">Premium HMO</span><span class="val">$29.14</span><span class="chg up">por litro</span></li>',
          '<li><span class="sym">Diésel HMO</span><span class="val">$26.94</span><span class="chg down">por litro</span></li>',
          '<li><span class="sym">Beca Rita Cetina</span><span class="val">$2,500</span><span class="chg up">pago anual</span></li>',
        '</ul>',
      '</section>',

      '<section class="card card-pad" id="pollCard">',
        '<h2 class="card-h">Pregunta del día</h2>',
        '<p class="poll-q">¿Alguna vez le han intentado robar su vehículo?</p>',
        '<div class="poll-opts">',
          '<button class="poll-opt" data-val="si"><span class="poll-radio"></span><span class="poll-lbl">Sí</span></button>',
          '<button class="poll-opt" data-val="no"><span class="poll-radio"></span><span class="poll-lbl">No</span></button>',
        '</div>',
        '<div class="poll-result" id="pollResult">',
          '<div class="poll-bar-row"><span class="poll-bar-lbl">Sí</span><span class="poll-bar"><span class="poll-bar-fill" data-opt="si"></span></span><span class="poll-bar-pct" data-pct="si">0%</span></div>',
          '<div class="poll-bar-row"><span class="poll-bar-lbl">No</span><span class="poll-bar"><span class="poll-bar-fill" data-opt="no"></span></span><span class="poll-bar-pct" data-pct="no">0%</span></div>',
          '<div class="poll-total" id="pollTotal"></div>',
        '</div>',
      '</section>',

      '<section class="card card-pad" id="cardEdimp">',
        '<h2 class="card-h">Edición Impresa</h2>',
        '<a href="https://impreso.expreso.com.mx/" class="edimp-cover">',
          '<img src="assets/real/edicion-impresa.png" alt="Portada de la edición impresa de Expreso" loading="lazy" decoding="async">',
          '<span class="edimp-cap">Consulta la portada y las noticias de la edición impresa de hoy</span>',
        '</a>',
        '<a href="https://impreso.expreso.com.mx/" class="card-more" style="margin:0 -16px -16px">Leer edición de hoy →</a>',
      '</section>',

      '<section class="card" id="cardGaleria">',
        '<div style="padding:16px 16px 8px"><h2 class="card-h" style="margin:0">Galería del día</h2></div>',
        '<div class="gallery-grid" aria-label="Avance de la galería del día">',
          '<a class="gal-item" href="multimedia-galerias.html" aria-label="Ver galerías de EXPRESO"><img src="assets/real/uniformes-escolares.png" alt="Entrega de uniformes escolares en Hermosillo" loading="lazy" decoding="async"></a>',
          '<a class="gal-item" href="multimedia-galerias.html" aria-label="Ver galerías de EXPRESO"><img src="https://blob.expreso.com.mx/images/2026/08/03/mariachi-vargas-llegara-a-hermosillo-en-noviembre-09b1e2bd-focus-0-0-750-421.webp" alt="Mariachi Vargas llegará a Hermosillo" loading="lazy" decoding="async"></a>',
          '<a class="gal-item" href="multimedia-galerias.html" aria-label="Ver galerías de EXPRESO"><img src="https://blob.expreso.com.mx/images/2026/08/02/karim-lopez-recibe-consejos-de-tracy-mcgrady-0b6ff5a6-focus-0-0-750-421.webp" alt="Karim López recibe consejos de Tracy McGrady" loading="lazy" decoding="async"></a>',
          '<a class="gal-item" href="multimedia-galerias.html" aria-label="Ver galerías de EXPRESO"><img src="https://blob.expreso.com.mx/images/2026/07/16/cesar-lozano-llegara-a-hermosillo-con-felizmente-imperfectos-5da9323c-focus-0-0-750-421.webp" alt="César Lozano presentará FelizMente Imperfectos" loading="lazy" decoding="async"></a>',
        '</div>',
        '<a href="multimedia-galerias.html" class="card-more">Ver más galerías →</a>',
      '</section>'
    ].join('');
  }

  var normalized = false;

  [].forEach.call(sidebars, function (sidebar) {
    /*
     * Si la columna ya corresponde a la versión nueva del index,
     * la dejamos intacta. Esto evita duplicar IDs o alterar páginas
     * de sección que ya fueron actualizadas.
     */
    if (
      sidebar.querySelector('#cardMercado') &&
      sidebar.querySelector('#pollCard') &&
      sidebar.querySelector('#cardEdimp') &&
      sidebar.querySelector('#cardGaleria')
    ) return;

    if (normalized) {
      /*
       * Solo puede existir una columna editorial principal por vista.
       * Evita IDs duplicados si una plantilla incluyera un segundo aside
       * técnico con alguna de las clases anteriores.
       */
      return;
    }

    sidebar.innerHTML = sidebarHTML();
    sidebar.classList.add('sidebar-index-standard');
    normalized = true;
  });
})();

/* ═══════════════════════════════════════════════════════════════
   PUENTE DEL CLIMA ACTUAL DE EXPRESO AL NUEVO TEMPLATE
   ═══════════════════════════════════════════════════════════════ */

/**
 * Extrae un valor numérico de textos como:
 * "41.9 °C", "41,9 °C" o "42 grados".
 *
 * @param {string} value
 * @returns {number|null}
 */
function parseWeatherTemperature(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const normalizedValue = value
    .replace(',', '.')
    .trim();

  const match = normalizedValue.match(/-?\d+(?:\.\d+)?/);

  if (!match) {
    return null;
  }

  const temperature = Number(match[0]);

  return Number.isFinite(temperature)
    ? temperature
    : null;
}

/**
 * Copia la información del fragmento actual de EXPRESO
 * hacia la tarjeta del nuevo diseño.
 */
function syncExpresoWeatherCard() {
  const sourceTemperature =
    document.getElementById('gradosclima');

  const sourceIcon =
    document.getElementById('imgclima');

  const cardTemperature =
    document.getElementById('weatherCardTemp');

  const cardIcon =
    document.getElementById('weatherCardIcon');

  if (
    !sourceTemperature ||
    !sourceIcon ||
    !cardTemperature ||
    !cardIcon
  ) {
    return;
  }

  const temperature = parseWeatherTemperature(
    sourceTemperature.textContent
  );

  if (temperature !== null) {
    /*
     * El diseño muestra la temperatura sin decimales.
     * El dato original permanece intacto en #gradosclima.
     */
    cardTemperature.textContent =
      `${Math.round(temperature)}°`;
  }

  const iconUrl =
    sourceIcon.currentSrc ||
    sourceIcon.getAttribute('src');

  if (iconUrl) {
    cardIcon.src = iconUrl;
    cardIcon.alt =
      sourceIcon.alt || 'Condición meteorológica actual';

    cardIcon.hidden = false;
  } else {
    cardIcon.hidden = true;
  }
}

/**
 * Observa el fragmento generado por EXPRESO.
 *
 * Si el backend sustituye la temperatura, el icono o incluso
 * el contenido completo de #climaheader, la tarjeta se actualiza.
 */
function initExpresoWeatherCard() {
  const sourceContainer =
    document.getElementById('weather-source');

  const weatherCard =
    document.querySelector('[data-expreso-weather]');

  if (!sourceContainer || !weatherCard) {
    return;
  }

  syncExpresoWeatherCard();

  const observer = new MutationObserver(() => {
    syncExpresoWeatherCard();
  });

  observer.observe(sourceContainer, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: [
      'src',
      'alt'
    ]
  });

  weatherCard.dataset.weatherReady = 'true';
}

if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    initExpresoWeatherCard,
    { once: true }
  );
} else {
  initExpresoWeatherCard();
}



/* ═══════════════════════════════════════════════════════════════
   MÓDULOS DE INTERFAZ — slider, feed, newsletter, back-to-top, encuesta
   ───────────────────────────────────────────────────────────────
   Faltaban en main.js: por eso el slider del hero no respondía.
   Cada uno va en su propio IIFE y arranca solo si su marcado existe,
   así el mismo main.js sirve para el home y para la vista de noticia.
   ═══════════════════════════════════════════════════════════════ */

/* ── 1 · HERO SLIDER ──────────────────────────────────────────── */
(function () {
  'use strict';

  var hero = document.getElementById('hero');
  if (!hero) return;

  var slides = hero.querySelectorAll('.hero-slide');
  if (slides.length < 2) return;

  var dots  = hero.querySelectorAll('.hero-dot');
  var count = document.getElementById('heroCount');
  var prev  = document.getElementById('heroPrev');
  var next  = document.getElementById('heroNext');

  var cur = 0, timer = null;
  var AUTO = 5000;

  function ir(i) {
    slides[cur].classList.remove('on');
    if (dots[cur]) dots[cur].classList.remove('on');
    cur = (i + slides.length) % slides.length;
    slides[cur].classList.add('on');
    if (dots[cur]) dots[cur].classList.add('on');
    if (count) count.textContent = (cur + 1) + ' de ' + slides.length;
  }
  function play()  { stop(); timer = setInterval(function () { ir(cur + 1); }, AUTO); }
  function stop()  { if (timer) { clearInterval(timer); timer = null; } }
  function reinit(){ stop(); play(); }

  if (prev) prev.addEventListener('click', function () { ir(cur - 1); reinit(); });
  if (next) next.addEventListener('click', function () { ir(cur + 1); reinit(); });

  [].forEach.call(dots, function (d, i) {
    d.addEventListener('click', function () { ir(i); reinit(); });
  });

  /* Pausa al pasar el mouse (no roba la lectura) */
  hero.addEventListener('mouseenter', stop, { passive: true });
  hero.addEventListener('mouseleave', play, { passive: true });

  /* Swipe táctil */
  var x0 = null;
  hero.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) { ir(dx < 0 ? cur + 1 : cur - 1); reinit(); }
    x0 = null;
  }, { passive: true });

  /* Flechas del teclado cuando el hero tiene el foco dentro */
  hero.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  { ir(cur - 1); reinit(); }
    if (e.key === 'ArrowRight') { ir(cur + 1); reinit(); }
  });

  /* CWV: no gastamos CPU con la pestaña en segundo plano */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else play();
  });

  ir(0);
  play();
})();


/* ── 2 · FEED "Para ti": vista lista / tarjetas ───────────────── */
(function () {
  'use strict';

  var body  = document.getElementById('feedBody');
  var bList = document.getElementById('viewList');
  var bCard = document.getElementById('viewCards');
  if (!body || !bList || !bCard) return;

  function set(modoTarjetas) {
    body.classList.toggle('cards', modoTarjetas);
    bCard.classList.toggle('on', modoTarjetas);
    bList.classList.toggle('on', !modoTarjetas);
  }
  bList.addEventListener('click', function () { set(false); });
  bCard.addEventListener('click', function () { set(true); });
})();


/* ── 3 · NEWSLETTER ───────────────────────────────────────────── */
(function () {
  'use strict';

  /* El home usa nlInput/nlBtn y la nota usa nlE/nlB: soportamos ambos */
  var input = document.getElementById('nlInput') || document.getElementById('nlE');
  var btn   = document.getElementById('nlBtn')   || document.getElementById('nlB');
  if (!input || !btn) return;

  var textoOriginal = btn.textContent;

  btn.addEventListener('click', function () {
    var v = (input.value || '').trim();
    if (v && v.indexOf('@') > 0 && v.indexOf('.') > 0) {
      /* TODO: aquí va el POST real al CMS/servicio de newsletter */
      btn.textContent = '✔ ¡Suscrito!';
      input.value = '';
      setTimeout(function () { btn.textContent = textoOriginal; }, 3000);
    } else {
      input.focus();
      input.style.outline = '2px solid #c0392b';
      setTimeout(function () { input.style.outline = ''; }, 1500);
    }
  });
})();


/* ── 4 · BACK TO TOP ──────────────────────────────────────────── */
(function () {
  'use strict';

  var b = document.getElementById('btop');
  if (!b) return;

  window.addEventListener('scroll', function () {
    b.classList.toggle('show', window.scrollY > 300);
  }, { passive: true });

  b.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ── 5 · PREGUNTA DEL DÍA (demo sin backend) ──────────────────── */
(function () {
  'use strict';

  var card = document.getElementById('pollCard');
  if (!card) return;

  var opts   = card.querySelectorAll('.poll-opt');
  var result = document.getElementById('pollResult');
  var total  = document.getElementById('pollTotal');
  if (!opts.length || !result) return;

  var KEY    = 'expresoPollVehiculo';
  var counts = { si: 612, no: 384 };   /* ← en producción vendrá del CMS */

  function render(elegida) {
    var sum = counts.si + counts.no;
    ['si', 'no'].forEach(function (val) {
      var pct  = sum ? Math.round((counts[val] / sum) * 100) : 0;
      var fill = result.querySelector('.poll-bar-fill[data-opt="' + val + '"]');
      var lbl  = result.querySelector('.poll-bar-pct[data-pct="' + val + '"]');
      if (fill) fill.style.width = pct + '%';
      if (lbl)  lbl.textContent  = pct + '%';
    });
    [].forEach.call(opts, function (b) {
      b.classList.toggle('selected', b.dataset.val === elegida);
    });
    if (total) total.textContent = sum.toLocaleString('es-MX') + ' votos';
    result.classList.add('show');
  }

  var votada = sessionStorage.getItem(KEY);
  if (votada) render(votada);

  [].forEach.call(opts, function (btn) {
    btn.addEventListener('click', function () {
      if (sessionStorage.getItem(KEY)) return;
      var val = btn.dataset.val;
      if (!counts.hasOwnProperty(val)) return;
      counts[val]++;
      sessionStorage.setItem(KEY, val);
      render(val);
    });
  });
})();


/* ═══════════════════════════════════════════════════════════════
   MÓDULOS DE VISTAS DE CONTENIDO (nota / galería / video)
   Guardados: solo corren donde existe su elemento.
   ═══════════════════════════════════════════════════════════════ */

/* ── Barra de progreso de lectura (#pbar) ── */
(function () {
  'use strict';
  var bar = document.getElementById('pbar');
  if (!bar) return;
  window.addEventListener('scroll', function () {
    var h = document.documentElement;
    var p = Math.min(Math.round((scrollY / (h.scrollHeight - h.clientHeight)) * 100), 100);
    bar.style.width = p + '%';
    bar.setAttribute('aria-valuenow', p);
  }, { passive: true });
})();

/* ── Reveal al hacer scroll (.rv) ── */
(function () {
  'use strict';
  var els = document.querySelectorAll('.rv');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    [].forEach.call(els, function (el) { el.classList.add('on'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
    });
  }, { threshold: .1, rootMargin: '0px 0px -36px 0px' });
  [].forEach.call(els, function (el) { io.observe(el); });
})();

/* ── Comentarios (demo local, sin backend) (.art-comments) ── */
(function () {
  'use strict';
  var box = document.querySelector('.art-comments');
  if (!box) return;
  var btn = box.querySelector('button');
  var ta  = box.querySelector('textarea');
  if (!btn || !ta) return;
  btn.addEventListener('click', function () {
    if (!ta.value.trim()) { ta.focus(); return; }
    btn.textContent = '✔ Enviado';
    setTimeout(function () { ta.value = ''; btn.textContent = 'Publicar'; }, 1600);
  });
})();


/* ═══════════════════════════════════════════════════════════════
   LO MÁS RECIENTE · eliminar marca "Expreso" duplicada al final
   Conserva intacto el autor que aparece después del distintivo EX.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function limpiarMarcaDuplicada() {
    document.querySelectorAll('#feedBody .feed-m').forEach(function (meta) {
      meta.innerHTML = meta.innerHTML.replace(
        /\s*<span class="feed-sep">·<\/span>\s*Expreso\s*$/i,
        ''
      );
    });
  }

  limpiarMarcaDuplicada();

  document.addEventListener('expreso:rss-updated', limpiarMarcaDuplicada);
})();


/* ═══════════════════════════════════════════════════════════════
   LIGHTBOX GLOBAL DE GALERÍAS · 2026-08-15
   Abre fotografías sin navegación ni recarga de página.
   Funciona en galeria.html y en cualquier galería con botones
   .gal-item y un contenedor .content-lightbox.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var lightbox = document.querySelector('.content-lightbox');
  if (!lightbox) return;

  var image = lightbox.querySelector('img');
  var caption = lightbox.querySelector('.lb-caption');
  var closeBtn = lightbox.querySelector('.lb-close');
  var prevBtn = lightbox.querySelector('.lb-prev');
  var nextBtn = lightbox.querySelector('.lb-next');

  if (!image || !closeBtn || !prevBtn || !nextBtn) return;

  /*
   * Solo tratamos como lightbox los botones de galerías.
   * Los enlaces de la mini-galería del sidebar siguen navegando
   * normalmente hacia multimedia-galerias.html.
   */
  var items = Array.prototype.slice.call(
    document.querySelectorAll(
      '.gal-page button.gal-item, .gallery-grid button.gal-item, .gallery-full-set button.gal-item'
    )
  ).filter(function (item) {
    return !!item.querySelector('img');
  });

  if (!items.length) return;

  var currentIndex = 0;
  var lastFocused = null;
  var previousBodyOverflow = '';

  function itemData(index) {
    var item = items[index];
    var img = item.querySelector('img');
    var cap = item.querySelector('.gal-cap');
    return {
      src: img.currentSrc || img.src,
      alt: img.alt || '',
      caption: cap ? cap.textContent.trim() : (img.alt || '')
    };
  }

  function render(index) {
    if (!items.length) return;
    currentIndex = (index + items.length) % items.length;

    var data = itemData(currentIndex);
    image.src = data.src;
    image.alt = data.alt;
    if (caption) caption.textContent = data.caption;

    lightbox.setAttribute(
      'aria-label',
      'Fotografía ' + (currentIndex + 1) + ' de ' + items.length
    );
  }

  function openLightbox(index, trigger) {
    lastFocused = trigger || document.activeElement;
    previousBodyOverflow = document.body.style.overflow;

    render(index);
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    window.requestAnimationFrame(function () {
      closeBtn.focus({ preventScroll: true });
    });
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    image.removeAttribute('src');
    document.body.style.overflow = previousBodyOverflow;

    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus({ preventScroll: true });
    }
  }

  items.forEach(function (item, index) {
    item.setAttribute('aria-haspopup', 'dialog');
    item.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      openLightbox(index, item);
    });
  });

  closeBtn.addEventListener('click', function (event) {
    event.preventDefault();
    closeLightbox();
  });

  prevBtn.addEventListener('click', function (event) {
    event.preventDefault();
    render(currentIndex - 1);
  });

  nextBtn.addEventListener('click', function (event) {
    event.preventDefault();
    render(currentIndex + 1);
  });

  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (event) {
    if (lightbox.hidden) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeLightbox();
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      render(currentIndex - 1);
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      render(currentIndex + 1);
    }
  });

  /* Estado accesible inicial. */
  lightbox.setAttribute('aria-hidden', lightbox.hidden ? 'true' : 'false');
})();


/* MULTIMEDIA · ENLACES REALES EXPRESO · 2026-08-15 */
(function () {
  'use strict';
  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-expreso-url]');
    if (!trigger) return;
    var url = trigger.getAttribute('data-expreso-url');
    if (!url) return;
    event.preventDefault();
    window.location.href = url;
  });
})();


/* ═══════════════════════════════════════════════════════════════
   MULTIMEDIA VIDEO · LIGHTBOX NATIVO · 2026-08-15
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var modal = document.getElementById('videoLightbox');
  if (!modal) return;

  var frame = document.getElementById('videoLightboxFrame');
  var title = document.getElementById('videoLightboxTitle');
  var provider = document.getElementById('videoLightboxProvider');
  var lastTrigger = null;

  function openVideo(trigger) {
    var src = trigger.getAttribute('data-video-src');
    if (!src) return;

    lastTrigger = trigger;
    title.textContent = trigger.getAttribute('data-video-title') || 'Video';
    provider.textContent = trigger.getAttribute('data-video-provider') || 'EXPRESO';
    frame.src = src;

    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('video-lightbox-open');

    var close = modal.querySelector('.video-lightbox__close');
    if (close) close.focus({ preventScroll: true });
  }

  function closeVideo() {
    frame.src = '';
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('video-lightbox-open');
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  }

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-video-src]');
    if (trigger) {
      event.preventDefault();
      openVideo(trigger);
      return;
    }

    if (event.target.closest('[data-video-close]')) {
      event.preventDefault();
      closeVideo();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (modal.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeVideo();
    }
  });
})();

