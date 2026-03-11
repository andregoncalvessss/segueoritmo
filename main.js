// Variáveis Globais do Jogo
let ecra = 0; // 0: Menu, 1: Jogo, 2: Instruções, 3: Reiniciar
let imgFundo;

function preload() {
  imgFundo = loadImage('assets/background.png');
}

function setup() {
  createCanvas(1280, 720); 
  textAlign(CENTER, CENTER);
}

function draw() {
  // Gestor de cenas: decide qual ficheiro desenhar
  if (ecra === 0) {
    menuPrincipal();
  } else if (ecra === 1) {
    jogo();
  } else if (ecra === 2) {
    instrucoes();
  } else if (ecra === 3) {
    ecraReiniciar();
  }
}

function mousePressed() {
  if (ecra === 0) {
    cliqueMenu();
  } else if (ecra === 1) {
    cliqueJogo();
  } else if (ecra === 2) {
    cliqueInstrucoes();
  } else if (ecra === 3) {
    cliqueReiniciar();
  }
}