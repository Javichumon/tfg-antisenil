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

// Mostrar menú de usuario si existe en la página
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

// Ejecutar si la página tiene menú
window.addEventListener('DOMContentLoaded', cargarMenuUsuario);
