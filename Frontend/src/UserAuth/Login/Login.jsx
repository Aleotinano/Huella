import { useContext, useId, useState } from "react";
import logincustom from "../logincustom.module.css";
import { AuthContext } from "../../context/AuthContext";
import { UserLogin } from "../../Hooks/UserLogin";
import AuthImg from "../../assets/AuthImg.jpg";
import { Link } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { SubmitButton } from "../../Componentes/SubmitButton";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { authenticated, login } = useContext(AuthContext);
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
    setError(null);
    setIsSubmitting(true);

    try {
      const data = await UserLogin({ username, password });
      login();
      console.log("Datos recibidos:", data);
    } catch (error) {
      setError(error.message || "Error al iniciar sesión");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={logincustom.LoginContainer}>
      <div className={logincustom.totalcontainer}>
        <img src={AuthImg} alt="Imagen de autenticación" />
        {authenticated ? (
          <div className={logincustom.WelcomeText}>
            <h1>¡Bienvenido!</h1>
            <h3>{username}</h3>
            <p>Estamos encantados de verte aquí.</p>
            <p>¿Listo para explorar nuestros productos?</p>

            <div className={logincustom.Actions}>
              <Link to="/Home">
                <SubmitButton>Comprar Ahora</SubmitButton>
              </Link>
              <Link to="/UserPanel" className={logincustom.ProfileLink}>
                Ir a mi perfil
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={logincustom.FormContainer}>
            <div>
              <h1>Iniciar sesión</h1>
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
                <div className={logincustom.PasswordField}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id={loginPasswordId}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Ingresa tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                    className={logincustom.TogglePassword}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="icon color" />
                    ) : (
                      <FaEye className="icon color" />
                    )}
                  </button>
                </div>
              </fieldset>
            </div>
            <div>
              {error && <strong className={logincustom.Error}>{error}</strong>}
            </div>

            <div className={logincustom.ButtonContainer}>
              <SubmitButton disabled={isSubmitting}>
                {isSubmitting ? "Cargando..." : "Iniciar sesión"}
              </SubmitButton>
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
