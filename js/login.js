// ======================================================
// LOGIN E CADASTRO - VALI
// ------------------------------------------------------
// Realiza as validações dos formulários de login
// e cadastro de usuários.
// ======================================================


// ======================================================
// ELEMENTOS
// ======================================================

const formLogin = document.querySelector("#form-login");
const formCadastro = document.querySelector("#form-cadastro");

const mensagemLogin =
    document.querySelector("#mensagem-login");

const mensagemCadastro =
    document.querySelector("#mensagem-cadastro");


// ======================================================
// LOGIN
// ======================================================

if (formLogin && mensagemLogin) {

    formLogin.addEventListener("submit", (event) => {

        event.preventDefault();

        const email =
            document.querySelector("#usuario_login").value.trim();

        const senha =
            document.querySelector("#senha_login").value;


        // Limpa mensagens anteriores
        mensagemLogin.textContent = "";
        mensagemLogin.className = "";


        // ==================================================
        // VALIDAÇÃO DO E-MAIL
        // ==================================================

        if (!email.includes("@")) {

            mensagemLogin.textContent =
                "Informe um e-mail válido.";

            mensagemLogin.classList.add("mensagem-erro");

            return;
        }


        // ==================================================
        // SUCESSO
        // ==================================================

        mensagemLogin.textContent = "Login realizado com sucesso.";
        mensagemLogin.classList.add("mensagem-sucesso");

        localStorage.setItem("usuarioLogado", "true");
        localStorage.setItem("tipoUsuario", "admin");

        setTimeout(() => {
            window.location.href = "home.html";
        }, 1000);
    });

}


// ======================================================
// CADASTRO
// ======================================================

if (formCadastro && mensagemCadastro) {

    formCadastro.addEventListener("submit", (event) => {

        event.preventDefault();

        const email =
            document.querySelector("#email_cadastro").value.trim();

        const senha =
            document.querySelector("#senha_cadastro").value;


        // Limpa mensagens anteriores
        mensagemCadastro.textContent = "";
        mensagemCadastro.className = "";


        // ==================================================
        // VALIDAÇÃO DO E-MAIL
        // ==================================================

        if (!email.includes("@")) {

            mensagemCadastro.textContent =
                "Informe um e-mail válido.";

            mensagemCadastro.classList.add("mensagem-erro");

            return;
        }


        // ==================================================
        // VALIDAÇÃO DA SENHA
        // ==================================================

        if (senha.length < 8) {

            mensagemCadastro.textContent =
                "A senha deve possuir pelo menos 8 caracteres.";

            mensagemCadastro.classList.add("mensagem-erro");

            return;
        }


        // ==================================================
        // OBJETO DO USUÁRIO
        // ==================================================

        const usuario = {
            email: email,
            password: senha
        };

        console.log("Usuário:", usuario);


        // ==================================================
        // SUCESSO
        // ==================================================

        mensagemCadastro.textContent =
            "Cadastro realizado com sucesso.";

        mensagemCadastro.classList.add("mensagem-sucesso");

    });

}