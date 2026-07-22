document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('footer_container');
  if (!container) return;

  const year = new Date().getFullYear();
  container.innerHTML = `
    <div class="nw-shell nw-shared-footer__inner">
      <div class="nw-shared-footer__brand">
        <a href="index.html" aria-label="Notion Wavelet, inicio">
          <img src="images/logo-wavelet-final.png" alt="" width="48" height="34">
          <strong>Notion Wavelet</strong>
        </a>
        <p>Software de gestión y facturación para talleres.</p>
      </div>

      <div class="nw-shared-footer__columns">
        <nav class="nw-shared-footer__column" aria-label="Producto">
          <strong>Producto</strong>
          <a href="index.html#funciones">Funciones</a>
          <a href="capturas.html">Capturas</a>
          <a href="index.html#verifactu">VeriFactu</a>
          <a href="guia-migracion.html">Migración</a>
          <a href="index.html#precio">Precio</a>
        </nav>

        <nav class="nw-shared-footer__column" aria-label="Ayuda">
          <strong>Ayuda</strong>
          <a href="ayuda.html">Centro de ayuda</a>
          <a href="guia-primeros-pasos.html">Primeros pasos</a>
          <a href="guia-verifactu.html">Guía VeriFactu</a>
          <a href="index.html#faq-section">Preguntas frecuentes</a>
          <a href="contact.html">Contacto</a>
        </nav>

        <nav class="nw-shared-footer__column" aria-label="Empresa">
          <strong>Empresa</strong>
          <a href="sobre-wavelet.html">Sobre Wavelet</a>
          <a href="versiones.html">Novedades</a>
          <a href="roadmap.html">Próximas mejoras</a>
          <a href="privacidad.html">Privacidad</a>
          <a href="aviso-legal.html">Aviso legal</a>
        </nav>
      </div>

      <p class="nw-shared-footer__copyright">© ${year} Notion Wavelet</p>
    </div>`;
});

// Footer build: 2026-07-22-v22-commercial-polish
