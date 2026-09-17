const botaoComecar = document.getElementById("btn-comecar"); // Uma variável declarada com const não pode receber outro valor depois.

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

const tabuleiro = document.getElementById("tabuleiro");

if (tabuleiro) {
    const jogador1 = localStorage.getItem("jogador1");
    const jogador2 = localStorage.getItem("jogador2");

    const nomeJ1 = document.getElementById("nome-j1");
    const nomeJ2 = document.getElementById("nome-j2");

    const placarJ1 = document.getElementById("pontos-j1");
    const placarJ2 = document.getElementById("pontos-j2");

    nomeJ1.textContent = jogador1;
    nomeJ2.textContent = jogador2;

    const vez = document.getElementById("vez");

    let jogadorAtual = 1; // valor aqui vai mudar, por isso let.
    let pontosJ1 = 0;
    let pontosJ2 = 0;
    let quadradosFechados = 0;

    vez.textContent = "Vez de " + jogador1;

    function trocarJogador() { //Função é um conjunto de instruções que podemos mandar executar quando precisarmos.
        if (jogadorAtual === 1) {
            jogadorAtual = 2;
            vez.textContent = "Vez de " + jogador2;
        } else {
            jogadorAtual = 1;
            vez.textContent = "Vez de " + jogador1;
        }
    }

    //formando tabuleiro
    for (let linha = 0; linha < 4; linha++) {
        const fileira = document.createElement("div");
        fileira.classList.add("linha-tabuleiro");

        for (let coluna = 0; coluna < 4; coluna++) { //enquanto for verdadeiro repita.
            const ponto = document.createElement("div"); // criei div no html
            ponto.classList.add("ponto"); // adiconando classe a ponto
            fileira.appendChild(ponto); // adiciona ponto dentro de fileira

            if (coluna < 3) {
                const horizontal = document.createElement("div");
                horizontal.classList.add("ligacao", "horizontal"); //ligacao horizontal
                horizontal.id = "h" + linha + coluna; // h00/ h10 ...
                fileira.appendChild(horizontal);
            }
        }

        tabuleiro.appendChild(fileira);

        if (linha < 3) {
            const fileiraVertical = document.createElement("div");
            fileiraVertical.classList.add("linha-tabuleiro");

            for (let coluna = 0; coluna < 4; coluna++) {
                const vertical = document.createElement("div");
                vertical.classList.add("ligacao", "vertical");
                vertical.id = "v" + linha + coluna;
                fileiraVertical.appendChild(vertical);

                if (coluna < 3) {
                    const espaco = document.createElement("div");
                    espaco.classList.add("espaco");
                    espaco.id = "q" + linha + coluna;
                    fileiraVertical.appendChild(espaco);
                }
            }

            tabuleiro.appendChild(fileiraVertical); //Como o tabuleiro tem 4 linhas e 4 colunas de pontos, eu usei um for para percorrer as linhas 
                                                    //e outro para criar os elementos de cada coluna. Entre os quatro pontos existem três ligações 
                                                    //horizontais, então uso if (coluna < 3). Também preciso de linhas verticais entre as fileiras, 
                                                    //mas não depois da última, então uso if (linha < 3).
        }
    }

    function verificarQuadrado(cima, baixo, esquerda, direita, quadrado) {

        const linhaCima = document.getElementById(cima);
        const linhaBaixo = document.getElementById(baixo);
        const linhaEsquerda = document.getElementById(esquerda);
        const linhaDireita = document.getElementById(direita);
        const espacoQuadrado = document.getElementById(quadrado);

        if (espacoQuadrado.classList.contains("fechado")) {
            return false;
        }

        if (
            linhaCima.classList.contains("usada") && 
            linhaBaixo.classList.contains("usada") &&
            linhaEsquerda.classList.contains("usada") &&
            linhaDireita.classList.contains("usada")
        ) {
            espacoQuadrado.classList.add("fechado");
            quadradosFechados++;

            if (jogadorAtual === 1) {
                pontosJ1++;
                placarJ1.textContent = pontosJ1;
                espacoQuadrado.classList.add("quadrado-j1");
            } else {
                pontosJ2++;
                placarJ2.textContent = pontosJ2;
                espacoQuadrado.classList.add("quadrado-j2");
            }
            return true; 
        }
        return false;
    }

    function verificarVencedor() {
        if (quadradosFechados === 9) {
            setTimeout(function () { //espera 0,1 segundos e faz isso
                if (pontosJ1 > pontosJ2) {
                    alert(jogador1 + " venceu!");
                } else if ( pontosJ2 > pontosJ1) {
                    alert(jogador2 + " venceu!");
                } else {
                    alert("Empate!");
                } 
            }, 100); 
            
        }
    }

    const ligacoes = document.querySelectorAll(".ligacao"); //procura todos os elementos q tem classe ligacao
    ligacoes.forEach(function (ligacao) {
        ligacao.addEventListener("click", function () {
            if (ligacao.classList.contains("usada")) {
                return;
            }
            ligacao.classList.add("usada");

            if (jogadorAtual === 1) {
                ligacao.classList.add("jogador1");
            } else {
                ligacao.classList.add("jogador2");
            }
            
            let fezPonto = false;

            for (let linha = 0; linha < 3; linha++) {
                for (let coluna = 0; coluna < 3; coluna++) {
                    const fechouQuadrado = verificarQuadrado(
                        "h" + linha + coluna,
                        "h" + (linha + 1) + coluna,
                        "v" + linha + coluna,
                        "v" + linha + (coluna + 1),
                        "q" + linha + coluna,

                    );

                    if (fechouQuadrado === true) {
                        fezPonto = true;
                    }
                }
            }
            verificarVencedor();

            if (fezPonto === false) {
                trocarJogador();
            }
        });
    });
}