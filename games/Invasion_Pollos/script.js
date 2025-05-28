let score = 0;
let life = 3;
let speed = 1000;
let decreaseSpeed = 10;
let gameActive = false;
let maxScore = parseInt(localStorage.getItem('maxScore')) || 0;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('max-score').innerText = `Máxima puntuación: ${maxScore}`;
    showStartScreen();
});

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
    successSound.currentTime = 0;
    successSound.play();
    target.remove();

    if (score > maxScore) {
        maxScore = score;
        localStorage.setItem('maxScore', maxScore);
        document.getElementById('max-score').innerText = `Máxima puntuación: ${maxScore}`;
    }

    increaseSpeed();
}

function decreaseLife(x, y) {
    if (life <= 1) {
        showFailureImage(x, y);
        life = 0;
        document.getElementById('life').innerText = `Vidas: ${life}`;
        setTimeout(() => {
            showGameOverModal();
        }, 1000);
    } else {
        life--;
        document.getElementById('life').innerText = `Vidas: ${life}`;
        showFailureImage(x, y);
        setTimeout(createTarget, speed);
    }
}

function showGameOverModal() {
    const modal = document.createElement('div');
    modal.id = 'start-screen';
    modal.className = 'screen';
    modal.innerHTML = `
        <h1>¡Has perdido!</h1>
        <p>Los pollos han destruido la tierra</p>
        <button id="retry" class="menu-button">Clica aquí para intentar salvar otra dimensión</button>
        <button id="menu-button" class="menu-button">Volver al menú</button>
    `;
    document.getElementById('game-container').appendChild(modal);

    modal.querySelector('#retry').addEventListener('click', () => {
        modal.remove();
        location.reload();
    });
    modal.querySelector('#menu-button').addEventListener('click', () => {
        window.location.href = '../../GodIndex.html';
    });
}

function showFailureImage(x, y) {
    const failureImage = document.createElement('div');
    failureImage.className = 'failure-image';
    failureImage.style.left = `${x}px`;
    failureImage.style.top = `${y}px`;
    document.getElementById('game-container').appendChild(failureImage);

    const failureSound = document.getElementById('failure-sound');
    failureSound.currentTime = 0;
    failureSound.play();
}

function increaseSpeed() {
    if (speed > 200) speed -= decreaseSpeed;

    if (gameActive) {
        setTimeout(createTarget, speed);
    }
}

function showStartScreen() {
    const startScreen = document.createElement('div');
    startScreen.id = 'start-screen';
    startScreen.className = 'screen';
    startScreen.innerHTML = `
        <h1>La Invasión de los Pollos</h1>
        <h2>¡Despeja su ataque clicando en las bombas!</h2>
        <button id="start" class="menu-button">Clic para empezar</button>
        <button id="menu-button" class="menu-button">Volver al menú</button>
    `;
    startScreen.querySelector('#start').addEventListener('click', startGame);
    startScreen.querySelector('#menu-button').addEventListener('click', () => {
        window.location.href = '../../GodIndex.html';
    });
    document.getElementById('game-container').appendChild(startScreen);
}

function startGame() {
    gameActive = true;
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.play();

    document.getElementById('start-screen').remove();
    document.getElementById('score').innerText = `Puntuación: ${score}`;
    document.getElementById('life').innerText = `Vidas: ${life}`;
    createTarget();
}
