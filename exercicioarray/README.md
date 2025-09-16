# Gerenciamento de Produtos

Este é um projeto para praticar o desenvolvimento de um sistema de gerenciamento de produtos simples, utilizando HTML, CSS e JavaScript. A sua tarefa é implementar a lógica em JavaScript para que todas as funcionalidades da aplicação funcionem corretamente e você possa ver na prática o uso dos métodos nativos de Array do JavaScript.

>> Exercício criado pelo Prof. Ricardo Leme para a Fatec Itu.

## Objetivo

Você deve completar o arquivo `js/script.js`, implementando as funções listadas abaixo. Todas as funções já foram declaradas no arquivo, mas estão incompletas. Você precisará adicionar a lógica necessária para que o sistema de gerenciamento de produtos opere como o esperado.

## Como começar
Clone o projeto na sua máquina com o seguinte comando:

* Crie uma pasta chamada exercicioArray no seu Sistema Operacional.
* Abra o _VS Code_, abra a pasta criada e vá até o menu `Terminal\New Terminal` e digite:
```bash
git clone https://github.com/fatecitu/exercicio_js_array .
```
>>Quando você executa este comando, o Git entende que deve clonar o conteúdo do repositório para o diretório em que você já está (.) em vez de criar uma nova pasta. É importante que a pasta de destino esteja vazia para que o comando funcione sem erros. Caso contrário, o Git irá recusar a operação para evitar a sobrescrição de arquivos.

## Funções que você precisa desenvolver:

* `salvaProdutosLocalStorage()`: Salva a lista de produtos. Dica: Use JSON.stringify() para converter o array em uma string e localStorage.setItem() para salvar.

* `adicionarProduto()`: Adiciona um novo produto. Dica: Crie um objeto com os dados do formulário e use o método push() do JavaScript para adicioná-lo ao array de produtos.

* `removerUltimo()`: Remove o último produto. Dica: O método pop() remove o último elemento de um array. Verifique com length se o array está vazio antes de chamar o método.

* `removerPrimeiro()`: Remove o primeiro produto. Dica: O método shift() remove o primeiro elemento de um array. Verifique com length se o array está vazio antes de chamar o método.

* `listarProdutos()`: Renderiza a lista de produtos na tabela HTML. Dica: Percorra o array de produtos com forEach() e adicione uma nova linha (<tr>) para cada produto na tabela.

* `ordenarPorNome()`: Ordena a lista por nome. Dica: Use o método sort() do JavaScript junto com localeCompare() para uma comparação correta de strings.

* `ordenarPorPreco()`: Ordena a lista por preço. Dica: Use o método sort() com uma função de comparação que subtrai o preço de um item do outro.

* `filtrarPorPreco()`: Filtra e exibe os produtos >100. Dica: Use o método filter() para encontrar os produtos com o preço desejado. Depois, use map() e join() para criar a string para o alerta.
Depois de implementado, tente adicionar um input na interface e filtrar com o valor informado pelo usuário, ao invés de pegar o valor fixo de 100.

* `calcularTotal()`: Calcula o valor total. Dica: O método reduce() é ideal para somar todos os valores do array. Você precisa multiplicar a quantidade pelo preço de cada produto e atualizar o <td> totalPreco no HTML.

---

### Como começar:

1.  Abra o arquivo `script.js`.
2.  Leia os comentários em cada função para entender o que ela deve fazer.
3.  Comece a codificar!
4.  Teste seu código no navegador para verificar se tudo está funcionando corretamente.

### UI do Projeto
![Exemplo da UI](images/exemploUI.png)

Boa sorte e bom trabalho!