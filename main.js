// --- main.js ---

// Variáveis Globais do Jogo
let ecra = 0; 
let imgFundo;
let imgFundoFim; 
let fonteArcade; 
let video; // 1. NOVA VARIÁVEL GLOBAL PARA A WEBCAM

function preload() {
  imgFundo = loadImage('assets/background.png');
  imgFundoFim = loadImage('assets/background2.png'); 
  fonteArcade = loadFont('assets/ARCADE_N.TTF'); 
}

function setup() {
  createCanvas(1280, 720); 
  textAlign(CENTER, CENTER);
  textFont(fonteArcade);
  video = createCapture(VIDEO);
  video.size(1280, 720); 
  video.hide();         
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