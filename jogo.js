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

function jogo() {
  background(30, 30, 50); 
  fill(255); noStroke(); rect(0, 0, 1280, 144); 

  push();
    translate(1280, 0); scale(-1, 1);
    image(video, 0, 144, 1280, 720);
  pop();

  if (estadoJogo === 0) {
    fill(0); textSize(25); text("MEMORIZA A SEQUÊNCIA DOS MOVIMENTOS!", 640, 45);
    stroke(0); strokeWeight(4); fill(220); rect(460, 80, 360, 50, 10);
    noStroke(); fill(0); textSize(18); text("REVELAR SEQUÊNCIA", 640, 105); 
    
  } else if (estadoJogo === 1) {
    let tempoPassado = millis() - temporizador;
    if (tempoPassado < 4000) {
      image(sequenciaAtual[0].img, 420, 22, 125, 100); 
      image(imgSeta, 600, 42, 80, 60); 
      image(sequenciaAtual[1].img, 735, 22, 125, 100); 
      let larguraBarra = 1280 - (tempoPassado / 4000) * 1280;
      fill(0, 220, 0); noStroke(); rect(0, 134, larguraBarra, 10);
    } else {
      estadoJogo = 2;
    }
    
  } else if (estadoJogo === 2) {
    if (poseAtualAlvo === 0) {
       tint(255, 255); image(sequenciaAtual[0].img, 480, 22, 100, 80); 
       tint(255, 100); image(sequenciaAtual[1].img, 700, 22, 100, 80); 
    } else {
       tint(0, 255, 0); image(sequenciaAtual[0].img, 480, 22, 100, 80);
       tint(255, 255); image(sequenciaAtual[1].img, 700, 22, 100, 80);
    }
    noTint(); 
    fill(255, 0, 0); textSize(20); text("IMITA A IMAGEM ILUMINADA!", 640, 125);

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

      let idAlvo = sequenciaAtual[poseAtualAlvo].id;
      
      if (verificarPose(pose, idAlvo)) {
         tempoNaPose++; 
         fill(0, 255, 0); noStroke(); rect(0, 134, (tempoNaPose / 20) * 1280, 10);
         if (tempoNaPose > 20) { 
            poseAtualAlvo++; 
            tempoNaPose = 0; 
            if (poseAtualAlvo > 1) {
               console.log("SUCESSO!");
               ecra = 3; estadoJogo = 0; resizeCanvas(1280, 720);
            }
         }
      } else {
         tempoNaPose = 0; 
      }
    }
  }
}

function cliqueJogo() {
  if (estadoJogo === 0) {
    if (mouseX > 460 && mouseX < 820 && mouseY > 80 && mouseY < 130) {
      
      sequenciaAtual = [];
      
      // 1. Escolhe a primeira pose e guarda na sequência
      let primeiraPose = random(imgPoses);
      sequenciaAtual.push(primeiraPose);
      
      // 2. Escolhe a segunda pose
      let segundaPose = random(imgPoses);
      
      // 3. Enquanto a segunda pose for IGUAL à primeira, continua a sortear!
      while (segundaPose.id === primeiraPose.id) {
        segundaPose = random(imgPoses);
      }
      
      // 4. Quando finalmente for diferente, guarda na sequência
      sequenciaAtual.push(segundaPose);
      
      poseAtualAlvo = 0; 
      tempoNaPose = 0; 
      temporizador = millis(); 
      estadoJogo = 1; 
      
      resizeCanvas(1280, 864);
      
    } else {
      ecra = 3; estadoJogo = 0; resizeCanvas(1280, 720);
    }
  }
}

// ==============================================================
// LÓGICA DE DETEÇÃO - MAPEAMENTO DIRETO E CORRETO
// ==============================================================
function verificarPose(pose, idPose) {
  // As variáveis recolhem a anatomia real do jogador
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

  // Régua Proporcional
  let tamanhoTronco = 100;
  if (ancaEsq && ancaEsq.confidence > 0.1) {
    tamanhoTronco = abs(ombroEsq.y - ancaEsq.y);
  } else {
    tamanhoTronco = abs(ombroEsq.x - ombroDir.x) * 1.5; 
  }

  let margem = tamanhoTronco * 0.35; 

  // LADO ESQUERDO FÍSICO (Aparece à esquerda no ecrã)
  let esqNoAr = pulsoEsq.y < (ombroEsq.y - margem);  
  let esqBaixo = pulsoEsq.y > (ombroEsq.y + margem); 
  let esqMeio = !esqNoAr && !esqBaixo;       

  // LADO DIREITO FÍSICO (Aparece à direita no ecrã)
  let dirNoAr = pulsoDir.y < (ombroDir.y - margem);
  let dirBaixo = pulsoDir.y > (ombroDir.y + margem);
  let dirMeio = !dirNoAr && !dirBaixo;

  // 4. VALIDAÇÃO SEM INVERSÕES
  
  if (idPose === '2maosnoar') {
     return esqNoAr && dirNoAr;
  }
  
  if (idPose === 'maoDireita') {
     // A imagem tem o braço na DIREITA. O jogador levanta a sua mão DIREITA.
     return dirMeio && esqBaixo; 
  }
  
  if (idPose === 'maoEsquerda') {
     // A imagem tem o braço na ESQUERDA. O jogador levanta a sua mão ESQUERDA.
     return esqMeio && dirBaixo;
  }
  
  if (idPose === 'posicaoT') {
     return esqMeio && dirMeio;
  }
  
  if (idPose === 'pernaEsquerda') {
     if (!esqMeio || !dirMeio) return false;
     if (!joelhoEsq || !joelhoDir || joelhoEsq.confidence < 0.1 || joelhoDir.confidence < 0.1) return false;
     
     // A imagem tem a perna levantada na ESQUERDA. O jogador levanta a perna ESQUERDA.
     let pernaEsqNoAr = joelhoEsq.y < (joelhoDir.y - tamanhoTronco * 0.25); 
     return pernaEsqNoAr;
  }

  return false;
}