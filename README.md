# 🎮 Proyecto Final: Arcade Antisenil con Sistema de Logros

Este proyecto es una **plataforma web de minijuegos arcade** que incluye:

✅ Autenticación de usuarios  
✅ Guardado de puntuaciones y rankings  
✅ Sistema de logros con backend en **C#**  
✅ Estilo retro y responsive  
✅ Base de datos **MySQL**

---

## 🛠 Requisitos del sistema

Antes de comenzar, asegúrate de tener instalados:

- [Node.js v18+](https://nodejs.org/)
- [.NET SDK 8.0+](https://dotnet.microsoft.com/download)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)

---

## 🧱 1. Configuración de la base de datos MySQL

Abre tu cliente MySQL (como MySQL Workbench o línea de comandos) y ejecuta el siguiente script:

```sql
CREATE DATABASE IF NOT EXISTS juegos;
USE juegos;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  game_id VARCHAR(50) NOT NULL,
  user_id INT NOT NULL,
  value FLOAT NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS logros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  nombre VARCHAR(100),
  descripcion TEXT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES usuarios(id)
);
```

También puedes cargar el archivo `juegos.sql` si se incluye en el repositorio.

> ⚠️ **Credenciales esperadas en MySQL:**
> - Usuario: `root`
> - Contraseña: `trabajofinal`

---

## 🧩 2. Backend en Node.js (autenticación y puntuaciones)

### 🏁 Primer arranque

```bash
cd backend-node
npm install
node server.js
```

✅ Escucha en: `http://localhost:3000`

---

## 🧠 3. Backend en C# (logros)

### 🏁 Primer arranque

```bash
cd logrosAPI
dotnet restore
dotnet run
```

✅ Escucha en: `http://localhost:5000`  
🌐 Swagger UI (para pruebas): `http://localhost:5000/swagger`

---

## 🌐 4. Frontend

Abre la carpeta raíz (`tfg-antisenil`) con **Live Server** desde VS Code o similar.

Luego accede a:

```
http://localhost:5500/GodIndex.html
```

---

## 🏆 Sistema de logros

Los logros se asignan automáticamente tras cada partida y se pueden consultar desde la API o la interfaz web.

### 📜 Lista de logros actuales:

1. **Completista** – Has jugado a todos los juegos disponibles  
2. **Reflejos de acero** – Reacción inferior a 250ms en Peek-a-boo  
3. **Cazapollos** – Más de 30 puntos en La Invasión de los Pollos  
4. **Mente prodigiosa** – Menos de 15 errores en Memoria  
5. **Superviviente** – Más de 20 segundos en Tracker  
6. **Teclado en llamas** – Más de 100 palabras por minuto en Type_Razing  
7. **Impaciente** – Has hecho clic demasiado pronto en Peek-a-boo  
8. **Maestro definitivo** – Has desbloqueado todos los logros anteriores

### 🔄 Evaluación de logros manual

Puedes forzar la reevaluación para un usuario con:

```
POST http://localhost:5000/api/logros/evaluar/{username}
```

Consultar logros desbloqueados:

```
GET http://localhost:5000/api/logros/{username}
```

La página `logros.html` los muestra con tarjetas estilo retro, organizadas en dos bloques de 4.

---

## ✅ Checklist de implementación

| Funcionalidad                        | Estado |
|-------------------------------------|--------|
| Autenticación de usuarios           | ✅     |
| Guardado de puntuaciones            | ✅     |
| Top 5 por juego                     | ✅     |
| Estilo visual retro                 | ✅     |
| Logros individuales por juego       | ✅     |
| Logro por desbloquear todos         | ✅     |
| Logros visibles en interfaz         | ✅     |
| Backend de logros en C#             | ✅     |
| API documentada vía Swagger         | ✅     |

---

## 👨‍💻 Autoría

Trabajo de Fin de Grado  
Desarrollado por **Oscar Pérez** y **Javier Peralta**  

🧠 Inspirado en los clásicos… con un toque digital.
