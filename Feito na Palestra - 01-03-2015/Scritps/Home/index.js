
// $(document).ready = Função JQuery que vai ser executado 
// após a página ser renderizada.
$(document).ready(
    // Passando para a função ready do Jquery, uma outra função anonima. 
    function () {
        SetAno();
        SetOnBlurCep();
    });

function SetAno() {
    // debugger: É uma palavra reservada do JavaScript 
    // para sinalizar o navegador a parar a execução quando ele 
    // passar por ela, quando estiver com o f12 (console) aberto.
    // debugger;
    // Pegando um elemento HTML da página através do ID.
    // No Jquery, para identificar o ID do elemento, coloca-se # na 
    // frente do nome do ID.

    // Por boa pratica, coloca-se $ na frente de uma variavel que 
    // contem um objeto Jquery.
    var $lbltimeNow = $('#lbltimeNow'); 
    $lbltimeNow.text('2015');
}

// Essa função abaixo, estamos atribuindo ao txtCep um elemento blur(onblur).
// E a função onConsultaCEPBlur() esta em outro arquivo, abaixo deste.
// Isso só é possível, porque será executado após a página ser renderizada.
function SetOnBlurCep(){
    var $txtCep = $('#txtCep');
    // Passando para o evento Blur um função por 
    // parâmetro (programação Funcional);
    $txtCep.blur(onConsultaCEPBlur);
}