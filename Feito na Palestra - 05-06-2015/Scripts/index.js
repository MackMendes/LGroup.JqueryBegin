 // jQuery = $
$(document).ready(function(){
    SetAno();                
});

// Declarando uma função
function SetAno() {
    //
    //debugger;
    
    // Colocando na variavel o objeto jquery que foi consultado na página
    // Através, com o # na frente.
    var $lbltimeNow = $('#lbltimeNow');
    // Jquery, colocar o 2015 no texto deste elemento
    $lbltimeNow.text('2015');
}

// Chamar a função
            
            