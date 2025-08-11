import { useEffect, useState } from "react";
import Login from "./Login.jsx";
import "./App.css";

/**
 * Contenedor de página con padding y ancho máximo.
 */
const Page = ({ children }) => (
  <div style={{ minHeight: "100vh", padding: 24 }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>{children}</div>
  </div>
);

/**
 * Componente raíz de la aplicación.
 * - Gestiona el usuario autenticado (localStorage para persistencia simple).
 * - Renderiza Login si no hay sesión, o panel de User/Admin según `rol`.
 */
export default function App() {
  const [usuario, setUsuario] = useState(null);

  // Carga usuario persistido al montar
  useEffect(() => {
    const saved = localStorage.getItem("usuario");
    if (saved) setUsuario(JSON.parse(saved));
  }, []);

  // Persiste/limpia usuario ante cambios
  useEffect(() => {
    if (usuario) localStorage.setItem("usuario", JSON.stringify(usuario));
    else localStorage.removeItem("usuario");
  }, [usuario]);

  const handleLogout = () => setUsuario(null);

  // Si no hay usuario, mostrar Login y pasar onLogin
  if (!usuario) return <Login onLogin={setUsuario} />;

  // Con usuario, mostrar panel según rol
  return (
    <Page>
      <header>
        <div className="header-container">
          <h1>Bienvenido {usuario.nombre}</h1>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
      </header>

      {usuario.rol === "admin" ? (
        <AdminPanel usuario={usuario} />
      ) : (
        <UserPanel usuario={usuario} />
      )}
    </Page>
  );
}

/**
 * Panel del usuario final: permite crear solicitudes y listar sólo las propias.
 */
function UserPanel({ usuario }) {
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  // Carga solicitudes del usuario autenticado
  const loadMine = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/solicitudes");
      const data = await res.json();
      setSolicitudes(Array.isArray(data) ? data.filter(s => s.email === usuario.email) : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadMine(); }, []);

  // Enviar nueva solicitud
  const enviar = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await fetch("http://localhost:4000/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: usuario.nombre,
          email: usuario.email,
          asunto,
          descripcion,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(data.error || "No se pudo crear la solicitud");
        return;
      }
      setAsunto("");
      setDescripcion("");
      setMsg("✅ Solicitud creada");
      loadMine();
    } catch (e) {
      setMsg("❌ Error de conexión");
    }
  };

  return (
    <>
      <div className="create-request-container">
        <h2 className="form-title">Crear solicitud</h2>
        <form onSubmit={enviar} className="request-form">
          <input value={usuario.nombre} disabled />
          <input value={usuario.email} disabled />
          <input
            placeholder="Asunto"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            required
          />
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            required
          />
          <button type="submit">Enviar</button>
          {msg && <small>{msg}</small>}
        </form>
      </div>

      <hr style={{ margin: "24px 0" }} />

      <h3>Mis solicitudes</h3>
      {loading ? (
        <p>Cargando…</p>
      ) : solicitudes.length === 0 ? (
        <p>No tienes solicitudes aún.</p>
      ) : (
        <Table solicitudes={solicitudes} />
      )}
    </>
  );
}

/**
 * Panel de administración: lista todas las solicitudes y permite marcarlas como resueltas.
 */
function AdminPanel() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nota, setNota] = useState({});

  const loadAll = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/solicitudes");
      const data = await res.json();
      setSolicitudes(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  // Marca una solicitud como resuelta con nota opcional
  const resolver = async (sol) => {
    try {
      const res = await fetch(`http://localhost:4000/solicitudes/${sol.id}/estado`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estado: "resuelto",
          respuesta_admin: nota[sol.id] || "Caso cerrado por soporte",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "No se pudo actualizar");
        return;
      }
      await loadAll();
    } catch (e) {
      alert("Error de conexión");
    }
  };

  return (
    <>
      <h2 style={{ display: "flex", justifyContent: "center" }}>
        Solicitudes creadas hasta el momento
      </h2>

      {loading ? (
        <p>Cargando…</p>
      ) : solicitudes.length === 0 ? (
        <p>No hay solicitudes.</p>
      ) : (
        <div className="table-container">
          <div className="table-viewport">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Asunto</th>
                  <th>Descripción</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Respuesta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.nombre}</td>
                    <td>{s.email}</td>
                    <td>{s.asunto}</td>
                    <td>{s.descripcion}</td>
                    <td>{new Date(s.fecha).toLocaleString()}</td>
                    <td>{s.estado}</td>
                    <td>{s.respuesta_sugerida}</td>
                    <td>
                      <div style={{ display: "grid", gap: 6 }}>
                        <input
                          placeholder="Respuesta/nota"
                          value={nota[s.id] || ""}
                          onChange={(e) => setNota({ ...nota, [s.id]: e.target.value })}
                        />
                        <button
                          disabled={s.estado === "resuelto"}
                          onClick={() => resolver(s)}
                        >
                          Marcar resuelto
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Tabla sencilla usada tanto en usuario como admin.
 */
function Table({ solicitudes }) {
  return (
    <table border="1" cellPadding="6" style={{ width: "100%", fontSize: 14 }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Asunto</th>
          <th>Descripción</th>
          <th>Fecha</th>
          <th>Estado</th>
          <th>Respuesta</th>
        </tr>
      </thead>
      <tbody>
        {solicitudes.map((s) => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.nombre}</td>
            <td>{s.email}</td>
            <td>{s.asunto}</td>
            <td>{s.descripcion}</td>
            <td>{new Date(s.fecha).toLocaleString()}</td>
            <td>{s.estado}</td>
            <td>{s.respuesta_sugerida}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}