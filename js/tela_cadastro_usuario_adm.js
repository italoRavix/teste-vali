// ======================================================
// CADASTRO DE ADMINISTRADOR - VALI
// ------------------------------------------------------
// Realiza a validação dos dados informados no formulário
// de cadastro de administradores.
//
// Validações realizadas:
// - E-mail válido.
// - Senha com no mínimo 8 caracteres.
// - Confirmação de senha igual à senha.
// ======================================================


// Obtém os elementos principais da página
const formCadastroAdm = document.querySelector("#form-cadastro-adm");
const mensagemCadastroAdm = document.querySelector("#mensagem-cadastro-adm");


// Executa a lógica apenas se os elementos existirem
if (formCadastroAdm && mensagemCadastroAdm) {

    // Captura o envio do formulário
    formCadastroAdm.addEventListener("submit", (event) => {

        // Impede o envio padrão do formulário
        event.preventDefault();


        // ======================================================
        // LEITURA DOS DADOS INFORMADOS
        // ======================================================

        const email =
            document.querySelector("#email-usuario-adm").value.trim();

        const senha =
            document.querySelector("#senha-usuario-adm").value;

        const confirmacao =
            document.querySelector("#confirmacao-senha-usuario-adm").value;


        // Remove mensagens exibidas anteriormente
        mensagemCadastroAdm.textContent = "";
        mensagemCadastroAdm.className = "";


        // ======================================================
        // VALIDAÇÃO DO E-MAIL
        // ======================================================

        if (!email.includes("@")) {

            mensagemCadastroAdm.textContent =
                "Informe um e-mail válido.";

            mensagemCadastroAdm.classList.add("mensagem-erro");

            return;
        }


        // ======================================================
        // VALIDAÇÃO DA SENHA
        // ======================================================

        if (senha.length < 8) {

            mensagemCadastroAdm.textContent =
                "A senha deve possuir pelo menos 8 caracteres.";

            mensagemCadastroAdm.classList.add("mensagem-erro");

            return;
        }


        // ======================================================
        // CONFIRMAÇÃO DA SENHA
        // ======================================================

        if (senha !== confirmacao) {

            mensagemCadastroAdm.textContent =
                "As senhas não coincidem.";

            mensagemCadastroAdm.classList.add("mensagem-erro");

            return;
        }


        // ======================================================
        // OBJETO DO ADMINISTRADOR
        // ======================================================

        const administrador = {
            email: email,
            password: senha
        };


        // Exibe os dados validados no console
        console.log("Administrador:", administrador);


        // ======================================================
        // MENSAGEM DE SUCESSO
        // ======================================================

        mensagemCadastroAdm.textContent =
            "Administrador cadastrado com sucesso.";

        mensagemCadastroAdm.classList.add("mensagem-sucesso");

    });

}