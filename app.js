async function requireAuth() {
  try {
    const res = await fetch('http://localhost:3000/check-session', {
      credentials: 'include'
    });
    const data = await res.json();
    console.log('Sesión:', data);

    if (!res.ok) {
      window.location.href = '../../login.html';
    }
  } catch (err) {
    console.error('Error al verificar sesión:', err);
    window.location.href = '../../login.html';
  }
}

// Mostrar menú de usuario si existe
async function cargarMenuUsuario() {
  const dropdown = document.getElementById('userDropdown');
  const button = document.getElementById('userMenuBtn');
  if (!dropdown || !button) return;

  button.addEventListener('click', () => {
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  });

  try {
    const res = await fetch('http://localhost:3000/check-session', {
      credentials: 'include'
    });
    const data = await res.json();

    if (res.ok) {
      dropdown.innerHTML = `
        <div style="padding: 10px;">👤 ${data.user.username}</div>
        <a href="#" onclick="cerrarSesion()">Cerrar sesión</a>
      `;
    } else {
      dropdown.innerHTML = `
        <a href="login.html">Iniciar sesión</a>
        <a href="register.html">Registrarse</a>
      `;
    }
  } catch {
    dropdown.innerHTML = `
      <a href="login.html">Iniciar sesión</a>
      <a href="register.html">Registrarse</a>
    `;
  }
}

async function cerrarSesion() {
  await fetch('http://localhost:3000/logout', {
    method: 'POST',
    credentials: 'include'
  });
  location.reload();
}

async function saveScore(gameId, score) {
  console.log("Intentando guardar score:", gameId, score);

  const res = await fetch('http://localhost:3000/score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ gameId, value: score })
  });

  const data = await res.json();
  console.log("Respuesta del servidor:", data);
}

async function getTopScores(gameId, order = 'desc') {
  const res = await fetch(`http://localhost:3000/scores/${gameId}?order=${order}`, {
    credentials: 'include'
  });
  return res.ok ? await res.json() : [];
}

async function renderArcadeTop5(containerId, gameId, order = 'desc') {
  const container = document.getElementById(containerId);
  const scores = await getTopScores(gameId, order);

  if (!scores.length) {
    container.innerHTML = '<p style="color: white;">No hay puntuaciones aún.</p>';
    return;
  }

  container.innerHTML = `
    <h2 style="color: pink; text-align: center;">TOP 5</h2>
    <table class="arcade-table">
      <thead>
        <tr>
          <th>RANK</th>
          <th>SCORE</th>
          <th>NAME</th>
        </tr>
      </thead>
      <tbody>
        ${scores.map((s, i) => `
          <tr>
            <td>${i + 1}${['ST', 'ND', 'RD', 'TH', 'TH'][i]}</td>
            <td>${String(Math.floor(s.value)).padStart(6, '0')}</td>
            <td>${s.username.toUpperCase()}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

window.addEventListener('DOMContentLoaded', cargarMenuUsuario);
