
const introScreen = document.getElementById("introScreen");
const gameScreen = document.getElementById("gameScreen");
const endingScreen = document.getElementById("endingScreen");

const startButton = document.getElementById("startButton");
const playAgainButton = document.getElementById("playAgainButton");
const restartButton = document.getElementById("restartButton");

const creatorButton = document.getElementById("creatorButton");
const creatorPanel = document.getElementById("creatorPanel");
const closeCreator = document.getElementById("closeCreator");
const soundButton = document.getElementById("soundButton");

const player = document.getElementById("player");
const choiceTitle = document.getElementById("choiceTitle");
const storyText = document.getElementById("storyText");
const choicesElement = document.getElementById("choices");
const locationName = document.getElementById("locationName");

const livesElement = document.getElementById("lives");
const scoreElement = document.getElementById("score");
const progressElement = document.getElementById("progress");
const inventoryElement = document.getElementById("inventory");
const diaryElement = document.getElementById("diary");

const endingIcon = document.getElementById("endingIcon");
const endingTitle = document.getElementById("endingTitle");
const endingText = document.getElementById("endingText");
const finalScore = document.getElementById("finalScore");
const finalItems = document.getElementById("finalItems");

let vidas = 3;
let pontos = 0;
let itens = [];
let locaisVisitados = new Set();
let localAtual = 0;
let somAtivado = true;
let jogoEncerrado = false;
let bloqueado = false;
let turno = 0;

const locais = {
  0: {
    nome: "Acampamento",
    posicao: { x: 48, y: 77 }
  },
  1: {
    nome: "Floresta densa",
    posicao: { x: 45, y: 62 }
  },
  2: {
    nome: "Pântano",
    posicao: { x: 16, y: 40 }
  },
  3: {
    nome: "Cachoeira",
    posicao: { x: 65, y: 38 }
  },
  4: {
    nome: "Ruínas antigas",
    posicao: { x: 78, y: 55 }
  },
  5: {
    nome: "Montanhas",
    posicao: { x: 17, y: 76 }
  },
  6: {
    nome: "Templo perdido",
    posicao: { x: 58, y: 18 }
  },
  7: {
    nome: "Tesouro de Jumanji",
    posicao: { x: 83, y: 17 }
  }
};

