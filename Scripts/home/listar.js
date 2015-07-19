// 4º JS

// Nesse arquivo JS vamos listar todos os clientes que estão no Objeto listClietes, que esta no arquivo index.js.

function ListarCliente() {
    // Fazendo um IF Ternário: (Se o listClientes !== undefined ? Então retorna listClientes, senão (:) retorna um array vázio)
    var clientes = (listClientes !== undefined ? listClientes : []);

    var tagsTbody = '';

    for (var i = 0; i < clientes.length; i++) {
        tagsTbody += '<tr isAtivo="' + clientes[i].isAtivo + '">'

        // Index 
        tagsTbody += '<td>'
        tagsTbody += (i + 1).toString();
        tagsTbody += '</td>'

        // Nome
        tagsTbody += '<td>'
        tagsTbody += clientes[i].nome;
        tagsTbody += '</td>'

        // Telefone
        tagsTbody += '<td>'
        tagsTbody += clientes[i].telefone;
        tagsTbody += '</td>'

        // Email
        tagsTbody += '<td>'
        tagsTbody += clientes[i].email;
        tagsTbody += '</td>'

        // Data Nascimento
        tagsTbody += '<td>'
        tagsTbody += clientes[i].dataNascimento;
        tagsTbody += '</td>'

        // Endereco
        tagsTbody += '<td>'
        tagsTbody += clientes[i].endereco + ', nº' + clientes[i].numeroEndereco;
        tagsTbody += '</td>'

        // Cidade
        tagsTbody += '<td>'
        tagsTbody += clientes[i].cidade;
        tagsTbody += '</td>'

        // Ações que poderemos fazer
        tagsTbody += '<td>'
        tagsTbody += "<a href='javascript:void(0)' onclick=\"javascript: onExcluirClienteClick(" + i.toString() + ");\">Excluir</a>";
        tagsTbody += '</td>'
        tagsTbody += '</tr>'
    }

    var $tbodyClientes = $('#tbListaCliente').find('tbody');
    $tbodyClientes.html(tagsTbody);

    $('tbody tr').mouseover(function () {
        debugger;
        var atributoIsAtivo = $(this).attr('isAtivo');
        onClienteAtivoMouseOver(this, atributoIsAtivo);
    });
}

// Função para Excluir o cliente dentro a listClientes (variável Global dentro do arquivo index.js
function onExcluirClienteClick(index) {
    if (listClientes !== undefined && listClientes.length > index) {
        // confirm : É uma função do JavaScript, parecida com o alert mas, é retorna um booleano! Se o usuário clicar em "Sim", retorna um true
        // e se clicar em "Não" retorna false.
        if (confirm('Tem realmente certeza que seja excluir esse cliente?')) {
            // splice é uma função no JavaScript, disponível no Objeto Array. O primeiro parâmetro é o index inicial do array, e o segundo parâmetro 
            // é quantidade que será removido do Array.
            listClientes.splice(index, 1);
        }
    }

    // Listamos os cliente novamente
    ListarCliente();
}

// Função do MouseOver
function onClienteAtivoMouseOver(domHtml, isAtivo) {
    if (isAtivo === "false") {
        domHtml.style.border = 'red 1px dashed';
    }
}