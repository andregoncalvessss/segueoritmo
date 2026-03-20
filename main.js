// --- main.js ---

let ecra = 0; 
let imgFundo;
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
let textoFeedback = ""; 

let tempoPausaInicio = 0; 
let ecraAnterior = 0; 

let bodyPose; 
let poses = []; 

// VARIÁVEIS DE SOM
let somConcluido, somErro, somFundo, somPontuacao, somClick;

// === NOVAS VARIÁVEIS PARA PONTUAÇÕES, NOME E INTERAÇÃO ===
let inputNome;
let nomeJogador = "";
let tabelaLideres = []; // Tabela JSON
let recordePessoal = 0; // Guardar o recorde pessoal antigo
let eNovoRecorde = false; // Flag para saber se bateu o recorde

// VARIÁVEIS DO CRONÓMETRO E ESTADO DE REINICIAR
let tempoInicioResultados = 0;
let faseBotoesReiniciar = false; // Começa a mostrar apenas os resultados

// VARIÁVEIS PARA CLIQUE COM A MÃO (HOVER FILL)
let timerPulsoEsq = 0;
let timerPulsoDir = 0;
const tempoParaClicar = 2000; // 2 segundos (2000 milissegundos)

function preload() {
  imgFundo = loadImage('assets/background.png');
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

  // CARREGAR SONS (Sem acentos para não dar Erro 404!)
  somConcluido = loadSound('sounds/concluido.mp3');
  somErro = loadSound('sounds/erro.mp3');
  somFundo = loadSound('sounds/somdefundo.mp3');
  somPontuacao = loadSound('sounds/pontuação.mp3'); 
  somClick = loadSound('sounds/clicksound.mp3');    
}

function setup() {
  createCanvas(1280, 720); 
  textAlign(CENTER, CENTER);
  textFont(fonteArcade);
  
  // === CRIAR A CAIXA DE TEXTO (Escondida por defeito) ===
  inputNome = createInput('');
  inputNome.size(300, 40);
  inputNome.style('font-size', '24px');
  inputNome.style('text-align', 'center');
  inputNome.style('font-family', 'sans-serif');
  inputNome.style('border-radius', '8px');
  inputNome.hide(); 

  // === CARREGAR E LIMPAR PONTUAÇÕES GRAVADAS ===
  let dadosGuardados = getItem('ranking_jogo_segueoritmo');
  if (dadosGuardados !== null) {
    let tabelaLimpa = [];
    
    for (let i = 0; i < dadosGuardados.length; i++) {
      let entry = dadosGuardados[i];
      let idx = tabelaLimpa.findIndex(e => e.nome.toUpperCase() === entry.nome.toUpperCase());
      
      if (idx !== -1) {
        // Se já existe e a pontuação for maior, substitui
        if (entry.pontos > tabelaLimpa[idx].pontos) {
          tabelaLimpa[idx].pontos = entry.pontos;
        }
      } else {
        // Se não existe, adiciona
        tabelaLimpa.push(entry);
      }
    }
    
    tabelaLimpa.sort((a, b) => b.pontos - a.pontos);
    tabelaLideres = tabelaLimpa;
    storeItem('ranking_jogo_segueoritmo', tabelaLideres); 
  }
  
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
  else if (ecra === 6) ecraNome(); 
}

function mousePressed() {
  userStartAudio();

  // DESATIVAMOS CLIQUE DO RATO NOS RESULTADOS SE ESTIVER NA FASE DAS MÃOS
  if (ecra === 3 && faseBotoesReiniciar) return;

  if (ecra === 0) cliqueMenu();
  else if (ecra === 1) cliqueJogo();
  else if (ecra === 2) cliqueInstrucoes();
  else if (ecra === 3) cliqueReiniciar(); 
  else if (ecra === 4) cliqueDificuldade(); 
  else if (ecra === 5) cliquePausa();       
  else if (ecra === 6) cliqueNome();
}

// === FUNÇÃO PARA GUARDAR OS PONTOS NA MEMÓRIA ===
function guardarPontuacaoFinal() {
  let indexJogador = -1;
  let meuRecordeAntigo = 0;

  for (let i = 0; i < tabelaLideres.length; i++) {
    if (tabelaLideres[i].nome.toUpperCase() === nomeJogador.toUpperCase()) {
       indexJogador = i;
       meuRecordeAntigo = tabelaLideres[i].pontos;
       break;
    }
  }

  recordePessoal = meuRecordeAntigo; 

  if (indexJogador !== -1) {
    if (pontuacao > tabelaLideres[indexJogador].pontos) {
      tabelaLideres[indexJogador].pontos = pontuacao;
      tabelaLideres[indexJogador].nome = nomeJogador; 
    }
  } else {
    tabelaLideres.push({ nome: nomeJogador, pontos: pontuacao });
  }
  
  tabelaLideres.sort((a, b) => b.pontos - a.pontos);
  storeItem('ranking_jogo_segueoritmo', tabelaLideres);

  eNovoRecorde = (pontuacao > recordePessoal);
}