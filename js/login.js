// ======================================================
// LOGIN E CADASTRO - VALI
// ======================================================

const formLogin = document.querySelector("#form-login");
const formCadastro = document.querySelector("#form-cadastro");

const mensagemLogin = document.querySelector("#mensagem-login");
const mensagemCadastro = document.querySelector("#mensagem-cadastro");


// ======================================================
// LOGIN
// ------------------------------------------------------
// Usuário sem login continua navegando normalmente.
// Login comum não altera permissões visuais.
// Login ADM libera as opções administrativas.
// O login permanece ao recarregar a página.
// Ao fechar a aba/navegador, a sessão é encerrada.
// ======================================================

if (formLogin && mensagemLogin) {
    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nome = document.querySelector("#usuario_login").value.trim();
        const senha = document.querySelector("#senha_login").value;

        mensagemLogin.textContent = "";
        mensagemLogin.className = "";

        if (!nome) {
            mensagemLogin.textContent = "Informe seu usuário ou e-mail.";
            mensagemLogin.classList.add("mensagem-erro");
            return;
        }

        if (senha.length < 8) {
            mensagemLogin.textContent = "A senha deve possuir pelo menos 8 caracteres.";
            mensagemLogin.classList.add("mensagem-erro");
            return;
        }

        try {
            const resposta = await fetch(`${API_URL}/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: nome,
                    senha: senha
                })
            });

            if (!resposta.ok) {
                throw new Error("Usuário ou senha inválidos.");
            }

            const dados = await resposta.json();

            sessionStorage.setItem("usuarioLogado", "true");
            sessionStorage.setItem("token", dados.token);
            sessionStorage.setItem("tokenTipo", dados.type);
            sessionStorage.setItem("usuarioNome", nome);
            sessionStorage.setItem("usuarioRole", dados.role || "ROLE_PADRAO");

            if (dados.role === "ROLE_ADM") {
                sessionStorage.setItem("tipoUsuario", "admin");
            } else {
                sessionStorage.setItem("tipoUsuario", "usuario");
            }

            mensagemLogin.textContent = "Login realizado com sucesso.";
            mensagemLogin.classList.add("mensagem-sucesso");

            setTimeout(() => {
                window.location.href = "home.html";
            }, 800);

        } catch (erro) {
            mensagemLogin.textContent = erro.message;
            mensagemLogin.classList.add("mensagem-erro");
        }
    });
}


// ======================================================
// CADASTRO DE USUÁRIO COMUM
// ------------------------------------------------------
// O cadastro público cria apenas usuário comum.
// Usuários ADM devem ser criados/definidos pela área
// administrativa ou diretamente pelo banco.
// ======================================================

if (formCadastro && mensagemCadastro) {
    formCadastro.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.querySelector("#email_cadastro").value.trim();
        const senha = document.querySelector("#senha_cadastro").value;
        const confirmarSenha = document.querySelector("#confirmar_senha_cadastro").value;

        mensagemCadastro.textContent = "";
        mensagemCadastro.className = "";

        if (!email.includes("@")) {
            mensagemCadastro.textContent = "Informe um e-mail válido.";
            mensagemCadastro.classList.add("mensagem-erro");
            return;
        }

        if (senha.length < 8) {
            mensagemCadastro.textContent = "A senha deve possuir pelo menos 8 caracteres.";
            mensagemCadastro.classList.add("mensagem-erro");
            return;
        }

        if (senha !== confirmarSenha) {
            mensagemCadastro.textContent = "As senhas não conferem.";
            mensagemCadastro.classList.add("mensagem-erro");
            return;
        }

        try {
            const resposta = await fetch(`${API_URL}/v1/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: email,
                    senha: senha
                })
            });

            if (!resposta.ok) {
                throw new Error("Não foi possível realizar o cadastro.");
            }

            mensagemCadastro.textContent =
                "Cadastro realizado com sucesso. Agora faça login.";

            mensagemCadastro.classList.add("mensagem-sucesso");

            formCadastro.reset();

        } catch (erro) {
            mensagemCadastro.textContent = erro.message;
            mensagemCadastro.classList.add("mensagem-erro");
        }
    });
}


document.querySelectorAll(".google-login-btn").forEach((botao) => {
    botao.addEventListener("click", () => {

        const modal = document.createElement("div");

        modal.className = "modal-google";

        modal.innerHTML = `
            <div class="modal-google-conteudo">

                <h3>Em breve 🚀</h3>

                <button id="fechar-modal-google">
                    Entendi
                </button>

            </div>
        `;

        document.body.appendChild(modal);

        document
            .querySelector("#fechar-modal-google")
            .addEventListener("click", () => {
                modal.remove();
            });
    });
});