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
        changeColor(color);
    } else {
        alert("Cor inválida! Escolha entre red, green, ou blue.");
    }
}