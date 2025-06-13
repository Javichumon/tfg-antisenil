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
✅ GUÍA PASO A PASO PARA HACER FUNCIONAR EL PROYECTO TFG

----------------------------------------------1️⃣ CREAR LA BASE DE DATOS Y LAS TABLAS EN MYSQL
----------------------------------------------
Abre tu cliente MySQL (Workbench, consola, etc.) y ejecuta el archivo:

    juegos.sql

Este archivo crea la base de datos `juegos` y todas las tablas necesarias (`usuarios`, `scores`, `logros`).

----------------------------------------------
2️⃣ INSERTAR USUARIOS Y PUNTUACIONES DE PRUEBA
----------------------------------------------
Después de tener las tablas, ejecuta el archivo:

    insertar.sql

Esto añade los 3 usuarios de prueba (`Javier`, `Oscar`, `Sergio`), sus puntuaciones y logros iniciales.

----------------------------------------------
3️⃣ (OPCIONAL) EJECUTAR EL SEED DESDE NODE.JS
----------------------------------------------
Si tu proyecto tiene un archivo llamado `seed.js`, puedes ejecutar:

    cd backend-node
    npm install
    node seed.js

Esto reiniciará los datos si fuese necesario (opcional si ya hiciste el paso 2).

----------------------------------------------
4️⃣ EJECUTAR EL BACKEND DE LOGROS (C#)
----------------------------------------------
Desde la terminal, entra a la carpeta donde está el backend de logros (por ejemplo `LogrosAPI`) y ejecuta:

    cd LogrosAPI
    dotnet restore
    dotnet run

Esto levanta el backend de logros en:

    http://localhost:5126

Puedes comprobar que está funcionando accediendo a:

    http://localhost:5126/swagger

----------------------------------------------
5️⃣ EJECUTAR EL BACKEND NODE.JS (AUTENTICACIÓN Y SCORES)
----------------------------------------------
Desde la raíz del proyecto donde esté `server.js`, ejecuta:

    node server.js

Esto habilita las rutas necesarias como `/login`, `/register`, `/score`, etc. en:

    http://localhost:3000

----------------------------------------------
6️⃣ ABRIR EL FRONTEND EN EL NAVEGADOR
----------------------------------------------
Abre el archivo:

    GodIndex.html

...usando la extensión **Live Server** de VS Code.

Se abrirá en el navegador en:

    http://127.0.0.1:5500/GodIndex.html

pero debes de usar el localhost para que funcionen todas las funciones

    http://localhost:5500/GodIndex.html

----------------------------------------------
7️⃣ JUGAR, GUARDAR PUNTUACIONES Y DESBLOQUEAR LOGROS
----------------------------------------------
- Inicia sesión con uno de los usuarios de prueba (`Javier`, `Oscar`, `Sergio`, contraseña `12345678`).
- Prueba los diferentes juegos.
- Se guardarán las puntuaciones automáticamente.
- Se evaluarán los logros automáticamente tras cada partida.
- Accede al menú de usuario -> "Logros" para consultar cuáles has desbloqueado.


> ⚠️ **Credenciales esperadas en MySQL:**
> - Usuario: `root`
> - Contraseña: `trabajofinal`

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
