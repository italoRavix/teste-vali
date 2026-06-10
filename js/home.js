// =========================
// FILTROS
// =========================

let categoriaAtiva = null;

const botoesFiltro = document.querySelectorAll(".filtro-btn");

botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
        const categoria = botao.dataset.categoria;

        if (!categoria) {
            return;
        }

        const categoriaFormatada = categoria.toUpperCase();

        if (categoriaAtiva === categoriaFormatada) {
            categoriaAtiva = null;
            botao.classList.remove("ativo");
            carregarLocais();
            return;
        }

        botoesFiltro.forEach((btn) => {
            btn.classList.remove("ativo");
        });

        categoriaAtiva = categoriaFormatada;
        botao.classList.add("ativo");

        carregarLocais(categoriaAtiva);
    });
});


// =========================
// ELEMENTOS DA HOME
// =========================

const locaisContainer = document.querySelector("#locais-container");
const templateLocalCard = document.querySelector("#template-local-card");


// =========================
// BUSCA DOS LOCAIS NA API
// =========================

async function carregarLocais(categoria = null) {
    try {
        locaisContainer.innerHTML = "";

        const url = categoria
            ? `${API_URL}/v1/pontoturistico/categoria/${categoria}`
            : `${API_URL}/v1/pontoturistico/listar`;

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar locais.");
        }

        const locais = await resposta.json();

        renderizarLocais(locais);
    } catch (erro) {
        console.error("Erro ao buscar locais:", erro);

        locaisContainer.innerHTML = `
            <p class="mensagem-erro">
                Não foi possível carregar os locais no momento.
            </p>
        `;
    }
}


// =========================
// RENDERIZAÇÃO DOS LOCAIS
// =========================

function renderizarLocais(locais) {
    locaisContainer.innerHTML = "";

    if (!locais || locais.length === 0) {
        locaisContainer.innerHTML = `
            <p class="mensagem-erro">
                Nenhum local encontrado.
            </p>
        `;
        return;
    }

    locais.forEach((local) => {
        const card = templateLocalCard.content.cloneNode(true);

        const nome = card.querySelector(".local-nome");
        const imagem = card.querySelector(".carrossel-imagem");
        const descricao = card.querySelector(".local-descricao");
        const horario = card.querySelector(".local-horario");
        const indicadores = card.querySelector(".carrossel-indicadores");

        const imagens = local.imagem && local.imagem.length > 0
            ? local.imagem
            : ["assets/img/placeholder-local.jpg"];

        nome.textContent = local.nome;
        descricao.textContent = local.descricao;

        horario.textContent =
            `Horário de funcionamento: ${formatarHorario(local.horaAbertura)} às ${formatarHorario(local.horaFechamento)}`;

        imagem.src = imagens[0];
        imagem.alt = `Imagem de ${local.nome}`;

        indicadores.innerHTML = "";

        imagens.forEach((_, index) => {
            const indicador = document.createElement("span");
            indicador.classList.add("indicador");

            if (index === 0) {
                indicador.classList.add("ativo");
            }

            indicadores.appendChild(indicador);
        });

        prepararCarrossel(card, imagens, local.nome);

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
        imagemAtual =
            imagemAtual === 0 ? imagens.length - 1 : imagemAtual - 1;

        atualizarCarrossel();
    });

    botaoProximo.addEventListener("click", () => {
        imagemAtual =
            imagemAtual === imagens.length - 1 ? 0 : imagemAtual + 1;

        atualizarCarrossel();
    });

    if (imagens.length <= 1) {
        botaoAnterior.style.display = "none";
        botaoProximo.style.display = "none";
    }
}


// =========================
// FORMATAÇÃO
// =========================

function formatarHorario(horario) {
    if (!horario) {
        return "--:--";
    }

    return horario.slice(0, 5);
}


// =========================
// ÁREA ADMINISTRATIVA
// =========================

const secaoAdminHome = document.querySelector("#secao-admin-home");

const usuarioLogado = sessionStorage.getItem("usuarioLogado");
const tipoUsuario = sessionStorage.getItem("tipoUsuario");

if (secaoAdminHome && usuarioLogado === "true" && tipoUsuario === "admin") {
    secaoAdminHome.classList.add("visivel");
}


// =========================
// INICIALIZAÇÃO
// =========================

carregarLocais();