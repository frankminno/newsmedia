<?php
/* partials/scripts.php — scripts compartidos.
   main.js sirve para TODAS las vistas: sus módulos (slider, más populares,
   video, instagram, feed, newsletter, back-to-top, encuesta, progreso de
   lectura, reveal, comentarios) se auto-activan solo donde existe su
   contenedor, así que no hay que tocarlo por vista.
   Si alguna vista necesitara un JS propio, agrégalo condicional por $vista. */
$vista = $vista ?? '';
?>
<script src="js/main.js" defer></script>
<?php if ($vista === 'ejemplo-vista-con-js-propio'): ?>
<script src="js/<?= htmlspecialchars($vista) ?>.js" defer></script>
<?php endif; ?>
