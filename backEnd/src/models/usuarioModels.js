import { pool } from '../config/db.js';

/**
 * Verifica credenciales y retorna datos básicos del usuario.
 */
export const verificarUsuario = async (email, password) => {
  const [rows] = await pool.execute(
    `SELECT id, nombre, email FROM usuarios WHERE email = ? AND password = ?`,
    [email, password]
  );
  return rows.length > 0 ? rows[0] : null;
};