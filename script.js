// Função para carregar dados do LocalStorage
function carregarDados() {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const historico = JSON.parse(localStorage.getItem('historico')) || [];

    return {clientes, produtos, pedidos, historico};
}

// Função para salvar dados no LocalStorage
function salvarDados(clientes, produtos, pedidos, historico) {
    localStorage.setItem('clientes', JSON.stringify(clientes));
    localStorage.setItem('produtos', JSON.stringify(produtos));
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    localStorage.setItem('historico', JSON.stringify(historico));
}

// Carrega os dados quando a página é carregada
carregarDados();


// Função para atualizar a tabela de clientes
function atualizarTabelaClientes() {
    const tabelaClientes = document.getElementById('clientes-lista');
    const clientes = carregarDados();
    
    // Limpa a tabela antes de atualizar
    tabelaClientes.innerHTML = '';

    // Itera sobre os clientes e cria novas linhas na tabela
    clientes.forEach(cliente => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
            <td><button onclick="removerCliente(${cliente.id})">Remover</button></td>
        `;
        tabelaClientes.appendChild(row);
    });
}

// Função para adicionar um cliente
document.getElementById('cliente-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    const clientes = carregarDados();

    // Novo cliente com ID incremental
    const novoCliente = {
        id: clientes.length + 1,
        nome,
        email,
        telefone
    };

    // Adiciona o novo cliente à lista e salva no LocalStorage
    clientes.push(novoCliente);
    salvarDados(clientes, produtos, pedidos, historico);

    // Atualiza a tabela de clientes
    atualizarTabelaClientes();

    // Limpa os campos do formulário
    document.getElementById('cliente-form').reset();
});

// Carrega e atualiza a tabela ao carregar a página
window.onload = function() {
    atualizarTabelaClientes();
}

// Formulário de Produtos
document.getElementById('produto-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nomeProduto = document.getElementById('nome-produto').value;
    const preco = document.getElementById('preco').value;
    const pontosProduto = document.getElementById('pontos-produto').value;

    const novoProduto = {
        id: produtos.length + 1,
        nomeProduto,
        preco,
        pontosProduto
    };

    produtos.push(novoProduto);
    salvarDados(); // Salva os produtos no LocalStorage
    atualizarListaProdutos();
});

function atualizarListaProdutos() {
    const listaProdutos = document.getElementById('produtos-lista');
    listaProdutos.innerHTML = '';

    produtos.forEach(produto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.nomeProduto}</td>
            <td>R$ ${produto.preco}</td>
            <td>${produto.pontosProduto} Pontos</td>
            <td><button onclick="removerProduto(${produto.id})">Remover</button></td>
        `;
        listaProdutos.appendChild(row);
    });
}

function removerProduto(id) {
    produtos = produtos.filter(produto => produto.id !== id);
    salvarDados(); // Salva os produtos atualizados no LocalStorage
    atualizarListaProdutos();
}

// Formulário de Pedidos
document.getElementById('pedido-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const cliente = document.getElementById('cliente-pedido').value;
    const produto = document.getElementById('produto-pedido').value;
    const quantidade = document.getElementById('quantidade').value;

    const produtoEncontrado = produtos.find(p => p.nomeProduto === produto);
    if (!produtoEncontrado) {
        alert('Produto não encontrado!');
        return;
    }

    const total = produtoEncontrado.preco * quantidade;

    const novoPedido = {
        id: pedidos.length + 1,
        cliente,
        produto,
        quantidade,
        total
    };

    pedidos.push(novoPedido);
    salvarDados(); // Salva os pedidos no LocalStorage
    atualizarListaPedidos();
});

function atualizarListaPedidos() {
    const listaPedidos = document.getElementById('pedidos-lista');
    listaPedidos.innerHTML = '';

    pedidos.forEach(pedido => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pedido.id}</td>
            <td>${pedido.cliente}</td>
            <td>${pedido.produto}</td>
            <td>${pedido.quantidade}</td>
            <td>R$ ${pedido.total.toFixed(2)}</td>
            <td><button onclick="removerPedido(${pedido.id})">Remover</button></td>
        `;
        listaPedidos.appendChild(row);
    });
}

function removerPedido(id) {
    pedidos = pedidos.filter(pedido => pedido.id !== id);
    salvarDados(); // Salva os pedidos atualizados no LocalStorage
    atualizarListaPedidos();
}

// Formulário de Histórico
document.getElementById('historico-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const cliente = document.getElementById('cliente-historico').value;
    const produto = document.getElementById('produto-historico').value;

    const produtoEncontrado = produtos.find(p => p.nomeProduto === produto);
    if (!produtoEncontrado) {
        alert('Produto não encontrado!');
        return;
    }

    const pontos = produtoEncontrado.pontosProduto;

    const novoHistorico = {
        cliente,
        produto,
        pontos
    };

    historico.push(novoHistorico);
    salvarDados(); // Salva o histórico no LocalStorage
    atualizarListaHistorico();
});

function atualizarListaHistorico() {
    const listaHistorico = document.getElementById('historico-lista');
    listaHistorico.innerHTML = '';

    historico.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.cliente}</td>
            <td>${item.produto}</td>
            <td>${item.pontos}</td>
        `;
        listaHistorico.appendChild(row);
    });
}

// Chama a função de atualização para exibir os dados salvos ao carregar a página
atualizarListaProdutos();
atualizarListaPedidos();
atualizarListaHistorico();
