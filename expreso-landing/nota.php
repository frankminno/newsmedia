<?php
/* nota.php — Vista de noticia. Chrome y columna derecha vienen de partials/. */
$title      = 'Gobernador Durazo presenta Plan Maestro de Desarrollo Urbano Hermosillo 2026–2030 — EXPRESO';
$desc       = 'La inversión histórica de 2 mil millones de pesos busca transformar la movilidad urbana y la calidad de vida de los hermosillenses.';
$canonical  = 'https://expreso.com.mx/noticias/hermosillo/plan-maestro-2026';
$ogType     = 'article';
$ogImage    = 'https://picsum.photos/seed/h1/1280/560';
$preloadImg = 'https://picsum.photos/seed/h1/1280/560';
$active     = 'hermosillo';
$vista      = 'nota';
$extraHead  = <<<'HTML'
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"NewsArticle","headline":"Gobernador Durazo presenta Plan Maestro de Desarrollo Urbano Hermosillo 2026–2030","datePublished":"2026-07-15T09:35:00-07:00","dateModified":"2026-07-15T10:10:00-07:00","author":{"@type":"Person","name":"Redacción Expreso"},"publisher":{"@type":"NewsMediaOrganization","name":"EXPRESO"},"mainEntityOfPage":"https://expreso.com.mx/noticias/hermosillo/plan-maestro-2026"}
</script>
HTML;
?>
<!DOCTYPE html>
<html lang="es">
<?php include __DIR__ . '/partials/head.php'; ?>
<body>

<a href="#main-content" class="skip-link">Saltar al contenido principal</a>
<div id="pbar" role="progressbar" aria-label="Progreso de lectura" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>

<?php
include __DIR__ . '/partials/utility-bar.php';
include __DIR__ . '/partials/header.php';
include __DIR__ . '/partials/navbar.php';
include __DIR__ . '/partials/ticker.php';
?>

<nav class="bc" aria-label="Ruta de navegación">
  <a href="/">Inicio</a><span>›</span><a href="/noticias/hermosillo">Hermosillo</a><span>›</span>Plan Maestro 2026
</nav>

