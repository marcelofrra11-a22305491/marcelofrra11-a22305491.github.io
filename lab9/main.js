// Certifique-se de que o DOM está completamente carregado antes de executar o código
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos(produtos); // Chama a função carregarProdutos com a lista de produtos
});

if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

// Função para carregar todos os produtos
function carregarProdutos(produtos) {
    // Seleciona o elemento onde os produtos serão renderizados (pai)
    const secaoProdutos = document.querySelector("#produtos");

    // Percorre cada produto e o renderiza no DOM
    produtos.forEach((produto) => {
        console.log(produto); // Imprime o produto no console
        console.log(produto.id, produto.title); // Imprime campos específicos (id e title)

        // Cria o elemento <article> para o produto
        const produtoElement = criarProduto(produto);

        // Adiciona o <article> criado na seção de produtos
        secaoProdutos.appendChild(produtoElement);
    });
}

// Função para criar um elemento <article> para cada produto
function criarProduto(produto) {
    // Criar o elemento <article> para o produto
    const article = document.createElement('article');

    // Adicionar título
    const title = document.createElement('h2');
    title.textContent = produto.title;
    article.appendChild(title);

    // Adicionar imagem
    const img = document.createElement('img');
    img.src = produto.image;
    img.alt = produto.title;
    article.appendChild(img);

    // Adicionar descrição
    const description = document.createElement('p');
    description.textContent = produto.description;
    article.appendChild(description);

    // Adicionar preço
    const price = document.createElement('p');
    price.textContent = `Preço: $${produto.price}`;
    article.appendChild(price);

    // Criar botão "+ Adicionar ao cesto"
    const addButton = document.createElement('button');
    addButton.textContent = '+ Adicionar ao cesto';
    article.appendChild(addButton);

    // Evento ao clicar no botão
    addButton.addEventListener('click', () => {
        // Obter produtos existentes no cesto
        const selectedProducts = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

        // Adicionar o novo produto ao cesto
        selectedProducts.push(produto);

        // Atualizar o localStorage
        localStorage.setItem('produtos-selecionados', JSON.stringify(selectedProducts));

        // Feedback para o utilizador
        alert(`${produto.title} foi adicionado ao cesto!`);
    });

    return article;
}
function atualizaCesto() {
    // Buscar a lista de produtos do localStorage
    const selectedProducts = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    
    // Selecionar o elemento do DOM onde os produtos serão exibidos
    const cestoContainer = document.getElementById('cesto');
    cestoContainer.innerHTML = ''; // Limpar o cesto antes de adicionar os produtos

    // Adicionar cada produto ao DOM
    selectedProducts.forEach(produto => {
        const article = criaProdutoCesto(produto);
        cestoContainer.appendChild(article);
    });

    // Atualizar o preço total
    atualizaPrecoTotal();
}
function criaProdutoCesto(produto) {
    // Criar o elemento <article>
    const article = document.createElement('article');

    // Adicionar título
    const title = document.createElement('h2');
    title.textContent = produto.title;
    article.appendChild(title);

    // Adicionar preço
    const price = document.createElement('p');
    price.textContent = `Preço: $${produto.price}`;
    article.appendChild(price);

    // Criar botão "Remover"
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover do cesto';
    article.appendChild(removeButton);

    // Adicionar evento para remover o produto
    removeButton.addEventListener('click', () => {
        // Obter a lista atual de produtos
        let selectedProducts = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

        // Remover o produto usando filter
        selectedProducts = selectedProducts.filter(p => p.title !== produto.title);

        // Atualizar o localStorage
        localStorage.setItem('produtos-selecionados', JSON.stringify(selectedProducts));

        // Atualizar o DOM do cesto
        atualizaCesto();
    });

    return article;
}
function atualizaPrecoTotal() {
    const selectedProducts = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

    // Calcular o preço total
    const total = selectedProducts.reduce((acc, produto) => acc + produto.price, 0);

    // Selecionar o elemento do DOM para exibir o preço total
    const totalElement = document.getElementById('preco-total');
    totalElement.textContent = `Preço Total: $${total.toFixed(2)}`;
}
document.addEventListener('DOMContentLoaded', () => {
    atualizaCesto();
});

