// --- pausa.js ---

function ecraPausa() {
  // Fundo cinzento escuro, escondendo o jogo para não parecer encravado
  background(50, 50, 50); 

  // RETÂNGULO BRANCO CENTRAL
  fill(255); 
  stroke(0); 
  strokeWeight(6);
  rect(440, 180, 400, 500, 15);

  // TÍTULO "PAUSA"
  fill(0); 
  noStroke(); 
  textSize(50);
  text("PAUSA", 640, 250);

  // === DESENHAR OS BOTÕES ===
  stroke(0);
  strokeWeight(4);
  
  // Botão 1: CONTINUAR
  fill(220); 
  rect(490, 330, 300, 60, 10);
  
  // Botão 2: INSTRUÇÕES
  fill(220); 
  rect(490, 430, 300, 60, 10);

  // Botão 3: REINICIAR
  fill(220); 
  rect(490, 530, 300, 60, 10);

  // === TEXTOS DOS BOTÕES ===
  noStroke();
  fill(0);
  textSize(25);
  text("CONTINUAR", 640, 360);
  text("INSTRUCOES", 640, 460); // Sem til/cedilha caso a fonte não suporte
  text("REINICIAR", 640, 560);
}

function cliquePausa() {
  // 1. CLIQUE EM "CONTINUAR"
  if (mouseX > 490 && mouseX < 790 && mouseY > 330 && mouseY < 390) {
    let tempoPausado = millis() - tempoPausaInicio;
    
    // Compensa os relógios do jogo
    temporizador += tempoPausado;
    tempoInicioPose += tempoPausado;
    if (esperandoProximaPose) {
      tempoEspera += tempoPausado;
    }
    
    ecra = 1; // Volta ao jogo
  }

  // 2. CLIQUE EM "INSTRUÇÕES"
  if (mouseX > 490 && mouseX < 790 && mouseY > 430 && mouseY < 490) {
    ecra = 2; // Vai para o ecrã de instruções
  }

  // 3. CLIQUE EM "REINICIAR"
  if (mouseX > 490 && mouseX < 790 && mouseY > 530 && mouseY < 590) {
    // Repõe tudo a zeros e recomeça o jogo direto
    nivelAtual = 1;
    pontuacao = 0;
    gerarSequencia(nivelAtual);
    estadoJogo = 1; 
    ecra = 1; // Volta para o jogo, já reiniciado
  }
}