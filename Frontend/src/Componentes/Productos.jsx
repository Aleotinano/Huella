import { useContext } from "react";
import { ProductsItem } from "./ProductosItem";
import productscustom from "./productscustom.module.css";
import { CartContext } from "./Cart";

export const Products = ({ products, IncartCustom }) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  return (
    <div className={productscustom.productGrid} id="Products">
      {products.map((product) => {
        const productInCart = cart.find((item) => item.id === product.id);
        return (
          <ProductsItem
            key={product.id}
            product={product}
            productInCart={productInCart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            IncartCustom={IncartCustom}
          />
        );
      })}
    </div>
  );
};
