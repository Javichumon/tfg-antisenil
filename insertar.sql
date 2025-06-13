-- Insertar puntuaciones usando subconsultas
INSERT INTO scores (game_id, user_id, value) VALUES
('pollos',    (SELECT id FROM usuarios WHERE username = 'Oscar'),  120),
('pollos',    (SELECT id FROM usuarios WHERE username = 'Javier'), 90),
('pollos',    (SELECT id FROM usuarios WHERE username = 'Sergio'), 70),

('typerazing',(SELECT id FROM usuarios WHERE username = 'Javier'), 105),
('typerazing',(SELECT id FROM usuarios WHERE username = 'Oscar'),   95),
('typerazing',(SELECT id FROM usuarios WHERE username = 'Sergio'),  80),

('peekaboo',  (SELECT id FROM usuarios WHERE username = 'Oscar'),  180),
('peekaboo',  (SELECT id FROM usuarios WHERE username = 'Javier'), 240),
('peekaboo',  (SELECT id FROM usuarios WHERE username = 'Sergio'), 320),

('memoria',   (SELECT id FROM usuarios WHERE username = 'Oscar'),    10),
('memoria',   (SELECT id FROM usuarios WHERE username = 'Javier'),   8),
('memoria',   (SELECT id FROM usuarios WHERE username = 'Sergio'),   15),

('tracker',   (SELECT id FROM usuarios WHERE username = 'Sergio'), 15.5),
('tracker',   (SELECT id FROM usuarios WHERE username = 'Oscar'),  12.8),
('tracker',   (SELECT id FROM usuarios WHERE username = 'Javier'), 10.1);

-- Logros de Oscar
INSERT INTO logros (user_id, nombre, descripcion) VALUES
((SELECT id FROM usuarios WHERE username = 'Oscar'), 'Jugón', 'Has jugado a todos los juegos disponibles.'),
((SELECT id FROM usuarios WHERE username = 'Oscar'), 'Reflejos de acero', 'Has conseguido un tiempo de reacción inferior a 250 ms.'),
((SELECT id FROM usuarios WHERE username = 'Oscar'), 'Cazapollos', 'Has alcanzado más de 30 puntos en La invasión de los pollos.'),
((SELECT id FROM usuarios WHERE username = 'Oscar'), 'Mente prodigiosa', 'Has completado Memoria con menos de 15 errores.'),
((SELECT id FROM usuarios WHERE username = 'Oscar'), 'Superviviente', 'Has aguantado más de 20 segundos en el Tracker.'),
((SELECT id FROM usuarios WHERE username = 'Oscar'), 'Teclado en llamas', 'Has escrito a más de 100 palabras por minuto.'),
((SELECT id FROM usuarios WHERE username = 'Oscar'), 'Impaciente', 'Has hecho clic antes de tiempo en Peek-a-boo. ¡Demasiadas ganas!'),
((SELECT id FROM usuarios WHERE username = 'Oscar'), 'Maestro definitivo', 'Has conseguido todos los logros disponibles.');
