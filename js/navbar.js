document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('#navbar_container');
  if (!container) return;

  const pageName = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const onHome = pageName === 'index.html' || pageName === '';
  const homeHref = (anchor) => onHome ? anchor : `index.html${anchor}`;

  container.innerHTML = `
    <div class="nw-nav__inner">
      <a class="nw-brand" href="${onHome ? '#inicio' : 'index.html#inicio'}" aria-label="Notion Wavelet, inicio">
        <img src="images/logo-wavelet.svg?v=4" alt="" width="44" height="44">
        <span class="nw-brand__copy">
          <strong>Notion Wavelet</strong>
          <small>Software para talleres</small>
        </span>
      </a>

      <button class="nw-menu-toggle" type="button" aria-expanded="false" aria-controls="nw-main-nav" aria-label="Abrir menú">
        <span></span><span></span><span></span>
      </button>

      <nav class="nw-main-nav" id="nw-main-nav" aria-label="Navegación principal">
        <a data-section="inicio" href="${homeHref('#inicio')}">Inicio</a>
        <a data-section="ideal-section" href="${homeHref('#ideal-section')}">Para quién es</a>
        <a data-section="features-section" href="${homeHref('#features-section')}">Funciones</a>
        <a data-section="demo-section" href="${homeHref('#demo-section')}">Demostración</a>
        <a data-section="pricing-section" href="${homeHref('#pricing-section')}">Precios</a>
        <a data-section="benefits-section" href="${homeHref('#benefits-section')}">VeriFactu</a>
        <div class="nw-nav-resources">
          <button class="nw-nav-resources__toggle" type="button" aria-expanded="false">Recursos <i class="fa fa-angle-down" aria-hidden="true"></i></button>
          <div class="nw-nav-resources__menu">
            <a href="docs/index.html"><i class="fa fa-book"></i><span><strong>Documentación</strong><small>Guías de uso del programa</small></span></a>
            <a href="requisitos.html"><i class="fa fa-windows"></i><span><strong>Requisitos</strong><small>Compatibilidad e instalación</small></span></a>
            <a href="versiones.html"><i class="fa fa-refresh"></i><span><strong>Versiones</strong><small>Novedades y actualizaciones</small></span></a>
            <a href="${homeHref('#faq-section')}"><i class="fa fa-question-circle"></i><span><strong>Preguntas frecuentes</strong><small>Resolvemos las dudas habituales</small></span></a>
          </div>
        </div>
        <a href="contact.html"${onHome ? '' : ' aria-current="page"'}>Contacto</a>
        <a class="nw-nav-cta" href="${onHome ? '#download-section' : 'index.html#download-section'}">Solicitar demo <span aria-hidden="true">→</span></a>
      </nav>
    </div>`;

  const header = document.querySelector('.header');
  const toggle = container.querySelector('.nw-menu-toggle');
  const nav = container.querySelector('.nw-main-nav');

  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  toggle.addEventListener('click', function () {
    const open = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });

  const resources = container.querySelector('.nw-nav-resources');
  const resourcesToggle = container.querySelector('.nw-nav-resources__toggle');
  if (resources && resourcesToggle) {
    resourcesToggle.addEventListener('click', function (event) {
      event.stopPropagation();
      const open = resources.classList.toggle('is-open');
      resourcesToggle.setAttribute('aria-expanded', String(open));
    });
  }

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('click', function (event) {
    if (!container.contains(event.target)) closeMenu();
    if (resources && !resources.contains(event.target)) {
      resources.classList.remove('is-open');
      resourcesToggle.setAttribute('aria-expanded', 'false');
    }
  });

  window.addEventListener('scroll', function () {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  }, { passive: true });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 992) closeMenu();
  });
});
