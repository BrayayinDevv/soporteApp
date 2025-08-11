import { useState } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import "./Login.css";

/**
 * Componente de Login con reCAPTCHA.
 * - Valida que el captcha esté resuelto antes de enviar.
 * - Envía credenciales a /usuarios/login y llama a onLogin(usuario).
 */
export default function Login({ onLogin }) {
  const [captchaValido, setCaptchaValido] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleCaptchaChange = (value) => {
    // value es el token de Google; si existe, el captcha se resolvió
    setCaptchaValido(!!value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValido) {
      setError("Por favor completa el captcha.");
      return;
    }

    setError("");
    try {
      const res = await fetch("http://localhost:4000/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || `Error ${res.status}`);
        return;
      }

      if (typeof onLogin !== "function") {
        setError("Error interno: onLogin no está definido");
        return;
      }

      onLogin(data.usuario);
    } catch (err) {
      console.error("fetch error:", err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-container">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="login-box"
      >
        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
          <motion.input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            whileFocus={{ scale: 1.02 }}
          />

          <motion.input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            whileFocus={{ scale: 1.02 }}
          />

          {/* Captcha */}
          <div style={{ display: "flex", justifyContent: "center", margin: "12px 0" }}>
            <ReCAPTCHA
              sitekey="6LdeEqMrAAAAABl6HPgd3a76vuM1RjouEvtQ8dws"
              onChange={handleCaptchaChange}
            />
          </div>

          <motion.button
            type="submit"
            disabled={!captchaValido}
            whileHover={{ scale: captchaValido ? 1.05 : 1 }}
            whileTap={{ scale: captchaValido ? 0.95 : 1 }}
            style={{ opacity: captchaValido ? 1 : 0.6, cursor: captchaValido ? "pointer" : "not-allowed" }}
          >
            Entrar
          </motion.button>
        </form>

        {error && <p className="error-text">{error}</p>}
      </motion.div>
    </div>
  );
}