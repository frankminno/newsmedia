/* ══════════════════════════════════════════════════════════════
   EXPRESO — Landing JS
   Módulos: placeholders de imagen · hero slider · feed toggle ·
   encuesta · newsletter · back-to-top · playlist de video
   Todo autónomo, sin dependencias externas.
   ══════════════════════════════════════════════════════════════ */
'use strict';

/* ────────────────────────────────────────────────
   0 · PLACEHOLDERS DE IMAGEN
   Genera un SVG data-uri gris con el logo "e" tenue,
   para que la maqueta se vea completa sin recursos
   externos. En producción se sustituyen por <img src>
   reales del CMS (basta con quitar el atributo data-ph
   y poner el src correspondiente).
──────────────────────────────────────────────── */
(function(){
  function ph(w,h){
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'">'+
      '<rect width="100%" height="100%" fill="#e6e6e6"/>'+
      '<text x="50%" y="50%" font-family="Arial" font-size="'+Math.min(w,h)/2.4+'" '+
      'font-weight="900" fill="#cfcfcf" text-anchor="middle" dominant-baseline="central">e</text>'+
      '</svg>';
    return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
  }
  document.querySelectorAll('img[data-ph]').forEach(function(img){
    var w = img.clientWidth  || img.getAttribute('width')  || 100;
    var h = img.clientHeight || img.getAttribute('height') || 100;
    // usar proporción del contenedor si ya tiene tamaño renderizado
    if(img.clientWidth && img.clientHeight){ w = img.clientWidth; h = img.clientHeight; }
    img.src = ph(Math.round(w), Math.round(h));
  });
  document.querySelectorAll('img[data-ph-hero]').forEach(function(img){
    img.src = ph(628, 366);
  });
})();

