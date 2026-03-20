// --- nome.js ---

function ecraNome() {
  background(30, 30, 50);

  fill(255); noStroke(); textSize(40); textAlign(CENTER, CENTER);
  text("INTRODUZ O TEU NOME", 640, 200);

  // Mantém a caixa de texto centrada na janela
  inputNome.show();
  inputNome.position(windowWidth / 2 - 150, windowHeight / 2 - 50);

  // Botão Avançar
  stroke(0); strokeWeight(4); fill(0, 180, 0);
  rect(490, 450, 300, 60, 10);
  noStroke(); fill(255); textSize(25);
  text("AVANÇAR", 640, 480);
}

function cliqueNome() {
  if (mouseX > 490 && mouseX < 790 && mouseY > 450 && mouseY < 510) {
    if (somClick.isLoaded()) somClick.play();
    
    // Guarda o nome digitado, ou chama-lhe "JOGADOR" se estiver vazio
    nomeJogador = inputNome.value().trim();
    if (nomeJogador === "") {
      nomeJogador = "JOGADOR";
    }

    inputNome.hide(); // Esconde a caixa de texto
    ecra = 4;         // Avança para o ecrã de Dificuldade
  }
}