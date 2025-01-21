import { BsBagDash, BsBagPlus } from "react-icons/bs";
import { CartButton } from "./CartButton";
import productscustom from "./productscustom.module.css";

export const ProductsItem = ({
  product,
  productInCart,
  addToCart,
  removeFromCart,
  Incartcustom,
}) => {
  /*
  const sizes = Array.isArray(product.size) ? product.size : [];

          // Tallas 

          <div className={productscustom.producsize}>
          {sizes.length > 0 ? (
            sizes.map((size, index) => <strong key={index}>{size}</strong>)
          ) : (
            <strong>No hay productos disponibles</strong>
          )}
        </div> */

  return (
    <article className={`${Incartcustom} ${productscustom.CardContainer}`}>
      <section>
        <img src={product.img} alt={product.name} />
      </section>

      <section>
        {/* Títulos */}
        <div className={productscustom.TitlesCard}>
          <h4>{product.name}</h4>
          <h5>{product.description}</h5>
        </div>

        {/* Controles del carrito */}
        <div className={productscustom.CartContainer}>
          {productInCart ? (
            <div className={productscustom.SpanCountProducts}>
              <CartButton onClick={() => removeFromCart(product)}>
                <BsBagDash />
              </CartButton>
              <span>{productInCart.quantity}</span>
              <CartButton onClick={() => addToCart(product)}>
                <BsBagPlus />
              </CartButton>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className={productscustom.AddToCartProduct}
            >
              Comprar
            </button>
          )}

          <strong className={productscustom.ArticlePrice}>
            $ {product.price}
          </strong>
        </div>
      </section>
    </article>
  );
};