const historias = {
  0: {
    titulo: "A aventura começa!",
    texto: "Você encontrou um antigo tabuleiro na selva. Pegadas levam para caminhos diferentes. Para onde você vai?",
    escolhas: [
      {
        texto: "🌳 Entrar na floresta",
        destino: 1,
        pontos: 10,
        mensagem: "Você entrou na floresta e encontrou marcas misteriosas."
      },
      {
        texto: "🏔️ Subir as montanhas",
        destino: 5,
        pontos: 15,
        mensagem: "Você começou a subir as montanhas. O caminho é difícil!"
      }
    ]
  },

  1: {
    titulo: "A floresta misteriosa",
    texto: "Folhas se mexem e sons estranhos vêm das árvores. Você vê uma trilha e uma passagem alagada.",
    escolhas: [
      {
        texto: "🔎 Procurar pistas entre as árvores",
        destino: 2,
        pontos: 10,
        item: "🗺️ Mapa antigo",
        mensagem: "Você encontrou um mapa antigo escondido entre as raízes."
      },
      {
        texto: "💧 Seguir o barulho da água",
        destino: 3,
        pontos: 5,
        mensagem: "Você seguiu o som da água até uma cachoeira."
      },
      {
        texto: "↩️ Voltar ao acampamento",
        destino: 0,
        pontos: 0,
        mensagem: "Você voltou ao acampamento para pensar melhor."
      }
    ]
  },

  2: {
    titulo: "Perigo no pântano!",
    texto: "O chão está coberto de água e você percebe movimentos perto dos arbustos. Como vai atravessar?",
    escolhas: [
      {
        texto: "🪵 Usar um tronco para atravessar",
        destino: 4,
        pontos: 15,
        mensagem: "O tronco ajudou você a atravessar em segurança."
      },
      {
        texto: "🐊 Correr pela água",
        destino: 3,
        pontos: 5,
        perderVida: true,
        mensagem: "Você conseguiu escapar, mas perdeu uma vida no caminho."
      },
      {
        texto: "🔙 Procurar outra passagem",
        destino: 1,
        pontos: 0,
        mensagem: "Você voltou para a floresta e procurou uma rota diferente."
      }
    ]
  },

  3: {
    titulo: "A cachoeira escondida",
    texto: "Atrás da queda d'água existe uma pequena caverna. Você encontra uma corda e vê símbolos nas pedras.",
    escolhas: [
      {
        texto: "🪢 Pegar a corda e explorar a caverna",
        destino: 4,
        pontos: 15,
        item: "🪢 Corda resistente",
        mensagem: "A corda poderá ajudar você em outros desafios."
      },
      {
        texto: "📜 Examinar os símbolos",
        destino: 6,
        pontos: 20,
        item: "🔑 Chave antiga",
        mensagem: "Os símbolos revelaram uma pista sobre o templo."
      },
      {
        texto: "↩️ Voltar à floresta",
        destino: 1,
        pontos: 0,
        mensagem: "Você voltou pela trilha da floresta."
      }
    ]
  },

  4: {
    titulo: "As ruínas antigas",
    texto: "Você encontra uma porta de pedra com símbolos. Algo valioso está escondido lá dentro.",
    escolhas: [
      {
        texto: "🔑 Usar a chave antiga",
        destino: 6,
        pontos: 25,
        requerItem: "🔑 Chave antiga",
        mensagem: "A chave abriu a passagem secreta para o templo."
      },
      {
        texto: "🧩 Resolver o enigma da porta",
        destino: 6,
        pontos: 15,
        mensagem: "Você resolveu o enigma e a porta se abriu lentamente."
      },
      {
        texto: "🏕️ Voltar ao acampamento",
        destino: 0,
        pontos: 0,
        mensagem: "Você voltou para o acampamento."
      }
    ]
  },

  5: {
    titulo: "As montanhas perigosas",
    texto: "O caminho está escorregadio. Você avista uma ponte de corda e uma trilha protegida pelas rochas.",
    escolhas: [
      {
        texto: "🪢 Atravessar pela ponte",
        destino: 6,
        pontos: 20,
        requerItem: "🪢 Corda resistente",
        mensagem: "A corda ajudou você a atravessar com segurança."
      },
      {
        texto: "🪨 Seguir a trilha entre as rochas",
        destino: 1,
        pontos: 10,
        mensagem: "Você encontrou uma trilha que leva de volta à floresta."
      },
      {
        texto: "⚠️ Escalar rapidamente",
        destino: 6,
        pontos: 15,
        perderVida: true,
        mensagem: "Você chegou ao outro lado, mas se machucou durante a subida."
      }
    ]
  },

  6: {
    titulo: "O templo perdido",
    texto: "Você chegou ao templo. No centro existe um mecanismo antigo. Uma inscrição diz: 'A sabedoria abre o caminho'.",
    escolhas: [
      {
        texto: "🧠 Estudar os símbolos antes de agir",
        destino: 7,
        pontos: 30,
        item: "💎 Cristal da selva",
        mensagem: "Você compreendeu o mecanismo e encontrou o caminho para o tesouro."
      },
      {
        texto: "💪 Forçar a porta",
        destino: 7,
        pontos: 5,
        perderVida: true,
        mensagem: "A porta abriu, mas uma armadilha foi ativada."
      },
      {
        texto: "🔙 Voltar e procurar mais pistas",
        destino: 3,
        pontos: 0,
        mensagem: "Você decidiu procurar outras pistas antes de continuar."
      }
    ]
  },

  7: {
    titulo: "O tesouro de Jumanji!",
    texto: "Você chegou ao final da jornada. O tesouro está diante de você, mas precisa tomar a última decisão.",
    escolhas: [
      {
        texto: "💎 Pegar o tesouro e concluir o jogo",
        final: "vitoria",
        pontos: 50,
        mensagem: "Você encontrou o tesouro e completou a aventura!"
      },
      {
        texto: "🌿 Investigar a sala secreta",
        final: "vitoria",
        pontos: 70,
        mensagem: "Você descobriu um segredo extra e encontrou o tesouro lendário!"
      }
    ]
  }
};

function atualizarStatus() {
  livesElement.textContent = vidas;
  scoreElement.textContent = pontos;
  progressElement.textContent = `${locaisVisitados.size}/8`;

  if (itens.length === 0) {
    inventoryElement.innerHTML =
      '<span class="vazio">Você ainda não encontrou itens.</span>';
  } else {
    inventoryElement.innerHTML = "";

    itens.forEach((item) => {
      const elemento = document.createElement("span");
      elemento.className = "item";
      elemento.textContent = item;
      inventoryElement.appendChild(elemento);
    });
  }

  document.querySelectorAll(".local").forEach((local) => {
    const numero = Number(local.dataset.local);

    local.classList.toggle(
      "visitado",
      locaisVisitados.has(numero)
    );

    local.classList.toggle(
      "local-atual",
      numero === localAtual
    );
  });
}

function moverPersonagem(destino) {
  return new Promise((resolve) => {
    const posicao = locais[destino].posicao;

    player.classList.add("andando");
    player.style.left = `${posicao.x}%`;
    player.style.top = `${posicao.y}%`;

    localAtual = destino;
    locaisVisitados.add(destino);

    locationName.textContent = locais[destino].nome;
    atualizarStatus();

    const tempo = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches ? 20 : 1150;

    window.setTimeout(() => {
      player.classList.remove("andando");
      resolve();
    }, tempo);
  });
}

