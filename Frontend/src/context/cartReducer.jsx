export const cartInitialState = [];

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;

  switch (actionType) {
    case "AGREGAR_AL_CARRO": {
      const { id } = actionPayload;
      const productInCartIndex = state.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        const newCart = [...state];
        newCart[productInCartIndex].quantity += 1;

        return newCart;
      }

      return [
        ...state,
        {
          ...actionPayload,
          quantity: 1,
        },
      ];
    }

    case "QUITAR_DEL_CARRO": {
      const { id } = actionPayload;
      const productInCartIndex = state.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        const newCart = [...state];
        const product = { ...newCart[productInCartIndex] }; // Crear copia

        if (product.quantity > 1) {
          product.quantity -= 1;
          newCart[productInCartIndex] = product; // Actualizar el producto
          return newCart;
        }

        return newCart.filter((_, index) => index !== productInCartIndex);
      }

      return state;
    }

    default:
      return state;
  }
};
