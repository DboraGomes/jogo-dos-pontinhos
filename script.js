let pontosJ1 = 0;
let pontosJ2 = 0;

let jogadorAtual = 1;
let quadrado1JaFechado = false;

const pontosJogador1 = document.getElementById("pontos-j1");
const pontosJogador2 = document.getElementById("pontos-j2");
const textoVez = document.getElementById("vez");
const ligacoes = document.querySelectorAll(".ligacao");

ligacoes.forEach(function (ligacao) {

    ligacao.addEventListener("click", function () {

        // Não deixa clicar novamente na mesma linha
        if (ligacao.classList.contains("marcada")) {
            return;
        }

        // Marca a linha escolhida
        ligacao.classList.add("marcada");

        // Coloca a cor do jogador
        if (jogadorAtual === 1) {
            ligacao.classList.add("jogador1");
        } else {
            ligacao.classList.add("jogador2");
        }

        // Verifica se o primeiro quadrado foi fechado
        if (quadrado1Fechado() && quadrado1JaFechado === false) {
            quadrado1JaFechado = true;

            // Dá o ponto para quem fechou o quadrado
            if (jogadorAtual === 1) {
                pontosJ1++;
                pontosJogador1.textContent = pontosJ1;

            } else {
                pontosJ2++;
                pontosJogador2.textContent = pontosJ2;
            }

            // Quem fecha o quadrado joga novamente
            textoVez.textContent =
                "Vez do Jogador " + jogadorAtual;

        } else {
            // Se não fechou quadrado, troca o jogador
            trocarJogador();
        }

    });

});

function quadrado1Fechado() {
    const cima = document.getElementById("cima-1");
    const baixo = document.getElementById("baixo-1");
    const esquerda = document.getElementById("esquerda-1");
    const direita = document.getElementById("direita-1");

    if (
        cima.classList.contains("marcada") &&
        baixo.classList.contains("marcada") &&
        esquerda.classList.contains("marcada") &&
        direita.classList.contains("marcada")
    ) {
        return true;
    }

    return false;
}


function trocarJogador() {
    if (jogadorAtual === 1) {
        jogadorAtual = 2;
    } else {
        jogadorAtual = 1;
    }

    textoVez.textContent =
        "Vez do Jogador " + jogadorAtual;
}