<!-- ════════ ARTÍCULO + SIDEBAR ════════ -->
<div class="art-wrap">

  <!-- ═══════ ARTÍCULO ═══════ -->
  <main id="main-content">

    <span class="art-cat">Hermosillo</span>
    <h1 class="art-h1">Gobernador Durazo presenta Plan Maestro de Desarrollo Urbano Hermosillo 2026–2030</h1>
    <p class="art-deck">La inversión histórica de 2 mil millones de pesos contempla 12 parques lineales, ampliación del transporte público y renovación de infraestructura vial en la capital sonorense.</p>

    <div class="art-byline">
      <img class="art-av" src="https://i.pravatar.cc/76?img=15" alt="" width="38" height="38" loading="lazy" decoding="async">
      <div>
        <div class="art-by-n">Redacción Expreso</div>
        <div class="art-by-m">15 de julio, 2026 · 09:35 · Actualizado 10:10 · 3 min de lectura</div>
      </div>
      <div class="art-share">
        <a href="#" aria-label="Compartir en Facebook" title="Facebook">f</a>
        <a href="#" aria-label="Compartir en X" title="X">&#x1d54f;</a>
        <a href="#" aria-label="Compartir en WhatsApp" title="WhatsApp">W</a>
        <a href="#" aria-label="Copiar enlace" title="Copiar enlace">🔗</a>
      </div>
    </div>

    <figure class="art-hero rv">
      <img src="https://picsum.photos/seed/h1/1280/560"
           alt="Gobernador Durazo presenta el Plan Maestro de Desarrollo Urbano"
           width="1280" height="460" fetchpriority="high" decoding="sync">
    </figure>
    <div class="art-cap">El gobernador Alfonso Durazo durante la presentación del Plan Maestro, acompañado del cabildo de Hermosillo. Foto: Expreso</div>

    <div class="art-body">
      <p>El gobernador de Sonora, Alfonso Durazo, presentó esta mañana el Plan Maestro de Desarrollo Urbano Hermosillo 2026–2030, un proyecto que contempla una inversión histórica de 2 mil millones de pesos destinados a transformar la movilidad y la infraestructura de la capital del estado durante la próxima década.</p>

      <p>Durante el evento, realizado en el Centro de Convenciones, el mandatario estatal detalló que el plan incluye la construcción de 12 nuevos parques lineales distribuidos en distintos puntos de la ciudad, así como la ampliación de las principales rutas de transporte público que conectan las zonas periféricas con el centro urbano.</p>

      <blockquote>"Hermosillo necesita crecer de manera ordenada. Este plan pone a las personas y su calidad de vida en el centro de cada decisión."</blockquote>

      <p>El proyecto se financiará mediante una combinación de recursos estatales, federales y participación de la iniciativa privada, con un horizonte de ejecución escalonado que arrancará en el último trimestre de 2026.</p>

      <h2>Los ejes principales del plan</h2>
      <p>De acuerdo con la presentación oficial, el Plan Maestro se sostiene en cuatro ejes: movilidad urbana, espacios públicos, infraestructura hídrica y renovación de pavimento. Cada eje contará con metas específicas y mecanismos de seguimiento ciudadano a través de un portal de transparencia.</p>

      <img class="art-inline-img" src="https://picsum.photos/seed/plan2/900/500"
           alt="Maqueta del proyecto de parques lineales"
           width="900" height="500" loading="lazy" decoding="async">
      <div class="art-inline-cap">Maqueta del proyecto de parques lineales presentada durante el evento. Foto: Expreso</div>

      <p>Autoridades municipales señalaron que la primera etapa priorizará las colonias con mayor densidad poblacional y menor cobertura de áreas verdes, de acuerdo con el diagnóstico urbano realizado por el IMPLAN Hermosillo durante 2025.</p>

      <div class="art-ad">Espacio publicitario — Nativo In-Article · CMS</div>

      <p>El gobernador adelantó que en las próximas semanas se abrirán mesas de trabajo con colectivos ciudadanos, cámaras empresariales y colegios de arquitectos para afinar el diseño final de los espacios públicos contemplados en el plan.</p>

      <p>La Secretaría de Infraestructura y Desarrollo Urbano será la encargada de coordinar la ejecución del proyecto, con reportes trimestrales de avance que se presentarán ante el Congreso del Estado.</p>
    </div>

    <div class="art-tags">
      <a href="/noticias/hermosillo" class="tag">Hermosillo</a>
      <a href="/noticias/sonora/durazo" class="tag">Durazo</a>
      <a href="/noticias/hermosillo/urbanismo" class="tag">Desarrollo Urbano</a>
      <a href="/noticias/hermosillo/transporte" class="tag">Transporte Público</a>
    </div>

    <div class="art-author-box">
      <img src="https://i.pravatar.cc/76?img=15" alt="" width="56" height="56" loading="lazy" decoding="async">
      <div>
        <h5>Redacción Expreso</h5>
        <p>Equipo de noticias de Expreso, el periódico de Sonora. Cobertura diaria de Hermosillo, Sonora y la región noroeste de México.</p>
      </div>
    </div>

    <!-- RELACIONADAS (mismas tarjetas del sub-hero del home) -->
    <div class="rv">
      <div class="art-rel-h">Te puede interesar</div>
      <div class="art-rel-g">
        <div class="sh-card">
          <img class="sh-img" src="https://picsum.photos/seed/sc1/400/225" alt="" width="400" height="225" loading="lazy" decoding="async">
          <div class="sh-body">
            <div class="sh-meta"><span class="sh-badge">EX</span><span>Seguridad</span><span class="sh-cm">💬 528</span></div>
            <h4 class="sh-title"><a href="/noticias/seguridad/ssp-operativo">SSP Sonora refuerza operativos nocturnos en zonas de riesgo de Hermosillo y Cajeme</a></h4>
          </div>
        </div>
        <div class="sh-card">
          <img class="sh-img" src="https://picsum.photos/seed/sc2/400/225" alt="" width="400" height="225" loading="lazy" decoding="async">
          <div class="sh-body">
            <div class="sh-meta"><span class="sh-badge">EX</span><span>Negocios</span><span class="sh-cm">💬 238</span></div>
            <h4 class="sh-title"><a href="/noticias/negocios/plan-sonora">Plan Sonora de Energías Sostenibles: la apuesta del estado por la industria limpia</a></h4>
          </div>
        </div>
        <div class="sh-card">
          <img class="sh-img" src="https://picsum.photos/seed/sc3/400/225" alt="" width="400" height="225" loading="lazy" decoding="async">
          <div class="sh-body">
            <div class="sh-meta"><span class="sh-badge">EX</span><span>Deportes</span><span class="sh-cm">💬 74</span></div>
            <h4 class="sh-title"><a href="/accion/otros-deportes/torneo-g1">Hermosillo recibe 180 tenistas en el Torneo Nacional G1</a></h4>
          </div>
        </div>
      </div>
    </div>

    <!-- COMENTARIOS -->
    <section class="art-comments rv">
      <h2 class="card-h">Comentarios</h2>
      <label for="cmt" class="sr-only">Escribe un comentario</label>
      <textarea id="cmt" placeholder="Escribe tu comentario…"></textarea>
      <button type="button">Publicar</button>
    </section>

  </main>

  <?php include __DIR__ . '/partials/sidebar-right.php'; ?>

</div><!-- /art-wrap -->

<?php include __DIR__ . '/partials/footer.php'; ?>

<button class="btop" id="btop" aria-label="Volver arriba">↑</button>

<?php include __DIR__ . '/partials/scripts.php'; ?>
</body>
</html>
