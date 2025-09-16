// 1. Inicializa a variável 'produtos' no escopo global
// Isso garante que todas as outras funções possam acessá-la.
let produtos = [];


// Exemplo de como validar o campo código e adicionar máscara automática. 
// >>>>>>>>>>>>>   Não precisa sem implementado nada aqui <<<<<<<<<<<<<<<<<<<<<<<
document.addEventListener('DOMContentLoaded', function() {
    // 2. Carrega os produtos do Local Storage
    function carregaProdutosLocalStorage() {
        produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    }

    // 3. Adiciona o evento de 'blur', ou seja, quando sai do campo ao campo de código de barras
    // Adicione a lógica da máscara e da validação aqui
    const inputCodBarras = document.getElementById('codbarras');
    inputCodBarras.addEventListener('input', function(e) {
        let valor = e.target.value;
        valor = valor.replace(/\D/g, '');
        valor = valor.replace(/^(\d{1})(\d{6})(\d{6})/, "$1.$2.$3");
        if (valor.length > 15) {
            valor = valor.slice(0, 15);
        }
        e.target.value = valor;
    });

    inputCodBarras.addEventListener('blur', function() {
        const valor = inputCodBarras.value.replace(/\D/g, '');
        if (valor === '') {
            alert('Por favor, preencha o código de barras.');
            inputCodBarras.focus() //Faz com que o foco volte ao campo Código de Barras
        } else if (valor.length !== 13) {
            alert('O código de barras deve ter 13 dígitos.');
            inputCodBarras.focus()
        }
    });

    // 4. Carrega a lista de produtos 
    carregaProdutosLocalStorage();

    // 5. Lista os produtos na tabela
    listarProdutos(); 

});


// --- Funções que devem ser implementadas por vocês ---


function salvaProdutosLocalStorage() {
    localStorage.setItem('produtos', JSON.stringify(produtos));
    // Dica: Use JSON.stringify() para converter o array 'produtos' em uma string
    // e localStorage.setItem('produtos', ...) para salvar no Local Storage.
}

function adicionarProduto() {
    const codbarras = document.getElementById('codbarras').value;
    const nome = document.getElementById('nome').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const preco = parseFloat(document.getElementById('preco').value);

    if (!codbarras || !nome || isNaN(quantidade) || isNaN(preco)) {
         Swal.fire({
            title: 'Não há um produto para adicionar.',
            text: 'Por favor, preecha todos os campos.',
            icon: 'warning', //success, error, info, question
            confirmButtonText: 'OK'
        })
        return;
    }
    let jaExiste = false;

    produtos.forEach(p =>  {
        if(p.codbarras === codbarras) {
            jaExiste = true;
        }
    });

    if(jaExiste) {
         Swal.fire({
            title: 'Produto já cadastrado.',
            text: 'Já existe um produto com este código de barras.',
            icon: 'warning', //success, error, info, question
            confirmButtonText: 'OK'
        })
        return;
    }

    const novoProduto = {codbarras, nome, quantidade, preco};

    produtos.push(novoProduto);
    salvaProdutosLocalStorage();
    listarProdutos();
    
    document.getElementById('formProduto').reset();
 
    // Dica: 
    // 1. Pegue os valores dos campos do formulário: codbarras, nome, quantidade e preco.
    // 2. Crie um objeto com esses valores.
    // 3. Adicione este novo objeto ao array 'produtos' usando o método push().
    // 4. Chame salvaProdutosLocalStorage() para persistir os dados.
    // 5. Chame listarProdutos() para atualizar a tabela na tela.
    // 6. Limpe o formulário com document.getElementById('formProduto').reset().
    // 7. Implemente a validação para que os campos não fiquem vazios.
    // 8. Verifique se o produto já existe pelo código de barras e alerte o usuário.
}

function removerUltimo() {
    if(produtos.length === 0) {
        Swal.fire({
            title: 'Não existem produtos na lista',
            text: 'Não é possível remover um produto de uma lista vazia',
            icon: 'warning', //success, error, info, question
            confirmButtonText: 'Fechar'
        })
        return;
    }
    produtos.pop();
    salvaProdutosLocalStorage();
    listarProdutos();
    // Dica: Use o método pop() para remover o último item do array 'produtos'.
    // Lembre-se de chamar salvaProdutosLocalStorage() e listarProdutos() depois.
    // Verifique se a lista não está vazia antes de tentar remover.
}

function removerPrimeiro() {
    if(produtos.length === 0) {
        Swal.fire({
            title: 'Não existem produtos na lista',
            text: 'Não é possível remover um produto de uma lista vazia',
            icon: 'warning', //success, error, info, question
            confirmButtonText: 'Fechar'
        })
    } else {
        produtos.pop()
        salvaProdutosLocalStorage()
        listarProdutos
    } 
    // Dica: Use o método shift() para remover o primeiro item do array 'produtos'.
    // Lembre-se de chamar salvaProdutosLocalStorage() e listarProdutos() depois.
    // Verifique se a lista não está vazia antes de tentar remover.
}

function listarProdutos() {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";

    produtos.forEach(p => {
        const linha = `
            <tr>
                <td>${p.codbarras}</td>
                <td>${p.nome}</td>
                <td>${p.quantidade}</td>
                <td>R$ ${p.preco.toFixed(2)}</td>
            </tr>
        `;
        tbody.innerHTML += linha;
    });

    calcularTotal();
}


function ordenarPorNome() {
    produtos.sort((a, b) => a.nome.localeCompare(b.nome))
    listarProdutos();
    // Dica: Use o método sort() no array 'produtos'.
    // A função de comparação deve usar localeCompare() para comparar os nomes (a.nome, b.nome).
    // Depois, chame listarProdutos() para exibir a lista ordenada.
}

function ordenarPorPreco() {
    produtos.sort((a, b) => a.preco - b.preco);
    listarProdutos();
    // Dica: Use o método sort() no array 'produtos'.
    // A função de comparação deve retornar a diferença entre os preços (a.preco - b.preco).
    // Depois, chame listarProdutos() para exibir a lista ordenada.
}

function filtrarPorPreco() {
    const filtrados = produtos.filter(p => p.preco > 100);
    if(filtrados.length === 0) {
        alert("Nenhum produto acima de R$ 100.");
        return;
    }

    const nome = filtrados.map(p => p.nome).join(", ");
        Swal.fire({
            title: 'Produtos acima de R$ 100:',
            text: 'Produtos acima de R$ 100: ' + nome, 
            icon: 'warning', //success, error, info, question
            confirmButtonText: 'Fechar'
        })

    // Dica: Use o método filter() para criar um novo array com produtos
    // cujo preço seja maior que 100.
    // Em seguida, use map() para extrair apenas os nomes dos produtos filtrados.
    // Use join(', ') para formatar os nomes em uma única string e exiba com alert().
}

function calcularTotal() {
    const total = produtos.reduce((soma, p) => soma + (p.preco * p.quantidade), 0);
    document.getElementById("totalPreco").textContent = "Total: R$ " + total.toFixed(2);
    // Dica: Use o método reduce() no array 'produtos'.
    // A função de callback deve somar o valor total de cada produto (produto.quantidade * produto.preco).
    // Atualize o texto do elemento HTML que exibe o total com o valor formatado.
}