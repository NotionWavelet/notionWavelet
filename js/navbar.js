document.addEventListener("DOMContentLoaded", function() {
    var navbarContent = `
    <div class="header_inner d-flex flex-row align-items-center justify-content-start">
        <nav class="main_nav">
            <ul>
                <li class="brand"><img src="images/logo.png" alt="Logo" width="30"><a href="index.html">Noción de Ondícula</a></li>

                <!-- Mega Menú -->
                <li class="has-mega"><a href="#">Software <i class="fa fa-chevron-down"></i></a>
                    <div class="mega-menu">
                        <div class="mega-row">
                            <div class="mega-col">
                                <h4>Gestión</h4>
                                <a href="#facturacion">Facturación</a>
                                <a href="#ordenes">Órdenes de Trabajo</a>
                            </div>
                            <div class="mega-col">
                                <h4>Compliance</h4>
                                <a href="#factura-e">Factura Electrónica</a>
                                <a href="#auditoria">Auditoría</a>
                            </div>
                        </div>
                    </div>
                </li>
                <li><a href="#demo-section">Video Demo</a></li>
                <li><a href="contact.html">Contacto</a></li>
            </ul>
        </nav>
    </div>
    `;

    var navbarContainer = document.querySelector("#navbar_container");
    if (navbarContainer) {
        navbarContainer.innerHTML = navbarContent;
    }
});
