// --- jogo.js ---

function jogo() {
  background(30, 30, 50); 
  
  // 1. DESENHAR A BARRA BRANCA NO TOPO
  fill(255); 
  rect(0, 0, 1280, 144); 
  
  // 2. DESENHAR A CÂMARA EM TAMANHO REAL (1280x720)
  // Começa no Y=144 (logo abaixo da barra branca)
  image(video, 0, 144, 1280, 720);
  
  // 3. TEXTOS (DENTRO DA BARRA BRANCA)
  fill(0); 
  textSize(30);
  text("A TUA CAMARA ESTA ATIVA!", 640, 60);
  
  fill(100); 
  textSize(15);
  text("Clica em qualquer lado para ir para o Game Over", 640, 110);
}

function cliqueJogo() {
  ecra = 3; // Vai para Game Over
  resizeCanvas(1280, 720); // ENCOLHE O ECRÃ DE VOLTA AO NORMAL
}