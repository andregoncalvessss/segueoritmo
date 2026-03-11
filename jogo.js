function jogo() {
  background(30, 30, 50); 

  // 1. BARRA BRANCA NO TOPO
  fill(255); 
  noStroke(); // Garante que a barra não tem contorno preto
  rect(0, 0, 1280, 144); 

  // 2. CÂMARA ESPELHADA (O teu código original, mantido intacto!)
  push();
    translate(1280, 0);
    scale(-1, 1);
    image(video, 0, 144, 1280, 720);
  pop();

  // 3. TÍTULO DO JOGO (Subimos para o Y = 45 para dar espaço ao botão)
  fill(0); 
  textSize(25); // Ajustado para caber bem com o botão por baixo
  text("MEMORIZA A SEQUÊNCIA DOS MOVIMENTOS!", 640, 45);
  
  // 4. BOTÃO "MOSTRA SEQUENCIA"
  stroke(0);         // Contorno preto para o botão
  strokeWeight(4);   
  fill(220);         // Cor do botão (cinzento claro)
  
  // Desenhar o botão: largura 360, altura 50. Para centrar: 640 - 180 = 460
  rect(460, 80, 360, 50, 10);
  
  // 5. TEXTO DO BOTÃO
  noStroke(); // Desligar contorno para o texto
  fill(0);
  textSize(18);
  text("REVELAR SEQUÊNCIA", 640, 105); // Centrado dentro do botão
}

function cliqueJogo() {
  // VERIFICA SE O JOGADOR CLICOU NO BOTÃO
  // O X vai de 460 a 820 (460 + 360). O Y vai de 80 a 130 (80 + 50).
  if (mouseX > 460 && mouseX < 820 && mouseY > 80 && mouseY < 130) {
    
    // Apenas um aviso na consola para saberes que o botão funciona
    console.log("Clicou em MOSTRA SEQUENCIA!");
    
  } else {
    // Se clicar em qualquer outro lado (na câmara, etc.), vai para o Game Over
    ecra = 3; 
    resizeCanvas(1280, 720); // Volta ao tamanho normal para os menus
  }
}