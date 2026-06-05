const botaoAbrirMenu = document.querySelector("#botao-abrir-menu");
const botaoFecharMenu = document.querySelector("#botao-fechar-menu");

if (botaoAbrirMenu && botaoFecharMenu) {
    botaoAbrirMenu.addEventListener("click", () => {
        document.body.classList.add("show-mobile-menu");
    });

    botaoFecharMenu.addEventListener("click", () => {
        document.body.classList.remove("show-mobile-menu");
    });
}

document.querySelectorAll(".filtro-btn").forEach(botao => {
    botao.addEventListener("click", () => {

        // Se já estiver ativo, desativa
        if (botao.classList.contains("ativo")) {
            botao.classList.remove("ativo");
            return;
        }

        // Remove o ativo dos outros
        document.querySelectorAll(".filtro-btn").forEach(btn => {
            btn.classList.remove("ativo");
        });

        // Ativa o clicado
        botao.classList.add("ativo");
    });
});