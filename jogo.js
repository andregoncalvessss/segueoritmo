// --- jogo.js ---

function getEscalaX() { return 1280 / (video.elt.videoWidth || 640); }
function getEscalaY() { return 720 / (video.elt.videoHeight || 480); }

function desenharOsso(p1, p2) {
  if (p1 && p2 && p1.confidence > 0.1 && p2.confidence > 0.1) {
    let eX = getEscalaX();
    let eY = getEscalaY();

    let x1 = 1280 - (p1.x * eX);
    let y1 = (p1.y * eY) + 144;
    let x2 = 1280 - (p2.x * eX);
    let y2 = (p2.y * eY) + 144;

    strokeWeight(6); stroke(0, 255, 255);
    line(x1, y1, x2, y2);
  }
}

function gerarSequencia(nivel) {
  sequenciaAtual = [];
  let numExercicios = nivel + 1; 
  let ultimaPose = null;
  
  for (let i = 0; i < numExercicios; i++) {
    let novaPose = random(imgPoses);
    while (ultimaPose && novaPose.id === ultimaPose.id) {
      novaPose = random(imgPoses);
    }
    sequenciaAtual.push(novaPose);
    ultimaPose = novaPose;
  }
  
  poseAtualAlvo = 0; 
  tempoNaPose = 0; 
  esperandoProximaPose = false;
  temporizador = millis();
  tempoInicioPose = millis(); 
}

