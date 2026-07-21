document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  var container = document.getElementById("footer_container");
  if (!container) return;
  var year = new Date().getFullYear();
  container.innerHTML = `
    <div class="nw-shell nw-shared-footer__inner">
      <div class="nw-shared-footer__brand">
        <a href="index.html" aria-label="Notion Wavelet, inicio">
          <img src="images/logo-wavelet-final.png?v=2" alt="" width="48" height="34">
          <strong>Notion Wavelet</strong>
        </a>
        <p>Software de gestión y facturación para talleres.</p>
      </div>
      <nav class="nw-shared-footer__links" aria-label="Enlaces del pie">
        <a href="ayuda.html">Centro de ayuda</a>
        <a href="sobre-wavelet.html">Sobre Wavelet</a>
        <a href="privacidad.html">Privacidad</a>
        <a href="aviso-legal.html">Aviso legal</a>
      </nav>
      <p class="nw-shared-footer__copyright">© ${year} Notion Wavelet</p>
    </div>`;
});
