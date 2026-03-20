// --- pausa.js ---

let volumeMusica = 0.5;

function ecraPausa() {
  background(30, 30, 50);

  fill(255);
  stroke(0);
  strokeWeight(6);
  rect(440, 150, 400, 580, 15);

  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(50);
  text("PAUSA", 640, 200);

  stroke(0);
  strokeWeight(4);
  
  // Botões
  fill(220);
  rect(490, 270, 300, 60, 10); // Continuar
  rect(490, 350, 300, 60, 10); // Instruções
  rect(490, 430, 300, 60, 10); // Reiniciar
  
  // --- BARRA DE VOLUME ---
  fill(100); 
  rect(490, 510, 300, 60, 10); 
  
  fill(100, 255, 100);
  rect(490, 510, 300 * volumeMusica, 60, 10);
  
  noFill();
  stroke(0);
  rect(490, 510, 300, 60, 10);

  fill(200, 0, 0);
  rect(590, 620, 100, 40, 10); // Sair

  noStroke();
  fill(0);
  textSize(25);
  text("CONTINUAR", 640, 300);
  text("INSTRUÇÕES", 640, 380); 
  text("REINICIAR", 640, 460);
  
  text("VOLUME: " + floor(volumeMusica * 100) + "%", 640, 540);

  fill(255);
  textSize(20);
  text("SAÍR", 640, 640);
}

function cliquePausa() {
  // Lógica dos botões (Continuar, Instruções, Reiniciar)...
  if (mouseX > 490 && mouseX < 790 && mouseY > 270 && mouseY < 330) { /* ... */ ecra = 1; }

  if (mouseX > 490 && mouseX < 790 && mouseY > 350 && mouseY < 410) {
    ecraAnterior = 1;
    ecra = 2;
  }

  if (mouseX > 490 && mouseX < 790 && mouseY > 430 && mouseY < 490) {
  nivelAtual = 1;
  pontuacao = 0;
  gerarSequencia(nivelAtual);
  estadoJogo = 1;
  ecra = 1;
}

  // --- LÓGICA DA BARRA DE VOLUME ---
  if (mouseX > 490 && mouseX < 790 && mouseY > 510 && mouseY < 570) {
    let cliqueX = mouseX - 490; 
    volumeMusica = cliqueX / 300;
    
    somFundo.setVolume(volumeMusica);
  }
  
    // SAIR
  if (mouseX > 590 && mouseX < 690 && mouseY > 620 && mouseY < 660) {
    somFundo.stop();
    ecra = 0; // Volta ao menu principal
    resizeCanvas(1280, 720); // Garante o tamanho correto
  }
}