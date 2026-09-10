let pontosJ1 = 0;
let pontosJ2 = 0;

let jogadorAtual = 1;

const pontosJogador1 = document.getElementById("pontos-j1");
const pontosJogador2 = document.getElementById("pontos-j2");
const textoVez = document.getElementById("vez");

const ligacoes = document.querySelectorAll(".ligacao");


ligacoes.forEach(function (ligacao) {

    ligacao.addEventListener("click", function () {

        if (ligacao.classList.contains("marcada")) {
            return;
        }

        ligacao.classList.add("marcada");

        if (jogadorAtual === 1) {
            jogadorAtual = 2;
        } else {
            jogadorAtual = 1;
        }

        textoVez.textContent = "Vez do Jogador " + jogadorAtual;

    });

});