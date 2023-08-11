// Seleciona o elemento do dinossauro e o plano de fundo do jogo
const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

// Variáveis para controle do salto do dinossauro
let isJumping = false;
let position = 0;

// Função para lidar com o evento de soltar a tecla
function handlekeyUp(event) {
    // Verifica se a tecla pressionada é a barra de espaço (keyCode 32)
    if (event.keyCode === 32) {
        // Verifica se o dinossauro não está pulando (isJumping === false)
        if (!isJumping) {
            // Inicia o salto do dinossauro
            jump();
        }
    }
}

// Função que faz o dinossauro pular
function jump() {
    isJumping = true;

    // Intervalo que faz o dinossauro subir
    let upInterval = setInterval(() => {
        if (position >= 150) {
            // Quando o dinossauro atinge a altura máxima do salto (150 pixels),
            // limpa o intervalo para que ele comece a descer
            clearInterval(upInterval);

            // Intervalo que faz o dinossauro descer
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    // Quando o dinossauro retorna à posição inicial (0 pixels),
                    // limpa o intervalo e indica que ele não está mais pulando
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    // Move o dinossauro para baixo (desce)
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            // Move o dinossauro para cima (sobe)
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

// Função que cria os cactos como obstáculos
function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 3000;

    // Define a classe para estilização do cacto e a posição inicial (fora da tela à direita)
    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    // Intervalo que faz os cactos se moverem da direita para a esquerda
    let leftInterval = setInterval(() => {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';

        if (cactusPosition < -60) {
            // Quando o cacto sai da tela à esquerda, ele é removido do plano de fundo
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            // Game Over - O dinossauro colidiu com o cacto
            clearInterval(leftInterval);

            // Cria um contêiner para a mensagem de "Game Over" e o botão de recarregar
            const gameOverContainer = document.createElement('div');
            gameOverContainer.innerHTML = `<h1 class="Game-Over">GAME OVER</h1><button onclick="restartGame()">RESTART</button>`;
            document.body.innerHTML = "";
            document.body.appendChild(gameOverContainer);
        }
    }, 40);

    // Agenda a criação do próximo cacto aleatoriamente
    setTimeout(createCactus, randomTime);
}

// Função para recarregar a página e reiniciar o jogo
function restartGame() {
    location.reload();
}

// Inicia o jogo chamando a função para criar os cactos e escutando o evento de soltar a tecla
createCactus();
document.addEventListener('keyup', handlekeyUp);
