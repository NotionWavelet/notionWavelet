document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  var container = document.getElementById("footer_container");
  if (!container) return;
  var year = new Date().getFullYear();
  container.innerHTML = `
    <div class="nw-shell nw-shared-footer__inner">
      <div class="nw-shared-footer__brand">
        <a href="index.html" aria-label="Notion Wavelet, inicio"><img src="images/logo-wavelet-final.png" alt="" width="48" height="34"><strong>Notion Wavelet</strong></a>
        <p>Software de gestión y facturación para talleres.</p>
      </div>
      <nav class="nw-shared-footer__links" aria-label="Enlaces del pie">
        <a href="index.html#funciones">Funciones</a>
        <a href="index.html#verifactu">VeriFactu</a>
        <a href="guia-migracion.html">Migración</a>
        <a href="index.html#precio">Precio</a>
        <a href="ayuda.html">Centro de ayuda</a>
        <a href="index.html#faq-section">Preguntas frecuentes</a>
        <a href="contact.html">Contacto</a>
        <a href="privacidad.html">Privacidad</a>
        <a href="aviso-legal.html">Aviso legal</a>
      </nav>
      <p class="nw-shared-footer__copyright">© ${year} Notion Wavelet</p>
    </div>`;
});
