function menuPrincipal() {
  background(imgFundo);
  
  fill(255); 
  textSize(60);
  text("SEGUE O RITMO", 640, 180);
  
  fill(220); 
  rect(540, 300, 200, 60, 10);
  rect(540, 420, 200, 60, 10); 
  
  fill(0);
  textSize(25);
  text("JOGAR", 640, 330);
  text("INSTRUÇÕES", 640, 450);
}

function cliqueMenu() {
  if (mouseX > 540 && mouseX < 740) {
    if (mouseY > 300 && mouseY < 360) {
      ecra = 1; 
    } else if (mouseY > 420 && mouseY < 480) {
      ecra = 2;
    }
  }
}