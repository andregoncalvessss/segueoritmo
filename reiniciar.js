function ecraReiniciar() {
  background(imgFundoFim); 
 
  // Contorno do botão
  stroke(0);         
  strokeWeight(4);   
  fill(220);

  // BOTÃO MAIS PARA BAIXO: mudei o Y de 400 para 550
  rect(490, 550, 300, 60, 10);
 
  // Desliga o contorno para o texto
  noStroke();
  fill(0);
  textSize(25);
  // TEXTO MAIS PARA BAIXO: mudei o Y de 430 para 580 (para ficar no centro do novo botão)
  text("REINICIAR", 640, 580);
}

function cliqueReiniciar() {
  // A tua zona de clique atual
  if (mouseX > 490 && mouseX < 790 && mouseY > 550 && mouseY < 610) {
    ecra = 0; // Vai para o Menu
    resizeCanvas(1280, 720); // GARANTE O TAMANHO NORMAL
  }
}