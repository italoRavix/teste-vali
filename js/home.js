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

// =========================
// DADOS TEMPORÁRIOS
// Futuramente virão da API Java
// =========================
const locaisExemplo = [
    {
        id: 1,
        nome: "Nome do local",
        categoria: "natureza",
        descricao: "Descrição breve do local. Esse texto será substituído futuramente pelos dados cadastrados pelo administrador.",
        horario: "Horário de funcionamento: 08:00 às 18:00",
        imagens: [
            "assets/img/placeholder-local.jpg",
            "assets/img/feature-image-trim-trees.jpeg.webp"
        ]
    }
];


// =========================
// RENDERIZAÇÃO DOS LOCAIS
// =========================
const locaisContainer = document.querySelector("#locais-container");
const templateLocalCard = document.querySelector("#template-local-card");

function renderizarLocais(locais) {
    locaisContainer.innerHTML = "";

    locais.forEach((local) => {
        const card = templateLocalCard.content.cloneNode(true);

        const nome = card.querySelector(".local-nome");
        const imagem = card.querySelector(".carrossel-imagem");
        const descricao = card.querySelector(".local-descricao");
        const horario = card.querySelector(".local-horario");
        const indicadores = card.querySelector(".carrossel-indicadores");

        nome.textContent = local.nome;
        descricao.textContent = local.descricao;
        horario.textContent = local.horario;

        imagem.src = local.imagens[0];
        imagem.alt = `Imagem de ${local.nome}`;

        indicadores.innerHTML = "";

        local.imagens.forEach((_, index) => {
            const indicador = document.createElement("span");
            indicador.classList.add("indicador");

            if (index === 0) {
                indicador.classList.add("ativo");
            }

            indicadores.appendChild(indicador);
        });

        prepararCarrossel(card, local.imagens, local.nome);

        locaisContainer.appendChild(card);
    });
}


// =========================
// CARROSSEL DE IMAGENS
// =========================
function prepararCarrossel(card, imagens, nomeLocal) {
    let imagemAtual = 0;

    const imagem = card.querySelector(".carrossel-imagem");
    const botaoAnterior = card.querySelector(".carrossel-botao-anterior");
    const botaoProximo = card.querySelector(".carrossel-botao-proximo");
    const indicadores = card.querySelectorAll(".indicador");

    function atualizarCarrossel() {
    imagem.classList.add("trocando");

    setTimeout(() => {
        imagem.src = imagens[imagemAtual];
        imagem.alt = `Imagem ${imagemAtual + 1} de ${nomeLocal}`;

        indicadores.forEach((indicador, index) => {
            indicador.classList.toggle("ativo", index === imagemAtual);
        });

        imagem.classList.remove("trocando");
    }, 100);
}

    botaoAnterior.addEventListener("click", () => {
        imagemAtual = imagemAtual === 0 ? imagens.length - 1 : imagemAtual - 1;
        atualizarCarrossel();
    });

    botaoProximo.addEventListener("click", () => {
        imagemAtual = imagemAtual === imagens.length - 1 ? 0 : imagemAtual + 1;
        atualizarCarrossel();
    });

    if (imagens.length <= 1) {
        botaoAnterior.style.display = "none";
        botaoProximo.style.display = "none";
    }
}


// =========================
// INICIALIZAÇÃO
// =========================
renderizarLocais(locaisExemplo);


// =========================
// FUTURA INTEGRAÇÃO COM API JAVA
// =========================
// Quando a API estiver pronta, você poderá trocar o renderizarLocais(locaisExemplo)
// por algo assim:
//
// fetch("http://localhost:8080/api/locais")
//     .then((resposta) => resposta.json())
//     .then((locais) => {
//         renderizarLocais(locais);
//     })
//     .catch((erro) => {
//         console.error("Erro ao carregar locais:", erro);
//     });