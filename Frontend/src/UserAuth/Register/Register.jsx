import { useContext, useId, useState } from "react";
import logincustom from "../logincustom.module.css";

import { AuthContext } from "../../context/AuthContext";
import { UserRegister } from "../../Hooks/UserRegister"; // Importamos la función de API

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { authenticated, login } = useContext(AuthContext); // Contexto de autenticación
  const loginUsernameId = useId();
  const loginPasswordId = useId();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Resetea el estado de error
    setSuccess(null); // Resetea el estado de éxito

    try {
      // Llamamos a la API de login
      const data = await UserRegister({ username, password });

      // Si el login es exitoso, actualizamos el estado de autenticación
      login();
      setSuccess("Inicio de sesión exitoso");
      console.log("Datos recibidos:", data);
    } catch (error) {
      setError(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className={logincustom.LoginContainer}>
      <form onSubmit={handleSubmit}>
        <h2>Registrate Ahora!</h2>

        <label htmlFor={loginUsernameId}>Nombre de usuario</label>
        <input
          type="text"
          id={loginUsernameId}
          value={username}
          onChange={handleUsernameChange}
          placeholder="Ingresa tu nombre de usuario"
        />

        <label htmlFor={loginPasswordId}>Contraseña</label>
        <input
          type="password"
          id={loginPasswordId}
          value={password}
          onChange={handlePasswordChange}
          placeholder="Ingresa tu contraseña"
        />

        <button type="submit">Iniciar sesión</button>

        {error && <p className={logincustom.Error}>{error}</p>}
        {success && <p className={logincustom.Success}>{success}</p>}
      </form>

      {authenticated && <p>Bienvenido, ya has iniciado sesión.</p>}
    </div>
  );
};
