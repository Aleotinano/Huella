import { useContext, useState } from "react";
import { ProductsItem } from "./ProductosItem";
import productscustom from "./productscustom.module.css";
import { CartContext } from "./Cart";
import { CiCirclePlus } from "react-icons/ci";

export const Products = ({ products }) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [visibleCounts, setVisibleCounts] = useState({});

  // Obtener categorías únicas
  const categories = [...new Set(products.map((product) => product.category))];

  // Mostrar más productos de una categoría específica
  const handleShowMore = (category) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [category]: (prev[category] || 2) + 2,
    }));
  };

  return (
    <div className={productscustom.TotalContainer} id="Productos">
      {categories.map((category) => {
        const filteredProducts = products.filter(
          (product) => product.category === category
        );
        const visibleCount = visibleCounts[category] || 2;

        return (
          <div key={category} className={productscustom.CategorySection}>
            <h2 className={productscustom.CategoryTitle}>{category}</h2>

            {/* Productos de la categoría */}
            <div className={productscustom.productGrid}>
              {filteredProducts.slice(0, visibleCount).map((product) => {
                const productInCart = cart.find(
                  (item) => item.id === product.id
                );
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
            </div>

            {/* Botón para cargar más productos */}
            {visibleCount < filteredProducts.length && (
              <div className={productscustom.LoadMoreContainer}>
                <button
                  className={productscustom.LoadMoreButton}
                  onClick={() => handleShowMore(category)}
                >
                  <CiCirclePlus className="color" />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
