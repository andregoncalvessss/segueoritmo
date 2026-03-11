function ecraReiniciar() {
  background(150, 50, 50); 
  fill(255);
  textSize(60);
  text("FIM DE JOGO", 640, 250);
  fill(220);
  rect(540, 400, 200, 60, 10);
  
  fill(0);
  textSize(25);
  text("MENU PRINCIPAL", 640, 430);
}

function cliqueReiniciar() {
  if (mouseX > 540 && mouseX < 740 && mouseY > 400 && mouseY < 460) {
    ecra = 0;
  }
}