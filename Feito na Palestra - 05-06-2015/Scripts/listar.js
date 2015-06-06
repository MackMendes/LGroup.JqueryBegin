
// Array de objetos em javascript
var listaDeCliente = [];

function IncluirClienteNaLista(cliente) {
	listaDeCliente.push(cliente);
}


function ListarCliente() {
    // Fazendo um IF Ternário: (Se o listClientes !== undefined ? Então retorna listClientes, senão (:) retorna um array vázio)
    var clientes = (listaDeCliente !== undefined ? listaDeCliente : []);

    var tagsTbody = '';

    // Através da lista de cliente cadastrados, percorremos cada um deles para preencher os 
    // HTML's e colocar na listagem (table)
    for (var i = 0; i < clientes.length; i++) {
        tagsTbody += '<tr">';

        // Index 
        tagsTbody += '<td>';
        tagsTbody += (i + 1).toString();
        tagsTbody += '</td>';

        // Nome
        tagsTbody += '<td>';
        tagsTbody += clientes[i].nome;
        tagsTbody += '</td>';

        // Email
        tagsTbody += '<td>';
        tagsTbody += clientes[i].email;
        tagsTbody += '</td>';

        // Endereco
        tagsTbody += '<td>';
        tagsTbody += clientes[i].endereco + ', nº' + clientes[i].numero;
        tagsTbody += '</td>';

        // Bairro
        tagsTbody += '<td>';
        tagsTbody += clientes[i].bairro;
        tagsTbody += '</td>';

        // Cidade
        tagsTbody += '<td>';
        tagsTbody += clientes[i].cidade;
        tagsTbody += '</td>';

        // Se esta ativo
        tagsTbody += '<td>';
        tagsTbody += clientes[i].isAtivo;
        tagsTbody += '</td>';

        tagsTbody += '</tr>';
    }

    // Depois que percorrer todos os clientes cadastrados, vamos inclir no HTML esta table os elementos criados acima (em string).
    // E com a função .find(), o Jquery vai dentro da Table com o ID "#tbListaCliente", vai procurar uma elemento tbody.
    var $tbodyClientes = $('#tbListaCliente').find('tbody');
    $tbodyClientes.html(tagsTbody);
}