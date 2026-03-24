class SelecionarExercicios {
  constructor() {
    // Inicializa todas as 8 posições como não selecionadas (false)
    this.estadoSelecao = [false, false, false, false, false, false, false, false];
    
    // === CÁLCULOS DE ALINHAMENTO ===
    // Grelha de Exercícios
    this.gapX = 180;
    this.gapY = 160;
    this.imgW = 100;
    this.imgH = 100;
    
    // A largura visual total da grelha é: (3 * gapX) + largura do cartão visual (imgW + 20)
    // 3 * 180 + 120 = 660. 
    // Para centrar num ecrã de 1280, o ponto de início (lado esquerdo do cartão) é (1280 - 660) / 2 = 310.
    // Como desenhamos o cartão em x - 10, o nosso startX será 320.
    this.startX = 320; 
    this.startY = 230; 

    // Botões Superiores (Selecionar Todos e Cadeira de Rodas)
    // Alinhados horizontalmente ao centro no eixo Y (Y=165)
    this.btnAllX = this.startX - 10; // Alinhado à esquerda da grelha (310)
    this.btnAllW = 260; 
    this.btnAllH = 45;
    this.btnAllY = 165 - (this.btnAllH / 2); // Fica a 142.5

    this.btnMobS = 55; 
    // Alinhado à direita da grelha: startX(320) + 3*gapX(540) + imgW(100) + 10(margem) - tamanhoBtn(55) = 915
    this.btnMobX = this.startX + (3 * this.gapX) + this.imgW + 10 - this.btnMobS; 
    this.btnMobY = 165 - (this.btnMobS / 2); // Fica a 137.5

    // Botão Jogar
    this.btnJogarW = 300;
    this.btnJogarH = 60;
    this.btnJogarX = (1280 - this.btnJogarW) / 2; // Fica a 490 (Perfeitamente centrado)
    this.btnJogarY = 570;
  }

  desenhar() {
    background(30, 30, 50);

    // === TEXTOS (Títulos centrados) ===
    fill(255); noStroke(); textAlign(CENTER, CENTER); textSize(35);
    text("ESCOLHE PELO MENOS 3 MOVIMENTOS", 640, 65);

    let qtdSelecionadas = this.estadoSelecao.filter(s => s === true).length;
    let todosSelecionados = (qtdSelecionadas === this.estadoSelecao.length);
    let modoMobilidadeAtivo = (
      this.estadoSelecao[0] && this.estadoSelecao[1] && this.estadoSelecao[2] && 
      !this.estadoSelecao[3] && !this.estadoSelecao[4] && 
      this.estadoSelecao[5] && this.estadoSelecao[6] && !this.estadoSelecao[7]
    );

    textSize(20);
    if (qtdSelecionadas < 3) fill(255, 100, 100); 
    else fill(100, 255, 100); 
    text("SELECIONADOS: " + qtdSelecionadas + " / " + imgPoses.length, 640, 110);

    // === 1. BOTÃO "SELECIONAR TODOS" (ESQUERDA) ===
    stroke(0); strokeWeight(3);
    if (todosSelecionados) fill(200, 100, 100); // Avermelhado
    else fill(100, 200, 255); // Azulado
    rect(this.btnAllX, this.btnAllY, this.btnAllW, this.btnAllH, 10);
    
    noStroke(); fill(0); textSize(16); textAlign(CENTER, CENTER);
    if (todosSelecionados) text("DESMARCAR TODOS", this.btnAllX + this.btnAllW/2, this.btnAllY + this.btnAllH/2);
    else text("SELECIONAR TODOS", this.btnAllX + this.btnAllW/2, this.btnAllY + this.btnAllH/2);

    // === 2. BOTÃO "MOBILIDADE REDUZIDA" (DIREITA) ===
    if (modoMobilidadeAtivo) {
      stroke(0, 255, 0); strokeWeight(4); fill(200, 255, 200); // Verde ativo
    } else {
      stroke(200); strokeWeight(2); fill(255); // Branco inativo
    }
    rect(this.btnMobX, this.btnMobY, this.btnMobS, this.btnMobS, 10);
    
    if (typeof imgCadeira !== 'undefined') {
      image(imgCadeira, this.btnMobX + 5, this.btnMobY + 5, this.btnMobS - 10, this.btnMobS - 10);
    }

    // === 3. GRELHA DE IMAGENS ===
    for (let i = 0; i < imgPoses.length; i++) {
      let col = i % 4; 
      let row = floor(i / 4); 
      let x = this.startX + col * this.gapX;
      let y = this.startY + row * this.gapY;

      if (this.estadoSelecao[i]) {
        stroke(0, 255, 0); strokeWeight(6); fill(200, 255, 200);
      } else {
        stroke(200); strokeWeight(2); fill(255);
      }
      rect(x - 10, y - 10, this.imgW + 20, this.imgH + 20, 10);

      if (imgPoses[i] && imgPoses[i].img) {
        image(imgPoses[i].img, x, y, this.imgW, this.imgH);
      }
    }

    // === 4. BOTÃO "JOGAR" (CENTRO INFERIOR) ===
    if (qtdSelecionadas >= 3) {
      stroke(0); strokeWeight(4); fill(0, 180, 0); 
    } else {
      noStroke(); fill(100); 
    }
    rect(this.btnJogarX, this.btnJogarY, this.btnJogarW, this.btnJogarH, 10);

    noStroke(); fill(255); textSize(25);
    text("JOGAR", 640, this.btnJogarY + (this.btnJogarH / 2));
  }

  clique() {
    let qtdSelecionadas = this.estadoSelecao.filter(s => s === true).length;
    let todosSelecionados = (qtdSelecionadas === this.estadoSelecao.length);

    let modoMobilidadeAtivo = (
      this.estadoSelecao[0] && this.estadoSelecao[1] && this.estadoSelecao[2] && 
      !this.estadoSelecao[3] && !this.estadoSelecao[4] && 
      this.estadoSelecao[5] && this.estadoSelecao[6] && !this.estadoSelecao[7]
    );

    // 1. Verificar clique no botão SELECIONAR TODOS
    if (mouseX > this.btnAllX && mouseX < this.btnAllX + this.btnAllW && mouseY > this.btnAllY && mouseY < this.btnAllY + this.btnAllH) {
      if (somClick.isLoaded()) somClick.play();
      for (let i = 0; i < this.estadoSelecao.length; i++) {
        this.estadoSelecao[i] = !todosSelecionados; 
      }
      return;
    }

    // 2. Verificar clique no botão MOBILIDADE REDUZIDA
    if (mouseX > this.btnMobX && mouseX < this.btnMobX + this.btnMobS && mouseY > this.btnMobY && mouseY < this.btnMobY + this.btnMobS) {
      if (somClick.isLoaded()) somClick.play();
      
      if (modoMobilidadeAtivo) {
        this.estadoSelecao = [false, false, false, false, false, false, false, false];
      } else {
        this.estadoSelecao = [true, true, true, false, false, true, true, false];
      }
      return;
    }

    // 3. Verificar clique na GRELHA DE EXERCÍCIOS
    for (let i = 0; i < imgPoses.length; i++) {
      let col = i % 4;
      let row = floor(i / 4);
      let x = this.startX + col * this.gapX;
      let y = this.startY + row * this.gapY;

      // As zonas de clique correspondem exatamente ao tamanho do cartão (x-10 até x+imgW+10)
      if (mouseX > x - 10 && mouseX < x + this.imgW + 10 && mouseY > y - 10 && mouseY < y + this.imgH + 10) {
        if (somClick.isLoaded()) somClick.play();
        this.estadoSelecao[i] = !this.estadoSelecao[i]; 
        return; 
      }
    }

    // 4. Verificar clique no botão JOGAR
    if (qtdSelecionadas >= 3) {
      if (mouseX > this.btnJogarX && mouseX < this.btnJogarX + this.btnJogarW && mouseY > this.btnJogarY && mouseY < this.btnJogarY + this.btnJogarH) {
        if (somClick.isLoaded()) somClick.play();

        nivelAtual = 1;
        pontuacao = 0;
        gerarSequencia(nivelAtual); 
        estadoJogo = 1;
        ecra = 1; 
        resizeCanvas(1280, 864);
      }
    }
  }

  obterPosesAtivas() {
    let posesAtivas = [];
    for (let i = 0; i < this.estadoSelecao.length; i++) {
      if (this.estadoSelecao[i]) {
        posesAtivas.push(imgPoses[i]);
      }
    }
    return posesAtivas.length > 0 ? posesAtivas : imgPoses; 
  }
}