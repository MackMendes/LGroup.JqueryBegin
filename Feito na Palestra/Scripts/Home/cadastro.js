
// Por boas prática, coloca-se na frente da função que for ser acionada no eveto, 
// 'on' + 'Nome do que vai fazer' + 'Nome do Evento'
function onCadastrarClick() {
    debugger;
    LimparAlerta();
    LimparMensagem();
    if (ValidaCadastro()) {
        var $checkedAtivo = $('#ckbAtivo');
        // Pegando a propriedade do elemento através do .prop(), do Jquery
        var isClienteValido = $checkedAtivo.prop('checked');

        alert('Sucesso!');
        LimparTodosOsCampos();

    }
}


function ValidaCadastro() {
    // Por boa prática, coloca-se na frente da variável
    // que esta armazenando um objeto jquery, '$'
    var $txtNome = $('#txtNome');
    var $txtEmail = $('#txtEmail');
    var $txtCep = $('#txtCep');

    var isValido = true;

    // $.trim() é do Jquery, faz a mesma função do .trim() do JavaScript mas, do jquery é Cross-Browser
    //if ($txtNome.val().trim() === '') {
    if ($.trim($txtNome.val()) === '') {
        isValido = false;
        $txtNome.addClass('errorInput');
    }

    if ($.trim($txtEmail.val()) === '') {
        isValido = false;
        $txtEmail.addClass('errorInput');
    }

    if ($.trim($txtCep.val()) === '') {
        isValido = false;
        $txtCep.addClass('errorInput');
    }

    //if (isValido === false) {
    // ! : Representa uma negação
    if (!isValido) {
        var mensagem = '<strong>Atenção: </strong>' +
         ' Por favor, preenchar os campos destacados abaixo.'
        ShowMensagem(mensagem);
    }

    return isValido;
}

function ShowMensagem(mensagem) {
    // Para selecionar um elemento da página através
    // da classe, utiliza-se . na frente do nome da classe

    // No Jquery, é possível chamar funções após funções.
    // O nome é encadeamento de funções.
    $('.divMensagemClass')
        .html(mensagem)
        .addClass('alert-danger')
        .addClass('alert');
}


function LimparAlerta() {
    $('#txtNome').removeClass('errorInput');
    $('#txtEmail').removeClass('errorInput');
    $('#txtCep').removeClass('errorInput');
}


function LimparMensagem() {
    $('.divMensagemClass')
        .removeClass('alert-danger')
        .removeClass('alert')
        .html('');
}

function onPegaEnderecoPorCepBlur() {
    // this representa esta elemento, no contexto atual. Aki, o this é o elemento que possiu essa função no evento o txtCep.
    // Mas, em outro contexto ele pode ser outro elemento ou propriedade. Então, cuidade ao utilizar o this.
    var cep = $(this).val();
    // Caso o usuário não tenha colocado nada no campo, não ainda ir buscar... então, validamos isso
    if ($.trim(cep) !== '') {
        AjaxPegarEndereco(cep);
    }
}

function AjaxPegarEndereco(cep) {
    // {} = É um objeto no JavaScritp
    $.ajax({
        url: "http://api.postmon.com.br/v1/cep/" + cep, // URL da API que iremos consumir
        dataType: "JSON", // Tipo esperado
        // Async é um parâmetro que o Ajax recebe 
        // para informar para ele, se vamos aguardar o retorno
        // ou não.
        async: true,
        // sucess é a função que é acionada quando a requisição
        // for realizado com sucesso. (CallBack)
        success: function (data) {
            PreencheEndereco(data);
        },
        // erro é uma função acionada quando a requisição
        // dê errado...
        error: function (jqXHR, textStatus, errorThrown) {
            var mensagem = '<strong>Erro: </strong>' +
                'O Cep informado não foi encontrado.' +
                ' Por favor, informe um Cep válido.';

            ShowMensagem(mensagem);
            LimparEndereco();
        },
        // Função executada antes do Envio da requisição
        beforeSend: function (xhr) {
            // .show() para fazer o elemento aparecer.
            $('#imgLoading').show();
        },
        // Função executada logo que a requisição completar, tanto se for com sucesso ou erro.
        complete: function (xhr) {
            // .hide() para fazer o elemento sumir
            $('#imgLoading').hide();
        }
    });
}


function PreencheEndereco(data) {
    $('#txtEndereco').val(data.logradouro);
    $('#txtBairro').val(data.bairro);
    $('#txtEstado').val(data.estado);
    $('#txtCidade').val(data.cidade);
}

// Caso dê erro na requisição, teremos que limpar os campos da consulta de endereco.
function LimparEndereco() {
    // Outra forma se buscar elemento no página com Jquery. 
    // Buscar mais de um elemento por ID (#), colocando vircula (,) e os ID dos elementos.
    // Vai retorna uma lista de elementos, e sem ter que fazer um for para limpar todos! 
    // O Jquery já atribui com o .val para todos de uma única vez.
    $('#txtEndereco, #txtBairro, #txtEstado, #txtCidade').val('');
}

function LimparTodosOsCampos() {
    // Outra forma de buscar elementos com o Jquery, passando o nome do elemento e o tipo dele.
    // O Jquery vai buscar em toda a página elementos <input type="text"> e atribuir o valor em branco para todos.
    $('input[type="text"]').val('');

    // E atribuindo para todos os elemento dentro da página que seja do tipo checkbox a propriedade checked como false
    $('input[type="checkbox"]').prop('checked', false);
}