import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
/*
 * Pool de conexiones MySQL.
 * Usa variables de entorno para configurar el acceso a la base de datos.
 * `waitForConnections`: hace que los clientes esperen si no hay conexiones disponibles.
 * `connectionLimit`: máximo de conexiones en el pool.
 * `queueLimit`: 0 = sin límite de espera en cola.
 */
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});