<?php
/* index.php — Home. El chrome (head, utility, header, navbar, ticker,
   footer, scripts) viene de partials/. Aquí solo va el contenido del home. */
$title      = 'EXPRESO — El periódico de Sonora';
$desc       = 'Noticias de Hermosillo, Sonora, México y el mundo. Cobertura al minuto.';
$canonical  = 'https://expreso.com.mx/';
$active     = 'inicio';
$vista      = 'home';
?>
<!DOCTYPE html>
<html lang="es">
<?php include __DIR__ . '/partials/head.php'; ?>
<body>

<?php
include __DIR__ . '/partials/utility-bar.php';
include __DIR__ . '/partials/header.php';
include __DIR__ . '/partials/navbar.php';
include __DIR__ . '/partials/ticker.php';
?>

<main class="main">
  <div class="wrap">
    <div class="grid3">

      <!-- ═══ COLUMNA IZQUIERDA ═══ -->
      <aside class="col-left">

        <!-- Más populares -->
        <section class="card card-pad" id="cardPopulares">
          <h2 class="card-h">Más populares</h2>
          <div class="pop" id="popList">
            <div class="pop-item"><span class="pop-num">1</span><img class="pop-thumb" src="" alt="" data-ph><div class="pop-body"><div class="pop-title">Durazo presenta Plan Maestro de Desarrollo Urbano Hermosillo 2026</div><div class="pop-meta">Hermosillo · 12.4k lecturas</div></div></div>
            <div class="pop-item"><span class="pop-num">2</span><img class="pop-thumb" src="" alt="" data-ph><div class="pop-body"><div class="pop-title">Paciente sufre daños renales tras tratamiento con células madre</div><div class="pop-meta">Sonora · 9.9k lecturas</div></div></div>
            <div class="pop-item"><span class="pop-num">3</span><img class="pop-thumb" src="" alt="" data-ph><div class="pop-body"><div class="pop-title">SSP Sonora refuerza operativos nocturnos en zonas de riesgo</div><div class="pop-meta">Seguridad · 7.2k lecturas</div></div></div>
            <div class="pop-item"><span class="pop-num muted">4</span><img class="pop-thumb" src="" alt="" data-ph><div class="pop-body"><div class="pop-title">Naranjeros rompe récord de asistencia en la LMP 2026</div><div class="pop-meta">Béisbol · 6.6k lecturas</div></div></div>
            <div class="pop-item"><span class="pop-num muted">5</span><img class="pop-thumb" src="" alt="" data-ph><div class="pop-body"><div class="pop-title">Washington aranceles a Asia; México analiza respuesta</div><div class="pop-meta">Mundo · 4.3k lecturas</div></div></div>
          </div>
          <a href="/noticias" class="card-more" style="margin:12px -16px -16px">Ver más en Expreso 100 →</a>
        </section>

        <!-- Newsletter -->
        <section class="newsletter">
          <h4>Expreso al Día</h4>
          <p>Las noticias más importantes de Sonora en tu correo cada mañana. Gratis.</p>
          <input type="email" id="nlInput" placeholder="tucorreo@ejemplo.com" aria-label="Correo electrónico">
          <button id="nlBtn">Suscribirme gratis</button>
        </section>

        <!-- Originales Expreso -->
        <section class="card card-pad" id="cardOriginales">
          <h2 class="card-h">Originales Expreso</h2>
          <div>
            <div class="orig-item"><img class="orig-avatar" src="" alt="" data-ph><div><span class="orig-badge">Exclusivo</span><div class="orig-title">El domo de calor sobre Sonora</div></div></div>
            <div class="orig-item"><img class="orig-avatar" src="" alt="" data-ph><div><span class="orig-badge">Reportaje</span><div class="orig-title">Naranjeros: la historia del equipo más ganador</div></div></div>
            <div class="orig-item"><img class="orig-avatar" src="" alt="" data-ph><div><span class="orig-badge">Especial</span><div class="orig-title">Nearshoring en Sonora: las empresas que eligieron Hermosillo</div></div></div>
          </div>
          <a href="/originales" class="card-more" style="margin:12px -16px -16px">Ver todos los originales →</a>
        </section>

        <!-- Expresión -->
        <section class="card card-pad" id="cardExpresion">
          <h2 class="card-h">Expresión</h2>
          <div>
            <div class="col-item"><img class="col-avatar" src="" alt="" data-ph><div><div class="col-name">Entre Nos</div><div class="col-title">Lo que dice Mr. X: hospital en Río Sonora avanza</div></div></div>
            <div class="col-item"><img class="col-avatar" src="" alt="" data-ph><div><div class="col-name">Pbro. José Martínez</div><div class="col-title">La medida del amor · Vivir en Cristiano</div></div></div>
            <div class="col-item"><img class="col-avatar" src="" alt="" data-ph><div><div class="col-name">Fuera de Ruta</div><div class="col-title">El camino del agua en la sierra sonorense</div></div></div>
            <div class="col-item"><img class="col-avatar" src="" alt="" data-ph><div><div class="col-name">El Asalto a la Razón</div><div class="col-title">Serpientes y Escaleras: las becas de Durazo</div></div></div>
            <div class="col-item"><img class="col-avatar" src="" alt="" data-ph><div><div class="col-name">Actitudes</div><div class="col-title">El poder de las ideas en la era digital</div></div></div>
          </div>
          <a href="/expresion" class="card-more" style="margin:12px -16px -16px">Ver todas las columnas →</a>
        </section>

        <!-- Pregunta del día -->
        <section class="card card-pad" id="pollCard">
          <h2 class="card-h">Pregunta del día</h2>
          <p class="poll-q">¿Alguna vez le han intentado robar su vehículo?</p>
          <div class="poll-opts">
            <button class="poll-opt" data-val="si"><span class="poll-radio"></span><span class="poll-lbl">Sí</span></button>
            <button class="poll-opt" data-val="no"><span class="poll-radio"></span><span class="poll-lbl">No</span></button>
          </div>
          <div class="poll-result" id="pollResult">
            <div class="poll-bar-row"><span class="poll-bar-lbl">Sí</span><span class="poll-bar"><span class="poll-bar-fill" data-opt="si"></span></span><span class="poll-bar-pct" data-pct="si">0%</span></div>
            <div class="poll-bar-row"><span class="poll-bar-lbl">No</span><span class="poll-bar"><span class="poll-bar-fill" data-opt="no"></span></span><span class="poll-bar-pct" data-pct="no">0%</span></div>
            <div class="poll-total" id="pollTotal"></div>
          </div>
        </section>

      </aside>

      <!-- ═══ COLUMNA CENTRO ═══ -->
      <div class="col-center">

        <!-- Hero slider -->
        <div class="hero" id="hero">
          <div class="hero-slide on">
            <img src="" alt="Plan Maestro Hermosillo" data-ph-hero>
            <div class="hero-cap">
              <div class="hero-src"><span class="hero-badge">EX</span> Expreso · Hermosillo · 💬 18</div>
              <h2 class="hero-title">Gobernador Durazo presenta Plan Maestro de Desarrollo Urbano Hermosillo 2026–2030</h2>
            </div>
          </div>
          <div class="hero-slide">
            <img src="" alt="Plan Sonora Energías" data-ph-hero>
            <div class="hero-cap">
              <div class="hero-src"><span class="hero-badge">EX</span> Expreso · Sonora · 💬 94</div>
              <h2 class="hero-title">Plan Sonora de Energías Sostenibles impulsa industrias automotriz y aeroespacial</h2>
            </div>
          </div>
          <div class="hero-slide">
            <img src="" alt="Naranjeros LMP" data-ph-hero>
            <div class="hero-cap">
              <div class="hero-src"><span class="hero-badge">EX</span> Expreso · Béisbol · 💬 312</div>
              <h2 class="hero-title">Naranjeros de Hermosillo anuncia tres refuerzos para la temporada 2026–27 de la LMP</h2>
            </div>
          </div>
          <div class="hero-slide">
            <img src="" alt="Aranceles Washington" data-ph-hero>
            <div class="hero-cap">
              <div class="hero-src"><span class="hero-badge">EX</span> Expreso · Mundo · 💬 47</div>
              <h2 class="hero-title">Washington impone nuevos aranceles a Asia; México analiza respuesta comercial</h2>
            </div>
          </div>
          <div class="hero-count" id="heroCount">1 de 4</div>
          <button class="hero-arrow hero-prev" id="heroPrev" aria-label="Anterior">‹</button>
          <button class="hero-arrow hero-next" id="heroNext" aria-label="Siguiente">›</button>
          <div class="hero-dots" id="heroDots">
            <button class="hero-dot on" aria-label="Slide 1"></button>
            <button class="hero-dot" aria-label="Slide 2"></button>
            <button class="hero-dot" aria-label="Slide 3"></button>
            <button class="hero-dot" aria-label="Slide 4"></button>
          </div>
        </div>

        <!-- Sub-hero 3 tarjetas -->
        <div class="subhero">
          <article class="sh-card">
            <img class="sh-img" src="" alt="" data-ph>
            <div class="sh-body">
              <div class="sh-meta"><span class="sh-badge">EX</span> Seguridad <span class="sh-cm">💬 52</span></div>
              <h3 class="sh-title">SSP refuerza operativos nocturnos en Hermosillo</h3>
            </div>
          </article>
          <article class="sh-card">
            <img class="sh-img" src="" alt="" data-ph>
            <div class="sh-body">
              <div class="sh-meta"><span class="sh-badge">EX</span> Salud <span class="sh-cm">💬 1.2k</span></div>
              <h3 class="sh-title">Paciente sufre daños renales células madre</h3>
            </div>
          </article>
          <article class="sh-card">
            <img class="sh-img" src="" alt="" data-ph>
            <div class="sh-body">
              <div class="sh-meta"><span class="sh-badge">EX</span> Deportes <span class="sh-cm">💬 7</span></div>
              <h3 class="sh-title">Torneo G1 reúne 180 tenistas en Hermosillo</h3>
            </div>
          </article>
        </div>

        <!-- Feed "Para ti" -->
        <div class="feed-head">
          <span class="feed-title">Para ti</span>
          <div class="feed-toggle">
            <button id="viewList" aria-label="Vista lista">☰</button>
            <button id="viewCards" class="on" aria-label="Vista tarjetas">▤</button>
          </div>
        </div>
        <div class="feed-body" id="feedBody">
          <article class="feed-item">
            <img class="feed-thumb" src="" alt="" data-ph>
            <div class="feed-content">
              <div class="feed-cat"><span class="badge-att">🔥 Ganando atención</span></div>
              <h3 class="feed-h">Plan Maestro contempla 12 parques lineales y ampliación del transporte</h3>
              <div class="feed-m"><span class="feed-si">EX</span> Expreso <span class="feed-sep">·</span> 💬 186 <span class="feed-sep">·</span> 3 min <span class="feed-sep">·</span> Hace 25 min</div>
            </div>
          </article>
          <article class="feed-item">
            <img class="feed-thumb" src="" alt="" data-ph>
            <div class="feed-content">
              <div class="feed-cat">Seguridad</div>
              <h3 class="feed-h">SSP Sonora despliega 300 elementos en operativo nocturno</h3>
              <div class="feed-m"><span class="feed-si">EX</span> Expreso <span class="feed-sep">·</span> 💬 412 <span class="feed-sep">·</span> 2 min <span class="feed-sep">·</span> Hace 1 h</div>
            </div>
          </article>
          <article class="feed-item ad">
            <img class="feed-thumb" src="" alt="" data-ph>
            <div class="feed-content">
              <div class="feed-cat"><span class="badge-ad">Ad</span> Publicidad patrocinada</div>
              <h3 class="feed-h">[Espacio Publicitario — Nativo Feed · CMS]</h3>
              <div class="feed-m"><span class="feed-si" style="background:#999">Ad</span> Anunciante</div>
            </div>
          </article>
          <article class="feed-item">
            <img class="feed-thumb" src="" alt="" data-ph>
            <div class="feed-content">
              <div class="feed-cat">Negocios</div>
              <h3 class="feed-h">Plan Sonora de Energías Sostenibles: la apuesta del estado</h3>
              <div class="feed-m"><span class="feed-si">EX</span> Expreso <span class="feed-sep">·</span> 💬 238 <span class="feed-sep">·</span> 4 min <span class="feed-sep">·</span> Hace 2 h</div>
            </div>
          </article>
          <article class="feed-item">
            <img class="feed-thumb" src="" alt="" data-ph>
            <div class="feed-content">
              <div class="feed-cat">Acción · Béisbol</div>
              <h3 class="feed-h">Naranjeros: los tres peloteros que refuerzan la plantilla</h3>
              <div class="feed-m"><span class="feed-si">EX</span> Expreso <span class="feed-sep">·</span> 💬 892 <span class="feed-sep">·</span> 3 min <span class="feed-sep">·</span> Hace 3 h</div>
            </div>
          </article>
          <article class="feed-item">
            <img class="feed-thumb" src="" alt="" data-ph>
            <div class="feed-content">
              <div class="feed-cat">Salud · Sonora</div>
              <h3 class="feed-h">Hombre guaymense sufre daños renales tras células madre</h3>
              <div class="feed-m"><span class="feed-si">EX</span> Expreso <span class="feed-sep">·</span> 💬 1.4k <span class="feed-sep">·</span> 5 min <span class="feed-sep">·</span> Hace 4 h</div>
            </div>
          </article>
          <article class="feed-item ad">
            <img class="feed-thumb" src="" alt="" data-ph>
            <div class="feed-content">
              <div class="feed-cat"><span class="badge-ad">Ad</span> Publicidad patrocinada</div>
              <h3 class="feed-h">[Espacio Publicitario — Nativo Feed 2 · CMS]</h3>
              <div class="feed-m"><span class="feed-si" style="background:#999">Ad</span> Anunciante</div>
            </div>
          </article>
          <article class="feed-item">
            <img class="feed-thumb" src="" alt="" data-ph>
            <div class="feed-content">
              <div class="feed-cat">Mundo</div>
              <h3 class="feed-h">Washington aranceles a electrónicos de Asia; México analiza</h3>
              <div class="feed-m"><span class="feed-si">EX</span> Expreso <span class="feed-sep">·</span> 💬 317 <span class="feed-sep">·</span> 6 min <span class="feed-sep">·</span> Hace 5 h</div>
            </div>
          </article>
          <article class="feed-item">
            <img class="feed-thumb" src="" alt="" data-ph>
            <div class="feed-content">
              <div class="feed-cat">Expresión · Mr. X</div>
              <h3 class="feed-h">Lo que dice Mr. X: con las becas, Durazo apunta a reducir</h3>
              <div class="feed-m"><span class="feed-si">EX</span> Expreso <span class="feed-sep">·</span> 💬 203 <span class="feed-sep">·</span> 4 min <span class="feed-sep">·</span> Hace 1 d</div>
            </div>
          </article>
        </div>

      </div>

      <!-- ═══ COLUMNA DERECHA ═══ -->
      <aside class="col-right">

        <!-- Clima -->
        <div class="weather">
          <div class="weather-hd">
            <div class="weather-city">📍 Hermosillo, Sonora</div>
            <div class="weather-main">
              <div class="weather-temp">38°</div>
              <div class="weather-info">
                <div class="weather-desc">☀ Soleado</div>
                <div class="weather-feel">Sensación: 41° · Hum. 18%</div>
              </div>
            </div>
            <div class="weather-days">
              <div class="weather-day"><div class="d">Hoy</div><div class="ic">☀</div><div class="t">38°/22°</div></div>
              <div class="weather-day"><div class="d">Mié</div><div class="ic">⛅</div><div class="t">39°/23°</div></div>
              <div class="weather-day"><div class="d">Jue</div><div class="ic">⛅</div><div class="t">37°/21°</div></div>
            </div>
          </div>
          <a href="/clima" class="weather-cta">Revisar UV, calidad del aire y más →</a>
        </div>

        <!-- Ad 300×250 -->
        <div class="ad-box ad-300-250"><span class="ico">📢</span>Espacio publicitario<br>300 × 250</div>

        <!-- Mercado -->
        <section class="card card-pad" id="cardMercado">
          <h2 class="card-h">Mercado</h2>
          <ul class="market">
            <li><span class="sym">USD/MXN</span><span class="val">$17.32</span><span class="chg down">▼ 0.14%</span></li>
            <li><span class="sym">EUR/MXN</span><span class="val">$18.89</span><span class="chg up">▲ 0.08%</span></li>
            <li><span class="sym">IPC BMV</span><span class="val">56,340</span><span class="chg up">▲ 1.40%</span></li>
            <li><span class="sym">Petróleo</span><span class="val">$78.50</span><span class="chg down">▼ 0.32%</span></li>
            <li><span class="sym">Oro</span><span class="val">$2,318</span><span class="chg up">▲ 0.21%</span></li>
          </ul>
        </section>

        <!-- Edición Impresa -->
        <section class="card card-pad" id="cardEdimp">
          <h2 class="card-h">Edición Impresa</h2>
          <a href="/edicion-impresa" class="edimp-cover">
            <img src="" alt="Portada de la Edición Impresa" data-ph>
            <span class="edimp-cap">Alista CFE obras para frenar apagones en la sierra alta</span>
          </a>
          <a href="/edicion-impresa" class="card-more" style="margin:0 -16px -16px">Leer edición de hoy →</a>
        </section>

        <!-- Galería del día -->
        <section class="card" id="cardGaleria">
          <div style="padding:16px 16px 8px"><h2 class="card-h" style="margin:0">Galería del día</h2></div>
          <div class="gallery-grid">
            <img src="" alt="Galería 1" data-ph>
            <img src="" alt="Galería 2" data-ph>
            <img src="" alt="Galería 3" data-ph>
            <img src="" alt="Galería 4" data-ph>
          </div>
          <a href="/multimedia/galerias" class="card-more">Ver todas las galerías →</a>
        </section>

      </aside>

    </div><!-- /grid3 -->

    <!-- Ad banner full width -->
    <div class="ad-box ad-banner"><span class="ico">📢</span>Espacio publicitario</div>

    <!-- Slots de publicidad solo para móvil (se ocultan en escritorio; ordenados por CSS) -->
    <div class="ad-box ad-mobile" id="adMobile1"><span class="ico">📢</span>Espacio publicitario</div>
    <div class="ad-box ad-mobile" id="adMobile2"><span class="ico">📢</span>Espacio publicitario</div>
    <div class="ad-box ad-mobile" id="adMobile3"><span class="ico">📢</span>Espacio publicitario</div>

  </div>
