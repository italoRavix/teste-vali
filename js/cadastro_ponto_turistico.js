// ======================================================
// CADASTRO DE PONTO TURÍSTICO - VALI
// ======================================================

const formCadastrarItem = document.querySelector("#form-cadastrar-item");

const checkbox24h = document.querySelector("#cadastrar-ponto-turistico-24-horas");
const horaAbrir = document.querySelector("#cadastrar-hora-abrir-ponto-turistico");
const horaFechar = document.querySelector("#cadastrar-hora-fechar-ponto-turistico");


// ======================================================
// HORÁRIO 24H
// ======================================================

function alterarCamposHorario() {
    const aberto24h = checkbox24h.checked;

    horaAbrir.disabled = aberto24h;
    horaFechar.disabled = aberto24h;

    if (aberto24h) {
        horaAbrir.value = "00:00";
        horaFechar.value = "23:59";
        return;
    }

    horaAbrir.value = "";
    horaFechar.value = "";
}

if (checkbox24h && horaAbrir && horaFechar) {
    checkbox24h.addEventListener("change", alterarCamposHorario);
}


// ======================================================
// ENVIO PARA API
// ======================================================

if (formCadastrarItem) {
    formCadastrarItem.addEventListener("submit", async (event) => {
        event.preventDefault();

        const token = sessionStorage.getItem("token");
        const tipoUsuario = sessionStorage.getItem("tipoUsuario");

        if (!token || tipoUsuario !== "admin") {
            alert("Você precisa estar logado como ADM para cadastrar um local.");
            window.location.href = "login.html";
            return;
        }

        const nome = document.querySelector("#cadastrar-nome-ponto-turistico").value.trim();
        const telefone = document.querySelector("#cadastrar-telefone-ponto-turistico").value.trim();
        const email = document.querySelector("#cadastrar-email-ponto-turistico").value.trim();
        const bairro = document.querySelector("#cadastrar-bairro-ponto-turistico").value.trim();
        const rua = document.querySelector("#cadastrar-rua-ponto-turistico").value.trim();
        const descricao = document.querySelector("#cadastrar-descricao-ponto-turistico").value.trim();
        const categoria = document.querySelector("#cadastrar-categoria-ponto-turistico").value;

        const imagensTexto = document
            .querySelector("#cadastrar-imagens-ponto-turistico")
            .value
            .trim();

        const imagens = imagensTexto
            ? imagensTexto
                .split("\n")
                .map((url) => url.trim())
                .filter((url) => url)
            : [];

        const horaAbertura = `${horaAbrir.value}:00`;
        const horaFechamento = `${horaFechar.value}:00`;

        const pontoTuristico = {
            nome: nome,
            descricao: descricao,
            bairro: bairro,
            rua: rua,
            horaAbertura: horaAbertura,
            horaFechamento: horaFechamento,
            categoria: categoria.toUpperCase(),
            numeroCurtidas: 0,
            telefone: telefone ? [telefone] : [],
            imagem: imagens,
            email: email ? [email] : [],
            idCriador: 4
        };

        try {
            const resposta = await fetch(`${API_URL}/v1/pontoturistico`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(pontoTuristico)
            });

            if (!resposta.ok) {
                throw new Error("Não foi possível cadastrar o local.");
            }

            alert("Local cadastrado com sucesso!");
            formCadastrarItem.reset();

            window.location.href = "home.html";

        } catch (erro) {
            console.error("Erro ao cadastrar local:", erro);
            alert(erro.message);
        }
    });
}