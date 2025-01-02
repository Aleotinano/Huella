import { useContext, useId, useState } from "react";
import logincustom from "../logincustom.module.css";
import { AuthContext } from "../../context/AuthContext";
import { UserLogin } from "../../Hooks/UserLogin"; // Importamos la función de API
import { BuyButton } from "../../Componentes/BuyButton";

export const Login = () => {
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
      const data = await UserLogin({ username, password });

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
      {authenticated ? (
        <div className={logincustom.WelcomeText}>
          <h1>Bienvenido a Vestea {username}!</h1>
          <BuyButton Href="/" />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Iniciar sesión</h2>

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
      )}
    </div>
  );
};
