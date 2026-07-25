<?php
/* partials/head.php — <head> compartido.
   Cada vista define antes del include: $title, $desc, $canonical,
   $ogImage, $preloadImg (imagen LCP), $ogType, $extraHead. Todos opcionales. */
$title      = $title      ?? 'EXPRESO — El periódico de Sonora';
$desc       = $desc       ?? 'Noticias de Hermosillo, Sonora, México y el mundo.';
$canonical  = $canonical  ?? '';
$ogImage    = $ogImage    ?? '';
$ogType     = $ogType     ?? 'website';
$preloadImg = $preloadImg ?? '';
$extraHead  = $extraHead  ?? '';
?>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#002e1e">
<title><?= htmlspecialchars($title) ?></title>
<meta name="description" content="<?= htmlspecialchars($desc) ?>">
<meta name="robots" content="index,follow,max-image-preview:large">
<?php if ($canonical): ?><link rel="canonical" href="<?= htmlspecialchars($canonical) ?>">
<?php endif; ?>

<!-- Open Graph -->
<meta property="og:type" content="<?= htmlspecialchars($ogType) ?>">
<meta property="og:site_name" content="EXPRESO">
<meta property="og:title" content="<?= htmlspecialchars($title) ?>">
<meta property="og:description" content="<?= htmlspecialchars($desc) ?>">
<?php if ($ogImage): ?><meta property="og:image" content="<?= htmlspecialchars($ogImage) ?>">
<?php endif; ?>
<meta name="twitter:card" content="summary_large_image">

<!-- Rendimiento: hints de conexión + precarga de fuente -->
<link rel="preconnect" href="https://img.youtube.com" crossorigin>
<link rel="preconnect" href="https://blob.expreso.com.mx" crossorigin>
<link rel="dns-prefetch" href="https://picsum.photos">
<link rel="dns-prefetch" href="https://i.pravatar.cc">
<link rel="preload" as="font" href="fonts/CanvaSans-VF.ttf" type="font/ttf" crossorigin>
<?php if ($preloadImg): ?><link rel="preload" as="image" href="<?= htmlspecialchars($preloadImg) ?>" fetchpriority="high">
<?php endif; ?>

<link rel="stylesheet" href="css/styles.css">
<?= $extraHead ?>
</head>
