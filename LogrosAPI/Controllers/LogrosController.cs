using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Data;

[ApiController]
[Route("api/[controller]")]
public class LogrosController : ControllerBase
{
    private readonly string connectionString = "server=localhost;user=root;password=trabajofinal;database=juegos";

    [HttpGet("{username}")]
    public IActionResult GetLogros(string username)
    {
        var logros = new List<object>();

        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        using var cmd = new MySqlCommand("SELECT l.nombre, l.descripcion, l.fecha FROM logros l JOIN usuarios u ON l.user_id = u.id WHERE u.username = @username", conn);
        cmd.Parameters.AddWithValue("@username", username);
        using var reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            logros.Add(new
            {
                nombre = reader["nombre"],
                descripcion = reader["descripcion"],
                fecha = reader["fecha"]
            });
        }

        return Ok(logros);
    }

    [HttpPost("evaluar/{username}")]
    public IActionResult EvaluarLogros(string username, [FromQuery] string? only = null)
    {
        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        using var getUserIdCmd = new MySqlCommand("SELECT id FROM usuarios WHERE username = @username", conn);
        getUserIdCmd.Parameters.AddWithValue("@username", username);
        var userId = getUserIdCmd.ExecuteScalar();

        if (userId == null) return NotFound("Usuario no encontrado");

        if (only == null || only == "completista")
        {
            // Completista: jugar a todos los juegos
            var juegos = new[] { "pollos", "typerazing", "peekaboo", "tracker", "memoria" };
            using var checkCmd = new MySqlCommand("SELECT DISTINCT game_id FROM scores WHERE user_id = @uid", conn);
            checkCmd.Parameters.AddWithValue("@uid", userId);
            var encontrados = new HashSet<string>();
            using var reader = checkCmd.ExecuteReader();
            while (reader.Read()) encontrados.Add(reader.GetString("game_id"));
            reader.Close();

            if (juegos.All(j => encontrados.Contains(j)))
            {
                using var insert = new MySqlCommand("INSERT IGNORE INTO logros (user_id, nombre, descripcion) VALUES (@uid, @n, @d)", conn);
                insert.Parameters.AddWithValue("@uid", userId);
                insert.Parameters.AddWithValue("@n", "Completista");
                insert.Parameters.AddWithValue("@d", "Has jugado a todos los juegos disponibles.");
                insert.ExecuteNonQuery();
            }
        }

        if (only == null || only == "reflejos")
        {
            // Reflejos de acero: menos de 250ms en peekaboo
            using var peekCmd = new MySqlCommand("SELECT MIN(value) FROM scores WHERE game_id = 'peekaboo' AND user_id = @uid", conn);
            peekCmd.Parameters.AddWithValue("@uid", userId);
            var bestPeek = peekCmd.ExecuteScalar();

            if (bestPeek != null && Convert.ToDouble(bestPeek) < 250)
            {
                using var insert = new MySqlCommand("INSERT IGNORE INTO logros (user_id, nombre, descripcion) VALUES (@uid, @n, @d)", conn);
                insert.Parameters.AddWithValue("@uid", userId);
                insert.Parameters.AddWithValue("@n", "Reflejos de acero");
                insert.Parameters.AddWithValue("@d", "Has conseguido un tiempo de reacción inferior a 250 ms.");
                insert.ExecuteNonQuery();
            }
        }

        if (only == null || only == "cazapollos")
        {
            using var pollosCmd = new MySqlCommand("SELECT MAX(value) FROM scores WHERE game_id = 'pollos' AND user_id = @uid", conn);
            pollosCmd.Parameters.AddWithValue("@uid", userId);
            var score = pollosCmd.ExecuteScalar();
            if (score != null && Convert.ToDouble(score) >= 30)
            {
                using var insert = new MySqlCommand("INSERT IGNORE INTO logros (user_id, nombre, descripcion) VALUES (@uid, @n, @d)", conn);
                insert.Parameters.AddWithValue("@uid", userId);
                insert.Parameters.AddWithValue("@n", "Cazapollos");
                insert.Parameters.AddWithValue("@d", "Has alcanzado más de 30 puntos en el juego de pollos.");
                insert.ExecuteNonQuery();
            }
        }

        if (only == null || only == "mente")
        {
            using var memCmd = new MySqlCommand("SELECT MIN(value) FROM scores WHERE game_id = 'memoria' AND user_id = @uid", conn);
            memCmd.Parameters.AddWithValue("@uid", userId);
            var score = memCmd.ExecuteScalar();
            if (score != null && Convert.ToDouble(score) < 15)
            {
                using var insert = new MySqlCommand("INSERT IGNORE INTO logros (user_id, nombre, descripcion) VALUES (@uid, @n, @d)", conn);
                insert.Parameters.AddWithValue("@uid", userId);
                insert.Parameters.AddWithValue("@n", "Mente prodigiosa");
                insert.Parameters.AddWithValue("@d", "Has completado memoria con menos de 15 errores.");
                insert.ExecuteNonQuery();
            }
        }

        if (only == null || only == "superviviente")
        {
            using var trackCmd = new MySqlCommand("SELECT MAX(value) FROM scores WHERE game_id = 'tracker' AND user_id = @uid", conn);
            trackCmd.Parameters.AddWithValue("@uid", userId);
            var score = trackCmd.ExecuteScalar();
            if (score != null && Convert.ToDouble(score) > 20)
            {
                using var insert = new MySqlCommand("INSERT IGNORE INTO logros (user_id, nombre, descripcion) VALUES (@uid, @n, @d)", conn);
                insert.Parameters.AddWithValue("@uid", userId);
                insert.Parameters.AddWithValue("@n", "Superviviente");
                insert.Parameters.AddWithValue("@d", "Has aguantado más de 20 segundos en tracker.");
                insert.ExecuteNonQuery();
            }
        }

        if (only == null || only == "teclado")
        {
            using var typeCmd = new MySqlCommand("SELECT MAX(value) FROM scores WHERE game_id = 'typerazing' AND user_id = @uid", conn);
            typeCmd.Parameters.AddWithValue("@uid", userId);
            var score = typeCmd.ExecuteScalar();
            if (score != null && Convert.ToDouble(score) > 100)
            {
                using var insert = new MySqlCommand("INSERT IGNORE INTO logros (user_id, nombre, descripcion) VALUES (@uid, @n, @d)", conn);
                insert.Parameters.AddWithValue("@uid", userId);
                insert.Parameters.AddWithValue("@n", "Teclado en llamas");
                insert.Parameters.AddWithValue("@d", "Has escrito a más de 100 palabras por minuto.");
                insert.ExecuteNonQuery();
            }
        }

        if (only == null || only == "impaciente")
        {
            using var fallosPeek = new MySqlCommand("SELECT COUNT(*) FROM scores WHERE game_id = 'peekaboo_fail' AND user_id = @uid", conn);
            fallosPeek.Parameters.AddWithValue("@uid", userId);
            var fails = Convert.ToInt32(fallosPeek.ExecuteScalar());

            if (fails > 0)
            {
                using var insert = new MySqlCommand("INSERT IGNORE INTO logros (user_id, nombre, descripcion) VALUES (@uid, @n, @d)", conn);
                insert.Parameters.AddWithValue("@uid", userId);
                insert.Parameters.AddWithValue("@n", "Impaciente");
                insert.Parameters.AddWithValue("@d", "Has hecho clic antes de tiempo en Peek-a-boo. ¡Demasiadas ganas!");
                insert.ExecuteNonQuery();
            }
        }

        if (only == null)
        {
            // Logro final: todos los logros previos
            using var countCmd = new MySqlCommand("SELECT COUNT(*) FROM logros WHERE user_id = @uid", conn);
            countCmd.Parameters.AddWithValue("@uid", userId);
            var count = Convert.ToInt32(countCmd.ExecuteScalar());

            if (count >= 8)
            {
                using var insert = new MySqlCommand("INSERT IGNORE INTO logros (user_id, nombre, descripcion) VALUES (@uid, @n, @d)", conn);
                insert.Parameters.AddWithValue("@uid", userId);
                insert.Parameters.AddWithValue("@n", "Maestro definitivo");
                insert.Parameters.AddWithValue("@d", "Has conseguido todos los logros disponibles.");
                insert.ExecuteNonQuery();
            }
        }

        return Ok("Evaluación completada");
    }
}
