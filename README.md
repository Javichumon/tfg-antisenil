# tfg-antisenil
Este proyecto es una plataforma arcade con:

🧑‍💼 Autenticación de usuarios (login/registro)

🏁 Guardado y consulta de puntuaciones por juego

🏆 Top 5 por juego

🧩 Sistema de logros conectado a cada jugador

🔧 Backend híbrido: Node.js + C#

🚀 Instrucciones de instalación desde cero
✅ Requisitos previos
Instala lo siguiente:

Node.js v18+

.NET SDK 8.0+

MySQL Server en local

Recomendado: Visual Studio Code + extensión Live Server

Cosas necesarias: 

https://nodejs.org/es
Node.js — Ejecuta JavaScript en cualquier parte
Ejecutar para ejecutar el sevidor node y funcionen las cookies, y las llamadas a mysql: node server.js

https://dev.mysql.com/downloads/file/?id=541637

Mysql - Sirve para ejecutar, almacenar y modificar bases de datos
usuario mysql: root
contraseña: trabajofinal

Instalar .NET SDK
https://dotnet.microsoft.com/download
Después abre una terminal y verifica con:

dotnet --version

Instala MySQL.Data:
Abre la terminal y navega a la carpeta donde quieras el backend (por ejemplo, dentro de tfg-antisenil).

Ejecuta:
dotnet new webapi -n LogrosAPI
cd LogrosAPI
dotnet add package MySql.Data

1. 🗄️ Preparar base de datos MySQL
Accede a MySQL con un cliente o terminal:


mysql -u root -p
Ejecuta este script SQL para crear la base de datos, las tablas necesarias y los datos iniciales:


CREATE DATABASE IF NOT EXISTS juegos;
USE juegos;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de puntuaciones
CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_id VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    value FLOAT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de logros (asociados a usuarios individualmente)
CREATE TABLE IF NOT EXISTS logros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    nombre VARCHAR(100),
    descripcion TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuarios(id)
);

-- Usuarios iniciales
INSERT IGNORE INTO usuarios (username, password_hash) VALUES
('Javier', 'hash_javier'),
('Oscar', 'hash_oscar'),
('Sergio', 'hash_sergio');

-- Obtener IDs
SET @idJavier = (SELECT id FROM usuarios WHERE username = 'Javier' LIMIT 1);
SET @idOscar = (SELECT id FROM usuarios WHERE username = 'Oscar' LIMIT 1);
SET @idSergio = (SELECT id FROM usuarios WHERE username = 'Sergio' LIMIT 1);

-- Puntuaciones para rankings (3 juegos de ejemplo)
INSERT IGNORE INTO scores (game_id, user_id, value)
VALUES 
('Juego1', @idOscar, 1000), ('Juego1', @idJavier, 800), ('Juego1', @idSergio, 600),
('Juego2', @idOscar, 1000), ('Juego2', @idJavier, 800), ('Juego2', @idSergio, 600),
('Juego3', @idOscar, 1000), ('Juego3', @idJavier, 800), ('Juego3', @idSergio, 600);

-- Logros iniciales para Oscar
INSERT IGNORE INTO logros (user_id, nombre, descripcion)
VALUES 
(@idOscar, 'Completista', 'Has jugado a todos los juegos disponibles.'),
(@idOscar, 'Reflejos de acero', 'Has conseguido un tiempo de reacción inferior a 250 ms en Peek-a-boo.');
2. 🖥️ Ejecutar backend de Node.js (API principal)

cd backend-node
npm install
node server.js
Escucha en: http://localhost:3000

3. ⚙️ Ejecutar backend de logros (C# ASP.NET)

cd backend-csharp
dotnet restore
dotnet run
Escucha en: http://localhost:5000

Swagger: http://localhost:5000/swagger

4. 🧑‍🎨 Ejecutar frontend
Abre la carpeta frontend/ con Live Server o cualquier servidor estático y navega a:

http://localhost:5500/GodIndex.html

🏆 Sistema de logros

Logros disponibles actualmente

Nombre	Descripción
Completista	Has jugado a todos los juegos disponibles.
Reflejos de acero	Has conseguido un tiempo de reacción inferior a 250 ms en Peek-a-boo.

Endpoints disponibles
Evaluar logros para un usuario
POST http://localhost:5000/api/logros/evaluar/{username}

Consultar logros desbloqueados y pendientes
GET http://localhost:5000/api/logros/{username}

Ver logros en interfaz web
Abre logros.html (dentro del frontend): muestra las cartas con logros desbloqueados y ocultos.

📌 Estado actual del proyecto
✅ Backend funcional (Node y C#)

✅ Usuarios iniciales insertados con puntuaciones

✅ Logros evaluables y visibles

✅ Top 5 por juego desde la API

✅ Interfaz lista para mostrar logros tipo “carta”

🧑‍💻 Autoría
Proyecto desarrollado por Oscar Pérez y Javier Peralta
Trabajo de Fin de Grado · 2025