/* ────────────────────────────────────────────────
   1 · HERO SLIDER (autoplay + flechas + dots + swipe)
──────────────────────────────────────────────── */
(function(){
  var hero  = document.getElementById('hero');
  if(!hero) return;
  var slides = hero.querySelectorAll('.hero-slide');
  var dots   = hero.querySelectorAll('.hero-dot');
  var count  = document.getElementById('heroCount');
  var prev   = document.getElementById('heroPrev');
  var next   = document.getElementById('heroNext');
  var cur = 0, timer;

  function go(i){
    slides[cur].classList.remove('on');
    if(dots[cur]) dots[cur].classList.remove('on');
    cur = (i + slides.length) % slides.length;
    slides[cur].classList.add('on');
    if(dots[cur]) dots[cur].classList.add('on');
    if(count) count.textContent = (cur+1)+' de '+slides.length;
  }
  function start(){ timer = setInterval(function(){ go(cur+1); }, 5000); }
  function reset(){ clearInterval(timer); start(); }

  if(prev) prev.addEventListener('click', function(){ go(cur-1); reset(); });
  if(next) next.addEventListener('click', function(){ go(cur+1); reset(); });
  dots.forEach(function(d,i){ d.addEventListener('click', function(){ go(i); reset(); }); });

  // Swipe táctil
  var x0 = null;
  hero.addEventListener('touchstart', function(e){ x0 = e.touches[0].clientX; }, {passive:true});
  hero.addEventListener('touchend', function(e){
    if(x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if(Math.abs(dx) > 40){ go(dx < 0 ? cur+1 : cur-1); reset(); }
    x0 = null;
  }, {passive:true});

  start();
})();

/* ────────────────────────────────────────────────
   2 · FEED "Para ti" — toggle lista / tarjetas
──────────────────────────────────────────────── */
(function(){
  var body  = document.getElementById('feedBody');
  var bList  = document.getElementById('viewList');
  var bCards = document.getElementById('viewCards');
  if(!body || !bList || !bCards) return;
  bList.addEventListener('click', function(){
    body.classList.remove('cards');
    bList.classList.add('on'); bCards.classList.remove('on');
  });
  bCards.addEventListener('click', function(){
    body.classList.add('cards');
    bCards.classList.add('on'); bList.classList.remove('on');
  });
})();

/* ────────────────────────────────────────────────
   3 · PREGUNTA DEL DÍA (encuesta)
──────────────────────────────────────────────── */
(function(){
  var card = document.getElementById('pollCard');
  if(!card) return;
  var opts   = card.querySelectorAll('.poll-opt');
  var result = document.getElementById('pollResult');
  var total  = document.getElementById('pollTotal');
  var counts = { si: 612, no: 384 };   // demo — vendría de API
  var KEY = 'expresoPoll';

  function render(){
    var sum = counts.si + counts.no;
    ['si','no'].forEach(function(k){
      var pct = sum ? Math.round((counts[k]/sum)*100) : 0;
      card.querySelector('.poll-bar-fill[data-opt="'+k+'"]').style.width = pct+'%';
      card.querySelector('.poll-bar-pct[data-pct="'+k+'"]').textContent = pct+'%';
    });
    total.textContent = sum.toLocaleString('es-MX')+' votos';
    result.classList.add('show');
  }

  var voted = sessionStorage.getItem(KEY);
  if(voted){
    var el = card.querySelector('.poll-opt[data-val="'+voted+'"]');
    if(el) el.classList.add('picked');
    render();
  }

  opts.forEach(function(btn){
    btn.addEventListener('click', function(){
      if(sessionStorage.getItem(KEY)) return;
      var v = btn.dataset.val;
      counts[v]++;
      sessionStorage.setItem(KEY, v);
      opts.forEach(function(o){ o.classList.remove('picked'); });
      btn.classList.add('picked');
      render();
    });
  });
})();

/* ────────────────────────────────────────────────
   4 · NEWSLETTER
──────────────────────────────────────────────── */
(function(){
  var btn = document.getElementById('nlBtn');
  var inp = document.getElementById('nlInput');
  if(!btn || !inp) return;
  btn.addEventListener('click', function(){
    if(inp.value && inp.value.indexOf('@') > 0){
      btn.textContent = '✔ ¡Suscrito!';
      btn.style.background = '#009641';
      inp.value = '';
      setTimeout(function(){ btn.textContent = 'Suscribirme gratis'; btn.style.background = ''; }, 3000);
    } else {
      inp.style.outline = '2px solid #c0392b';
      setTimeout(function(){ inp.style.outline = ''; }, 1500);
    }
  });
})();

/* ────────────────────────────────────────────────
   5 · VIDEO PLAYLIST — cambiar destacado al hacer clic
──────────────────────────────────────────────── */
(function(){
  var items = document.querySelectorAll('.pl-item');
  var mainTitle = document.querySelector('.video-caption h3');
  var mainMeta  = document.querySelector('.video-caption .meta');
  items.forEach(function(it){
    it.addEventListener('click', function(){
      items.forEach(function(i){ i.classList.remove('active'); });
      it.classList.add('active');
      var t = it.querySelector('.pl-title');
      var m = it.querySelector('.pl-meta');
      if(t && mainTitle) mainTitle.textContent = t.textContent;
      if(m && mainMeta)  mainMeta.textContent  = m.textContent + ' · @expresoweb';
    });
  });
})();

/* ────────────────────────────────────────────────
   6 · BACK TO TOP
──────────────────────────────────────────────── */
(function(){
  var b = document.getElementById('btop');
  if(!b) return;
  window.addEventListener('scroll', function(){
    b.classList.toggle('show', window.scrollY > 400);
  }, {passive:true});
  b.addEventListener('click', function(){
    window.scrollTo({top:0, behavior:'smooth'});
  });
})();

/* ────────────────────────────────────────────────
   7 · FECHA EN TÍTULO
──────────────────────────────────────────────── */
(function(){
  var dias  = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  var meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  var n = new Date();
  document.title = 'EXPRESO — '+dias[n.getDay()]+' '+n.getDate()+' de '+meses[n.getMonth()]+' de '+n.getFullYear();
})();
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
     Por defecto lee el RSS público del canal (sin API key) y, si
     falla, usa FALLBACK. Si el CMS o la YouTube Data API van a
     servir los videos, reemplaza el cuerpo por tu fetch. Debe
     resolver un arreglo: { id, title, published, views, author }.
     ══════════════════════════════════════════════════════════════ */
  function obtenerVideos() {
    /* ─── PRODUCCIÓN alterna (CMS o API): descomenta y ajusta ───
    return fetch('/api/videos?limit=7', { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
    ────────────────────────────────────────────────────────────── */

    return fetchWithProxies(0)
      .then(parseRSS)
      .catch(function (err) {
        console.warn('[Expreso Video] RSS no disponible, usando fallback:', err.message);
        return FALLBACK.slice();
      });
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

  /* ── Ciclo principal ─────────────────────────────────── */
  function actualizar() {
    obtenerVideos().then(function (videos) {
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
    }).catch(function (err) {
      console.warn('[Expreso Video] No se pudo actualizar:', err.message);
    });
  }

  actualizar();
  setInterval(actualizar, INTERVAL);
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) actualizar();
  });

})();