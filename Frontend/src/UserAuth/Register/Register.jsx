import { useContext, useId, useState } from "react";
import logincustom from "../logincustom.module.css";
import { UserRegister } from "../../Hooks/UserRegister"; // Importamos la función de API
import AuthImg2 from "../../assets/AuthImg2.jpg";
import { AuthContext } from "../../context/AuthContext";
import { BuyButton } from "../../Componentes/BuyButton";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // Cambiado a booleano para simplificar
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
      // Llamamos a la API de registro
      const data = await UserRegister({ username, password, email });
      setSuccess(true); // Indica que el registro fue exitoso
      console.log("Datos recibidos:", data);
    } catch (error) {
      setError(error.message || "Error al registrarse");
    } finally {
      setIsSubmitting(false); // Rehabilita el botón
    }
  };

  return (
    <div className={`${logincustom.LoginContainer} ${logincustom.register}`}>
      <div className={logincustom.totalcontainer}>
        <img src={AuthImg2} alt="Imagen de autenticación" />

        {success ? (
          <div className={logincustom.WelcomeText}>
            <h1>¡Registro exitoso!</h1>
            <h3>{username}</h3>
            <p>Tu cuenta ha sido creada exitosamente.</p>
            <p>¿Listo para iniciar sesión?</p>
            <BuyButton Href="/Login" type="button">
              Inicia sesión
            </BuyButton>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={logincustom.InputsContainer}>
              <h1>Crea tu cuenta</h1>
              <fieldset>
                <label htmlFor={usernameId}>Nombre de usuario</label>
                <input
                  type="text"
                  id={usernameId}
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Ingresa tu nombre de usuario"
                />
              </fieldset>
              <fieldset>
                <label htmlFor={emailId}>Correo electrónico</label>
                <input
                  type="email"
                  id={emailId}
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Ingresa tu correo"
                />
              </fieldset>
              <fieldset>
                <label htmlFor={passwordId}>Contraseña</label>
                <input
                  type="password"
                  id={passwordId}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Ingresa tu contraseña"
                />
              </fieldset>
            </div>
            {error && <strong className={logincustom.Error}>{error}</strong>}
            {success && (
              <strong className={logincustom.Success}>{success}</strong>
            )}

            <div className={logincustom.ButtonContainer}>
              <BuyButton
                disabled={isSubmitting}
                type="submit"
                className={logincustom.ButtonAuth}
              >
                {isSubmitting ? "Cargando..." : "Registrarse"}
              </BuyButton>
              <p>
                ¿Ya tienes una cuenta? Inicia sesión{" "}
                <a href="/Login" className={logincustom.Link}>
                  aquí
                </a>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
