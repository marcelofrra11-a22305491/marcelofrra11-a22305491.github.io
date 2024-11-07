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
