import { useId, useState } from "react";
import logincustom from "../logincustom.module.css";

import { UserRegister } from "../../Hooks/UserRegister"; // Importamos la función de API

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const loginUsernameId = useId();
  const loginPasswordId = useId();
  const loginEmailId = useId();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Resetea el estado de error
    setSuccess(null); // Resetea el estado de éxito

    try {
      // Llamamos a la API de registro
      const data = await UserRegister({ username, password, email });

      // Si el registro es exitoso, actualizamos el estado de autenticación
      setSuccess("Registro exitoso");
      console.log("Datos recibidos:", data);
    } catch (error) {
      setError(error.message || "Error al registrarse");
    }
  };

  return (
    <div className={logincustom.LoginContainer}>
      <form onSubmit={handleSubmit}>
        <h2>¡Regístrate Ahora!</h2>

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

        <label htmlFor={loginEmailId}>Email</label>
        <input
          type="email"
          id={loginEmailId}
          value={email}
          onChange={handleEmailChange}
          placeholder="Ingresa tu correo"
        />

        <button type="submit">Registrarse</button>

        {error && <p className={logincustom.Error}>{error}</p>}
        {success && <p className={logincustom.Success}>{success}</p>}
      </form>
    </div>
  );
};
