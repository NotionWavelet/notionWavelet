document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  var container = document.getElementById("footer_container");
  if (!container) return;
  var path = window.location.pathname;
  var prefix = path.indexOf("/docs/") !== -1 ? "../" : "";
  var year = new Date().getFullYear();
  container.innerHTML = `
    <div class="nw-shell nw-shared-footer__inner">
      <div class="nw-shared-footer__brand">
        <a href="${prefix}index.html" aria-label="Notion Wavelet, inicio">
          <img src="${prefix}images/logo-wavelet-final.png" alt="" width="48" height="34">
          <strong>Notion Wavelet</strong>
        </a>
        <p>Software de gestión y facturación para talleres.</p>
      </div>
      <nav class="nw-shared-footer__links" aria-label="Enlaces del pie">
        <a href="${prefix}index.html#features-section">Funciones</a>
        <a href="${prefix}index.html#product-section">Capturas</a>
        <a href="${prefix}index.html#pricing-section">Precio</a>
        <a href="${prefix}contact.html">Contacto</a>
        <a href="${prefix}ayuda.html">Centro de ayuda</a>
        <a href="${prefix}privacidad.html">Privacidad</a>
        <a href="${prefix}aviso-legal.html">Aviso legal</a>
      </nav>
      <p class="nw-shared-footer__copyright">© ${year} Notion Wavelet</p>
    </div>`;
});
