// $(document).ready() é a função do jQuery que executa o 
// código dentro dela após a página ser carregada.

$(document).ready(function () {
    debugger;
    // Palavra do JavaScript que o navegador identifica que deve parar ai
    // quando estiver com o F12 aberto.


    // No Jquery para selecionar um elemento da página através 
    // do ID, coloca-se na frente o '#'
    var lblAno = $("#lblAno");
    lblAno.text(new Date().getFullYear());
    // Aqui estavamos atribuindo no txtCep, no evento Blur dele a 
    // função onPegaEnderecoPorCepBlur (está no arquivo cadastro.js)
    // O Blur é um evento, acionado quando o elemento perde o focus(sai dele).
    $('#txtCep').blur(onPegaEnderecoPorCepBlur);
});
