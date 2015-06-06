 // jQuery = $
$(document).ready(function(){
    SetAno(); 
    // Chamando uma função que esta na cadastrar.js
    ColocarEventoBlurNoCEP();               
});

// Declarando uma função
function SetAno() {
    // debugger é uma palavra reservada no JavaScript para parar a execução quando 
    // o f12 (console) estiver aberto. Então, assim que finalizar a tarefa, remova
    // do código!
    //debugger;
    
    // Colocando na variavel o objeto jquery que foi consultado na página
    // Através, com o # na frente.
    var $lbltimeNow = $('#lbltimeNow');
    // Jquery, colocar o 2015 no texto deste elemento
    $lbltimeNow.text('2015');
}

// Chamar a função
            
            