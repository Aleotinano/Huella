import { useId, useState } from "react";
import styles from "../../UserAuth/logincustom.module.css";
import { SubmitButton } from "../../Componentes/SubmitButton";
import Contactsimg from "../../assets/Contactsimg.jpg";

export const Contacts = () => {
  // Estados para los campos del formulario
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // IDs únicos para los inputs
  const usernameId = useId();
  const emailId = useId();
  const messageId = useId();

  // Manejar cambios en los inputs
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página

    // Validar campos
    if (!username || !email || !message) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Procesar datos del formulario (aquí podrías enviar a una API)
    const formData = {
      username,
      email,
      message,
    };

    console.log("Datos enviados:", formData);

    // Limpiar el formulario
    setUsername("");
    setEmail("");
    setMessage("");

    alert("¡Tu correo fue enviado con exito, pronto tendras una respuesta ☺!");
  };

  return (
    <div className={`${styles.contacts} ${styles.LoginContainer}`}>
      <div className={styles.totalcontainer}>
        <img src={Contactsimg} alt="Contact Us" />

        <form className={styles.FormContainer} onSubmit={handleSubmit}>
          <div>
            <h1>Contact Us</h1>
            <p>
              Si tienes alguna pregunta o algún problema, contáctate con
              nosotros.
            </p>
          </div>
          <div>
            <fieldset>
              <label htmlFor={usernameId}>Nombre de usuario</label>
              <input
                type="text"
                id={usernameId}
                value={username}
                onChange={handleUsernameChange}
                placeholder="Ingresa tu nombre de usuario"
                required
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
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor={messageId}>Mensaje</label>
              <textarea
                id={messageId}
                value={message}
                onChange={handleMessageChange}
                placeholder="Escribe tu mensaje aquí"
                required
              ></textarea>
            </fieldset>
          </div>
          <div>
            <SubmitButton>Enviar</SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};
