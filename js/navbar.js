document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('#navbar_container');
  if (!container) return;

  const pageName = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const onHome = pageName === 'index.html' || pageName === '';
  const homeHref = (anchor) => onHome ? anchor : `./index.html${anchor}`;

  container.innerHTML = `
    <div class="nw-nav__inner">
      <a class="nw-brand" href="index.html" aria-label="Notion Wavelet, inicio">
        <img src="images/logo.png" alt="" width="42" height="42">
        <span class="nw-brand__copy">
          <strong>Notion Wavelet</strong>
          <small>Software para talleres</small>
        </span>
      </a>

      <button class="nw-menu-toggle" type="button" aria-expanded="false" aria-controls="nw-main-nav" aria-label="Abrir menú">
        <span></span><span></span><span></span>
      </button>

      <nav class="nw-main-nav" id="nw-main-nav" aria-label="Navegación principal">
        <a href="${homeHref('#inicio')}">Inicio</a>
        <a href="${homeHref('#ideal-section')}">Para quién es</a>
        <a href="${homeHref('#features-section')}">Funciones</a>
        <a href="${homeHref('#demo-section')}">Demostración</a>
        <a href="${homeHref('#pricing-section')}">Precios</a>
        <a href="${homeHref('#benefits-section')}">VeriFactu</a>
        <a href="contact.html"${onHome ? '' : ' aria-current="page"'}>Contacto</a>
        <a class="nw-nav-cta" href="${onHome ? '#download-section' : '#review_form'}">Solicitar demo <span aria-hidden="true">→</span></a>
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

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('click', function (event) {
    if (!container.contains(event.target)) closeMenu();
  });

  window.addEventListener('scroll', function () {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  }, { passive: true });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 992) closeMenu();
  });
});
