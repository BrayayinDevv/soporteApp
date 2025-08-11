import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./Login.css";

/**
 * Punto de entrada de la app React.
 * Renderiza <App/> dentro del #root con modo estricto.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);