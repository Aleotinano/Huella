import { useContext } from "react";
import { CartContext } from "../Componentes/Cart";

export const useCart = () => {
  const cart = useContext(CartContext);

  if (cart === undefined) {
    throw new Error("Error al consumir el contexto de cart");
  }
  return cart;
};
