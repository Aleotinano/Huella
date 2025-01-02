import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const Auth = useContext(AuthContext);

  if (Auth === undefined) {
    throw new Error("Error al consumir el contexto de autenticación");
  }

  return Auth;
};
