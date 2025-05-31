const express = require('express');
const mysql = require('mysql2/promise');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
  credentials: true
}));

app.use(express.json());
app.use(session({
  secret: 'secreto-trabajo-final',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: 'lax'
  }
}));

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'trabajofinal',
  database: 'juegos'
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Faltan datos' });

  try {
    const [users] = await db.query('SELECT * FROM usuarios WHERE username = ?', [username]);
    if (users.length > 0) return res.status(409).json({ message: 'Usuario ya existe' });

    const password_hash = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO usuarios (username, password_hash) VALUES (?, ?)', [username, password_hash]);

    req.session.user = { username };
    res.json({ user: { username } });
  } catch (err) {
    console.error('Error al registrar:', err);
res.status(500).json({ message: 'Error al registrar', error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Faltan datos' });

  try {
    const [users] = await db.query('SELECT * FROM usuarios WHERE username = ?', [username]);
    if (users.length === 0) return res.status(401).json({ message: 'Credenciales incorrectas' });

    const user = users[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: 'Credenciales incorrectas' });

    req.session.user = { username };
    res.json({ user: { username } });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
  }
});

app.get('/check-session', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'No hay sesión activa' });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Sesión cerrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
