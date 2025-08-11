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
git clone https://github.com/tu-usuario/soporteApp.git
cd soporteApp

2️⃣ Configurar el backend
cd backend
npm install
cp .env.example .env

En el archivo .env configurar:
PORT=4000
DATABASE_URL=postgresql://usuario:password@localhost:5432/soporteapp
JWT_SECRET=

3️⃣ Configurar el frontend
cd ../frontend
npm install
cp .env.example .env

En el archivo .env configurar:
VITE_API_BASE=http://localhost:4000
VITE_RECAPTCHA_KEY="6LdeEqMrAAAAABl6HPgd3a76vuM1RjouEvtQ8dws"

IMPORTANTE
se crea un archivo en la ruta "soporteapp/backEnd/bd" la cual se deja en ejemplo de la base de datos en PostgreSQL, como deberia ser creada.
<img width="1135" height="438" alt="image" src="https://github.com/user-attachments/assets/1c10ef36-10e7-4b5c-8142-01236b5b329f" />


4️⃣ Ejecutar la aplicación
En dos terminales separadas:
-------------------------------------
# Backend
cd backend
npm run dev
-------------------------------------
# Frontend
cd frontend
npm run dev
------------------------------------
📷 Capturas de pantalla
<img width="1365" height="636" alt="image" src="https://github.com/user-attachments/assets/43a3e187-2882-49f0-a05d-1e5d247d120f" />
<img width="1351" height="630" alt="image" src="https://github.com/user-attachments/assets/cba35638-da1c-4825-8387-9a73d514827c" />
<img width="1353" height="636" alt="image" src="https://github.com/user-attachments/assets/f3d13944-d7bd-48d0-9f96-48c20db5a582" />
<img width="1365" height="720" alt="image" src="https://github.com/user-attachments/assets/5c602521-f76c-4a4f-875d-371a32b4be66" />
<img width="1365" height="716" alt="image" src="https://github.com/user-attachments/assets/0246f6db-2051-4f5a-8743-588de3dc11b9" />


🚀 Posibles mejoras
Implementar autenticación con JWT.
Filtrado y búsqueda avanzada en el panel admin.
Integración con IA para sugerir respuestas.
Sistema de roles más granular.
sistema de creación de usuarios en el login.

📅 Entrega
Fecha límite: Lunes 11 de agosto de 2025.

👨‍💻 Autor
Brayan Velandia
