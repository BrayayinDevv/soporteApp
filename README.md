Sistema de Gestión de Solicitudes de Soporte

📋 Descripción

Aplicación web para la gestión de solicitudes de soporte técnico, desarrollada como parte de una prueba técnica para el proceso de selección de Desarrollador Junior.

Incluye:

Formulario para registrar solicitudes de soporte.

API REST para guardar y listar solicitudes.

Panel administrativo para gestionar y responder solicitudes.

Login con reCAPTCHA.

Validaciones en el formulario.

Generación automática de respuesta sugerida.

🛠 Tecnologías utilizadas

Frontend: React + Vite, TailwindCSS (opcional), CSS puro, framer-motion, react-google-recaptcha.

Backend: Node.js, Express, PostgreSQL.

Base de datos: PostgreSQL.

📦 Instalación

1️⃣ Clonar el repositorio

git clone https://github.com/tu-usuario/soporteapp.git
cd soporteapp

2️⃣ Configurar el backend

cd backend
npm install
cp .env.example .env

En el archivo .env configurar:

PORT=4000
DATABASE_URL=postgresql://usuario:password@localhost:5432/soporteapp
JWT_SECRET=tu_clave_secreta

3️⃣ Configurar el frontend

cd ../frontend
npm install
cp .env.example .env

En el archivo .env configurar:

VITE_API_BASE=http://localhost:4000
VITE_RECAPTCHA_KEY=tu_clave_recaptcha_publica

4️⃣ Ejecutar la aplicación

En dos terminales separadas:

# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev

📷 Capturas de pantalla

(Agregar imágenes de login, panel usuario y panel admin)

🚀 Posibles mejoras

Implementar autenticación con JWT.

Filtrado y búsqueda avanzada en el panel admin.

Integración con IA para sugerir respuestas.

Sistema de roles más granular.

📅 Entrega

Fecha límite: Lunes 11 de agosto de 2025.

👨‍💻 Autor

Brayan Velandia
