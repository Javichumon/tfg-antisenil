let score = 0;
let life = 3;
let speed = 1000;
let decreaseSpeed = 10;
let gameActive = false;

function getRandomPosition() {
    const width = window.innerWidth - 100;
    const height = window.innerHeight - 100;
    const x = Math.random() * width;
    const y = Math.random() * height;
    return { x, y };
}

function createTarget() {
    if (!gameActive) return;

    const target = document.createElement('div');
    target.className = 'target';
    const position = getRandomPosition();
    
    target.setAttribute('data-x', position.x);
    target.setAttribute('data-y', position.y);
    
    target.style.left = `${position.x}px`;
    target.style.top = `${position.y}px`;
    target.addEventListener('click', () => hitTarget(target));
    document.getElementById('game-container').appendChild(target);

    setTimeout(() => {
        if (target.parentNode) {
            target.parentNode.removeChild(target);
            decreaseLife(position.x, position.y);
        }
    }, speed);
}


function hitTarget(target) {
    score++;
    document.getElementById('score').innerText = `Puntuación: ${score}`;
    const successSound = document.getElementById('success-sound');
    successSound.play();
    target.parentNode.removeChild(target);
    
    increaseSpeed();
}

function decreaseLife(x, y) {
    if (life <= 0) {
        showFailureImage(x, y);
        setTimeout(() => {
            showGameOverModal();
        }, 1000);
    } else {
        life--;
        document.getElementById('life').innerText = `Vidas: ${life}`;

        if (gameActive) {
            showFailureImage(x, y);
            createTarget();
        }
    }
}

function showGameOverModal() {
    const modal = document.createElement('div');
    modal.id ='start-screen';
    modal.className = 'screen';
    modal.innerHTML = '<h1>¡Has perdido!<h1><p>Los pollos han destruido la tierra</p><p>Clica aquí para intentar salvar otra dimensión<p>';
    document.getElementById('game-container').appendChild(modal);

    modal.addEventListener('click', () => {
        modal.parentNode.removeChild(modal);
        location.reload();
    });
}


function showFailureImage(x, y) {
    const failureImage = document.createElement('div');
    failureImage.className = 'failure-image';
    failureImage.style.left = `${x}px`;
    failureImage.style.top = `${y}px`;
    document.getElementById('game-container').appendChild(failureImage);

    const failureSound = document.getElementById('failure-sound');
    failureSound.play();
}


function increaseSpeed() {
    speed -= decreaseSpeed;

    if (gameActive) {
        setTimeout(createTarget, speed);
    }
}


function showStartScreen() {
    const startScreen = document.createElement('div');
    startScreen.id = 'start-screen';
    startScreen.className = 'screen';
    startScreen.innerHTML = '<h1>La Invasión de los Pollos</h1><h2>¡Despeja su ataque clicando en las bombas!</h2><p>Clic para empezar</p>';
    startScreen.addEventListener('click', startGame);
    document.getElementById('game-container').appendChild(startScreen);
}

function startGame() {
    gameActive = true;
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.play();

    document.getElementById('start-screen').remove();
    createTarget();
}

document.addEventListener('DOMContentLoaded', showStartScreen);
