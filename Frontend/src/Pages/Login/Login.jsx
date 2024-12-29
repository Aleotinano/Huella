import React from "react";
import { UserLogin } from "../../Hooks/UserLogin"; // Importa la función de la API
import { UserForm } from "../../Componentes/UserForm";

export const Login = () => {
  return (
    <UserForm
      action={UserLogin}
      title={"Inicio de Secion"}
      buttonText={"Iniciar Secion"}
    />
  );
};
