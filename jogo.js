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
    sequenciaAtual.push({ img: novaPose.img, id: novaPose.id, status: 0 });
    ultimaPose = novaPose;
  }
  poseAtualAlvo = 0; 
  tempoNaPose = 0; 
  esperandoProximaPose = false;
  temporizador = millis();
  tempoInicioPose = millis(); 
}

function jogo(isPausado = false) {
  background(30, 30, 50); 
  fill(255); noStroke(); rect(0, 0, 1280, 144); 

  let agora = isPausado ? tempoPausaInicio : millis();

  fill(0); textAlign(LEFT, TOP); textSize(20);
  text("NÍVEL: " + nivelAtual, 20, 20);
  text("PONTOS: " + pontuacao, 20, 50);
  
  let txtDificuldade = "";
  if (typeof tempoPorExercicio !== 'undefined') {
    if (tempoPorExercicio === 4000) txtDificuldade = "FÁCIL";
    else if (tempoPorExercicio === 2500) txtDificuldade = "MÉDIA";
    else if (tempoPorExercicio === 1500) txtDificuldade = "DIFÍCIL";
  }
  if (txtDificuldade !== "") {
    text("DIFICULDADE:", 20, 80); 
    text(txtDificuldade, 20, 105); 
  }
  textAlign(CENTER, CENTER);

  if (estadoJogo > 0) {
    let btnCx = 1235; 
    let btnCy = 45;   
    let btnRaio = 26; 
    fill(0); 
    noStroke();
    ellipse(btnCx, btnCy, btnRaio * 2, btnRaio * 2);
    fill(255);
    let barW = 6;
    let barH = 22;
    let espacamento = 4; 
    rect(btnCx - espacamento - barW, btnCy - barH/2, barW, barH, 10);
    rect(btnCx + espacamento, btnCy - barH/2, barW, barH, 10);
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
    let tempoParaMemorizar = numPoses * (tempoPorExercicio * 0.8); 

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
      if (!isPausado) { 
        estadoJogo = 2;
        textoFeedback = "AGORA É A TUA VEZ!"; 
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
        if (sequenciaAtual[i].status === 1) tint(0, 255, 0); 
        image(sequenciaAtual[i].img, x, 22, larguraCard, 80);
        noTint();

        if (sequenciaAtual[i].status === -1) {
          let cx = x + larguraCard / 2;
          let cy = 22 + 40; 
          let s = 20; 
          strokeCap(ROUND);
          stroke(0); strokeWeight(12);
          line(cx - s, cy - s, cx + s, cy + s);
          line(cx + s, cy - s, cx - s, cy + s);
          stroke(255, 50, 50); strokeWeight(6);
          line(cx - s, cy - s, cx + s, cy + s);
          line(cx + s, cy - s, cx - s, cy + s);
          strokeCap(SQUARE); 
        }
      } else {
        fill(80); stroke(255); strokeWeight(3);
        rect(x, 22, larguraCard, 80, 10);
        fill(255); noStroke(); textSize(40);
        text("?", x + 50, 22 + 40);
      }
    }

    noStroke(); 
    if (esperandoProximaPose) {
       fill(0, 180, 0); textSize(25); text(textoFeedback, 640, 125); 
    } else {
       if (textoFeedback === "AGORA É A TUA VEZ!" || textoFeedback === "TEMPO ESGOTADO!") {
          fill(255, 0, 0); 
       } else {
          fill(0, 100, 255); 
       }
       textSize(25); text(textoFeedback, 640, 125);
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
      let eX = getEscalaX(); let eY = getEscalaY();
      for (let i = 0; i < pose.keypoints.length; i++) {
         let ponto = pose.keypoints[i];
         if (ponto.confidence > 0.1) { 
            fill(255, 255, 0); noStroke();
            ellipse(1280 - (ponto.x * eX), (ponto.y * eY) + 144, 15);
         }
      }
    }

    let isFacil = (tempoPorExercicio === 4000);
    let tempoLimitePose = (tempoPorExercicio === 2500) ? 20000 : 10000;

    if (!isPausado) {
      if (esperandoProximaPose) {
         if (millis() - tempoEspera > 2000) {
            esperandoProximaPose = false;
            nivelAtual++;
            if (nivelAtual > 5) {
               ecra = 3; estadoJogo = 0; resizeCanvas(1280, 720);
               somFundo.stop();
               if (somPontuacao.isLoaded()) somPontuacao.play();
            } else {
               gerarSequencia(nivelAtual);
               estadoJogo = 1; 
            }
         }
      } else {
         if (poses.length === 0) tempoInicioPose += deltaTime; 

         let tempoDecorrido = millis() - tempoInicioPose;
         let tempoRestante = tempoLimitePose - tempoDecorrido;

         if (!isFacil) {
             let larguraBarraVermelha = max(0, (tempoRestante / tempoLimitePose) * 1280);
             fill(200, 0, 0); noStroke();
             rect(0, 144, larguraBarraVermelha, 6);

             push();
             textFont('sans-serif'); textSize(26); 
             let bombX = constrain(larguraBarraVermelha, 15, 1265);
             text("💣", bombX, 147);
             pop();

             if (tempoRestante <= 0) {
                 sequenciaAtual[poseAtualAlvo].status = -1; 
                 textoFeedback = "TEMPO ESGOTADO!";
                 
                 if (somErro.isLoaded()) somErro.play();

                 poseAtualAlvo++; 
                 tempoNaPose = 0;
                 tempoInicioPose = millis(); 
                 
                 if (poseAtualAlvo >= sequenciaAtual.length) {
                    esperandoProximaPose = true;
                    tempoEspera = millis();
                    if (nivelAtual >= 5) {
                       textoFeedback = "TERMINASTE!";
                    } else {
                       textoFeedback = "FIM DA RONDA! PREPARA-TE...";
                    }
                 }
             }
         }

         if (poses.length > 0 && (isFacil || tempoRestante > 0)) {
             let idAlvo = sequenciaAtual[poseAtualAlvo].id;
             if (verificarPose(poses[0], idAlvo)) {
                tempoNaPose++; 
                fill(0, 255, 0); noStroke(); 
                rect(0, 134, (tempoNaPose / 20) * 1280, 10);
                
                if (tempoNaPose > 20) { 
                   sequenciaAtual[poseAtualAlvo].status = 1; 

                   if (somConcluido.isLoaded()) somConcluido.play();

                   let tempoGasto = tempoDecorrido / 1000;
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
         } else if (poses.length === 0) {
             tempoNaPose = 0;
         }
      }
    } else {
       if (!esperandoProximaPose) {
           if (!isFacil) {
               let tempoDecorrido = tempoPausaInicio - tempoInicioPose;
               let tempoRestante = max(0, tempoLimitePose - tempoDecorrido);
               let larguraBarraVermelha = max(0, (tempoRestante / tempoLimitePose) * 1280);
               fill(200, 0, 0); noStroke(); 
               rect(0, 144, larguraBarraVermelha, 6);

               push();
               textFont('sans-serif'); textSize(26); 
               let bombX = constrain(larguraBarraVermelha, 15, 1265);
               text("💣", bombX, 147);
               pop();
           }
           if (tempoNaPose > 0) {
               fill(0, 255, 0); noStroke(); rect(0, 134, (tempoNaPose / 20) * 1280, 10);
           }
       }
    }
  }
}

function cliqueJogo() {
  if (estadoJogo === 0) {
    if (mouseX > 460 && mouseX < 820 && mouseY > 80 && mouseY < 130) {
      if (somClick.isLoaded()) somClick.play();
      nivelAtual = 1; pontuacao = 0; gerarSequencia(nivelAtual); estadoJogo = 1; resizeCanvas(1280, 864);
    } else {
      if (somClick.isLoaded()) somClick.play();
      ecra = 3; estadoJogo = 0; resizeCanvas(1280, 720);
      somFundo.stop();
      if (somPontuacao.isLoaded()) somPontuacao.play();
    }
  } 
  if (estadoJogo === 1 || estadoJogo === 2) {
    if (!esperandoProximaPose) { 
      let btnCx = 1235; let btnCy = 45; let btnRaio = 26;
      if (dist(mouseX, mouseY, btnCx, btnCy) < btnRaio) {
        if (somClick.isLoaded()) somClick.play();
        ecra = 5; tempoPausaInicio = millis(); return; 
      }
    }
  }
}

// === NOVA LÓGICA ESTRITA E EXCLUSIVA ===
function verificarPose(pose, idPose) {
  let pulsoEsq = pose.left_wrist;    let pulsoDir = pose.right_wrist;     
  let ombroEsq = pose.left_shoulder; let ombroDir = pose.right_shoulder;  
  let ancaEsq = pose.left_hip;       let ancaDir = pose.right_hip;
  let joelhoEsq = pose.left_knee;    let joelhoDir = pose.right_knee;     
  
  if (!pulsoEsq || !pulsoDir || !ombroEsq || !ombroDir) return false;
  if (pulsoEsq.confidence < 0.1 || pulsoDir.confidence < 0.1) return false;
  
  let tamanhoTronco = 100;
  if (ancaEsq && ancaEsq.confidence > 0.1) tamanhoTronco = abs(ombroEsq.y - ancaEsq.y);
  else tamanhoTronco = abs(ombroEsq.x - ombroDir.x) * 1.5; 

  let margem = tamanhoTronco * 0.35; 
  
  // Condições dos Braços
  let esqNoAr = pulsoEsq.y < (ombroEsq.y - margem);  
  let esqBaixo = pulsoEsq.y > (ombroEsq.y + margem); 
  let esqMeio = !esqNoAr && !esqBaixo;       
  
  let dirNoAr = pulsoDir.y < (ombroDir.y - margem);
  let dirBaixo = pulsoDir.y > (ombroDir.y + margem);
  let dirMeio = !dirNoAr && !dirBaixo;

  // Condições das Pernas (com fallback caso não sejam detetadas)
  let pernaEsqNoAr = false;
  let pernaDirNoAr = false;
  let pernasAfastadas = false;

  if (joelhoEsq && joelhoDir && joelhoEsq.confidence > 0.1 && joelhoDir.confidence > 0.1) {
      pernaEsqNoAr = joelhoEsq.y < (joelhoDir.y - tamanhoTronco * 0.15); 
      pernaDirNoAr = joelhoDir.y < (joelhoEsq.y - tamanhoTronco * 0.15);
      
      if (ancaEsq && ancaDir && ancaEsq.confidence > 0.1 && ancaDir.confidence > 0.1) {
          // Pernas mais largas que as ancas = afastadas
          pernasAfastadas = abs(joelhoEsq.x - joelhoDir.x) > abs(ancaEsq.x - ancaDir.x) * 1.3;
      }
  }

  // Se nenhuma perna estiver no ar, assumimos pés no chão
  let pernasNoChao = !pernaEsqNoAr && !pernaDirNoAr;
  
  // === APLICAÇÃO DAS REGRAS EXCLUSIVAS ===
  
  // 1. As duas mãos no ar (Braços UP, Pernas DOWN e JUNTAS)
  if (idPose === '2maosnoar') {
      return esqNoAr && dirNoAr && pernasNoChao && !pernasAfastadas;
  }
  
  // 2. Mão Direita ao lado (Direito MIDDLE, Esquerdo DOWN, Pernas DOWN)
  if (idPose === 'maoDireita') {
      return dirMeio && esqBaixo && pernasNoChao; 
  }
  
  // 3. Mão Esquerda ao lado (Esquerdo MIDDLE, Direito DOWN, Pernas DOWN)
  if (idPose === 'maoEsquerda') {
      return esqMeio && dirBaixo && pernasNoChao;
  }
  
  // 4. Posição T (Ambos MIDDLE, Pernas DOWN)
  if (idPose === 'posicaoT') {
      return esqMeio && dirMeio && pernasNoChao;
  }
  
  // 5. Perna Esquerda (Perna Esquerda UP, Ambos braços MIDDLE)
  if (idPose === 'pernaEsquerda') {
      return esqMeio && dirMeio && pernaEsqNoAr;
  }
  
  // 6. Mão Direita Levantada (Direito UP, Esquerdo DOWN, Pernas DOWN)
  if (idPose === 'MaoDireitaLevantada') {
      return dirNoAr && esqBaixo && pernasNoChao;
  }
  
  // 7. Mão Esquerda Levantada (Esquerdo UP, Direito DOWN, Pernas DOWN)
  if (idPose === 'MaoEsquerdaLevantada') {
      return esqNoAr && dirBaixo && pernasNoChao;
  }
  
  // 8. Estrela (Ambos braços UP, Pernas AFASTADAS)
  if (idPose === 'Estrela') {
      return esqNoAr && dirNoAr && pernasAfastadas;
  }
  
  return false;
}