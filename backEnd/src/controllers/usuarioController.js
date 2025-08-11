import { pool } from "../config/db.js";

/**
 * POST /usuarios/login
 * Login simple por email + password
 */
export const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    // Consulta parametrizada evita inyección SQL.
    const [rows] = await pool.execute(
      "SELECT id, nombre, email, rol FROM usuarios WHERE email = ? AND password = ? LIMIT 1",
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const usuario = rows[0];
    res.json({ message: "Login exitoso", usuario });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
};