<?php
/* partials/navbar.php — navbar compartido.
   La vista define $active con la clave de la sección actual
   (ej. 'inicio', 'hermosillo', 'multimedia'…) para resaltar la pestaña.
   Para que el resaltado sea dinámico, aplica el fragmento CSS que cambia
   .nav-primary a:first-child por .nav-primary a.active (ver notas). */
$active = $active ?? 'inicio';

$primary = [
  'inicio'     => ['/',                       'Inicio'],
  'hermosillo' => ['/noticias/hermosillo',    'Hermosillo'],
  'sonora'     => ['/noticias/sonora',        'Sonora'],
  'mexico'     => ['/noticias/mexico',        'México'],
  'mundo'      => ['/noticias/mundo',         'Mundo'],
  'seguridad'  => ['/noticias/seguridad',     'Seguridad'],
  'negocios'   => ['/noticias/negocios',      'Negocios'],
  'viral'      => ['/noticias/mundo-curioso', 'Viral'],
];
$secondary = [
  'accion'    => ['/accion',    'Acción'],
  'estelar'   => ['/estelar',   'Estelar'],
  'expresion' => ['/expresion', 'Expresión'],
  'conexion'  => ['/conexion',  'Conexión'],
];
?>
<nav class="navbar">
  <div class="wrap">
    <div class="nav-primary">
      <?php foreach ($primary as $key => $it): ?>
      <a href="<?= $it[0] ?>"<?= $active === $key ? ' class="active" aria-current="page"' : '' ?>><?= $it[1] ?></a>
      <?php endforeach; ?>
    </div>
    <div class="nav-secondary">
      <?php foreach ($secondary as $key => $it): ?>
      <a href="<?= $it[0] ?>"<?= $active === $key ? ' class="active"' : '' ?>><?= $it[1] ?></a>
      <?php endforeach; ?>
    </div>
  </div>
</nav>
