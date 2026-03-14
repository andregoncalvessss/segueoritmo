// --- main.js ---

let ecra = 0; 
let imgFundo;
let imgFundoFim; 
let fonteArcade; 
let video; 

let imgPoses = [];         
let sequenciaAtual = [];   
let imgSeta;               
let estadoJogo = 0;        
let temporizador = 0;      

let poseAtualAlvo = 0; 
let tempoNaPose = 0;   

// VARIÁVEIS DE NÍVEL, PONTUAÇÃO E FEEDBACK
let nivelAtual = 1;
let pontuacao = 0;
let esperandoProximaPose = false;
let tempoEspera = 0;
let textoFeedback = ""; // Guarda a frase motivadora atual

let bodyPose; 
let poses = []; 

function preload() {
  imgFundo = loadImage('assets/background.png');
  imgFundoFim = loadImage('assets/background2.png'); 
  fonteArcade = loadFont('assets/ARCADE_N.TTF'); 
  imgSeta = loadImage('assets/seta.png'); 
  
  imgPoses[0] = { img: loadImage('assets/2maosnoar.png'), id: '2maosnoar' };
  imgPoses[1] = { img: loadImage('assets/maoDireita.png'), id: 'maoDireita' };
  imgPoses[2] = { img: loadImage('assets/maoEsquerda.png'), id: 'maoEsquerda' };
  imgPoses[3] = { img: loadImage('assets/pernaEsquerda.png'), id: 'pernaEsquerda' }; 
  imgPoses[4] = { img: loadImage('assets/posicaoT.png'), id: 'posicaoT' };
  
  bodyPose = ml5.bodyPose("MoveNet"); 
}

function setup() {
  createCanvas(1280, 720); 
  textAlign(CENTER, CENTER);
  textFont(fonteArcade);
  
  video = createCapture(VIDEO, function() {
    bodyPose.detectStart(video, resultados => {
      poses = resultados;
    });
  });
  video.hide();         
}

function draw() {
  if (ecra === 0) menuPrincipal();
  else if (ecra === 1) jogo();
  else if (ecra === 2) instrucoes();
  else if (ecra === 3) ecraReiniciar();
}

function mousePressed() {
  if (ecra === 0) cliqueMenu();
  else if (ecra === 1) cliqueJogo();
  else if (ecra === 2) cliqueInstrucoes();
  else if (ecra === 3) cliqueReiniciar();
}