function mostrarHistoria() {
  if (jogoEncerrado) return;

  const historia = historias[localAtual];

  choiceTitle.textContent = historia.titulo;
  storyText.textContent = historia.texto;
  choicesElement.innerHTML = "";

  historia.escolhas.forEach((escolha) => {
    const botao = document.createElement("button");
    botao.className = "escolha";
    botao.textContent = escolha.texto;

    botao.addEventListener("click", () => {
      fazerEscolha(escolha);
    });

    choicesElement.appendChild(botao);
  });

  atualizarStatus();
}

async function fazerEscolha(escolha) {
  if (bloqueado || jogoEncerrado) return;

  if (
    escolha.requerItem &&
    !itens.includes(escolha.requerItem)
  ) {
    storyText.textContent =
      `Você precisa encontrar ${escolha.requerItem} para usar essa opção. Escolha outro caminho!`;

    diaryElement.textContent =
      "Ainda falta um item necessário para esse caminho.";

    return;
  }

  bloqueado = true;
  turno++;

  const botoes = choicesElement.querySelectorAll("button");
  botoes.forEach((botao) => {
    botao.disabled = true;
  });

  if (escolha.pontos) {
    pontos += escolha.pontos;
  }

  if (escolha.perderVida) {
    vidas--;
  }

  if (escolha.item && !itens.includes(escolha.item)) {
    itens.push(escolha.item);
  }

  diaryElement.textContent = escolha.mensagem ||
    "Você tomou uma decisão na aventura.";

  atualizarStatus();

  if (vidas <= 0) {
    finalizarJogo(false);
    return;
  }

  if (escolha.final === "vitoria") {
    if (escolha.mensagem) {
      storyText.textContent = escolha.mensagem;
    }

    await moverPersonagem(7);
    finalizarJogo(true);
    return;
  }

  const destino = escolha.destino;

  if (destino === undefined) {
    bloqueado = false;
    mostrarHistoria();
    return;
  }

  await moverPersonagem(destino);

  if (!jogoEncerrado) {
    mostrarHistoria();
  }

  bloqueado = false;
}

function finalizarJogo(vitoria) {
  jogoEncerrado = true;
  bloqueado = true;

  gameScreen.classList.add("hidden");
  endingScreen.classList.remove("hidden");

  if (vitoria) {
    endingIcon.textContent = "🏆";
    endingTitle.textContent = "Você venceu Jumanji!";
    endingText.textContent =
      "Parabéns! Você sobreviveu aos desafios da selva e encontrou o tesouro. Sua aventura terminou com sucesso!";
  } else {
    endingIcon.textContent = "🌿";
    endingTitle.textContent = "A selva venceu desta vez!";
    endingText.textContent =
      "Suas vidas acabaram antes de encontrar o tesouro. Prepare-se, pense nos caminhos e tente novamente!";
  }

  finalScore.textContent = pontos;
  finalItems.textContent = itens.length;
}

function iniciarJogo() {
  vidas = 3;
  pontos = 0;
  itens = [];
  locaisVisitados = new Set();
  localAtual = 0;
  jogoEncerrado = false;
  bloqueado = false;
  turno = 0;

  endingScreen.classList.add("hidden");
  introScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  player.style.left = `${locais[0].posicao.x}%`;
  player.style.top = `${locais[0].posicao.y}%`;
  player.classList.remove("andando");

  diaryElement.textContent =
    "Sua jornada começa agora. Escolha com sabedoria!";

  locaisVisitados.add(0);

  atualizarStatus();
  mostrarHistoria();
}

startButton.addEventListener("click", iniciarJogo);
playAgainButton.addEventListener("click", iniciarJogo);
restartButton.addEventListener("click", iniciarJogo);

creatorButton.addEventListener("click", () => {
  creatorPanel.classList.toggle("hidden");
});

closeCreator.addEventListener("click", () => {
  creatorPanel.classList.add("hidden");
});

soundButton.addEventListener("click", () => {
  somAtivado = !somAtivado;
  soundButton.textContent = somAtivado ? "🔊" : "🔇";
  soundButton.setAttribute(
    "aria-label",
    somAtivado ? "Desativar som" : "Ativar som"
  );
});

// Sons opcionais: não exigem arquivos de áudio.
function tocarSom(frequencia = 440) {
  if (!somAtivado) return;

  try {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return;

    const contexto = new AudioContextClass();
    const oscilador = contexto.createOscillator();
    const volume = contexto.createGain();

    oscilador.type = "sine";
    oscilador.frequency.value = frequencia;
    volume.gain.value = 0.035;

    oscilador.connect(volume);
    volume.connect(contexto.destination);

    oscilador.start();
    volume.gain.exponentialRampToValueAtTime(
      0.001,
      contexto.currentTime + 0.18
    );

    oscilador.stop(contexto.currentTime + 0.2);
    oscilador.onended = () => contexto.close();
  } catch (erro) {
    // O jogo continua funcionando mesmo se o áudio não estiver disponível.
  }
}

choicesElement.addEventListener("click", (evento) => {
  if (evento.target.closest("button")) {
    tocarSom(330 + Math.random() * 250);
  }
});
