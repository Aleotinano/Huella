import { useId, useState } from "react";
import logincustom from "../logincustom.module.css";
import { UserRegister } from "../../Hooks/UserRegister"; // Importamos la función de API
import AuthImg2 from "../../../public/RegisterImg.jpeg";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { SubmitButton } from "../../Componentes/SubmitButton";
import { Link } from "react-router-dom";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const usernameId = useId();
  const passwordId = useId();
  const emailId = useId();

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);

    try {
      const data = await UserRegister({ username, password, email });
      setSuccess(true);
      console.log("Datos recibidos:", data);
    } catch (error) {
      setError(error.message || "Error al registrarse");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${logincustom.Contenedor} ${logincustom.register}`}>
      <div className={logincustom.totalcontainer}>
        {/* Right Section */}

        <div className={logincustom.ImageSection}>
          <img
            src={AuthImg2}
            alt="Imagen de autenticación"
            className={logincustom.AuthImage}
          />
        </div>
        {/* Left Section */}
        <div className={logincustom.FormSection}>
          <h1 className={logincustom.FormTitle}>Crea tu cuenta</h1>

          {success ? (
            <div className={logincustom.WelcomeText}>
              <h1>¡Registro exitoso!</h1>
              <h3>{username}</h3>
              <p>Tu cuenta ha sido creada exitosamente.</p>
              <p>¿Listo para iniciar sesión?</p>
              <Link>
                <SubmitButton Href="/Login" type="button">
                  Inicia sesión
                </SubmitButton>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={logincustom.FormContainer}>
              <fieldset>
                <input
                  placeholder=" "
                  type="text"
                  id={usernameId}
                  value={username}
                  onChange={handleUsernameChange}
                />
                <label htmlFor={usernameId}>Nombre de usuario</label>
              </fieldset>
              <fieldset>
                <input
                  type="email"
                  id={emailId}
                  value={email}
                  onChange={handleEmailChange}
                  placeholder=" "
                />
                <label htmlFor={emailId}>Correo electrónico</label>
              </fieldset>
              <fieldset>
                <div className={logincustom.PasswordField}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id={passwordId}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder=" "
                  />
                  <label htmlFor={passwordId}>Contraseña</label>

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
              {error && <strong className={logincustom.Error}>{error}</strong>}

              <SubmitButton disabled={isSubmitting}>
                {isSubmitting ? "Cargando..." : "Registrarse"}
              </SubmitButton>
              <p className={logincustom.RegisterText}>
                {"¿Ya tienes una cuenta? "}
                <a href="/Login" className={logincustom.RegisterLink}>
                  Inicia sesión aquí
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
