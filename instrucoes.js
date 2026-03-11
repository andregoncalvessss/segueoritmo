function instrucoes() {
  background(200);
  fill(0);
  textSize(40);
  text("Como jogar...", 640, 300);
  fill(220);
  rect(540, 500, 200, 60, 10);
  fill(0);
  textSize(25);
  text("VOLTAR", 640, 530);
}

function cliqueInstrucoes() {
  if (mouseX > 540 && mouseX < 740 && mouseY > 500 && mouseY < 560) {
    ecra = 0;
  }
}