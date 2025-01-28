export const cartInitialState = JSON.parse(localStorage.getItem("cart")) || [];

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;

  let newState;

  switch (actionType) {
    case "AGREGAR_AL_CARRO": {
      const { id, size } = actionPayload;
      const productInCartIndex = state.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        newState = [...state];
        newState[productInCartIndex].quantity += 1;
      } else {
        newState = [
          ...state,
          {
            ...actionPayload,
            quantity: 1,
            selectedSize: size || actionPayload.size[0],
          },
        ];
      }
      break;
    }

    case "QUITAR_DEL_CARRO": {
      const { id } = actionPayload;
      const productInCartIndex = state.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        newState = [...state];
        const product = { ...newState[productInCartIndex] };

        if (product.quantity > 1) {
          product.quantity -= 1;
          newState[productInCartIndex] = product;
        } else {
          newState = newState.filter(
            (_, index) => index !== productInCartIndex
          );
        }
      } else {
        newState = state;
      }
      break;
    }

    case "ACTUALIZAR_TALLA": {
      const { id, size } = actionPayload;

      const productInCart = state.find((item) => item.id === id);
      if (!productInCart) {
        newState = state;
        break;
      }

      if (productInCart.selectedSize === size) {
        newState = state;
        break;
      }

      newState = state.map((item) =>
        item.id === id ? { ...item, selectedSize: size } : item
      );
      break;
    }

    default:
      newState = state;
  }

  localStorage.setItem("cart", JSON.stringify(newState));

  return newState;
};
