// canvas
let tela = document.querySelector('canvas');
let body = document.querySelector('body');
let pincel = tela.getContext('2d');

// variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let raio = 10;

// velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

// variáveis da minha raquete
let xRaquete = 10;
let yRaquete = 165;

// variáveis da raquete oponente
let xRaqueteOponente = 580;
let yRaqueteOponente = 165;

// pontos do jogo
let pontosOponente = 0;
let pontosJogador = 0;

// chancer do computador errar.
let chanceDeErrar = 0;

// sons do jogo
let ponto = document.querySelector('#audio1');
let raquetada = document.querySelector('#audio2');
let trilha = document.querySelector('#audio3');

// escutar click na tecla do jogador.
document.onkeydown = movimentarRaquete;

function limpaTela() {

    pincel.clearRect(0, 0, 600, 400);
}

function corDoCenario() {

    pincel.fillStyle = 'black';
    pincel.fillRect(0, 0, 600, 400);
}

function desenharCirculo(x, y, raio) {

    pincel.fillStyle = 'white';
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();
}

function movimentaBolinha() {

    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function alterarSentidoDaBolinha() {
    if ((xBolinha > 600 - raio) || (xBolinha < 0 + raio)) {

        velocidadeXBolinha *= -1;
        xBolinha = xBolinha + velocidadeXBolinha;
    }

    if ((yBolinha > 400 - raio) || (yBolinha < 0 + raio)) {

        velocidadeYBolinha *= -1;
        yBolinha = yBolinha + velocidadeYBolinha;
    }
}

function desenhaRaquete(xRaquete, yRaquete) {

    pincel.fillStyle = 'white';
    pincel.fillRect(xRaquete, yRaquete, 10, 70);
}

function movimentarRaquete(evento) {

    let keyCode = evento.keyCode;

    switch (keyCode) {

        case 38:
            // Testa o while aqui para ver se tira o delay do click.
            if (yRaquete > 0) yRaquete -= 20;
            break
        case 40:
            if (yRaquete < 330) yRaquete += 20;
            break
    }
}

function movimentarRaqueteOponente() {

    yRaqueteOponente = yBolinha - chanceDeErrar;
    calculaChanceDeErrar();
}

function colisaoBolinhaERaquete() {

    if ((xBolinha < 30) && (yBolinha > yRaquete && yBolinha - raio < yRaquete + 70)) {
        velocidadeXBolinha *= -1;
        xBolinha = xBolinha + velocidadeXBolinha;
        raquetada.play();
    }

    if ((xBolinha > 570) && (yBolinha > yRaqueteOponente && yBolinha + raio < yRaqueteOponente + 70)) {
        velocidadeXBolinha *= -1;
        xBolinha = xBolinha + velocidadeXBolinha;
        raquetada.play();
    }
}

function contarPonto() {

    if (xBolinha == 10) {

        pontosOponente = pontosOponente + 1 - 0.5;
        ponto.play();
    }
    if (xBolinha == 590) {

        pontosJogador = pontosJogador + 1 - 0.5;
        ponto.play();
    }
}

function placarDoJogo() {

    pincel.fillStyle = '#e48e0d';
    pincel.fillRect(250, 5, 100, 40)

    pincel.font = "900 18px Verdana";
    pincel.fillStyle = '#000';
    pincel.fillText("Vs", 288, 31);

    pincel.font = "900 14px Verdana";
    pincel.fillText(pontosJogador, 260, 31);
    pincel.fillText(pontosOponente, 325, 31);

    pincel.strokeStyle = 'white';
    pincel.strokeRect(251, 6, 99, 39);
}

function calculaChanceDeErrar() {
    if (pontosOponente >= pontosJogador) {
        chanceDeErrar += 1;
        if (chanceDeErrar >= 39) {
            chanceDeErrar = 90;
        }
    } else {
        chanceDeErrar -= 1;
        if (chanceDeErrar <= 35) {
            chanceDeErrar = 35;
        }
    }
}

function atualizarTela() {
    trilha.play();

    limpaTela();
    corDoCenario();
    desenharCirculo(xBolinha, yBolinha, raio);
    movimentaBolinha();
    alterarSentidoDaBolinha();
    desenhaRaquete(xRaquete, yRaquete);
    desenhaRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentarRaqueteOponente();
    colisaoBolinhaERaquete();
    placarDoJogo();

    contarPonto();
}

setInterval(atualizarTela, 15);