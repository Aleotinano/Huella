import { useId, useState } from "react";
import styles from "../../UserAuth/logincustom.module.css";
import { SubmitButton } from "../../Componentes/SubmitButton";
import Contactsimg from "../../../public/ContactosImg.jpeg";

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

    setUsername("");
    setEmail("");
    setMessage("");

    alert("¡Tu correo fue enviado con exito, pronto tendras una respuesta ☺!");
  };

  return (
    <div className={`${styles.Contenedor} ${styles.contacts}`}>
      <div className={styles.totalcontainer}>
        <div className={styles.ImageSection}>
          <img src={Contactsimg} alt="Imagen de Contactos" />
        </div>

        <div className={styles.FormSection}>
          <h1 className={styles.FormTitle}>Contactos</h1>
          <p>
            Si tienes alguna pregunta o algún problema, contáctate con nosotros.
          </p>
          <form className={styles.FormContainer} onSubmit={handleSubmit}>
            <fieldset>
              <input
                type="text"
                id={usernameId}
                value={username}
                onChange={handleUsernameChange}
                placeholder=" "
                required
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
                required
              />
              <label htmlFor={emailId}>Correo electrónico</label>
            </fieldset>
            <fieldset>
              <textarea
                id={messageId}
                value={message}
                onChange={handleMessageChange}
                placeholder=" "
                required
              ></textarea>
              <label htmlFor={messageId}> Mensaje</label>
            </fieldset>
            <SubmitButton>Enviar</SubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
};