</main>

<!-- ════════ 7 · REDES SOCIALES ════════ -->
<section class="social">
  <div class="wrap">
    <h2 class="social-h">Redes Sociales</h2>
    <div class="social-grid">
      <div class="social-card"><span class="ph">Publicación de Facebook</span></div>
      <div class="social-card"><span class="ph">Publicación de X</span></div>
      <div class="social-card"><span class="ph">Publicación de Instagram</span></div>
      <div class="social-card"><span class="ph">Publicación de TikTok</span></div>
    </div>
  </div>
</section>

<!-- ════════ 8 · EXPRESO VIDEO ════════ -->
<section class="video-sec">
  <div class="wrap">
    <div class="video-head">
      <div class="video-brand">
        <div class="video-logo"><svg viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" rx="3" fill="#ff0000"/><path d="M8 10V4l7 3z" fill="#fff"/></svg></div>
        <div>
          <div class="video-name">Expreso <span class="red">Video</span></div>
          <div class="video-sub">@expresoweb · actualizando automáticamente</div>
        </div>
      </div>
      <div class="video-head-r">
        <div class="live-ind"><span class="dot"></span> En vivo</div>
        <a href="https://youtube.com/@expresoweb" class="video-canal">Ver canal →</a>
      </div>
    </div>

    <div class="video-layout">
      <div class="video-main" id="videoMain">
        <img src="" alt="Video destacado" data-ph>
        <div class="overlay"></div>
        <div class="video-play"><svg viewBox="0 0 28 28" fill="#fff" aria-hidden="true"><path d="M8 5l18 9-18 9z"/></svg></div>
        <div class="video-caption">
          <h3>Noticias Expreso 24/7 desde Hermosillo — En vivo</h3>
          <div class="meta">Hace 2 h · @expresoweb</div>
        </div>
        <div class="video-progress"><div class="bar"></div></div>
      </div>

      <div class="video-playlist" id="videoPlaylist">
        <div class="pl-item active">
          <img class="pl-thumb" src="" alt="" data-ph>
          <div class="pl-info"><div class="pl-num">01</div><div class="pl-title">Noticias al cierre</div><div class="pl-meta">Hace 1 h</div></div>
        </div>
        <div class="pl-item">
          <img class="pl-thumb" src="" alt="" data-ph>
          <div class="pl-info"><div class="pl-num">02</div><div class="pl-title">Célula madre HMO</div><div class="pl-meta">Hace 2 h</div></div>
        </div>
        <div class="pl-item">
          <img class="pl-thumb" src="" alt="" data-ph>
          <div class="pl-info"><div class="pl-num">03</div><div class="pl-title">Plan Maestro HMO</div><div class="pl-meta">Hace 3 h</div></div>
        </div>
        <div class="pl-item">
          <img class="pl-thumb" src="" alt="" data-ph>
          <div class="pl-info"><div class="pl-num">04</div><div class="pl-title">Naranjeros refuerzos</div><div class="pl-meta">Hace 4 h</div></div>
        </div>
      </div>
    </div>

    <div class="video-strip">
      <div class="strip-card">
        <img class="strip-thumb" src="" alt="" data-ph>
        <div class="strip-body"><div class="strip-title">Célula madre · HMO</div><div class="strip-meta">Hace 2 h</div><div class="strip-bar"><div class="fill" style="width:70%"></div></div></div>
      </div>
      <div class="strip-card">
        <img class="strip-thumb" src="" alt="" data-ph>
        <div class="strip-body"><div class="strip-title">Plan Maestro HMO 2026</div><div class="strip-meta">Hace 3 h</div><div class="strip-bar"><div class="fill" style="width:55%"></div></div></div>
      </div>
      <div class="strip-card">
        <img class="strip-thumb" src="" alt="" data-ph>
        <div class="strip-body"><div class="strip-title">Naranjeros LMP 26-27</div><div class="strip-meta">Hace 4 h</div><div class="strip-bar"><div class="fill" style="width:40%"></div></div></div>
      </div>
    </div>
  </div>
</section>


<?php include __DIR__ . '/partials/footer.php'; ?>

<button class="btop" id="btop" aria-label="Volver arriba">↑</button>

<?php include __DIR__ . '/partials/scripts.php'; ?>
</body>
</html>
