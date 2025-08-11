import express from 'express';
import { nuevaSolicitud, listarSolicitudes, actualizarEstado } from '../controllers/solicitudController.js';
const router = express.Router();

/**
 * POST /solicitudes -> crear solicitud
 * GET  /solicitudes -> listar solicitudes
 * PUT  /solicitudes/:id/estado -> actualizar estado
 */
router.post('/', nuevaSolicitud);
router.get('/', listarSolicitudes);
router.put('/:id/estado', actualizarEstado);

export default router;