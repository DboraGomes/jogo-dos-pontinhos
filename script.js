// ==========================================
// TELA DOS JOGADORES
// ==========================================

const botaoComecar = document.getElementById("btn-comecar");

if (botaoComecar) {

    botaoComecar.addEventListener("click", function () {

        const jogador1 = document.getElementById("nome-jogador1").value;
        const jogador2 = document.getElementById("nome-jogador2").value;

        if (jogador1 === "" || jogador2 === "") {
            alert("Digite o nome dos dois jogadores!");
            return;
        }

        localStorage.setItem("jogador1", jogador1);
        localStorage.setItem("jogador2", jogador2);

        window.location.href = "jogo.html";
    });
}


// ==========================================
// PÁGINA DO JOGO
// ==========================================

const nomeJ1 = document.getElementById("nome-j1");
const nomeJ2 = document.getElementById("nome-j2");
const vez = document.getElementById("vez");

if (nomeJ1) {

    // Recupera os nomes
    const jogador1 = localStorage.getItem("jogador1");
    const jogador2 = localStorage.getItem("jogador2");

    nomeJ1.textContent = jogador1;
    nomeJ2.textContent = jogador2;

    vez.textContent = "Vez de " + jogador1;


    // ==========================================
    // VARIÁVEIS DO JOGO
    // ==========================================

    let jogadorAtual = 1;

    let pontosJ1 = 0;
    let pontosJ2 = 0;

    let quadradosFechados = 0;

    const placarJ1 = document.getElementById("pontos-j1");
    const placarJ2 = document.getElementById("pontos-j2");

    const tabuleiro = document.getElementById("tabuleiro");


    // Guarda as linhas do tabuleiro
    const horizontais = [];
    const verticais = [];

    // Guarda os quadrados
    const quadrados = [];


    // ==========================================
    // CRIAÇÃO DO TABULEIRO
    // ==========================================

    for (let linha = 0; linha < 4; linha++) {

        horizontais[linha] = [];

        const linhaTabuleiro = document.createElement("div");
        linhaTabuleiro.classList.add("linha-tabuleiro");


        for (let coluna = 0; coluna < 4; coluna++) {

            // Cria o ponto
            const ponto = document.createElement("div");
            ponto.classList.add("ponto");

            linhaTabuleiro.appendChild(ponto);


            // Cria as linhas horizontais
            if (coluna < 3) {

                const horizontal = document.createElement("div");

                horizontal.classList.add("ligacao", "horizontal");

                linhaTabuleiro.appendChild(horizontal);

                // Guarda a linha
                horizontais[linha][coluna] = horizontal;
            }
        }

        tabuleiro.appendChild(linhaTabuleiro);


        // Cria as linhas verticais
        if (linha < 3) {

            verticais[linha] = [];
            quadrados[linha] = [];

            const linhaVertical = document.createElement("div");
            linhaVertical.classList.add("linha-tabuleiro");


            for (let coluna = 0; coluna < 4; coluna++) {

                const vertical = document.createElement("div");

                vertical.classList.add("ligacao", "vertical");

                linhaVertical.appendChild(vertical);

                // Guarda a linha vertical
                verticais[linha][coluna] = vertical;


                // Cria os espaços dos quadrados
                if (coluna < 3) {

                    const espaco = document.createElement("div");

                    espaco.classList.add("espaco");

                    linhaVertical.appendChild(espaco);

                    // Guarda o quadrado
                    quadrados[linha][coluna] = espaco;
                }
            }

            tabuleiro.appendChild(linhaVertical);
        }
    }


    // ==========================================
    // VERIFICA SE UMA LINHA JÁ FOI ESCOLHIDA
    // ==========================================

    function linhaEscolhida(linha) {

        return (
            linha.classList.contains("jogador1") ||
            linha.classList.contains("jogador2")
        );
    }


    // ==========================================
    // VERIFICA OS QUADRADOS
    // ==========================================

    function verificarQuadrados() {

        let fezPonto = false;


        // Temos 3 linhas de quadrados
        for (let linha = 0; linha < 3; linha++) {

            // Temos 3 colunas de quadrados
            for (let coluna = 0; coluna < 3; coluna++) {

                const quadrado = quadrados[linha][coluna];


                // Se o quadrado já foi fechado, pula
                if (quadrado.classList.contains("fechado")) {
                    continue;
                }


                // Pega os quatro lados do quadrado
                const cima = horizontais[linha][coluna];

                const baixo = horizontais[linha + 1][coluna];

                const esquerda = verticais[linha][coluna];

                const direita = verticais[linha][coluna + 1];


                // Verifica se os quatro lados foram escolhidos
                if (
                    linhaEscolhida(cima) &&
                    linhaEscolhida(baixo) &&
                    linhaEscolhida(esquerda) &&
                    linhaEscolhida(direita)
                ) {

                    // Marca o quadrado como fechado
                    quadrado.classList.add("fechado");

                    quadradosFechados++;

                    fezPonto = true;


                    // Dá o ponto ao jogador atual
                    if (jogadorAtual === 1) {

                        pontosJ1++;

                        placarJ1.textContent = pontosJ1;

                        quadrado.classList.add("quadrado-j1");
                    }

                    else {

                        pontosJ2++;

                        placarJ2.textContent = pontosJ2;

                        quadrado.classList.add("quadrado-j2");
                    }
                }
            }
        }


        return fezPonto;
    }


    // ==========================================
    // TROCA O JOGADOR
    // ==========================================

    function trocarJogador() {

        if (jogadorAtual === 1) {

            jogadorAtual = 2;

            vez.textContent = "Vez de " + jogador2;
        }

        else {

            jogadorAtual = 1;

            vez.textContent = "Vez de " + jogador1;
        }
    }


    // ==========================================
    // VERIFICA O VENCEDOR
    // ==========================================

    function verificarFimDoJogo() {

        // O tabuleiro possui 9 quadrados
        if (quadradosFechados === 9) {

            if (pontosJ1 > pontosJ2) {

                alert(
                    jogador1 +
                    " venceu! 🎉\n" +
                    pontosJ1 + " x " + pontosJ2
                );
            }

            else if (pontosJ2 > pontosJ1) {

                alert(
                    jogador2 +
                    " venceu! 🎉\n" +
                    pontosJ2 + " x " + pontosJ1
                );
            }

            else {

                alert(
                    "Empate! 🎉\n" +
                    pontosJ1 + " x " + pontosJ2
                );
            }
        }
    }


    // ==========================================
    // CLIQUE NAS LINHAS
    // ==========================================

    const ligacoes = document.querySelectorAll(".ligacao");


    ligacoes.forEach(function (ligacao) {

        ligacao.addEventListener("click", function () {


            // Não deixa escolher a mesma linha novamente
            if (linhaEscolhida(ligacao)) {
                return;
            }


            // Colore a linha
            if (jogadorAtual === 1) {

                ligacao.classList.add("jogador1");
            }

            else {

                ligacao.classList.add("jogador2");
            }


            // Verifica se o jogador completou algum quadrado
            const fezPonto = verificarQuadrados();


            // Verifica se o jogo terminou
            verificarFimDoJogo();


            // Se NÃO fez ponto, troca o jogador
            if (!fezPonto && quadradosFechados < 9) {

                trocarJogador();
            }
        });
    });
}