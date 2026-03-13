// --- main.js ---

// Variáveis Globais do Jogo
let ecra = 0; 
let imgFundo;
let imgFundoFim; 
let fonteArcade; 
let video; 

// VARIÁVEIS PARA A SEQUÊNCIA DE MEMÓRIA
let imgPoses = [];         
let sequenciaAtual = [];   
let imgSeta;               // <-- NOVA VARIÁVEL PARA A SETA
let estadoJogo = 0;        
let temporizador = 0;      

function preload() {
  imgFundo = loadImage('assets/background.png');
  imgFundoFim = loadImage('assets/background2.png'); 
  fonteArcade = loadFont('assets/ARCADE_N.TTF'); 
  
  // CARREGAR A SETA
  imgSeta = loadImage('assets/seta.png'); // <-- CARREGA A SETA AQUI
  
  // CARREGAR AS 5 POSES
  imgPoses[0] = loadImage('assets/2maosnoar.png');
  imgPoses[1] = loadImage('assets/maoDireita.png');
  imgPoses[2] = loadImage('assets/maoEsquerda.png');
  imgPoses[3] = loadImage('assets/pernaEsquerda.png'); 
  imgPoses[4] = loadImage('assets/posicaoT.png');
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