function ecraDificuldade() {
  background(30, 30, 50); 
  
  fill(255); 
  textAlign(CENTER, CENTER); 
  textSize(40);
  text("SELECIONA A DIFICULDADE", 640, 150);

  fill(0, 180, 0); stroke(255); strokeWeight(4);
  rect(440, 250, 400, 80, 15);
  fill(255); noStroke(); textSize(30);
  text("FÁCIL", 640, 290);

  fill(200, 150, 0); stroke(255); strokeWeight(4);
  rect(440, 380, 400, 80, 15);
  fill(255); noStroke(); textSize(30);
  text("MÉDIA", 640, 420);

  fill(180, 0, 0); stroke(255); strokeWeight(4);
  rect(440, 510, 400, 80, 15);
  fill(255); noStroke(); textSize(30);
  text("DIFÍCIL", 640, 550);
}

function cliqueDificuldade() {
  if (mouseX > 440 && mouseX < 840) {
    if (mouseY > 250 && mouseY < 330) {
      if (somClick.isLoaded()) somClick.play();
      tempoPorExercicio = 4000; 
      iniciarJogo();
    } 
    else if (mouseY > 380 && mouseY < 460) {
      if (somClick.isLoaded()) somClick.play();
      tempoPorExercicio = 2500; 
      iniciarJogo();
    } 
    else if (mouseY > 510 && mouseY < 590) {
      if (somClick.isLoaded()) somClick.play();
      tempoPorExercicio = 1500; 
      iniciarJogo();
    }
  }
}

function iniciarJogo() {
  nivelAtual = 1;
  pontuacao = 0;
  gerarSequencia(nivelAtual);
  estadoJogo = 1; 
  ecra = 1;       
  resizeCanvas(1280, 864);

 
  if (!somFundo.isPlaying() && somFundo.isLoaded()) {
    somFundo.loop();
  }
}