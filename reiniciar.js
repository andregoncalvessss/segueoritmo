// --- reiniciar.js ---

function ecraReiniciar() {
  background(imgFundoFim); 
  stroke(0);         
  strokeWeight(4);   
  fill(220);
  rect(490, 550, 300, 60, 10);
  noStroke();
  fill(0);
  textSize(25);
  text("REINICIAR", 640, 580);
}

function cliqueReiniciar() {
  if (mouseX > 490 && mouseX < 790 && mouseY > 550 && mouseY < 610) {
    if (somClick.isLoaded()) somClick.play();
    ecra = 0; 
    resizeCanvas(1280, 720);
    somPontuacao.stop();
  }
}