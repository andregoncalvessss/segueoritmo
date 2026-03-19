function ecraPausa() {
  // mesma cor da dificuldade
  background(30, 30, 50);

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

  // === DESENHAR OS BOTÕES (Espaçamento uniforme de 30px) 
  stroke(0);
  strokeWeight(4);
  
  // Botão 1: CONTINUAR 
  fill(220);
  rect(490, 320, 300, 60, 10);
  
  // Botão 2: INSTRUÇÕES 
  fill(220);
  rect(490, 410, 300, 60, 10);

  // Botão 3: REINICIAR 
  fill(220);
  rect(490, 500, 300, 60, 10);

  // Botão 4: SAIR 
  fill(200, 0, 0);
  rect(590, 590, 100, 40, 10); 

 
  noStroke();
  fill(0);
  textSize(25);
  text("CONTINUAR", 640, 350);
  text("INSTRUÇÕES", 640, 440); 
  text("REINICIAR", 640, 530);

 
  fill(255);
  textSize(20);
  text("SAÍR", 640, 610);
}

function cliquePausa() {
 
  if (mouseX > 490 && mouseX < 790 && mouseY > 320 && mouseY < 380) {
    let tempoPausado = millis() - tempoPausaInicio;
 
    temporizador += tempoPausado;
    tempoInicioPose += tempoPausado;
    if (esperandoProximaPose) {
      tempoEspera += tempoPausado;
    }
    
    ecra = 1; 
  }


  if (mouseX > 490 && mouseX < 790 && mouseY > 410 && mouseY < 470) {
    ecraAnterior = 1;
    ecra = 2; 
  }

 
  if (mouseX > 490 && mouseX < 790 && mouseY > 500 && mouseY < 560) {
    nivelAtual = 1;
    pontuacao = 0;
    gerarSequencia(nivelAtual);
    estadoJogo = 1; 
    ecra = 1; 
  }
  
  
  if (mouseX > 590 && mouseX < 690 && mouseY > 590 && mouseY < 630) {
    nivelAtual = 1;
    pontuacao = 0;
    estadoJogo = 0;
    ecra = 0; 
    resizeCanvas(1280, 720);
  }
}