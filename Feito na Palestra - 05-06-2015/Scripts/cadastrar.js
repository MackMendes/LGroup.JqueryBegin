/// <reference path="../typings/jquery/jquery.d.ts"/>

// Boa pratica, colocar on {nome da função} {nome do evento}, quando 
// for utilizar essa função para ser acionada por um evento
function onCadastarClick() {
	RemoveClassError();
	if (ValidaCampos()) {
		// Cadastra
	}
	
}

function ValidaCampos() {
	debugger;
	var $txtNome = $("#txtNome");
	var $txtEmail = $("#txtEmail");
	var $txtCep = $("#txtCep");
	
	var isValido = true;
	
	// == : Faz comparação de valores, apenas! Não levando em consideraçã o tipo 
	// Não é igual! 
	
	// === : Faz comparação de tipo e valor! Então, ele é mais fiel! 
	if ($.trim($txtNome.val()) === "") {
		$txtNome.addClass('errorInput');
		isValido = false;
	}
	
	if ($.trim($txtEmail.val()) === "") {
		$txtEmail.addClass('errorInput');
		isValido = false;
	}
	
	if ($.trim($txtCep.val()) === "") {
		$txtCep.addClass('errorInput');
		isValido = false;
	}
	
	if (!isValido) {
		MostraMensagem('<strong>Erro: </strong>Por favor, preencha corretamente '+ 
		'os campos indicados abaixo.', 'alert-danger');
	}
	
	return isValido;
}


function MostraMensagem(mensagem, nomeClass) {
	// Abaixo, o encadeamento de funções que o Jquery têm
	$('#divMensagem').html(mensagem).addClass('alert').addClass(nomeClass);
}

function RemoveClassError() {
	// Selector do jQuery que procura dentro do arquivo HTML 
	// uma class com o nome informado. Colocamos o ponto(.) na frente.
	$('.errorInput').removeClass('errorInput');
}

function RemoveMensagem(nomeClass) {
	$('#divMensagem').html('').removeClass('alert').removeClass(nomeClass);
}

function onValidaBlur(htmlDom) {
	var $htmlDom = $(htmlDom);
	if ($.trim($htmlDom.val()) === "") {
		$htmlDom.addClass('errorInput');
	}
	else{
		$htmlDom.removeClass('errorInput');
	}
	
	if ($('.errorInput').length === 0) {
		RemoveMensagem('alert-danger');
	}
}