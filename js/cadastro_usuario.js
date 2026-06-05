console.log("CARREGADO");

// Esse script valida que as senhas do usuario são iguais antes de enviar o formulario
const senha = document.getElementById("cadastrar-senha-usuario");
const confirmacao = document.getElementById("cadastrar-confirmacao-senha-usuario");

senha.addEventListener("input", verificar);
confirmacao.addEventListener("input", verificar);

function verificar() {
    if (senha.value === confirmacao.value) {
        confirmacao.setCustomValidity("");
    } else {
        confirmacao.setCustomValidity("As senhas não coincidem.");
    }
}
