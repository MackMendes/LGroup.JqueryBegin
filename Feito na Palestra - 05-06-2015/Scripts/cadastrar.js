/// <reference path="../typings/jquery/jquery.d.ts"/>

// Boa pratica, colocar on {nome da função} {nome do evento}, quando 
// for utilizar essa função para ser acionada por um evento
function onCadastarClick() {
	RemoveClassError();
	if (ValidaCampos()) {
		// Cadastra
		var cliente = {};  //new Object();
		cliente.nome = $("#txtNome").val();
		cliente.email =  $("#txtEmail").val();
		cliente.cep = $("#txtCep").val();
		cliente.endereco = $('#txtEndereco').val();
		cliente.bairro = $('#txtBairro').val();
		cliente.numero = $('#txtNumero').val();
		cliente.estado = $('#txtEstado').val();
		cliente.cidade = $('#txtCidade').val();
		cliente.isAtivo = $('#ckbAtivo').prop('checked');
		
		IncluirClienteNaLista(cliente);
		ListarCliente();
		
		LimpaCampos();
		MostrarMensagemSucesso();
	}
	
}

function ValidaCampos() {
	//debugger;
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
	// Selector do Jquery que recebe um DOM
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

function MostrarMensagemSucesso() {
	window.setTimeout(function (){
		RemoveMensagem('alert-success');
	}, 2000);
	
	MostraMensagem("<strong>Sucesso: </strong>Cliente cadastrado com sucesso!",
	"alert-success");
}


function LimpaCampos() {
	// Outra forma de fazer um Selector (selecionar um elemento da página)
	// através do Jquery. Passando para ele o tipo de elemento
	// com o tipo de input que ele recebe
	$('input[type="text"]').val('');
	$('input[type="email"]').val('');
	// .prop() = Propriedade que Objeto e não o Atribudo do HTML!
	// .attr() = Atributo do HTML que você vê no código HTML! 
	
	// Abaixo, estavamos atribuindo a PROPRIEDADE "checked" do Objeto do HTML, 
	// o valor false;
	$('input[type="checkbox"]').prop('checked', false);
}


function onBuscarCEPBlur(htmlDom) {
	var cepTxt = htmlDom.value;
	if ($.trim(cepTxt) !== "") {
		// {} = Objeto em JavaScript
		$.ajax({
			url: "http://api.postmon.com.br/v1/cep/" + cepTxt,
			type: "GET", 							// Versos HTTP! 
			dataType: "json",						// Tipo de retorno esperado
			//data: { cep: cepTxt },					// É o objeto que a API espera como parâmetro de entrada
			async: true,
			beforeSend: function(jqXHR, settings) {
				// Mostrar GIF de carregar
				$('#imgLoading').show();
			},
			// Chamada CallBack quando dê sucesso!
			success: function (data) {	
				debugger;	
				$('#txtEndereco').val(data.logradouro);
				$('#txtBairro').val(data.bairro);
				$('#txtEstado').val(data.estado);
				$('#txtCidade').val(data.cidade);
				
			},
			error: function (jqXHR, textStatus, errorThrown) {
				MostraMensagem('<strong>Erro: </strong>Não foi possível encontrar um ' + 
				'endereço para o CEP digitado.', 'alert-danger');
			},
			complete: function(jqXHR, settings) {
				// Desaparecer com o GIF
				$('#imgLoading').hide();
			}
		});
	
	
	}
	
}


function ColocarEventoBlurNoCEP() {
	$('#txtCep').blur(function(){
		debugger;
		onValidaBlur(this); 
		onBuscarCEPBlur(this);
	});
}