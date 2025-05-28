let selectedPhrase = "";
let startTime = 0;
let maxWpm = localStorage.getItem("maxWpm") || 0;

function startGame() {
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("result").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  const randomIndex = Math.floor(Math.random() * frasesLocales.length);
  selectedPhrase = frasesLocales[randomIndex].trim();
  const phraseDisplay = document.getElementById("phraseDisplay");
  phraseDisplay.innerHTML = "";

  selectedPhrase.split(" ").forEach(word => {
    const span = document.createElement("span");
    span.textContent = word + " ";
    phraseDisplay.appendChild(span);
  });

  document.getElementById("inputBox").value = "";
  document.getElementById("inputBox").focus();
  startTime = Date.now();
}

function goToMenu() {
  document.getElementById("menu").classList.remove("hidden");
  document.getElementById("game").classList.add("hidden");
  document.getElementById("result").classList.add("hidden");
}

function checkInput() {
  const input = document.getElementById("inputBox").value.trim();
  const words = input.split(" ");
  const spans = document.getElementById("phraseDisplay").querySelectorAll("span");

  for (let i = 0; i < spans.length; i++) {
    if (words[i] === undefined) {
      spans[i].classList.remove("correct");
    } else if (words[i] === spans[i].textContent.trim()) {
      spans[i].classList.add("correct");
    } else {
      spans[i].classList.remove("correct");
    }
  }

  // Comparación exacta
  if (input === selectedPhrase) {
    const timeTaken = (Date.now() - startTime) / 1000;
    const wpm = (selectedPhrase.split(" ").length / timeTaken) * 60;
    updateMaxWpm(wpm);
    showResult(wpm.toFixed(2));
  }
}

function updateMaxWpm(wpm) {
  if (wpm > maxWpm) {
    maxWpm = wpm;
    localStorage.setItem("maxWpm", wpm);
  }
}

function showResult(wpm) {
  document.getElementById("game").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  document.getElementById("wpmResult").innerHTML = `
    ¡Has escrito a <strong>${wpm}</strong> palabras por minuto!<br>
    <br>
    Tu puntuación máxima es: <strong>${parseFloat(maxWpm).toFixed(2)}</strong> WPM
  `;
}
