let tempoPorExercicio = 4000;

function ecraDificuldade() {
  background(30, 30, 50);

  fill(255); noStroke(); textSize(40); textAlign(CENTER, CENTER);
  text("ESCOLHE A DIFICULDADE", 640, 150);

  stroke(0); strokeWeight(4);

  // Botões
  fill(0, 200, 0); rect(490, 250, 300, 60, 10);   // Fácil
  fill(200, 200, 0); rect(490, 350, 300, 60, 10); // Médio
  fill(200, 0, 0); rect(490, 450, 300, 60, 10);   // Difícil

  noStroke(); fill(255); textSize(25);
  text("FÁCIL", 640, 280);
  text("MÉDIO", 640, 380);
  text("DIFÍCIL", 640, 480);
}

function cliqueDificuldade() {
  // Clique no botão FÁCIL
  if (mouseX > 490 && mouseX < 790 && mouseY > 250 && mouseY < 310) {
    if (somClick.isLoaded()) somClick.play();
    tempoPorExercicio = 4000;
    ecra = 7; // Vai para a seleção de exercícios
  }
  // Clique no botão MÉDIO
  else if (mouseX > 490 && mouseX < 790 && mouseY > 350 && mouseY < 410) {
    if (somClick.isLoaded()) somClick.play();
    tempoPorExercicio = 2500;
    ecra = 7; // Vai para a seleção de exercícios
  }
  // Clique no botão DIFÍCIL
  else if (mouseX > 490 && mouseX < 790 && mouseY > 450 && mouseY < 510) {
    if (somClick.isLoaded()) somClick.play();
    tempoPorExercicio = 1500;
    ecra = 7; // Vai para a seleção de exercícios
  }
}