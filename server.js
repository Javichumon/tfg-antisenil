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

// Score
app.post('/score', async (req, res) => {
  const { gameId, value } = req.body;
  const username = req.session.user?.username;

  if (!username || !gameId || typeof value !== 'number') {
    return res.status(400).json({ message: 'Datos inválidos o sesión no iniciada' });
  }

  try {
    const [users] = await db.query('SELECT id FROM usuarios WHERE username = ?', [username]);
    const userId = users[0]?.id;
    if (!userId) return res.status(404).json({ message: 'Usuario no encontrado' });

    await db.query(
      'INSERT INTO scores (game_id, user_id, value) VALUES (?, ?, ?)',
      [gameId, userId, value]
    );

    res.json({ message: 'Puntuación guardada' });
  } catch (err) {
    console.error('Error al guardar score:', err);
    res.status(500).json({ message: 'Error interno', error: err.message });
  }
});

// Para obtener el top 5:
app.get('/scores/:gameId', async (req, res) => {
  const { gameId } = req.params;
  const order = req.query.order === 'asc' ? 'ASC' : 'DESC';

  try {
    const [rows] = await db.query(
      `SELECT u.username, s.value, s.date
       FROM scores s
       JOIN usuarios u ON s.user_id = u.id
       WHERE s.game_id = ?
       ORDER BY s.value ${order}
       LIMIT 5`,
      [gameId]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener top scores:', err);
    res.status(500).json({ message: 'Error interno' });
  }
});