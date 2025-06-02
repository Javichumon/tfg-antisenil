let redDisplayed = false;
let reactionStartTime = 0;
let gameStartTime = 0;
let timerInterval;
let gameEnded = false;
let gameStarted = false; // Evita clics antes de pulsar "Empezar", teóricamente

// Mostrar mejor puntuación si existe
if (localStorage.getItem("bestScore")) {
  document.getElementById("bestScore").innerText =
    "Mejor puntuación: " + localStorage.getItem("bestScore") + " ms";
}

// Eventos de botones
document.getElementById("startBtn").addEventListener("click", startGame);

document.getElementById("menuBtn").addEventListener("click", () => {
  window.location.href = "../../GodIndex.html";
});

document.getElementById("retryBtn").addEventListener("click", () => {
  location.reload();
});

document.getElementById("menuBtn2").addEventListener("click", () => {
  window.location.href = "../../GodIndex.html";
});

// Iniciar el juego
function startGame() {
  gameStarted = true;
  document.getElementById("menu").style.display = "none";
  document.getElementById("gameArea").style.display = "block";
  document.body.className = "green";
  gameStartTime = new Date().getTime();

  const delay = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000; // 3-10 segundos
  setTimeout(changeToRed, delay);
}

// Cambiar fondo a rojo y empezar temporizador
function changeToRed() {
  if (gameEnded) return; // No continuar si el juego ya terminó
  document.body.className = "red";
  redDisplayed = true;
  reactionStartTime = new Date().getTime();
  document.getElementById("timer").style.display = "block";
  timerInterval = setInterval(updateTimer, 10);
}

// Actualizar temporizador en pantalla
function updateTimer() {
  const elapsed = new Date().getTime() - reactionStartTime;
  document.getElementById("timer").innerText = elapsed + " ms";
}

// Manejar clics
document.addEventListener("click", () => {
  if (!gameStarted || gameEnded) return; // Ignorar clics antes de empezar o después de terminar

  const now = new Date().getTime();

  if (redDisplayed) {
    // Clic válido (pantalla roja)
    const reactionTime = now - reactionStartTime;
    clearInterval(timerInterval);
    redDisplayed = false;
    document.getElementById("timer").style.display = "none";
    showMessage("Tu tiempo de reacción es de " + reactionTime + " ms");
    showButtons();
    updateBestScore(reactionTime);
    gameEnded = true;

     // Guardar score y mostrar top 5
    saveScore('peekaboo', reactionTime).then(() => {
    renderArcadeTop5('topScores', 'peekaboo', 'asc');
    });
  } else {
    const timeSinceStart = now - gameStartTime;
    if (timeSinceStart >= 50) {
      // Clic anticipado después de 0,05 segundos porque si no pasan cosas
      document.body.className = "tooSoon";
      showMessage("¡Has hecho clic demasiado pronto!");
      showButtons();
      gameEnded = true;
    }
    // Si es antes de 0,05 segundos, no hace nada
  }
});

// Mostrar mensaje de resultado
function showMessage(text) {
  const msg = document.getElementById("messageContainer");
  msg.style.display = "block";
  msg.innerText = text;
}

// Mostrar botones de reintentar y volver al menú
function showButtons() {
  document.getElementById("restartButtons").style.display = "block";
}

// Guardar mejor puntuación en localStorage
function updateBestScore(time) {
  let best = localStorage.getItem("bestScore");
  if (!best || time < best) {
    localStorage.setItem("bestScore", time);
    document.getElementById("bestScore").innerText =
      "Mejor puntuación: " + time + " ms";
  }
}
