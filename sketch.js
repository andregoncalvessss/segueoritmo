let ecra = 0;

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
}

function draw() {
  if (ecra === 0) {
    menuPrincipal();
  } else if (ecra === 1) {
    jogo();
  } else if (ecra === 2) {
    instrucoes();
  }
}

function menuPrincipal() {
  background(255);
  
  fill(0);
  textSize(60);
  text("Segue o Ritmo", 400, 150);
  
  rect(300, 250, 200, 60);
  rect(300, 350, 200, 60);
  
  fill(255);
  textSize(25);
  text("JOGAR", 400, 280);
  text("INSTRUÇÕES", 400, 380);
}

function jogo() {
  background(200);
  fill(0);
  textSize(40);
  text("O jogo começa aqui!", 400, 300);
}

function instrucoes() {
  background(200);
  fill(0);
  textSize(40);
  text("Como jogar...", 400, 300);
}

function mousePressed() {
  if (ecra === 0) {
    if (mouseX > 300 && mouseX < 500 && mouseY > 250 && mouseY < 310) {
      ecra = 1;
    }
    
    if (mouseX > 300 && mouseX < 500 && mouseY > 350 && mouseY < 410) {
      ecra = 2;
    }
  } else {
    ecra = 0;
  }
}