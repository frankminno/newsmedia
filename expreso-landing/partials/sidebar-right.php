<!-- partials/sidebar-right.php — columna derecha (compartida en nota/galería/video) -->
  <aside class="col-right">

    <!-- CLIMA -->
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

    <!-- EDICIÓN IMPRESA -->
    <section class="card card-pad" id="cardEdimp">
      <h2 class="card-h">Edición Impresa</h2>
      <a href="/edicion-impresa" class="edimp-cover">
        <img src="https://picsum.photos/seed/edimp/300/400" alt="Portada de la Edición Impresa" width="300" height="400" loading="lazy" decoding="async">
        <span class="edimp-cap">Alista CFE obras para frenar apagones en la sierra alta</span>
      </a>
      <a href="/edicion-impresa" class="card-more" style="margin:0 -16px -16px">Leer edición de hoy →</a>
    </section>

    <!-- PREGUNTA DEL DÍA -->
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

    <!-- LAS MÁS VISTAS
         (sin id="popList" a propósito: ese id lo controla el módulo de
          "Más populares" del home en main.js, aquí es una lista estática) -->
    <section class="card card-pad">
      <h2 class="card-h">Las más vistas</h2>
      <div class="pop">
        <div class="pop-item">
          <span class="pop-num">1</span>
          <div class="pop-body">
            <div class="pop-title"><a href="/noticias/negocios/peso-dolar">Peso mexicano gana terreno frente al dólar: así cotiza hoy</a></div>
            <div class="pop-meta">Negocios · 15 jul 2026</div>
          </div>
        </div>
        <div class="pop-item">
          <span class="pop-num">2</span>
          <div class="pop-body">
            <div class="pop-title"><a href="/noticias/negocios/gasolina-hoy">Gasolina amanece hoy a 23.96 pesos, pero algunas estaciones la dan más barata</a></div>
            <div class="pop-meta">Negocios · 15 jul 2026</div>
          </div>
        </div>
        <div class="pop-item">
          <span class="pop-num">3</span>
          <div class="pop-body">
            <div class="pop-title"><a href="/noticias/seguridad/adulto-mayor">Identifican a adulto mayor arrastrado por la corriente en Hermosillo</a></div>
            <div class="pop-meta">Seguridad · 14 jul 2026</div>
          </div>
        </div>
        <div class="pop-item">
          <span class="pop-num muted">4</span>
          <div class="pop-body">
            <div class="pop-title"><a href="/noticias/mexico/al-cierre">Al Cierre, noticiero con lo más relevante de México este martes</a></div>
            <div class="pop-meta">México · 14 jul 2026</div>
          </div>
        </div>
        <div class="pop-item">
          <span class="pop-num muted">5</span>
          <div class="pop-body">
            <div class="pop-title"><a href="/noticias/hermosillo/calendario-sep">Ya es oficial: SEP publica el calendario escolar 2026–2027</a></div>
            <div class="pop-meta">Hermosillo · 15 jul 2026</div>
          </div>
        </div>
      </div>
    </section>

    <!-- AD 300×250 -->
    <div class="ad-box ad-300-250"><span class="ico">📢</span>Espacio publicitario<br>300 × 250</div>

    <!-- DESDE EL PALCO -->
    <section class="card card-pad">
      <h2 class="card-h">Desde el Palco</h2>
      <div class="pop">
        <div class="pop-item"><div class="pop-body"><div class="pop-title"><a href="/deportes/mundial/finalista">Inglaterra y Argentina definen hoy al segundo finalista del Mundial 2026</a></div></div></div>
        <div class="pop-item"><div class="pop-body"><div class="pop-title"><a href="/deportes/mundial/espana-francia">España vence a Francia y avanza a la final del Mundial 2026</a></div></div></div>
        <div class="pop-item"><div class="pop-body"><div class="pop-title"><a href="/deportes/mundial/croacia-var">Croacia, la selección más perjudicada por el VAR en el Mundial</a></div></div></div>
        <div class="pop-item"><div class="pop-body"><div class="pop-title"><a href="/deportes/mundial/semifinales">Francia y España abren las semifinales del Mundial 2026</a></div></div></div>
        <div class="pop-item"><div class="pop-body"><div class="pop-title"><a href="/deportes/mundial/cuartos-horario">¿Dónde y a qué hora ver los cuartos de final del Mundial 2026?</a></div></div></div>
      </div>
      <a href="/deportes/mundial" class="card-more" style="margin:0 -16px -16px">Ver más noticias →</a>
    </section>

    <!-- NEWSLETTER -->
    <div class="newsletter">
      <h4>Expreso al Día</h4>
      <p>Las noticias más importantes de Sonora en tu correo cada mañana. Gratis.</p>
      <label for="nlE" class="sr-only">Correo electrónico para newsletter</label>
      <input type="email" placeholder="tucorreo@ejemplo.com" id="nlE" autocomplete="email" aria-required="true">
      <button id="nlB" type="submit">Suscribirme gratis</button>
    </div>

    <!-- EXPRESIÓN -->
    <section class="card card-pad" id="cardExpresion">
      <h2 class="card-h">Expresión</h2>
      <div class="col-item">
        <img class="col-avatar" src="https://i.pravatar.cc/40?img=11" alt="" width="40" height="40" loading="lazy" decoding="async">
        <div><div class="col-name">Entre Nos · Columna</div><div class="col-title"><a href="/expresion/entre-nos">Lo que dice Mr. X: hospital en Río Sonora avanza</a></div></div>
      </div>
      <div class="col-item">
        <img class="col-avatar" src="https://i.pravatar.cc/40?img=33" alt="" width="40" height="40" loading="lazy" decoding="async">
        <div><div class="col-name">Pbro. José Martínez</div><div class="col-title"><a href="/expresion/vivir-en-cristiano">La medida del amor · Vivir en Cristiano</a></div></div>
      </div>
      <div class="col-item">
        <img class="col-avatar" src="https://i.pravatar.cc/40?img=25" alt="" width="40" height="40" loading="lazy" decoding="async">
        <div><div class="col-name">Fuera de Ruta</div><div class="col-title"><a href="/expresion/fuera-de-ruta">El camino del agua en la sierra sonorense</a></div></div>
      </div>
      <div class="col-item">
        <img class="col-avatar" src="https://i.pravatar.cc/40?img=44" alt="" width="40" height="40" loading="lazy" decoding="async">
        <div><div class="col-name">El Asalto a la Razón</div><div class="col-title"><a href="/expresion/el-asalto-a-la-razon">Serpientes y Escaleras: las becas de Durazo</a></div></div>
      </div>
      <div class="col-item">
        <img class="col-avatar" src="https://i.pravatar.cc/40?img=57" alt="" width="40" height="40" loading="lazy" decoding="async">
        <div><div class="col-name">Actitudes</div><div class="col-title"><a href="/expresion/actitudes">El poder de las ideas en la era digital</a></div></div>
      </div>
      <a href="/expresion" class="card-more" style="margin:0 -16px -16px">Ver todas las columnas →</a>
    </section>

    <!-- GALERÍA -->
    <section class="card" id="cardGaleria">
      <div style="padding:16px 16px 8px"><h2 class="card-h" style="margin:0">Galería del día</h2></div>
      <div class="gallery-grid">
        <img src="https://picsum.photos/seed/g1/200/150" alt="Galería 1" width="200" height="150" loading="lazy" decoding="async">
        <img src="https://picsum.photos/seed/g2/200/150" alt="Galería 2" width="200" height="150" loading="lazy" decoding="async">
        <img src="https://picsum.photos/seed/g3/200/150" alt="Galería 3" width="200" height="150" loading="lazy" decoding="async">
        <img src="https://picsum.photos/seed/g4/200/150" alt="Galería 4" width="200" height="150" loading="lazy" decoding="async">
      </div>
      <a href="/multimedia/galerias" class="card-more">Ver todas las galerías →</a>
    </section>

  </aside>
