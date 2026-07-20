document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#navbar_container');
  if (!container) return;

  const pageName = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const onHome = pageName === 'index.html' || pageName === '';
  const homeHref = (anchor) => (onHome ? anchor : `index.html${anchor}`);

  container.innerHTML = `
    <div class="nw-nav__inner">
      <a class="nw-brand" href="${onHome ? '#inicio' : 'index.html#inicio'}" aria-label="Notion Wavelet, página de inicio">
        <img src="images/logo-wavelet-mark.png?v=1" alt="" width="58" height="44">
        <span class="nw-brand__copy">
          <strong>Notion Wavelet</strong>
          <small>Gestión para talleres</small>
        </span>
      </a>

      <button class="nw-menu-toggle" type="button" aria-expanded="false" aria-controls="nw-main-nav" aria-label="Abrir menú de navegación">
        <span></span><span></span><span></span>
      </button>

      <nav class="nw-main-nav" id="nw-main-nav" aria-label="Navegación principal">
        <a data-section="features-section" href="${homeHref('#features-section')}">Funciones</a>
        <a data-section="product-section" href="${homeHref('#product-section')}">El programa</a>
        <a data-section="benefits-section" href="${homeHref('#benefits-section')}">VeriFactu</a>
        <a data-section="pricing-section" href="${homeHref('#pricing-section')}">Precio</a>
        <a data-section="faq-section" href="${homeHref('#faq-section')}">Preguntas frecuentes</a>
        <a href="contact.html"${!onHome && pageName === 'contact.html' ? ' aria-current="page"' : ''}>Contacto</a>
        <a class="nw-nav-cta" href="${homeHref('#download-section')}">Probar gratis <span aria-hidden="true">→</span></a>
      </nav>
    </div>`;

  const header = document.querySelector('.header');
  const toggle = container.querySelector('.nw-menu-toggle');
  const nav = container.querySelector('.nw-main-nav');
  const sectionLinks = [...nav.querySelectorAll('[data-section]')];

  const closeMenu = () => {
    nav.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú de navegación');
    document.body.classList.remove('menu-open');
  };

  toggle.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    document.body.classList.toggle('menu-open', open);
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('click', (event) => {
    if (!container.contains(event.target)) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      toggle.focus();
    }
  });

  const updateHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 10);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (onHome && 'IntersectionObserver' in window) {
    const sections = sectionLinks
      .map((link) => document.getElementById(link.dataset.section))
      .filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      sectionLinks.forEach((link) => {
        const active = link.dataset.section === visible.target.id;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] });

    sections.forEach((section) => observer.observe(section));
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) closeMenu();
  });
});
