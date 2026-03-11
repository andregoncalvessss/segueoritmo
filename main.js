// Variáveis Globais do Jogo
let ecra = 0; 
let imgFundo;
let imgFundoFim; 
let fonteArcade; // NOVA VARIÁVEL para a fonte

function preload() {
  imgFundo = loadImage('assets/background.png');
  imgFundoFim = loadImage('assets/background2.png'); 
  
  // CARREGAR A FONTE AQUI
  fonteArcade = loadFont('assets/ARCADE_N.TTF'); 
}

function setup() {
  createCanvas(1280, 720); 
  textAlign(CENTER, CENTER);
  
  // APLICAR A FONTE A TODO O JOGO
  textFont(fonteArcade); 
}

function draw() {
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