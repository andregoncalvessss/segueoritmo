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

let nivelAtual = 1;
let pontuacao = 0;
let esperandoProximaPose = false;
let tempoEspera = 0;
let textoFeedback = ""; 

let tempoPausaInicio = 0; 
let ecraAnterior = 0; 

let bodyPose; 
let poses = []; 

// VARIÁVEIS DE SOM
let somConcluido, somErro, somFundo, somPontuacao;

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
  imgPoses[5] = { img: loadImage('assets/MaoEsquerdaLevantada.png'), id: 'MaoEsquerdaLevantada' };
  imgPoses[6] = { img: loadImage('assets/MaoDireitaLevantada.png'), id: 'MaoDireitaLevantada' };
  imgPoses[7] = { img: loadImage('assets/estrela.png'), id: 'Estrela' };
  
  bodyPose = ml5.bodyPose("MoveNet"); 

  // CARREGAR SONS (Certifica-te que os ficheiros existem na pasta sounds)
  somConcluido = loadSound('sounds/concluido.mp3');
  somErro = loadSound('sounds/erro.mp3');
  somFundo = loadSound('sounds/somdefundo.mp3');
  somPontuacao = loadSound('sounds/pontuação.mp3'); // Sem acentos no ficheiro!
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
  else if (ecra === 4) ecraDificuldade(); 
  else if (ecra === 5) ecraPausa();       
}

function mousePressed() {
  if (ecra === 0) cliqueMenu();
  else if (ecra === 1) cliqueJogo();
  else if (ecra === 2) cliqueInstrucoes();
  else if (ecra === 3) cliqueReiniciar();
  else if (ecra === 4) cliqueDificuldade(); 
  else if (ecra === 5) cliquePausa();       
}