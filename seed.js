const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function seed() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'trabajofinal',
    database: 'juegos'
  });

  const password = await bcrypt.hash('12345678', 10);

  const users = ['Javier', 'Oscar', 'Sergio'];

  for (const username of users) {
    await connection.query(
      'INSERT IGNORE INTO usuarios (username, password_hash) VALUES (?, ?)',
      [username, password]
    );
  }

  console.log('Usuarios insertados correctamente con bcrypt.');
  await connection.end();
}

seed();
