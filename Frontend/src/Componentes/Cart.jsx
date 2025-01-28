import { createContext, useReducer } from "react";
import { cartReducer, cartInitialState } from "../context/cartReducer";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (product) =>
    dispatch({
      type: "AGREGAR_AL_CARRO",
      payload: product,
    });

  const removeFromCart = (product) =>
    dispatch({
      type: "QUITAR_DEL_CARRO",
      payload: product,
    });

  const updateCartItemSize = (id, size) => {
    dispatch({
      type: "ACTUALIZAR_TALLA",
      payload: { id, size },
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        updateCartItemSize,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
