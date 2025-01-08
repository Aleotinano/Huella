import { useContext, useState } from "react";
import { ProductsItem } from "./ProductosItem";
import productscustom from "./productscustom.module.css";
import { CartContext } from "./Cart";
import { Filters } from "./Filters";
import { CiCirclePlus } from "react-icons/ci";

export const Products = ({ products }) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [visibleCount, setVisibleCount] = useState(2);

  const handleShowProducts = () => {
    setVisibleCount((prevstate) => prevstate + 2);
  };

  return (
    <div className={productscustom.TotalContainer} id="Productos">
      <Filters />

      <div className={productscustom.productGrid}>
        {products.slice(0, visibleCount).map((product) => {
          const productInCart = cart.find((item) => item.id === product.id);
          return (
            <ProductsItem
              key={product.id}
              product={product}
              productInCart={productInCart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          );
        })}

        {visibleCount < products.length && (
          <div className={productscustom.LoadMoreContainer}>
            <button
              className={productscustom.LoadMoreButton}
              onClick={handleShowProducts}
            >
              <CiCirclePlus className="color" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
