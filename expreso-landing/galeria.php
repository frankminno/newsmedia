<?php
/* galeria.php — Vista de galería. Chrome y columna derecha desde partials/.
   Requiere el fragmento CSS de galería (styles-galeria-agregado.css). */
$title      = 'Las mejores imágenes del Plan Maestro Hermosillo 2026 — EXPRESO';
$desc       = 'Galería fotográfica de la presentación del Plan Maestro de Desarrollo Urbano de Hermosillo.';
$canonical  = 'https://expreso.com.mx/multimedia/galerias/plan-maestro-2026';
$ogType     = 'article';
$ogImage    = 'https://picsum.photos/seed/gal-hero/1280/720';
$preloadImg = 'https://picsum.photos/seed/gal1/900/675';
$active      = '';   /* Multimedia no está en la nav primaria */
$vista       = 'galeria';
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
  <a href="/">Inicio</a><span>›</span><a href="/multimedia">Multimedia</a><span>›</span><a href="/multimedia/galerias">Galerías</a><span>›</span>Plan Maestro 2026
</nav>

<div class="art-wrap">

  <main id="main-content">

    <span class="art-cat">Galería</span>
    <h1 class="art-h1">Las mejores imágenes del Plan Maestro Hermosillo 2026</h1>
    <p class="art-deck">Un recorrido visual por la presentación del proyecto que transformará la movilidad y los espacios públicos de la capital sonorense.</p>

    <div class="art-byline">
      <img class="art-av" src="https://i.pravatar.cc/76?img=52" alt="" width="38" height="38" loading="lazy" decoding="async">
      <div>
        <div class="art-by-n">Foto: Iván Rodríguez</div>
        <div class="art-by-m">15 de julio, 2026 · 18 fotografías</div>
      </div>
      <div class="art-share">
        <a href="#" aria-label="Compartir en Facebook" title="Facebook">f</a>
        <a href="#" aria-label="Compartir en X" title="X">&#x1d54f;</a>
        <a href="#" aria-label="Compartir en WhatsApp" title="WhatsApp">W</a>
        <a href="#" aria-label="Copiar enlace" title="Copiar enlace">🔗</a>
      </div>
    </div>

    <div class="gal-page rv">
      <a class="gal-item wide" href="https://picsum.photos/seed/gal1/1600/900">
        <img src="https://picsum.photos/seed/gal1/900/506" alt="Presentación del Plan Maestro" width="900" height="506" fetchpriority="high" decoding="sync">
        <span class="gal-cap">El gobernador Durazo durante la presentación en el Centro de Convenciones.</span>
      </a>
      <a class="gal-item" href="https://picsum.photos/seed/gal2/1200/900">
        <img src="https://picsum.photos/seed/gal2/600/450" alt="Maqueta de parques lineales" width="600" height="450" loading="lazy" decoding="async">
        <span class="gal-cap">Maqueta de los 12 parques lineales contemplados.</span>
      </a>
      <a class="gal-item" href="https://picsum.photos/seed/gal3/1200/900">
        <img src="https://picsum.photos/seed/gal3/600/450" alt="Autoridades municipales" width="600" height="450" loading="lazy" decoding="async">
        <span class="gal-cap">Autoridades municipales y del cabildo de Hermosillo.</span>
      </a>
      <a class="gal-item" href="https://picsum.photos/seed/gal4/1200/900">
        <img src="https://picsum.photos/seed/gal4/600/450" alt="Render de movilidad" width="600" height="450" loading="lazy" decoding="async">
        <span class="gal-cap">Render de las nuevas rutas de transporte público.</span>
      </a>
      <a class="gal-item" href="https://picsum.photos/seed/gal5/1200/900">
        <img src="https://picsum.photos/seed/gal5/600/450" alt="Asistentes al evento" width="600" height="450" loading="lazy" decoding="async">
        <span class="gal-cap">Cámaras empresariales y colectivos ciudadanos asistieron.</span>
      </a>
      <a class="gal-item wide" href="https://picsum.photos/seed/gal6/1600/900">
        <img src="https://picsum.photos/seed/gal6/900/506" alt="Vista general del evento" width="900" height="506" loading="lazy" decoding="async">
        <span class="gal-cap">Vista general del Centro de Convenciones durante la presentación.</span>
      </a>
      <a class="gal-item" href="https://picsum.photos/seed/gal7/1200/900">
        <img src="https://picsum.photos/seed/gal7/600/450" alt="Detalle de la maqueta" width="600" height="450" loading="lazy" decoding="async">
        <span class="gal-cap">Detalle de la infraestructura hídrica propuesta.</span>
      </a>
      <a class="gal-item" href="https://picsum.photos/seed/gal8/1200/900">
        <img src="https://picsum.photos/seed/gal8/600/450" alt="Firma de convenio" width="600" height="450" loading="lazy" decoding="async">
        <span class="gal-cap">Firma del convenio con la iniciativa privada.</span>
      </a>
    </div>

  </main>

  <?php include __DIR__ . '/partials/sidebar-right.php'; ?>

</div><!-- /art-wrap -->

<?php include __DIR__ . '/partials/footer.php'; ?>

<button class="btop" id="btop" aria-label="Volver arriba">↑</button>

<?php include __DIR__ . '/partials/scripts.php'; ?>
</body>
</html>
