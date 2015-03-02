// Variável global para guarda a lista de clientes
// [] = Declaração de array no Javascript
var listaClientes = [];

function onCadastrarClick() {
    RemoveClassErroInput();
    RemoverMensagemError();
    if (ValidaHTML()) {
        // Se for valido, vamos pegar os valores digitados na página 
        // para cadastrar o cliente e colocar dentro uma variável global
        // que guarda um array de objetos.

        // Declarando abaixo um objeto para guardar os dados digitados na página
        var cliente = {};
        cliente.nome = $('#txtNome').val();
        cliente.email = $('#txtEmail').val();
        cliente.cep = $('#txtCep').val();
        cliente.endereco = $('#txtEndereco').val();
        cliente.bairro = $('#txtBairro').val();
        cliente.numero = $('#txtNumero').val();
        cliente.estados = $('#txtEstado').val();
        cliente.cidade = $('#txtCidade').val();
        // Cada HTML tem sua particularidade para manipular os dados dele.
        // O elemento abaixo é do tipo checkbox, para pegar o valor ele, não conseguimos por .val();
        // Temos que pegar o valor se foi checado como true ou false, através do .prop(), através desta 
        // função do Jquery, vamos pegar a propriedade 'checked' deste elemento.
        cliente.isAtivo = $('#ckbAtivo').prop('checked');

        // Depois de pegar todos os valores, vamos colocar esse objeto cliente dentro da lista (array) de objetos global.
        listaClientes.push(cliente);

        ShowMensagemSucesso();
        LimparTodosOsCampos();

        // Após cadastrar na lista, vamos preenche-las no grid.

        ListarCliente();
    }


}

function ValidaHTML() {
    var $txtNome = $('#txtNome');
    var $txtEmail = $('#txtEmail');
    var $txtCep = $('#txtCep');

    var isValido = true;
    // == : Igualdade de valores, somente! Não da um resultado 100% certeza.
    // === : Igualdade de tipo e valor. Mais fiel, da 100% de certeza nos resultados!

    if ($txtNome.val() === "") {
        $txtNome.addClass('errorInput');
        isValido = false;
    }

    if ($txtEmail.val() === "") {
        $txtEmail.addClass('errorInput');
        isValido = false;
    }

    if ($txtCep.val() === "") {
        $txtCep.addClass('errorInput');
        isValido = false;
    }

    // Podemos validar assim: 
    // (isValido !== true)
    // (isValido === false)
    if (!isValido) {
        ShowMensagemErro();
    }

    return isValido;
}

function ShowMensagemErro() {
    var $divAlerta = $('#divAlerta');
    var mensagem = '<strong>Erro: </strong>Por favor, preencha os campos indicados abaixo.';
    $divAlerta.html(mensagem);
    // Abaixo, estamos fazendo uma chama atras da outra (funções).
    // Isso é chamado de encadeamento de funções.
    $divAlerta.addClass("alert").addClass('alert-danger');
}

function RemoveClassErroInput() {
    // Abaixo, temos outro selector do Jquery, selecionar elementos da 
    // página através de class. Colocando . na frente do nome da class.
    var $listaInputErros = $('.errorInput');

    // O Jquery, vai remover as class de todos os elementos que ele 
    // encontrou. Sem precisar fazer um for e remover um por um.
    $listaInputErros.removeClass('errorInput');
}

function RemoverMensagemError() {
    // Encadeamento de funções:
    // Chamando função html(), removeClass(), removeClass();
    $('#divAlerta').html("").removeClass('alert').removeClass('alert-danger');
}

function onConsultaCEPBlur() {
    // Todo vez que for consultar, vai limpar os tempos antes de começar 
    // a requisição.
    LimparCamposEndereco();
    // Outra forma se selecionar elemento HTML na página, é passar um 
    // objeto DOM para o Jquery selecionar.
    var cep = $(this).val();

    // Caso algum cliente tenha realmente preenchido o campos txtCep 
    // ai sim, vamos assionar essa função.
    if (cep !== '') {
        AjaxConsultarCep(cep);
    }    
}

function AjaxConsultarCep(cep) {
    // Requisição Ajax
    // {} = Objeto do JavaScript
    $.ajax({
        // Url = É a URL da API que vamos consumir
        url: "http://api.postmon.com.br/v1/cep/" + cep,
        dataType: "JSON",
        // async: Como true, vai ser executado sem ter que travar a página.
        // uma requisição que será feito backend; O navegador não vai precisar
        // esperar o returno da requisição para continuar a executar os códigos.

        // async: Como false, vai travar a página. O navegador vai esperar 
        // a requisição ser concluida para continuar sua execução.

        // Por default, todas as requisições são assincronas (async = true);
        async: false,
        // beforeSend: Função que será executada antes de iniciar a requisição
        beforeSend: function (jqXHR, settings) {
            $('#imgLoading').show();
        },
        // success: Função será executada quando tiver sucesso na requisição (CallBack)
        success: function (data, textStatus, jqXHR) {
            PreencheEnderecoAjax(data);
        },
        // success: Função será executada quando tiver erro na requisição (CallBack)
        error: function (jqXHR, textStatus, errorThrown) {
            var $divAlerta = $('#divAlerta');
            var mensagem = '<strong>Erro: </strong>Erro ao tentar buscar o CEP. <br /> <i>'
                + errorThrown.message + '</i>';
            $divAlerta.html(mensagem);
            // Abaixo, estamos fazendo uma chama atras da outra (funções).
            // Isso é chamado de encadeamento de funções.
            $divAlerta.addClass("alert").addClass('alert-danger');

        },
        complete: function (jqXHR, settings) {
            $('#imgLoading').hide();
        }
    });
}


function PreencheEnderecoAjax(data) {
    $('#txtEndereco').val(data.logradouro);
    $('#txtBairro').val(data.bairro);
    $('#txtEstado').val(data.estado);
    $('#txtCidade').val(data.cidade);
}

// Quando ocorrer algum erro na requisição e os campos estiverem preenchidos, 
// temos que limpar os campos. 
function LimparCamposEndereco() {
    // Outra forma de selecinar uma elemento da página, através do selector do JQuery.
    // Passando os ID's dos elementos, todos de uma vez, separados por virgula (,);
    $('#txtEndereco, #txtBairro, #txtEstado, #txtCidade').val('');
}

// Função para monstrar uma mensagem de erro para o usuário
function ShowMensagemSucesso() {
    $('#divAlerta').html("<strong>Sucesso: </strong>Cliente cadastrado com sucesso.").addClass('alert').addClass('alert-success');

    // Para essa mensagem não ficar todo tempo na página, depois que salvo com suceso,
    // vamos limpar essa mensagem após 5 segundos
    window.setTimeout(LimpaMensagemSucesso, 5000);
}

function LimpaMensagemSucesso() {
    $('#divAlerta').html("").removeClass('alert').removeClass('alert-success');
}

function LimparTodosOsCampos() {
    // Outra forma de selecinar uma elemento da página, através do selector do JQuery.
    // Passando os tipos de elementos que gostaria que fosse selecionado. No caso abaixo
    // estamos pegando os elementos do tipo input, que tenha o atributo de typo: text, email e checkbox;

    $('input[type="text"], input[type="email"]').val('');

    // E atribuindo para todos os elemento dentro da página que seja do tipo checkbox a propriedade checked como false
    $('input[type="checkbox"]').prop('checked', false);
}