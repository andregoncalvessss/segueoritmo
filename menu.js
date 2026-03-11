function menuPrincipal() {
  background(imgFundo);
  
  // TÍTULO COM CONTORNO
  fill(255);         
  stroke(0);         
  strokeWeight(6);   
  textSize(60);      
  text("SEGUE O RITMO", 640, 180);
  
  // CONTORNO A PRETO PARA OS BOTÕES
  stroke(0);
  strokeWeight(4);
  fill(220); 
  
  // BOTÕES (largura 300, X 490)
  rect(490, 300, 300, 60, 10);
  rect(490, 420, 300, 60, 10); 
  
  // DESLIGAR O CONTORNO PARA O TEXTO
  noStroke(); 
  
  // TEXTO DOS BOTÕES
  fill(0);
  textSize(25);
  text("JOGAR", 640, 330);
  text("INSTRUÇÕES", 640, 450);
}

function cliqueMenu() {
  // A zona de clique mantém-se entre 490 e 790
  if (mouseX > 490 && mouseX < 790) {
    if (mouseY > 300 && mouseY < 360) {
      ecra = 1; // Vai para Jogo
    } else if (mouseY > 420 && mouseY < 480) {
      ecra = 2; // Vai para Instruções
    }
  }
}