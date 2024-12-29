import { useId, useState } from "react";
import logincustom from "./logincustom.module.css";

export const UserForm = ({
  action, // Función para manejar el envío (login o register)
  title, // Título del formulario (e.g., "Login", "Register")
  buttonText, // Texto del botón
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Para manejar errores
  const [success, setSuccess] = useState(null); // Para mensajes de éxito

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
      const data = await action({ username, password }); // Llama a la función de acción (login/register)
      setSuccess(`${title} exitoso`);
      console.log("Datos recibidos:", data);
    } catch (error) {
      setError(error.message || `Error al realizar ${title.toLowerCase()}`);
    }
  };

  return (
    <div className={logincustom.LoginContainer}>
      <form onSubmit={handleSubmit}>
        <h2>{title}</h2>

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

        <button type="submit">{buttonText}</button>
      </form>

      {error && <p className={logincustom.Error}>{error}</p>}
      {success && <p className={logincustom.Success}>{success}</p>}
    </div>
  );
};
