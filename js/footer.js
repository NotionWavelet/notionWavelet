document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  var container = document.getElementById("footer_container");
  if (!container) return;

  var path = window.location.pathname;
  var prefix = path.indexOf("/docs/") !== -1 ? "../" : "";
  var year = new Date().getFullYear();

  container.innerHTML = `
<footer class="nw-footer">
  <div class="nw-footer__shell">
    <div class="nw-footer__top">
      <div class="nw-footer__brand">
        <a class="nw-footer__logo" href="${prefix}index.html#inicio" aria-label="Volver al inicio">
          <span class="nw-footer__logo-mark"><img src="${prefix}images/logo-wavelet-mark.png?v=1" alt="" aria-hidden="true"></span>
          <span><strong>Notion Wavelet</strong><small>Software para talleres</small></span>
        </a>
        <p>Software de gestión y facturación para talleres.</p>
        <div class="nw-footer__platform">
          <svg aria-hidden="true" class="nw-icon nw-icon--windows" viewBox="0 0 24 24"><path d="M3 5.5 10.5 4v7H3zM12 3.7 21 2v9h-9zM3 12.5h7.5v7L3 18zM12 12.5h9v9l-9-1.7z" fill="currentColor" stroke="none"></path></svg>
          <span><strong>Aplicación de escritorio</strong><small>Compatible con Windows 10 y 11</small></span>
        </div>
      </div>
      <div class="nw-footer__links">
        <div class="nw-footer__column"><strong>Producto</strong><a href="${prefix}index.html#features-section">Funciones</a><a href="${prefix}index.html#benefits-section">VeriFactu</a><a href="${prefix}index.html#migration-section">Migración</a><a href="${prefix}index.html#pricing-section">Precio</a></div>
        <div class="nw-footer__column"><strong>Información</strong><a href="${prefix}index.html#faq-section">Preguntas frecuentes</a><a href="${prefix}contact.html">Contacto</a></div>
        <div class="nw-footer__column"><strong>Legal</strong><a href="${prefix}privacidad.html">Privacidad</a><a href="${prefix}aviso-legal.html">Aviso legal</a><a href="${prefix}declaracion-responsable.html">Declaraciones responsables</a></div>
      </div>
    </div>
    <div class="nw-footer__bottom">
      <p>© ${year} Notion Wavelet. Todos los derechos reservados.</p>
      <div class="nw-footer__badges">
        <span><svg aria-hidden="true" class="nw-icon" viewBox="0 0 24 24"><rect height="11" rx="2" width="14" x="5" y="10"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg> Conexión segura</span>
        <span><svg aria-hidden="true" class="nw-icon" viewBox="0 0 24 24"><path d="M12 3 4.5 6v5.5c0 4.8 3.1 8.1 7.5 9.5 4.4-1.4 7.5-4.7 7.5-9.5V6z"></path><path d="m8.5 12 2.2 2.2 4.8-5"></path></svg> Actualizaciones incluidas</span>
      </div>
      <a class="nw-footer__back" href="#top" aria-label="Volver arriba"><span class="nw-footer__back-text">Volver arriba</span><svg aria-hidden="true" class="nw-icon" viewBox="0 0 24 24"><path d="m6 15 6-6 6 6"></path></svg></a>
    </div>
  </div>
</footer>`;
});
