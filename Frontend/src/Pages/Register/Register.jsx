import { useId, useState } from "react";
import { UserRegister } from "../../Hooks/UserRegister"; // Importa la función de la API
import { UserForm } from "../../Componentes/UserForm";

export const Register = () => {
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
      const data = await UserRegister({ username, password });
      setSuccess("Inicio de sesión exitoso");
      console.log("Datos recibidos:", data);
    } catch (error) {
      setError(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <UserForm
      action={UserForm}
      title={"Registrarse"}
      buttonText={"Registrarse"}
    />
  );
};
