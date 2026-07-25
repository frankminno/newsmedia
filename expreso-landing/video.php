<?php
/* video.php — Vista de video. Reutiliza el bloque #videoMain del home,
   así main.js lo llena solo desde el RSS del canal. */
$title      = 'Expreso Video — Últimos videos del canal';
$desc       = 'Noticias en video de Hermosillo y Sonora. El canal de YouTube de Expreso, al día.';
$canonical  = 'https://expreso.com.mx/multimedia/videos';
$active     = '';
$vista      = 'video';
?>
<!DOCTYPE html>
<html lang="es">
<?php include __DIR__ . '/partials/head.php'; ?>
<body>

<a href="#main-content" class="skip-link">Saltar al contenido principal</a>

<?php
include __DIR__ . '/partials/utility-bar.php';
include __DIR__ . '/partials/header.php';
include __DIR__ . '/partials/navbar.php';
include __DIR__ . '/partials/ticker.php';
?>

<nav class="bc" aria-label="Ruta de navegación">
  <a href="/">Inicio</a><span>›</span><a href="/multimedia">Multimedia</a><span>›</span>Videos
</nav>

<main id="main-content">
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

</main>

<?php include __DIR__ . '/partials/footer.php'; ?>

<button class="btop" id="btop" aria-label="Volver arriba">↑</button>

<?php include __DIR__ . '/partials/scripts.php'; ?>
</body>
</html>
