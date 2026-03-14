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

// NOVA VARIÁVEL DA IA (MoveNet)
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
  
  // CARREGA O NOVO MODELO MOVENET
  bodyPose = ml5.bodyPose("MoveNet"); 
}

function setup() {
  createCanvas(1280, 720); 
  textAlign(CENTER, CENTER);
  textFont(fonteArcade);
  
  video = createCapture(VIDEO);
  video.size(1280, 720); 
  video.hide();         

  // LIGA O RECONHECIMENTO AO VÍDEO
  bodyPose.detectStart(video, resultados => {
    poses = resultados;
  });
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