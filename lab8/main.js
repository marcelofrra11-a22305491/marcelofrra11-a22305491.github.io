function muda_texto(){
     document.querySelector("#h2mudatexto").textContent = "Adeus!"

}
function restauraTexto() {
    document.querySelector("#h2mudatexto").textContent = "1. Passa por aqui!";
}

function changeColor(color) {
    // Muda a cor do texto "Pinta-me!" de acordo com o botão clicado
    document.querySelector("#colorDisplay").style.color = color;
}

function submitColor() {
    const color = document.getElementById("colorInput").value.toLowerCase();
    const validColors = ["red", "green", "blue"];
    if (validColors.includes(color)) {
        // Muda a cor de fundo da página para a cor inserida
        document.body.style.backgroundColor = color;
    } else {
        alert("Cor inválida! Escolha entre red, green, ou blue.");
    }
}

function alternateTextColor() {
    const colors = ["yellow", "red", "blue"];
        let colorIndex = 0;
    const textInput = document.getElementById("textInput");
    textInput.style.color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
}
let clickCount = 0;

// Função para incrementar o contador e atualizar o display
function incrementCounter() {
    clickCount++;
    document.getElementById("counter").textContent = clickCount;
}
function showMessage() {
    // Obtém o valor inserido no campo do nome
    const name = document.getElementById('nameInput').value;
    
    // Obtém o valor inserido no campo da idade
    const age = document.getElementById('ageInput').value;
    
    // Verifica se ambos os campos foram preenchidos
    if (name && age) {
        // Exibe a mensagem personalizada no elemento <p> com o id "message"
        document.getElementById('message').textContent = `Olá, o ${name} tem ${age} anos!`;
    } else {
        // Exibe uma mensagem de aviso caso algum campo esteja vazio
        document.getElementById('message').textContent = "Por favor, insira o nome e a idade.";
    }
}
let count = 0; // Inicializa o contador em 0

// Função que incrementa o contador a cada segundo
function startCounter() {
    setInterval(() => {
        count++; // Incrementa o contador
        document.getElementById('counter2').textContent = count; // Atualiza o valor exibido
    }, 1000); // 1000 ms = 1 segundo
}

// Inicia o contador ao carregar a página
startCounter();
document.querySelectorAll(".color-buttons button").forEach((button) => {
    // Adiciona um event listener a cada botão
    button.addEventListener("click", () => {
        // Obtém a cor do atributo `data-color` do botão clicado
        const color = button.dataset.color;

        // Altera a cor do texto no elemento com id "colorDisplay"
        document.getElementById("colorDisplay").style.color = color;
    });
});