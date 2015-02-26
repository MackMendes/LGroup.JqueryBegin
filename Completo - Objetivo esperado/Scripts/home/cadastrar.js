// 2º JS

// Aqui no JS cadastrar, vamos manipular o DOM para validar o cadastrado do cliente. E só mostrar a mensagem de sucesso se estiver tudo 
// devidamente preenchido.

function onCadastrarClick() {
    LimparMensagensErros();

    if (Validar()) {
        var $txtNome = $('#txtNome');
        var $txtTelefone = $('#txtTelefone');
        var $txtEmail = $('#txtEmail');
        var $txtDataNascimento = $('#txtDataNascimento');
        var $txtCep = $('#txtCep');
        var $txtEndereco = $('#txtEndereco');
        var $txtBairro = $('#txtBairro');
        var $txtNumero = $('#txtNumero');
        var $txtEstado = $('#txtEstado');
        var $txtCidade = $('#txtCidade');
        var $ckbAtivo = $('#ckbAtivo');

        // Declarando um objeto 
        var Cliente = {}; // === new Objct();

        Cliente.nome = $.trim($txtNome.val());
        Cliente.telefone = $.trim($txtTelefone.val());
        Cliente.email = $.trim($txtEmail.val());
        Cliente.dataNascimento = $.trim($txtDataNascimento.val());
        Cliente.cep = $.trim($txtCep.val());
        Cliente.endereco = $.trim($txtEndereco.val());
        Cliente.bairro = $.trim($txtBairro.val());
        Cliente.numeroEndereco = $.trim($txtNumero.val());
        Cliente.estado = $.trim($txtEstado.val());
        Cliente.cidade = $.trim($txtCidade.val());
        Cliente.isAtivo = $ckbAtivo.prop('checked'); //Pega a propriedade checked...

        // *** Após criar o 3º Js (index.js) vamos adicionar a linha abaixo:
        // Adicionando Cliente na lista de Cliente, só que... esse JS esta acima do index.js. Então, vamos organizar a ordem...
        // ** Falar sobre a forma de leitura do Navegador e a ordem interfere um com o outro...
        AdicionarCliente(Cliente);

        MensagemSucesso();
        LimparCampos();

        // Depois de criar o 4º JS:
        ListarCliente();
        return true;
    }

    return false;
}

function Validar() {
    var $txtNome = $('#txtNome');
    var $txtTelefone = $('#txtTelefone');
    var $txtEmail = $('#txtEmail');
    var $txtDataNascimento = $('#txtDataNascimento');
    var $txtCep = $('#txtCep');
    var $ckbAtivo = $('#ckbAtivo');

    var isValido = true;

    // === : Igualdade de tipo e valor. Essa comparação não faz conversão de valores para saber o valor. Boa pratica utiliza-lo!
    // == : Igualdade de valor, somente. Ele converte um dos valores com base no outro, e assim faz a verificação dos valores.
    // http://stackoverflow.com/questions/359494/does-it-matter-which-equals-operator-vs-i-use-in-javascript-comparisons

    // $.trim() é do Jquery, faz a mesma função do .trim() do JavaScript mas, do jquery é Cross-Browser
    //if ($txtNome.val().trim() === '') {
    if ($.trim($txtNome.val()) === '') {
        isValido = false;
        $txtNome.addClass('errorInput');
    }

    if ($.trim($txtTelefone.val()) === '') {
        isValido = false;
        $txtTelefone.addClass('errorInput');
    }

    if ($.trim($txtEmail.val()) === '') {
        isValido = false;
        $txtEmail.addClass('errorInput');
    }

    if ($.trim($txtDataNascimento.val()) === '') {
        isValido = false;
        $txtDataNascimento.addClass('errorInput');
    }

    if ($.trim($txtCep.val()) === '') {
        isValido = false;
        $txtCep.addClass('errorInput');
    }

    if (isValido === false) {
        var mensagem = '<strong>Atenção: </strong>Preencha os campos em destaque abaixo.'
        MensagemErro(mensagem);
    }

    return isValido;
}

function MensagemErro(mensagem) {
    var $divAlerta = $('#divAlert');
    // O objeto divAlerta do jQuery inseriu o HTML acima com .html() depois adicionou a classe 'alert' e depois adicinou mais uma classe
    // Esse sequencia de funções do objeto jQuery é chamada de ENCADEAMENTO DE FUNÇÕES. 
    $divAlerta.html(mensagem).addClass('alert').addClass('alert-danger');
}

