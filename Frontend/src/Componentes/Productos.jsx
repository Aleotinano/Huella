import { useContext, useMemo } from "react";
import { ProductsItem } from "./ProductosItem";
import productscustom from "./productscustom.module.css";
import { CartContext } from "./Cart";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export const Products = ({ products, Incartcustom }) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  // Obtener categorías únicas con useMemo para evitar recalcular en cada render
  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products]
  );

  // Función para renderizar productos de una categoría
  const renderProducts = (category) => {
    const filteredProducts = products.filter(
      (product) => product.category === category
    );

    return (
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10} // Espacio reducido entre diapositivas
        slidesPerView={5} // Valor predeterminado
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 }, // Tres tarjetas para pantallas muy pequeñas
          320: { slidesPerView: 1.4, spaceBetween: 10 }, // Tres tarjetas para pantallas pequeñas

          425: { slidesPerView: 2, spaceBetween: 10 }, // Tres tarjetas para pantallas pequeñas

          600: { slidesPerView: 2.2, spaceBetween: 15 }, // Tres tarjetas para pantallas pequeñas
          720: { slidesPerView: 2.5, spaceBetween: 15 }, // Tres tarjetas para tablets
          1024: { slidesPerView: 3.5, spaceBetween: 20 }, // Cuatro tarjetas para laptops
          1440: { slidesPerView: 4.5, spaceBetween: 25 }, // Cinco tarjetas para pantallas grandes
          1720: { slidesPerView: 6, spaceBetween: 30 }, // Seis tarjetas para pantallas muy grandes
        }}
        className={productscustom.SwiperContainer}
      >
        {filteredProducts.map((product) => {
          const productInCart = cart.find((item) => item.id === product.id);
          return (
            <SwiperSlide key={product.id}>
              <ProductsItem
                product={product}
                productInCart={productInCart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                Incartcustom={Incartcustom}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  };

  return (
    <div className={productscustom.TotalContainer} id="Productos">
      {categories.map((category) => (
        <div key={category} className={productscustom.CategorySection}>
          <div>
            <h2 className={productscustom.CategoryTitle}>{category}</h2>
          </div>

          {renderProducts(category)}
        </div>
      ))}
    </div>
  );
};
