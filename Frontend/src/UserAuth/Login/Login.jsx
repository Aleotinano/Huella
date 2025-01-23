import { useContext, useId, useState } from "react";
import logincustom from "../logincustom.module.css";
import { AuthContext } from "../../context/AuthContext";
import { UserLogin } from "../../Hooks/UserLogin";
import AuthImg from "../../assets/loginImg.jpeg";
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
    <div className={logincustom.Contenedor}>
      <div className={logincustom.totalcontainer}>
        {/* Right Section */}
        <div className={logincustom.ImageSection}>
          <img src={AuthImg} alt="Imagen de autenticación" />
        </div>
        {/* Left Section */}
        <div className={logincustom.FormSection}>
          <h1 className={logincustom.FormTitle}>Inicia sesión</h1>
          {authenticated ? (
            <div className={logincustom.WelcomeText}>
              <h1>¡Bienvenido!</h1>
              <h3>{username}</h3>
              <p>Estamos encantados de verte aquí.</p>
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
              <fieldset>
                <input
                  placeholder=" "
                  type="text"
                  id={loginUsernameId}
                  value={username}
                  onChange={handleUsernameChange}
                />
                <label htmlFor={loginUsernameId}>Nombre de usuario</label>
              </fieldset>
              <fieldset>
                <div className={logincustom.PasswordField}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id={loginPasswordId}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder=" "
                  />
                  <label htmlFor={loginPasswordId}>Contraseña</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                    className={logincustom.TogglePassword}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </fieldset>
              {error && <p className={logincustom.Error}>{error}</p>}

              <SubmitButton disabled={isSubmitting}>
                {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
              </SubmitButton>
              <p className={logincustom.RegisterText}>
                {"¿No tienes cuenta? "}
                <Link to="/Register" className={logincustom.RegisterLink}>
                  Regístrate aquí
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
