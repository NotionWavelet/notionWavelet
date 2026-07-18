document.addEventListener("DOMContentLoaded", function () {
    const navbarContainer = document.querySelector("#navbar_container");

    if (!navbarContainer) {
        return;
    }

    navbarContainer.innerHTML = `
        <div class="nw-navbar">
            <div class="nw-navbar__container">

                <a class="nw-navbar__brand" href="index.html" aria-label="Ir al inicio">
                    <span class="nw-navbar__logo">
                        <img
                            src="images/logo.png"
                            alt="Logotipo de Notion Wavelet"
                            width="38"
                            height="38"
                        >
                    </span>

                    <span class="nw-navbar__brand-text">
                        <strong>Notion Wavelet</strong>
                        <small>Software para talleres</small>
                    </span>
                </a>

                <button
                    class="nw-navbar__toggle"
                    type="button"
                    aria-label="Abrir menú de navegación"
                    aria-expanded="false"
                    aria-controls="main-navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav
                    id="main-navigation"
                    class="nw-navbar__navigation"
                    aria-label="Navegación principal"
                >
                    <a href="index.html" data-page="index.html">Inicio</a>
                    <a href="index.html#features-section">Funciones</a>
                    <a href="index.html#demo-section">Demostración</a>
                    <a href="index.html#benefits-section">Ventajas</a>
                    <a href="contact.html" data-page="contact.html">Contacto</a>

                    <a
                        class="nw-navbar__cta"
                        href="index.html#download-section"
                    >
                        Probar gratis
                        <i class="fa fa-arrow-right" aria-hidden="true"></i>
                    </a>
                </nav>

            </div>
        </div>
    `;

    const header = document.querySelector(".header");
    const toggleButton = navbarContainer.querySelector(".nw-navbar__toggle");
    const navigation = navbarContainer.querySelector(".nw-navbar__navigation");
    const navigationLinks = navigation.querySelectorAll("a");
    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    function updateHeaderOnScroll() {
        if (!header) {
            return;
        }

        header.classList.toggle("header--scrolled", window.scrollY > 10);
    }

    function closeMobileMenu() {
        navigation.classList.remove("nw-navbar__navigation--open");
        toggleButton.classList.remove("nw-navbar__toggle--active");
        toggleButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("navigation-open");
    }

    toggleButton.addEventListener("click", function () {
        const isOpen = navigation.classList.toggle(
            "nw-navbar__navigation--open"
        );

        toggleButton.classList.toggle("nw-navbar__toggle--active", isOpen);
        toggleButton.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("navigation-open", isOpen);
    });

    navigationLinks.forEach(function (link) {
        const page = link.getAttribute("data-page");

        if (page === currentPage) {
            link.classList.add("nw-navbar__link--active");
        }

        link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", function (event) {
        const clickedInsideNavbar = navbarContainer.contains(event.target);

        if (!clickedInsideNavbar) {
            closeMobileMenu();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMobileMenu();
        }
    });

    window.addEventListener("scroll", updateHeaderOnScroll, {
        passive: true
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth >= 992) {
            closeMobileMenu();
        }
    });

    updateHeaderOnScroll();
});
