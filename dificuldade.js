// --- dificuldade.js ---

function ecraDificuldade() {
  background(30, 30, 50); 
  
  fill(255); 
  textAlign(CENTER, CENTER); 
  textSize(40);
  text("SELECIONA A DIFICULDADE", 640, 150);

  // Botão FÁCIL (4.0 segundos por imagem)
  fill(0, 180, 0); stroke(255); strokeWeight(4);
  rect(440, 250, 400, 80, 15);
  fill(255); noStroke(); textSize(30);
  text("FACIL", 640, 290);

  // Botão MÉDIA (2.5 segundos por imagem)
  fill(200, 150, 0); stroke(255); strokeWeight(4);
  rect(440, 380, 400, 80, 15);
  fill(255); noStroke(); textSize(30);
  text("MEDIA", 640, 420);

  // Botão DIFÍCIL (1.5 segundos por imagem)
  fill(180, 0, 0); stroke(255); strokeWeight(4);
  rect(440, 510, 400, 80, 15);
  fill(255); noStroke(); textSize(30);
  text("DIFICIL", 640, 550);
}

function cliqueDificuldade() {
  if (mouseX > 440 && mouseX < 840) {
    if (mouseY > 250 && mouseY < 330) {
      tempoPorExercicio = 4000; // Fácil
      iniciarJogo();
    } 
    else if (mouseY > 380 && mouseY < 460) {
      tempoPorExercicio = 2500; // Média
      iniciarJogo();
    } 
    else if (mouseY > 510 && mouseY < 590) {
      tempoPorExercicio = 1500; // Difícil
      iniciarJogo();
    }
  }
}

// Prepara e arranca o jogo direto!
function iniciarJogo() {
  nivelAtual = 1;
  pontuacao = 0;
  gerarSequencia(nivelAtual);
  estadoJogo = 1; // Salta direto para a fase de memorizar
  ecra = 1;       // Muda para o ecrã do jogo
  resizeCanvas(1280, 864);
}