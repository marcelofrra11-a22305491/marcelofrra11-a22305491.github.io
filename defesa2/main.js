const API_BASE_URL = 'https://deisishop.pythonanywhere.com';
let produtosCache = []; // Cache para armazenar os produtos carregados da API
let cesto = []; // Lista de produtos no cesto

// Função para buscar categorias da API
async function carregarCategorias() {
    try {
        const response = await fetch(`${API_BASE_URL}/categories/`);
        if (!response.ok) throw new Error('Erro ao obter categorias');

        const categorias = await response.json();

        // Atualizar o select com as categorias
        const selectCategorias = document.getElementById('categorias');
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.toLowerCase();
            option.textContent = categoria;
            selectCategorias.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar categorias:', error);
    }
}

// Função para buscar produtos da API
async function carregarProdutosDaAPI() {
    try {
        const response = await fetch(`${API_BASE_URL}/products/`);
        if (!response.ok) throw new Error('Erro ao obter produtos');

        const produtos = await response.json();
        produtosCache = produtos; // Salvar produtos no cache
        return produtos;
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        return [];
    }
}

// Função para carregar produtos com filtros, ordenação e pesquisa
async function carregarProdutos({ categoria = 'todas', ordem = 'precoCrescente', pesquisa = '' } = {}) {
    const secaoProdutos = document.querySelector("#produtos");
    secaoProdutos.innerHTML = ''; // Limpa a seção antes de renderizar

    let produtos = produtosCache.length ? produtosCache : await carregarProdutosDaAPI();

    // Filtrar por categoria
    if (categoria !== 'todas') {
        produtos = produtos.filter(produto => produto.category.toLowerCase() === categoria);
    }

    // Filtrar por nome do produto
      /*
    if (pesquisa) {
        produtos = produtos.filter(produto =>
            produto.title.toLowerCase().includes(pesquisa.toLowerCase())
        );
    }  */

if (pesquisa) {
    produtos = produtos.filter(produto =>
        produto.title.toLowerCase().includes(pesquisa.toLowerCase()) ||
        produto.description.toLowerCase().includes(pesquisa.toLowerCase()) // Adicionar filtro por descrição
    );
}

    // Ordenar os produtos
    produtos = produtos.sort((a, b) => {
        if (ordem === 'precoCrescente') {
            return a.reviews - b.reviews;
        } else if (ordem === 'precoDecrescente') {
            return b.reviews - a.reviews;
        }
    });

    // Renderizar os produtos filtrados e ordenados
    produtos.forEach(produto => {
        const produtoElement = criarProduto(produto);
        secaoProdutos.appendChild(produtoElement);
    });
    
}

// Função para criar elementos do produto
function criarProduto(produto) {
    const article = document.createElement('article');

    // Título
    const title = document.createElement('h2');
    title.textContent = produto.title;
    article.appendChild(title);

    // Imagem
    const img = document.createElement('img');
    img.src = produto.image;
    img.alt = produto.title;
    article.appendChild(img);

    // Descrição
    const description = document.createElement('p');
    description.textContent = produto.description;
    article.appendChild(description);

    // Preço
    const price = document.createElement('p');
    price.textContent = `Preço: $${produto.price.toFixed(2)}`;
    article.appendChild(price);

    // Botão para adicionar ao cesto
    const addButton = document.createElement('button');
    addButton.textContent = 'Adicionar ao Cesto';
    addButton.addEventListener('click', () => adicionarAoCesto(produto));
    article.appendChild(addButton);

    return article;
}

// Função para adicionar produto ao cesto
function adicionarAoCesto(produto) {
    cesto.push(produto);
    atualizarCesto();
}







// Função para remover produto do cesto
function removerDoCesto(index) {
    cesto.splice(index, 1); // Remove o produto pelo índice
    atualizarCesto();
    
}
document.getElementById('menos-info').addEventListener('click', () => {
    const descricoes = document.querySelectorAll('#produtos article p');
    descricoes.forEach(descricao => {
        descricao.style.display = descricao.style.display === 'none' ? 'block' : 'none';
    });
});
// Função para atualizar o cesto no DOM
function atualizarCesto() {
    
    const listaCesto = document.getElementById('lista-cesto');
    const totalCesto = document.getElementById('total-cesto');
    listaCesto.innerHTML = ''; // Limpa o cesto

    let total = 0;

    cesto.forEach((produto, index) => {
        total += produto.price;

        // Criar o item do cesto
        const item = document.createElement('li');
        item.classList.add('item-cesto');

        // Criar a imagem do produto
        const img = document.createElement('img');
        img.src = produto.image;  // Supondo que o produto tenha uma propriedade 'image' com o URL da imagem
        img.alt = produto.title;
        img.style.width = '50px';  // Definindo o tamanho da imagem
        img.style.height = '50px'; // Tamanho fixo para manter a consistência
        img.style.marginRight = '10px'; // Espaçamento à direita da imagem
        item.appendChild(img); // Adiciona a imagem ao item

        // Criar o texto do produto (nome e preço)
        const texto = document.createElement('span');
        texto.textContent = `${produto.title} - $${produto.price.toFixed(2)}`;
        item.appendChild(texto); // Adiciona o texto ao item

        // Botão de remover do cesto
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.onclick = () => removerDoCesto(index);
        item.appendChild(btnRemover); // Adiciona o botão de remover

        // Adicionar o item à lista
        listaCesto.appendChild(item);
    });

    totalCesto.textContent = total.toFixed(2); // Atualiza o total no cesto
}




