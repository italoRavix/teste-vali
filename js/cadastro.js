// Esse script torna automatica a desabilitaçao dos inputs de horario de funcionamento se o checkbox 24h estiver marcado 

const checkbox24h = document.getElementById("cadastrar-ponto-turistico-24-horas");
const horaAbrir = document.getElementById("cadastrar-hora-abrir-ponto-turistico");
const horaFechar = document.getElementById("cadastrar-hora-fechar-ponto-turistico");

function alterarCamposHorario()
{
    const desabilitar = checkbox24h.checked;

    horaAbrir.disabled = desabilitar;
    horaFechar.disabled = desabilitar;

    if(desabilitar)
        {
            horaAbrir.value = "";
            horaFechar.value = "";
        }
}

checkbox24h.addEventListener("change", alterarCamposHorario)