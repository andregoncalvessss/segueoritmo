function ecraReiniciar() {
  let agora = millis();

  if (!faseBotoesReiniciar) {
    // ==========================================
    // FASE 1: MOSTRAR RESULTADOS E TABELA (10 SEGUNDOS)
    // ==========================================
    background(255); // Fundo Totalmente Branco
    
    // 1. Título Lindo
    noStroke(); fill(0); textAlign(CENTER, CENTER);
    textFont(fonteArcade); textSize(45);
    text("RESULTADOS FINAlS", 640, 60);
    fill(0, 200, 200); 
    text("RESULTADOS FINAlS", 636, 56);

    // 2. Pontuação do Jogador nesta ronda
    noStroke(); fill(0); textSize(20);
    text(nomeJogador + ", CONSEGUISTE:", 640, 115);
    fill(0, 180, 0); textSize(50);
    text(pontuacao + " PTS", 640, 165);

    // 3. Lugar Obtido (À prova de bala com maiúsculas/minúsculas)
    let lugar = 0;
    for (let i = 0; i < tabelaLideres.length; i++) {
       if (tabelaLideres[i].nome.toUpperCase() === nomeJogador.toUpperCase()) {
         lugar = i + 1; break;
       }
    }
    fill(100); textSize(18);
    text("FICASTE EM " + lugar + "º LUGAR NO RANKING", 640, 215);

    // 4. Recorde Pessoal
    textSize(22);
    if (eNovoRecorde) {
      fill(255, 0, 0); 
      text("PARABÉNS! RECORDE PESSOAL BATIDO!", 640, 250);
    } else {
      fill(80);
      text("O TEU RECORDE PESSOAL É: " + recordePessoal + " PTS", 640, 250);
    }

    // 5. --- DESENHAR A TABELA DE PONTUAÇÕES ---
    drawTabelaPontuacoes(lugar);

    // 6. Cronómetro de 10 segundos
    let tempoDecorrido = agora - tempoInicioResultados;
    let tempoRestante = max(0, 10000 - tempoDecorrido);
    
    fill(230); noStroke(); rect(0, 700, 1280, 20);
    fill(0, 200, 200); rect(0, 700, (tempoRestante / 10000) * 1280, 20);
    fill(255); textAlign(LEFT, CENTER); textSize(12);
    text("A CARREGAR MENU DE MÃOS... " + floor(tempoRestante / 1000) + "s", 20, 710);
    
    fill(150); textAlign(CENTER, CENTER); textSize(12);
    text("(Podes clicar com o rato em qualquer lado para avançar)", 640, 680);

    if (tempoDecorrido > 10000) {
      faseBotoesReiniciar = true;
      timerPulsoEsq = 0; timerPulsoDir = 0;
    }

  } else {
    // ==========================================
    // FASE 2: MOSTRAR CÂMERA LIMPA E BOTÕES DE MÃO
    // ==========================================
    
    push();
      translate(1280, 0); scale(-1, 1);
      image(video, 0, 0, 1280, 720); 
    pop();

    stroke(0); strokeWeight(6); fill(255); 
    textAlign(CENTER, CENTER); textSize(35);
    text("USA AS MÃOS PARA ESCOLHER", 640, 80);

    handleHandMenuInteraction(agora);
    drawWristCircles();
  }
}

// === TABELA PERFEITA E ESTRUTURADA ===
function drawTabelaPontuacoes(lugarMeu) {
  let w = 700; // Largura da Tabela
  let hRow = 45; // Altura de cada linha
  let startX = (1280 - w) / 2;
  let startY = 320;

  fill(0, 150, 150); noStroke();
  rect(startX, startY - hRow, w, hRow, 10, 10, 0, 0);
  
  fill(255); textSize(18); 
  textAlign(CENTER, CENTER); text("LUGAR", startX + 70, startY - hRow/2);
  textAlign(LEFT, CENTER);   text("NOME DO JOGADOR", startX + 180, startY - hRow/2);
  textAlign(RIGHT, CENTER);  text("PONTUAÇÃO", startX + w - 30, startY - hRow/2);

  let maxScores = min(5, tabelaLideres.length);
  for (let i = 0; i < maxScores; i++) {
    let y = startY + (i * hRow);

    if (i % 2 === 0) fill(240); else fill(220);
    if ((i + 1) === lugarMeu) fill(200, 255, 200); 

    if (i === maxScores - 1) rect(startX, y, w, hRow, 0, 0, 10, 10);
    else rect(startX, y, w, hRow);

    fill(0); textSize(18);
    
    textAlign(CENTER, CENTER);
    text((i + 1) + "º", startX + 70, y + hRow/2);

    textAlign(LEFT, CENTER);
    text(tabelaLideres[i].nome, startX + 180, y + hRow/2);

    textAlign(RIGHT, CENTER);
    text(tabelaLideres[i].pontos, startX + w - 30, y + hRow/2);
  }
}

