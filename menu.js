
function menuPrincipal() {
  background(imgFundo);
  
  fill(255);         
  stroke(0);         
  strokeWeight(6);   
  textSize(60);      
  text("SEGUE O RITMO", 640, 180);
  
  stroke(0);
  strokeWeight(4);
  fill(255);
  
  rect(490, 300, 300, 60, 10);
  rect(490, 420, 300, 60, 10);
  
  noStroke();
  
  fill(0);
  textSize(25);
  text("JOGAR", 640, 330);
  text("INSTRUÇÕES", 640, 450);
  textAlign(CENTER, CENTER);
  
  // === GARANTIR QUE A CAIXA DE TEXTO NÃO APARECE NO MENU ===
  if (typeof inputNome !== 'undefined') inputNome.hide();
}

function cliqueMenu() {
  if (mouseX > 490 && mouseX < 790) {
    if (mouseY > 300 && mouseY < 360) {
      if (somClick.isLoaded()) somClick.play();
      
      // === RESETAR TUDO E IR PARA O ECRÃ DO NOME (6) ===
      inputNome.value(''); // Limpa o nome antigo
      ecra = 6;
      resizeCanvas(1280, 720); 
      
      // Resetar flags de reiniciar
      faseBotoesReiniciar = false;
      timerPulsoEsq = 0;
      timerPulsoDir = 0;
      
    } else if (mouseY > 420 && mouseY < 480) {
      if (somClick.isLoaded()) somClick.play();
      ecraAnterior = 0; 
      ecra = 2; 
    }
  }
}