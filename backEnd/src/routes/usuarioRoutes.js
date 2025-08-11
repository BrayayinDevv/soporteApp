import express from "express";
import { loginUsuario } from "../controllers/usuarioController.js";

const router = express.Router();

/**
 * POST /usuarios/login -> login simple
 */
router.post("/login", loginUsuario);

export default router;