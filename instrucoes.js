// --- instrucoes.js ---

function instrucoes() {
  background(255);

  fill(0);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Como Jogar!", 640, 150);

  textSize(22);
  textAlign(LEFT, TOP);
  text("1. Memorizar as posições e a sua sequência.", 200, 220);
  text("\n2. Repetir os movimentos quando aparecer\n   'Agora é a tua vez'.\n   Fazer os movimentos para a câmara.\n", 200, 260);
  text("\n\n\nNota: Manter alguma distância do ecrã,\npara que a câmara consiga captar corretamente.", 200, 320);

  stroke(0);
  strokeWeight(4);
  fill(255);
  rect(540, 500, 200, 60, 10);
  noStroke();
  fill(0);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("VOLTAR", 640, 530);
}

function cliqueInstrucoes() {
  if (mouseX > 540 && mouseX < 740 && mouseY > 500 && mouseY < 560) {
    ecra = ecraAnterior; 
    if (ecra === 0) {
      resizeCanvas(1280, 720); 
    }
  }
}