function MensagemSucesso() {
    var $divAlerta = $('#divAlert');
    var mensagem = '<strong>Sucesso: </strong>Cliente cadastrado com sucesso!'
    $divAlerta.html(mensagem).addClass('alert').addClass('alert-success');
    DesaparecerMensagemSucesso();
}

function LimparMensagensErros() {
    // Para buscar elementos atraves da classe que eles possuem, colocar '.' na frente do nome da classe
    var listClassErrorInput = $('.errorInput');
    // Para remove as classes de todos os elementos HTML encontrados com a classe 'errorInput', no jQuery não é necessário percorrer 
    // o Array retornado para remove. O jQuery já encapsula o foreach e remove as classes.
    listClassErrorInput.removeClass('errorInput');

    var divAlerta = $('#divAlert');
    divAlerta.removeClass('alert').removeClass('alert-danger').html('');
}

// Função para LimparMensagem da Div Alerta
function LimparMensagem() {
    var divAlerta = $('#divAlert');
    divAlerta.html('').removeClass('alert').removeClass('alert-success');
}

// Função para LimparCampos
function LimparCampos() {
    // Cada HTML tem sua particularidade para manipular os dados dele

    // Outra forma de buscar elementos com o Jquery, passando o nome do elemento e o tipo dele.
    // O Jquery vai buscar em toda a página elementos <input type="text"> e atribuir o valor em branco para todos.
    $('input[type="text"]').val('');

    // Outra forma se buscar elemento no página com Jquery, a colocando vircula (,) e os elementos. O Jquery
    // retorna uma lista de elementos, e sem ter que fazer um for para limpar todos, atribui o valor em branco 
    // com o .val para todos de uma única vez.
    $('input[type="tel"], input[type="email"], input[type="datetime"]').val('');

    // E atribuindo para todos os elemento dentro da página que seja do tipo checkbox a propriedade checked como false
    $('input[type="checkbox"]').prop('checked', false);
}

function DesaparecerMensagemSucesso() {
    // setTimeout é uma função JavaScript que executa uma função após algums minutos...
    window.setTimeout(
        // Criando uma function anônima
        function () {
            LimparMensagem();
        }, 5000);
}


function onCepBlur(objJquery) {
    var cep = objJquery.value;
    if ($.trim(cep) !== '') {
        GetEnderecoAjax(cep);
    }
}

function GetEnderecoAjax(cep) {
    $.ajax({
        url: "http://api.postmon.com.br/v1/cep/" + cep,  // A URL da requisição
        dataType: "json",  // O tipo de Dado que você esta esperando voltar do servidor
        data: "", // Valor que vamos enviar para a requisição através da queryString, nesse exemplo não vamos utilizar
        async: false, // Se a requisição vai ser assincrona (quando não esperado o resultado) ou sincrona (quando esperado o resultado). Por Default é true.
        success: function (data) { // Sucess é uma função que será executada, por CallBack caso tenha sucesso.
            PreencheEndereco(data);
        },
        error: function (jqXHR, textStatus, errorThrown) { // Error é uma função que será executada, por CallBack caso tenha erro na requisição.
            // Pegando a mensagem de erro que foi retornada no CallBack
            var mensagem = "<strong>Erro: </strong> Ocorreu erro ao tentar buscar o CEP, por favor informe um CEP válido. <p><i>" + jqXHR.statusText + "</i></p>";
            MensagemErro(mensagem);
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


function PreencheEndereco(jsonEndereco) {
    LimparMensagensErros();
    $('#txtEndereco').val(jsonEndereco.logradouro);
    $('#txtBairro').val(jsonEndereco.bairro);
    $('#txtEstado').val(jsonEndereco.estado);
    $('#txtCidade').val(jsonEndereco.cidade);
}

function LimparEndereco() {
    // Outra forma se buscar elemento no página com Jquery. 
    // Buscar mais de um elemento por ID (#), colocando vircula (,) e os ID dos elementos.
    // Vai retorna uma lista de elementos, e sem ter que fazer um for para limpar todos! 
    // O Jquery já atribui com o .val para todos de uma única vez.
    $('#txtEndereco, #txtBairro, #txtEstado, #txtCidade').val('');
}