// O JOGO AGORA RECEBE UM AVISO SE ESTÁ EM PAUSA OU NÃO
function jogo(isPausado = false) {
  background(30, 30, 50); 
  fill(255); noStroke(); rect(0, 0, 1280, 144); 

  // Ajusta o relógio interno se estiver na pausa
  let agora = isPausado ? tempoPausaInicio : millis();

  fill(0); textAlign(LEFT, TOP); textSize(20);
  text("NIVEL: " + nivelAtual, 20, 20);
  text("PONTOS: " + pontuacao, 20, 50); 
  textAlign(CENTER, CENTER); 

  // === BOTÕES SEMPRE VISÍVEIS DURANTE O JOGO ===
  if (estadoJogo > 0) {
    // BOTÃO DE PAUSA
    fill(220); stroke(0); strokeWeight(3);
    rect(1000, 20, 50, 40, 5); 
    fill(0); noStroke();
    rect(1016, 28, 6, 24); 
    rect(1028, 28, 6, 24); 

    // BOTÃO DE DEBUG
    fill(255, 100, 100); stroke(0); strokeWeight(2);
    rect(1070, 20, 150, 40, 5); 
    fill(0); noStroke(); textSize(15);
    text("DEBUG: SKIP", 1145, 40);
  }

  push();
    translate(1280, 0); scale(-1, 1);
    image(video, 0, 144, 1280, 720);
  pop();

  if (estadoJogo === 0) {
    fill(0); textSize(25); text("MEMORIZA OS MOVIMENTOS!", 640, 45);
    stroke(0); strokeWeight(4); fill(220); rect(460, 80, 360, 50, 10);
    noStroke(); fill(0); textSize(18); text("REVELAR SEQUÊNCIA", 640, 105); 
    
  } else if (estadoJogo === 1) {
    let tempoPassado = agora - temporizador;
    
    let numPoses = sequenciaAtual.length;
    let larguraCard = 100;
    let gap = 30; 
    let larguraTotal = (numPoses * larguraCard) + ((numPoses - 1) * gap);
    let startX = (1280 - larguraTotal) / 2; 
    
    let tempoParaMemorizar = numPoses * 2500; 

    if (tempoPassado < tempoParaMemorizar) {
      for (let i = 0; i < numPoses; i++) {
        let x = startX + i * (larguraCard + gap);
        image(sequenciaAtual[i].img, x, 22, larguraCard, 80);
        
        if (i < numPoses - 1) {
          image(imgSeta, x + larguraCard + 5, 42, gap - 10, 40);
        }
      }
      
      let larguraBarra = 1280 - (tempoPassado / tempoParaMemorizar) * 1280;
      fill(0, 220, 0); noStroke(); rect(0, 134, larguraBarra, 10);
    } else {
      // SÓ AVANÇA PARA A VEZ DO JOGADOR SE NÃO ESTIVER PAUSADO
      if (!isPausado) { 
        estadoJogo = 2;
        textoFeedback = "AGORA E A TUA VEZ!"; 
        tempoInicioPose = millis(); 
      }
    }
    
  } else if (estadoJogo === 2) {
    let numPoses = sequenciaAtual.length;
    let larguraCard = 100;
    let gap = 30;
    let larguraTotal = (numPoses * larguraCard) + ((numPoses - 1) * gap);
    let startX = (1280 - larguraTotal) / 2;

    for (let i = 0; i < numPoses; i++) {
      let x = startX + i * (larguraCard + gap);
      
      if (i < poseAtualAlvo || (i === poseAtualAlvo && esperandoProximaPose)) {
        tint(0, 255, 0); 
        image(sequenciaAtual[i].img, x, 22, larguraCard, 80);
        noTint();
      } else {
        fill(80); stroke(255); strokeWeight(3);
        rect(x, 22, larguraCard, 80, 10);
        fill(255); noStroke(); textSize(40);
        text("?", x + 50, 22 + 40);
      }
    }

    // Feedback Visual
    if (esperandoProximaPose) {
       fill(0, 180, 0); 
       textSize(25); 
       text(textoFeedback, 640, 125); 
    } else {
       if (textoFeedback === "AGORA E A TUA VEZ!") {
          fill(255, 0, 0); 
       } else {
          fill(0, 100, 255); 
       }
       textSize(25); 
       text(textoFeedback, 640, 125);
    }

    if (poses.length > 0) {
      let pose = poses[0]; 

      desenharOsso(pose.left_shoulder, pose.left_elbow);
      desenharOsso(pose.left_elbow, pose.left_wrist);
      desenharOsso(pose.right_shoulder, pose.right_elbow);
      desenharOsso(pose.right_elbow, pose.right_wrist);
      desenharOsso(pose.left_shoulder, pose.left_hip);
      desenharOsso(pose.right_shoulder, pose.right_hip);
      desenharOsso(pose.left_hip, pose.right_hip);
      desenharOsso(pose.left_hip, pose.left_knee);
      desenharOsso(pose.right_hip, pose.right_knee);

      let eX = getEscalaX();
      let eY = getEscalaY();
      
      for (let i = 0; i < pose.keypoints.length; i++) {
         let ponto = pose.keypoints[i];
         if (ponto.confidence > 0.1) { 
            fill(255, 255, 0); noStroke();
            ellipse(1280 - (ponto.x * eX), (ponto.y * eY) + 144, 15);
         }
      }

      // === SE NÃO ESTIVER PAUSADO, VERIFICA AS POSES E TEMPO ===
      if (!isPausado) {
        if (esperandoProximaPose) {
           if (millis() - tempoEspera > 2000) {
              esperandoProximaPose = false;
              nivelAtual++;
              if (nivelAtual > 5) {
                 ecra = 3; estadoJogo = 0; resizeCanvas(1280, 720);
              } else {
                 gerarSequencia(nivelAtual);
                 estadoJogo = 1; 
              }
           }
        } else {
           let idAlvo = sequenciaAtual[poseAtualAlvo].id;
           if (verificarPose(pose, idAlvo)) {
              tempoNaPose++; 
              fill(0, 255, 0); noStroke(); rect(0, 134, (tempoNaPose / 20) * 1280, 10);
              
              if (tempoNaPose > 20) { 
                 let tempoGasto = (millis() - tempoInicioPose) / 1000;
                 let pontosGanhos = floor(max(10, 100 - (tempoGasto * 5))); 
                 pontuacao += pontosGanhos;

                 poseAtualAlvo++; 
                 tempoNaPose = 0;
                 tempoInicioPose = millis(); 
                 
                 if (poseAtualAlvo >= sequenciaAtual.length) {
                    esperandoProximaPose = true;
                    tempoEspera = millis();
                    if (nivelAtual >= 5) {
                       textoFeedback = "TERMINASTE!";
                    } else {
                       textoFeedback = "MUITO BOM! PREPARA-TE...";
                    }
                 } else {
                    let frases = ["BOA!", "ISSO MESMO!", "EXCELENTE!", "PERFEITO!"];
                    textoFeedback = random(frases);
                 }
              }
           } else {
              tempoNaPose = 0; 
           }
        }
      } else {
         // SE ESTIVER PAUSADO, DESENHA SÓ A BARRA CONGELADA
         if (!esperandoProximaPose && tempoNaPose > 0) {
             fill(0, 255, 0); noStroke(); rect(0, 134, (tempoNaPose / 20) * 1280, 10);
         }
      }
    }
  }
}

