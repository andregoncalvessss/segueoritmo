// --- jogo.js ---

function jogo() {
  background(30, 30, 50); 

  // Fundo branco no topo (144px de altura)
  fill(255); 
  noStroke(); 
  rect(0, 0, 1280, 144); 

  // Câmara Espelhada
  push();
    translate(1280, 0);
    scale(-1, 1);
    image(video, 0, 144, 1280, 720);
  pop();

  // ============================================
  // LÓGICA DE FASES (ESTADOS DO JOGO)
  // ============================================
  
  if (estadoJogo === 0) {
    // FASE 0: Mostrar Título e Botão
    fill(0); 
    textSize(25); 
    text("MEMORIZA A SEQUÊNCIA DOS MOVIMENTOS!", 640, 45);
    
    stroke(0);         
    strokeWeight(4);   
    fill(220);         
    rect(460, 80, 360, 50, 10);
    
    noStroke(); 
    fill(0);
    textSize(18);
    text("REVELAR SEQUÊNCIA", 640, 105); 
    
  } else if (estadoJogo === 1) {
    // FASE 1: MOSTRAR IMAGENS MAIORES E O TIMER
    let tempoPassado = millis() - temporizador;
    
    if (tempoPassado < 4000) {
      
      // 1ª IMAGEM 
      image(sequenciaAtual[0], 420, 22, 125, 100); 
      
      // SETA 
      image(imgSeta, 600, 42, 80, 60); 
      
      // 2ª IMAGEM 
      image(sequenciaAtual[1], 735, 22, 125, 100); 
      
      // ==========================================
      // NOVO: TIMER (Barra verde a encolher)
      // ==========================================
      // A largura vai de 1280 até 0 consoante o tempo passado
      let larguraBarra = 1280 - (tempoPassado / 4000) * 1280;
      
      fill(0, 220, 0); // Verde bem vivo
      noStroke();
      // Desenha na posição Y=134 (encostado ao fundo da barra branca) com altura 10
      rect(0, 134, larguraBarra, 10);
      
    } else {
      // Avança para a Fase 2
      estadoJogo = 2;
    }
    
  } else if (estadoJogo === 2) {
    // FASE 2: Hora do jogador imitar
    fill(255, 0, 0); 
    textSize(30); 
    text("AGORA É A TUA VEZ!", 640, 72);
  }
}

function cliqueJogo() {
  if (estadoJogo === 0) {
    if (mouseX > 460 && mouseX < 820 && mouseY > 80 && mouseY < 130) {
      
      sequenciaAtual = [];
      sequenciaAtual.push(random(imgPoses));
      sequenciaAtual.push(random(imgPoses));
      
      temporizador = millis();
      estadoJogo = 1; 
      
    } else {
      ecra = 3; 
      estadoJogo = 0; 
      resizeCanvas(1280, 720);
    }
  }
}