// Listener para o botão "Comprar"
document.getElementById('comprar-btn').addEventListener('click', () => {
    if (cesto.length === 0) {
        alert('Seu cesto está vazio!');
        return;
    }

    const total = parseFloat(document.getElementById('total-cesto').textContent);
    alert(`Compra realizada com sucesso! Total: €${total.toFixed(2)}`);
    cesto = []; // Limpar o cesto após a compra
    atualizarCesto();
});

// Listener para filtros e pesquisa
document.getElementById('categorias').addEventListener('change', aplicarFiltros);
document.getElementById('ordenar').addEventListener('change', aplicarFiltros);
document.getElementById('pesquisa').addEventListener('input', aplicarFiltros);

// Função para aplicar filtros e atualizar a lista
function aplicarFiltros() {
    const categoria = document.getElementById('categorias').value;
    const ordem = document.getElementById('ordenar').value;
    const pesquisa = document.getElementById('pesquisa').value;

    carregarProdutos({ categoria, ordem, pesquisa });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarCategorias();
    carregarProdutos();
});
const selectOrdenar = document.getElementById('ordenar');
const optionAvaliacoesCresc = document.createElement('option');
optionAvaliacoesCresc.value = 'avaliacoesCrescente';
optionAvaliacoesCresc.textContent = 'Avaliações (Crescente)';
selectOrdenar.appendChild(optionAvaliacoesCresc);

const optionAvaliacoesDecr = document.createElement('option');
optionAvaliacoesDecr.value = 'avaliacoesDecrescente';
optionAvaliacoesDecr.textContent = 'Avaliações (Decrescente)';
selectOrdenar.appendChild(optionAvaliacoesDecr);

// Atualizar lógica de ordenação no filtro
produtos = produtos.sort((a, b) => {
    if (ordem === 'avaliacoesCrescente') {
        return a.reviews - b.reviews;
    } else if (ordem === 'avaliacoesDecrescente') {
        return b.reviews - a.reviews;
    }
    // Manter as ordenações existentes
});

document.getElementById('limpar-cesto').addEventListener('click', () => {
    cesto = []; // Esvazia o array do cesto
    removerDoCesto(); // Atualiza a interface
    alert('Todos os produtos foram removidos do cesto!');
});

function atualizarCesto() {
    const listaCesto = document.getElementById('lista-cesto');
    const totalCesto = document.getElementById('total-cesto'); // Valor total do cesto (seção principal)
    const custoTotal = document.getElementById('custo-total'); // Valor na seção resumo-cesto
    listaCesto.innerHTML = ''; // Limpa o cesto

    let total = 0;

    cesto.forEach((produto, index) => {
        total += produto.price;

        // Criar o item do cesto
        const item = document.createElement('li');
        item.classList.add('item-cesto');

        // Criar a imagem do produto
        const img = document.createElement('img');
        img.src = produto.image;  // Supondo que o produto tenha uma propriedade 'image' com o URL da imagem
        img.alt = produto.title;
        img.style.width = '50px';  // Definindo o tamanho da imagem
        img.style.height = '50px'; // Tamanho fixo para manter a consistência
        img.style.marginRight = '10px'; // Espaçamento à direita da imagem
        item.appendChild(img); // Adiciona a imagem ao item

        // Criar o texto do produto (nome e preço)
        const texto = document.createElement('span');
        texto.textContent = `${produto.title} - $${produto.price.toFixed(2)}`;
        item.appendChild(texto); // Adiciona o texto ao item

        // Botão de remover do cesto
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.onclick = () => removerDoCesto(index);
        item.appendChild(btnRemover); // Adiciona o botão de remover

        // Adicionar o item à lista
        listaCesto.appendChild(item);
    });

    // Atualiza os valores do total no cesto e no resumo-cesto
    totalCesto.textContent = total.toFixed(2); // Atualiza o total no cesto principal
    custoTotal.textContent = `${total.toFixed(2)} €`; // Atualiza o custo total na seção resumo-cesto
}