function cliqueJogo() {
  if (estadoJogo === 0) {
    if (mouseX > 460 && mouseX < 820 && mouseY > 80 && mouseY < 130) {
      nivelAtual = 1;
      pontuacao = 0;
      gerarSequencia(nivelAtual);
      estadoJogo = 1; 
      resizeCanvas(1280, 864);
    } else {
      ecra = 3; estadoJogo = 0; resizeCanvas(1280, 720);
    }
  } 
  
  // === CLIQUES NOS BOTÕES DURANTE O JOGO (MEMORIZAR OU JOGAR) ===
  if (estadoJogo === 1 || estadoJogo === 2) {
    if (!esperandoProximaPose) { // Previne usar debug/pausa na transição de nível
      
      // --- CLIQUE NO BOTÃO DE PAUSA ---
      if (mouseX > 1000 && mouseX < 1050 && mouseY > 20 && mouseY < 60) {
        ecra = 5; 
        tempoPausaInicio = millis(); 
        return; 
      }
      
      // --- CLIQUE NO BOTÃO DE DEBUG ---
      if (mouseX > 1070 && mouseX < 1220 && mouseY > 20 && mouseY < 60) {
         let tempoGasto = (millis() - tempoInicioPose) / 1000;
         let pontosGanhos = floor(max(10, 100 - (tempoGasto * 5))); 
         pontuacao += pontosGanhos;
         
         poseAtualAlvo++; 
         tempoNaPose = 0;
         tempoInicioPose = millis(); 
         
         if (poseAtualAlvo >= sequenciaAtual.length) {
            esperandoProximaPose = true;
            tempoEspera = millis();
            if (nivelAtual >= 5) {
               textoFeedback = "TERMINASTE!";
            } else {
               textoFeedback = "MUITO BOM! PREPARA-TE...";
            }
         } else {
            let frases = ["BOA!", "ISSO MESMO!", "EXCELENTE!", "PERFEITO!"];
            textoFeedback = random(frases);
         }
      }
    }
  }
}

function verificarPose(pose, idPose) {
  let pulsoEsq = pose.left_wrist;    
  let pulsoDir = pose.right_wrist;     
  let ombroEsq = pose.left_shoulder; 
  let ombroDir = pose.right_shoulder;  
  let ancaEsq = pose.left_hip;
  let ancaDir = pose.right_hip;
  let joelhoEsq = pose.left_knee;    
  let joelhoDir = pose.right_knee;     
  
  if (!pulsoEsq || !pulsoDir || !ombroEsq || !ombroDir) return false;
  if (pulsoEsq.confidence < 0.1 || pulsoDir.confidence < 0.1) return false;
  
  let tamanhoTronco = 100;
  if (ancaEsq && ancaEsq.confidence > 0.1) {
    tamanhoTronco = abs(ombroEsq.y - ancaEsq.y);
  } else {
    tamanhoTronco = abs(ombroEsq.x - ombroDir.x) * 1.5; 
  }

  let margem = tamanhoTronco * 0.35; 
  
  let esqNoAr = pulsoEsq.y < (ombroEsq.y - margem);  
  let esqBaixo = pulsoEsq.y > (ombroEsq.y + margem); 
  let esqMeio = !esqNoAr && !esqBaixo;       
  let dirNoAr = pulsoDir.y < (ombroDir.y - margem);
  let dirBaixo = pulsoDir.y > (ombroDir.y + margem);
  let dirMeio = !dirNoAr && !dirBaixo;
  
  if (idPose === '2maosnoar') return esqNoAr && dirNoAr;
  if (idPose === 'maoDireita') return dirMeio && esqBaixo; 
  if (idPose === 'maoEsquerda') return esqMeio && dirBaixo;
  if (idPose === 'posicaoT') return esqMeio && dirMeio;
  
  if (idPose === 'pernaEsquerda') {
     if (!esqMeio || !dirMeio) return false;
     if (!joelhoEsq || !joelhoDir || joelhoEsq.confidence < 0.1 || joelhoDir.confidence < 0.1) return false;
     let pernaEsqNoAr = joelhoEsq.y < (joelhoDir.y - tamanhoTronco * 0.10); 
     return pernaEsqNoAr;
  }
  return false;
}