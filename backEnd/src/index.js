import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import solicitudRoutes from './routes/solicitudRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Montaje de rutas
app.use('/solicitudes', solicitudRoutes);
app.use('/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));