// =========================
// FOOTER GLOBAL
// =========================

const footerTemplate = `
    <footer class="rodape">
        <div class="conteudo-secao rodape-conteudo">

            <div class="rodape-logo-area">
                <img 
                    src="assets/img/logo_vali_tatu-sem-fundo.png" 
                    class="rodape-logo" 
                    alt="Logo da Vali"
                >

                <p class="rodape-descricao">
                    Descubra lugares, eventos e experiências em Diamantina com a Vali.
                </p>
            </div>

            <div class="rodape-secao">
                <h3 class="rodape-titulo">Navegação</h3>

                <a href="home.html" class="rodape-link">Início</a>
                <a href="catalogo.html" class="rodape-link">Catálogo</a>
                <a href="sobre_nos.html" class="rodape-link">Sobre nós</a>
                <a href="login.html" class="rodape-link">Login</a>
            </div>

            <div class="rodape-secao">
                <h3 class="rodape-titulo">Suporte</h3>

                <a href="#" class="rodape-link">Central de ajuda</a>
                <a href="#" class="rodape-link">Política de privacidade</a>
                <a href="#" class="rodape-link">Termos de uso</a>
            </div>

            <div class="rodape-secao">
                <h3 class="rodape-titulo">Redes sociais</h3>

                <a href="#" class="rodape-link">Instagram</a>
                <a href="#" class="rodape-link">LinkedIn</a>
                <a href="#" class="rodape-link">Twitter</a>
            </div>

            <div class="rodape-secao">
                <h3 class="rodape-titulo">Contato</h3>

                <p class="rodape-texto">contato@vali.com</p>
                <p class="rodape-texto">Diamantina - MG</p>
            </div>

        </div>

        <div class="rodape-base">
            <p>&copy; 2026 Vali. Todos os direitos reservados.</p>
        </div>
    </footer>
`;

document.body.insertAdjacentHTML("beforeend", footerTemplate);