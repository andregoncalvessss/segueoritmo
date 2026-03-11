let ecra = 0;
let imgFundo;

function preload() {
  imgFundo = loadImage('assets/background.png');
}

function setup() {
  createCanvas(1280, 720); 
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

function jogo() {
  background(200);
  fill(0);
  textSize(40);
  text("O jogo começa aqui!", 640, 360);
}

function instrucoes() {
  background(200);
  fill(0);
  textSize(40);
  text("Como jogar...", 640, 360);
}

function mousePressed() {
  if (ecra === 0) {
    if (mouseX > 540 && mouseX < 740 && mouseY > 300 && mouseY < 360) {
      ecra = 1;
    }
    
    if (mouseX > 540 && mouseX < 740 && mouseY > 420 && mouseY < 480) {
      ecra = 2;
    }
  } else {
    ecra = 0;
  }
}