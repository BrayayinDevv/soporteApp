import { pool } from '../config/db.js';

/**
 * Inserta una nueva solicitud y retorna el ID generado.
 */
export const crearSolicitud = async (nombre, email, asunto, descripcion, fecha, estado, respuesta) => {
  const [result] = await pool.execute(
    `INSERT INTO solicitudes (nombre, email, asunto, descripcion, fecha, estado, respuesta_sugerida)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nombre, email, asunto, descripcion, fecha, estado, respuesta]
  );
  return result.insertId;
};

/**
 * Obtiene todas las solicitudes ordenadas por fecha.
 */
export const obtenerSolicitudes = async () => {
  const [rows] = await pool.query(
    `SELECT id, nombre, email, asunto, descripcion, fecha, estado, respuesta_sugerida
     FROM solicitudes
     ORDER BY fecha DESC`
  );
  return rows;
};

/**
 * Obtiene una solicitud por su ID.
 */
export const obtenerSolicitudPorId = async (id) => {
  const [rows] = await pool.execute(
    `SELECT id, nombre, email, asunto, descripcion, fecha, estado, respuesta_sugerida
     FROM solicitudes WHERE id = ?`,
    [id]
  );
  return rows[0];
};

/**
 * Actualiza el estado y la respuesta sugerida de una solicitud.
 * @returns {Promise<boolean>} true si se actualizó 1 fila.
 */
export const actualizarEstadoModel = async (id, estado, respuesta) => {
  const [result] = await pool.execute(
    `UPDATE solicitudes
     SET estado = ?, respuesta_sugerida = ?
     WHERE id = ?`,
    [estado, respuesta, id]
  );
  return result.affectedRows === 1;
};