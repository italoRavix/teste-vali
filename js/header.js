// =========================
// COMPONENTES GLOBAIS
// =========================

async function carregarHeader() {
    const headerContainer = document.querySelector("#header-container");

    if (!headerContainer) {
        return;
    }

    try {
        const resposta = await fetch("components/header.html");

        if (!resposta.ok) {
            throw new Error("Erro ao carregar o header.");
        }

        const headerHtml = await resposta.text();

        headerContainer.innerHTML = headerHtml;

        inicializarMenuMobile();

    } catch (erro) {
        console.error("Erro ao carregar o header:", erro);
    }
}


// =========================
// MENU MOBILE
// =========================

function inicializarMenuMobile() {
    const botaoAbrirMenu = document.querySelector("#botao-abrir-menu");
    const botaoFecharMenu = document.querySelector("#botao-fechar-menu");

    if (!botaoAbrirMenu || !botaoFecharMenu) {
        return;
    }

    botaoAbrirMenu.addEventListener("click", () => {
        document.body.classList.add("show-mobile-menu");
    });

    botaoFecharMenu.addEventListener("click", () => {
        document.body.classList.remove("show-mobile-menu");
    });
}


// =========================
// INICIALIZAÇÃO
// =========================

document.addEventListener("DOMContentLoaded", () => {
    carregarHeader();
});