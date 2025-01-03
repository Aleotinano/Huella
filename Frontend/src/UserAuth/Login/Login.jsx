import { useContext, useId, useState } from "react";
import logincustom from "../logincustom.module.css";
import { AuthContext } from "../../context/AuthContext";
import { UserLogin } from "../../Hooks/UserLogin"; // Importamos la función de API
import { BuyButton } from "../../Componentes/BuyButton";
import AuthImg from "../../assets/AuthImg.jpg";
import { Link } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { authenticated, login, user } = useContext(AuthContext); // Contexto de autenticación
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
      <div className={logincustom.totalcontainer}>
        <img src={AuthImg} alt="Imagen de autenticación" />

        {/* Contenido dinámico basado en la autenticación */}
        {authenticated ? (
          <div className={logincustom.WelcomeText}>
            <h1>¡Bienvenido!</h1>
            <h3>{username}</h3>
            <p>Estamos encantados de verte aquí.</p>
            <p>¿Listo para explorar nuestros productos?</p>

            <div className={logincustom.Actions}>
              <BuyButton Href="/" />
              <Link to="/UserPanel" className={logincustom.ProfileLink}>
                Ir a mi perfil
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>Iniciar sesión</h2>
            <fieldset>
              <label htmlFor={loginUsernameId}>Nombre de usuario</label>
              <input
                type="text"
                id={loginUsernameId}
                value={username}
                onChange={handleUsernameChange}
                placeholder="Ingresa tu nombre de usuario"
              />
            </fieldset>
            <fieldset>
              <label htmlFor={loginPasswordId}>Contraseña</label>
              <input
                type="password"
                id={loginPasswordId}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Ingresa tu contraseña"
              />
            </fieldset>

            {error && <strong className={logincustom.Error}>{error}</strong>}
            {success && (
              <strong className={logincustom.Success}>{success}</strong>
            )}
            <div className={logincustom.ButtonContainer}>
              <button type="submit">Iniciar sesión</button>
              <p>
                {"Si no tienes cuenta "}
                <Link to="/Register">registrate</Link>
                {" haciendo click "}
                <Link to="/Register">aqui</Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
