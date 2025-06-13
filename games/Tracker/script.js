
const offsetX = -100;
const offsetY = 270;

const menu = document.getElementById('menu');
const gameUI = document.getElementById('gameUI');
const endMenu = document.getElementById('endMenu');
const startBtn = document.getElementById('startBtn');
const retryBtn = document.getElementById('retryBtn');
const timerText = document.getElementById('timer');
const maxScoreText = document.getElementById('maxScore');
const finalTime = document.getElementById('finalTime');
const ball = document.getElementById('energyBall');
const background = document.getElementById('background');
const warningBar = document.getElementById('warningBar');

let startTime, gameInterval;
let mouseInside = false, maxScore = 0;
let currentX, currentY, vx = 0, vy = 0, speed = 2;
let directionTimer = 0;
let animationId, gameStarted = false, waitingToStart = false;
let initialHitboxEntered = false;
let totalTimeOutside = 0;
let lastLoopTime = 0;

if (localStorage.getItem("maxScore")) {
    maxScore = parseFloat(localStorage.getItem("maxScore"));
    maxScoreText.textContent = `Máx: ${maxScore.toFixed(3)} s`;
}

function startGame() {
    menu.classList.add('hidden');
    endMenu.classList.add('hidden');
    gameUI.classList.remove('hidden');

    background.src = 'img/Pollomago.png';

    speed = 2;
    directionTimer = 0;
    totalTimeOutside = 0;
    updateWarningBar();
    waitingToStart = true;
    initialHitboxEntered = false;
    gameStarted = false;
    timerText.textContent = `0.000 s`;

    placeBallStart();
    document.addEventListener('mousemove', checkHitbox);
}

function placeBallStart() {
    const ballSize = ball.offsetWidth;
    const startX = window.innerWidth / 2 + offsetX;
    const startY = window.innerHeight / 2 + offsetY;
    currentX = startX;
    currentY = startY;
    ball.style.left = `${startX}px`;
    ball.style.top = `${startY}px`;
}

function beginGame() {
    startTime = performance.now();
    lastLoopTime = startTime;
    gameStarted = true;
    waitingToStart = false;
    randomizeDirection();
    moveBallErratically();
    gameInterval = setInterval(gameLoop, 10);
}

function endGame() {
    cancelAnimationFrame(animationId);
    clearInterval(gameInterval);
    document.removeEventListener('mousemove', checkHitbox);

    const currentTime = (performance.now() - startTime) / 1000;
    if (currentTime > maxScore) {
        maxScore = currentTime;
        localStorage.setItem("maxScore", maxScore);
    }

    timerText.textContent = `0.000 s`;
    finalTime.textContent = `Tiempo: ${currentTime.toFixed(3)} s`;
    maxScoreText.textContent = `Máx: ${maxScore.toFixed(3)} s`;

    background.src = 'img/Fchat.png';

    gameUI.classList.add('hidden');
    endMenu.classList.remove('hidden');

    // Guardar score y mostrar top 5
    saveScore('tracker', parseFloat(currentTime.toFixed(3))).then(() => {
        renderArcadeTop5('topScores', 'tracker', 'desc');
        fetch('http://localhost:3000/check-session', { credentials: 'include' })
            .then(r => r.json())
            .then(data => {
                fetch(`http://localhost:5126/api/logros/evaluar/${data.user.username}?only=superviviente`, { method: 'POST' });
            });
    });

}

function gameLoop() {
    const now = performance.now();
    const deltaTime = (now - lastLoopTime) / 1000;
    lastLoopTime = now;

    const currentTime = (now - startTime) / 1000;
    timerText.textContent = `${currentTime.toFixed(3)} s`;

    if (!mouseInside) {
        totalTimeOutside += deltaTime;
        updateWarningBar();
        if (totalTimeOutside >= 5) {
            endGame();
        }
    } else {
        updateWarningBar();
    }
}

function updateWarningBar() {
    const percent = Math.min((totalTimeOutside / 5) * 100, 100);
    warningBar.style.width = `${percent}%`;
    warningBar.style.backgroundColor = totalTimeOutside >= 3 ? '#cc0000' : '#ffa500';
}

function randomizeDirection() {
    const angle = Math.random() * 2 * Math.PI;
    vx = Math.cos(angle);
    vy = Math.sin(angle);
    speed *= 1.01;
    directionTimer = 0;
}

function moveBallErratically() {
    const ballSize = ball.offsetWidth;
    currentX += vx * speed;
    currentY += vy * speed;

    if (currentX < 0 || currentX > window.innerWidth - ballSize) {
        vx *= -1;
        currentX = Math.max(0, Math.min(currentX, window.innerWidth - ballSize));
    }
    if (currentY < 0 || currentY > window.innerHeight - ballSize) {
        vy *= -1;
        currentY = Math.max(0, Math.min(currentY, window.innerHeight - ballSize));
    }

    ball.style.left = `${currentX}px`;
    ball.style.top = `${currentY}px`;

    directionTimer += 1;
    if (directionTimer >= 120) {
        randomizeDirection();
    }

    animationId = requestAnimationFrame(moveBallErratically);
}

function checkHitbox(event) {
    const ballRect = ball.getBoundingClientRect();
    const centerX = ballRect.left + ballRect.width / 2;
    const centerY = ballRect.top + ballRect.height / 2;
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    mouseInside = distance <= ball.offsetWidth / 2;

    if (waitingToStart && mouseInside && !initialHitboxEntered) {
        initialHitboxEntered = true;
        setTimeout(() => {
            if (mouseInside && !gameStarted) {
                beginGame();
            }
        }, 500);
    }
}

startBtn.addEventListener('click', startGame);
retryBtn.addEventListener('click', () => location.reload());