// === DESENHAR OS BOTÕES E VERIFICAR COLISÃO DA MÃO ===
function handleHandMenuInteraction(agora) {
  let btnRaioSelect = 130; 
  let btnCx = 350; let btnCy = 360; 
  let btnDx = 930; let btnDy = 360; 

  stroke(255); strokeWeight(6); fill(0, 180, 0, 220); 
  ellipse(btnCx, btnCy, btnRaioSelect * 2);
  noStroke(); fill(255); textSize(28); textAlign(CENTER, CENTER);
  text("JOGAR\nNOVAMENTE", btnCx, btnCy);

  stroke(255); strokeWeight(6); fill(180, 0, 0, 220);
  ellipse(btnDx, btnDy, btnRaioSelect * 2);
  noStroke(); fill(255); textSize(28);
  text("SAÍR", btnDx, btnDy);

  if (poses.length > 0) {
    let pose = poses[0];
    
    let sX = 1280 / (video.elt.videoWidth || 640);
    let sY = 720 / (video.elt.videoHeight || 480);

    handleHoverFill(pose.left_wrist, sX, sY, btnCx, btnCy, btnDx, btnDy, btnRaioSelect, agora, "Esq");
    handleHoverFill(pose.right_wrist, sX, sY, btnCx, btnCy, btnDx, btnDy, btnRaioSelect, agora, "Dir");
  } else {
    timerPulsoEsq = 0; timerPulsoDir = 0;
  }
}

// === LÓGICA DE CLIQUE COM A MÃO ===
function handleHoverFill(pulso, sX, sY, btnCx, btnCy, btnDx, btnDy, rSelect, agora, pulsoID) {
  if (pulso && pulso.confidence > 0.1) {
    let pX = 1280 - (pulso.x * sX); 
    let pY = pulso.y * sY;

    if (dist(pX, pY, btnCx, btnCy) < rSelect) {
       let currentTimer = (pulsoID === "Esq") ? timerPulsoEsq : timerPulsoDir;
       if (currentTimer === 0) {
          if (somClick.isLoaded()) somClick.play();
          if (pulsoID === "Esq") timerPulsoEsq = agora; else timerPulsoDir = agora;
       } else {
          let tempoPassado = agora - currentTimer;
          drawHoverFillCircle(btnCx, btnCy, rSelect, tempoPassado);
          if (tempoPassado > tempoParaClicar) iniciarJogoNovamente();
       }
    } 
    else if (dist(pX, pY, btnDx, btnDy) < rSelect) {
       let currentTimer = (pulsoID === "Esq") ? timerPulsoEsq : timerPulsoDir;
       if (currentTimer === 0) {
          if (somClick.isLoaded()) somClick.play();
          if (pulsoID === "Esq") timerPulsoEsq = agora; else timerPulsoDir = agora;
       } else {
          let tempoPassado = agora - currentTimer;
          drawHoverFillCircle(btnDx, btnDy, rSelect, tempoPassado);
          if (tempoPassado > tempoParaClicar) sairDoJogoFinal();
       }
    } 
    else {
       if (pulsoID === "Esq") timerPulsoEsq = 0; else timerPulsoDir = 0;
    }
  }
}

function iniciarJogoNovamente() {
  timerPulsoEsq = 0; timerPulsoDir = 0; 
  nivelAtual = 1; pontuacao = 0;
  gerarSequencia(nivelAtual); estadoJogo = 1; ecra = 1; 
  if (somClick.isLoaded()) somClick.play();
  somPontuacao.stop(); 
  resizeCanvas(1280, 864); 
}

function sairDoJogoFinal() {
  timerPulsoEsq = 0; timerPulsoDir = 0; 
  if (somClick.isLoaded()) somClick.play();
  ecra = 0; 
  resizeCanvas(1280, 720); 
  somPontuacao.stop();
  somFundo.stop();
}

function drawHoverFillCircle(x, y, r, tempo) {
  let percentagem = min(1, tempo / tempoParaClicar);
  noFill(); stroke(255); strokeWeight(6);
  ellipse(x, y, r * 2 + 10); 
  
  fill(0, 200, 200, 180); 
  arc(x, y, r * 2, r * 2, -PI/2, (-PI/2) + percentagem * TWO_PI, OPEN);
}

function drawWristCircles() {
  if (poses.length > 0) {
    let pose = poses[0];
    let sX = 1280 / (video.elt.videoWidth || 640);
    let sY = 720 / (video.elt.videoHeight || 480);
    
    fill(255, 255, 0, 180); noStroke(); 
    if (pose.left_wrist.confidence > 0.1) {
       ellipse(1280 - (pose.left_wrist.x * sX), pose.left_wrist.y * sY, 40);
    }
    fill(0, 255, 255, 180); 
    if (pose.right_wrist.confidence > 0.1) {
       ellipse(1280 - (pose.right_wrist.x * sX), pose.right_wrist.y * sY, 40);
    }
  }
}

function cliqueReiniciar() {
  if (!faseBotoesReiniciar) {
    faseBotoesReiniciar = true;
    timerPulsoEsq = 0;
    timerPulsoDir = 0;
  }
}