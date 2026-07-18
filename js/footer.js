document.addEventListener("DOMContentLoaded", function() {
    var footerContent = `
    <div class="container">
        <div class="row">
            <div class="col text-center">
                <div class="footer_social">
                    <ul>
                        <li><a href="https://twitter.com/NotionWavelet"><img src="images/twitter.png" alt="" width="35"></a></li>
                        <li><a href="https://www.instagram.com/notionwavelet/"><img src="images/instagram.png" alt="" width="35"></a></li>
                        <li><a href="https://www.tiktok.com/@notion.wavelet"><img src="images/tiktok.png" alt="" width="35"></a></li>
                        <li><a href="https://www.pinterest.es/notionwavelet/"><img src="images/pinterest.png" alt="" width="35"></a></li>
                    </ul>
                </div>
                <div class="copyright" style="margin-top: 15px; font-size: 0.9rem; color: #6c757d;">
                    &copy; 2026 Noción de Ondícula. Todos los derechos reservados. <br>
                    <a href="legal.html" style="color: #BAC4CF; text-decoration: underline; margin-top: 5px; display: inline-block;">Aviso Legal y Privacidad</a>
                </div>
            </div>
        </div>
    </div>
    `;

    var footerContainer = document.querySelector("#footer_container");
    if (footerContainer) {
        footerContainer.innerHTML = footerContent;
    }
});
