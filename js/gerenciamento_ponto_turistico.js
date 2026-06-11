// ======================================================
// GERENCIAMENTO DE PONTOS TURÍSTICOS - VALI
// ======================================================

const botaoListarLocalizacoes = document.querySelector("#botao-listar-localizacoes");
const listaLocalizacoes = document.querySelector("#lista-localizacoes");
const formBuscaLocalizacao = document.querySelector("#form-editar-cadastro-item");
const inputBuscaLocalizacao = document.querySelector("#busca-item-para-edicao");


// ======================================================
// VALIDAÇÃO DE ADM
// ======================================================

function validarAdm() {
    const token = sessionStorage.getItem("token");
    const tipoUsuario = sessionStorage.getItem("tipoUsuario");

    if (!token || tipoUsuario !== "admin") {
        alert("Você precisa estar logado como ADM para acessar esta área.");
        window.location.href = "login.html";
        return null;
    }

    return token;
}


// ======================================================
// LISTAR LOCALIZAÇÕES
// ======================================================

async function listarLocalizacoes() {
    const token = validarAdm();

    if (!token || !listaLocalizacoes) {
        return;
    }

    try {
        listaLocalizacoes.innerHTML = "<p>Carregando localizações...</p>";

        const resposta = await fetch(`${API_URL}/v1/pontoturistico/listar`);

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar as localizações.");
        }

        const locais = await resposta.json();

        renderizarListaLocalizacoes(locais);

    } catch (erro) {
        console.error("Erro ao listar localizações:", erro);

        listaLocalizacoes.innerHTML = `
            <p class="mensagem-erro">
                ${erro.message}
            </p>
        `;
    }
}


// ======================================================
// RENDERIZAR LISTA
// ======================================================

function renderizarListaLocalizacoes(locais) {
    listaLocalizacoes.innerHTML = "";

    if (!locais || locais.length === 0) {
        listaLocalizacoes.innerHTML = `
            <p class="mensagem-erro">
                Nenhuma localização cadastrada.
            </p>
        `;
        return;
    }

    locais.forEach((local) => {
        const item = document.createElement("article");
        item.classList.add("item-localizacao-gerenciamento");

        item.innerHTML = `
            <div class="info-localizacao-gerenciamento">
                <h3>${local.nome}</h3>
                <p>${local.categoria || "Sem categoria"}</p>
                <span>${local.bairro || ""}</span>
            </div>

            <div class="acoes-localizacao-gerenciamento">
                <button
                    type="button"
                    class="botao-editar-localizacao"
                    data-nome="${local.nome}"
                >
                    Editar
                </button>

                <button
                    type="button"
                    class="botao-excluir-localizacao"
                    data-nome="${local.nome}"
                >
                    Excluir
                </button>
            </div>
        `;

        listaLocalizacoes.appendChild(item);
    });

    inicializarBotoesExcluir();
    inicializarBotoesEditar();
}


// ======================================================
// BUSCAR POR NOME
// ======================================================

async function buscarLocalizacaoPorNome(termoBusca) {
    const token = validarAdm();

    if (!token || !listaLocalizacoes) {
        return;
    }

    try {
        listaLocalizacoes.innerHTML = "<p>Buscando localização...</p>";

        const resposta = await fetch(`${API_URL}/v1/pontoturistico/listar`);

        if (!resposta.ok) {
            throw new Error("Não foi possível buscar as localizações.");
        }

        const locais = await resposta.json();

        const termoNormalizado = termoBusca.toLowerCase();

        const locaisFiltrados = locais.filter((local) => {
            return local.nome
                .toLowerCase()
                .includes(termoNormalizado);
        });

        renderizarListaLocalizacoes(locaisFiltrados);

    } catch (erro) {
        console.error("Erro ao buscar localização:", erro);

        listaLocalizacoes.innerHTML = `
            <p class="mensagem-erro">
                ${erro.message}
            </p>
        `;
    }
}


// ======================================================
// EXCLUIR LOCALIZAÇÃO
// ======================================================

function inicializarBotoesExcluir() {
    document.querySelectorAll(".botao-excluir-localizacao").forEach((botao) => {
        botao.addEventListener("click", async () => {
            const token = validarAdm();
            const nome = botao.dataset.nome;

            if (!token || !nome) {
                return;
            }

            const confirmar = confirm(`Deseja realmente excluir "${nome}"?`);

            if (!confirmar) {
                return;
            }

            try {
                const resposta = await fetch(
                    `${API_URL}/v1/pontoturistico/nome/${encodeURIComponent(nome)}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );

                if (!resposta.ok) {
                    throw new Error("Não foi possível excluir a localização.");
                }

                alert("Localização excluída com sucesso!");
                listarLocalizacoes();

            } catch (erro) {
                console.error("Erro ao excluir localização:", erro);
                alert(erro.message);
            }
        });
    });
}


// ======================================================
// EDITAR LOCALIZAÇÃO
// ======================================================

function inicializarBotoesEditar() {
    document.querySelectorAll(".botao-editar-localizacao").forEach((botao) => {
        botao.addEventListener("click", () => {
            alert("A edição será implementada em uma próxima versão do MVP.");
        });
    });
}


// ======================================================
// EVENTOS
// ======================================================

if (botaoListarLocalizacoes) {
    botaoListarLocalizacoes.addEventListener("click", listarLocalizacoes);
}

if (formBuscaLocalizacao) {
    formBuscaLocalizacao.addEventListener("submit", (event) => {
        event.preventDefault();

        const termoBusca = inputBuscaLocalizacao.value.trim();

        if (!termoBusca) {
            alert("Digite o nome da localização.");
            return;
        }

        buscarLocalizacaoPorNome(termoBusca);
    });
}