// 1ª JS

// jQuery = $
// Função ready do Jquery, executa a função que recebe, após o navegador carregar (renderizar) toda a página
jQuery(document).ready(function () {
    ExecutarTodasFuncoes();
});

// $(function() {});

// Função Nomeada (SetYearFooter)
function SetYearFooter() {
    // debugger: uma palavra reservada do JavaScript para debugar o código. Quando o Navegador estiver com o Console (f12) dele aberto, vai parar a interpretação
    // do código quando encontrar esse palavra
    debugger;
    // Quando for pegar um elemento HTML por ID, utiliza-se '#' na frente e o ID do elemento
    // Por boa prática, utiliza-se '$' na frente da variável que for armazenar um objeto Jquery
    var $lblFooter = $('#lbltimeNow');
    // new Date() = Estamos instânciando a função Date() do javaScript, e chamando o getFullYear() para retornar o ano
    $lblFooter.text(new Date().getFullYear().toString());
}


function ExecutarTodasFuncoes() {
    SetYearFooter();
    AtribuiOnBlurCep();
}


function AtribuiOnBlurCep() {
    $('#txtCep').blur(function () {
        onCepBlur(this);
    });
}