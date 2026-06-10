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
        inicializarBotaoLogin();

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
// BOTÃO LOGIN / SAIR
// =========================

function inicializarBotaoLogin() {
    const botaoLogin = document.querySelector("#botao-login");

    if (!botaoLogin) {
        return;
    }

    const usuarioLogado = sessionStorage.getItem("usuarioLogado");

    if (usuarioLogado === "true") {
        botaoLogin.textContent = "Sair";
        botaoLogin.href = "home.html";

        botaoLogin.addEventListener("click", (event) => {
            event.preventDefault();

            sessionStorage.clear();

            window.location.href = "home.html";
        });

        return;
    }

    botaoLogin.textContent = "Login";
    botaoLogin.href = "login.html";
}


// =========================
// INICIALIZAÇÃO
// =========================

document.addEventListener("DOMContentLoaded", () => {
    carregarHeader();
});