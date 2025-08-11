import {
  crearSolicitud,
  obtenerSolicitudes,
  obtenerSolicitudPorId,
  actualizarEstadoModel,
} from '../models/solicitudModels.js';

/**
 * POST /solicitudes
 * Crea una nueva solicitud/ticket de soporte.
 * @param {import('express').Request} req - Debe incluir nombre, email, asunto, descripcion en body.
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
export const nuevaSolicitud = async (req, res) => {
  try {
    const { nombre, email, asunto, descripcion } = req.body || {};

    // Validaciones mínimas de payload
    if (!nombre || !email || !asunto || !descripcion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Email no válido.' });
    }

    const fecha = new Date();
    const estado = 'pendiente';

    // Lógica simple para sugerir una respuesta automática
    const texto = `${asunto} ${descripcion}`.toLowerCase();
    let respuesta_sugerida = 'Gracias por su solicitud. La revisaremos pronto.';
    if (texto.includes('error') || texto.includes('bug')) {
      respuesta_sugerida = 'Parece un error técnico. Nuestro equipo lo revisará.';
    } else if (texto.includes('contraseña') || texto.includes('password')) {
      respuesta_sugerida = 'Si olvidó su contraseña, use el enlace de recuperación o solicite reinicio.';
    }

    const id = await crearSolicitud(
      nombre, email, asunto, descripcion, fecha, estado, respuesta_sugerida
    );
    const solicitud = await obtenerSolicitudPorId(id);

    return res.status(201).json({ message: 'Solicitud creada', solicitud });
  } catch (error) {
    console.error('[POST /solicitudes] Error creando solicitud:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

/**
 * GET /solicitudes
 * Lista todas las solicitudes ordenadas por fecha.
 */
export const listarSolicitudes = async (_req, res) => {
  try {
    const solicitudes = await obtenerSolicitudes();
    res.json(solicitudes);
  } catch (error) {
    console.error('[LISTAR] Error listando solicitudes:', error);
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
};

/**
 * PUT /solicitudes/:id/estado
 * Actualiza el estado de una solicitud existente y opcionalmente
 * la respuesta sugerida/admin.
 * @param {import('express').Request} req - params.id, body.estado, body.respuesta_admin o body.respuesta_sugerida
 */
export const actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, respuesta_admin, respuesta_sugerida } = req.body;

    if (!id || !estado) {
      return res.status(400).json({ error: 'id y estado son obligatorios' });
    }

    // Se normaliza a la columna "respuesta_sugerida" en BD
    const respuesta = respuesta_sugerida ?? respuesta_admin ?? null;

    const ok = await actualizarEstadoModel(id, estado, respuesta);
    if (!ok) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    const solicitud = await obtenerSolicitudPorId(id);
    res.json({ message: 'Actualizada', solicitud });
  } catch (e) {
    console.error('[PUT /solicitudes/:id/estado] Error:', e);
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
};