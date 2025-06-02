const imagenes = [
  "blastoise", "charizard", "clefairy", "eevee", "gengar", "lapras",
  "mew", "mewtwo", "nidorina", "pikachu", "sandslash", "snorlax", "venusaur",
  "magikarp", "dragonair"
];

const menu = document.getElementById("menu-inicial");
const juego = document.getElementById("juego");
const final = document.getElementById("final");
const erroresSpan = document.getElementById("errores");
const mejorSpan = document.getElementById("mejor");

let errores = 0;
let pareja = [];
let bloqueado = false;

document.getElementById("jugar-btn").onclick = iniciarJuego;
document.getElementById("volver-menu-btn").onclick = () => location.href = "../../GodIndex.html";
document.getElementById("rejugar-btn").onclick = () => location.reload();
document.getElementById("volver-final-btn").onclick = () => location.href = "../../GodIndex.html";

function iniciarJuego() {
  menu.classList.add("oculto");
  juego.classList.remove("oculto");

  const imagenesDuplicadas = [...imagenes, ...imagenes];
  const mezcla = imagenesDuplicadas.sort(() => 0.5 - Math.random());

  mezcla.forEach(nombre => {
    const carta = document.createElement("div");
    carta.className = "card";
    carta.innerHTML = `
      <div class="inner">
        <img src="img/${nombre}.png" class="front" />
        <div class="back"></div>
      </div>
    `;
    carta.dataset.nombre = nombre;
    carta.onclick = () => manejarClick(carta);
    juego.appendChild(carta);
  });
}

function manejarClick(carta) {
  if (bloqueado || carta.classList.contains("acertada") || pareja.includes(carta)) return;

  carta.classList.add("flip");
  pareja.push(carta);

  if (pareja.length === 2) {
    bloqueado = true;
    const [c1, c2] = pareja;
    if (c1.dataset.nombre === c2.dataset.nombre) {
      c1.classList.add("acertada");
      c2.classList.add("acertada");
      pareja = [];
      bloqueado = false;
      comprobarFin();
    } else {
      errores++;
      setTimeout(() => {
        c1.classList.remove("flip");
        c2.classList.remove("flip");
        pareja = [];
        bloqueado = false;
      }, 1000);
    }
  }
}

function comprobarFin() {
  if (document.querySelectorAll(".acertada").length === imagenes.length * 2) {
    juego.classList.add("oculto");
    final.classList.remove("oculto");
    erroresSpan.textContent = errores;

    const mejor = localStorage.getItem("mejorErrores");
    if (!mejor || errores < mejor) {
      localStorage.setItem("mejorErrores", errores);
      mejorSpan.textContent = errores;
    } else {
      mejorSpan.textContent = mejor;
    }
    
    // Guardar score y mostrar ranking
    saveScore('memoria', errores).then(() => {
    renderArcadeTop5('topScores', 'memoria', 'asc');
    });
  }
}
saveScore('memoria', errores); // o segundos, o tiempo, según juego

renderArcadeTop5('topScores', 'memoria', 'asc');