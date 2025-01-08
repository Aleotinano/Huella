import { BsBagDash, BsBagPlus } from "react-icons/bs";
import { CartButton } from "./CartButton";
import productscustom from "./productscustom.module.css";

export const ProductsItem = ({
  product,
  productInCart,
  addToCart,
  removeFromCart,
}) => {
  const sizes = Array.isArray(product.size) ? product.size : [];

  return (
    <article className={productscustom.CardContainer} key={product.id}>
      <section>
        <img
          src={product.img}
          alt={product.name}
          className={productscustom.ImgSize}
        />
      </section>

      <section className={productscustom.CardBody}>
        <div className={productscustom.producsize}>
          {sizes.length > 0 ? (
            sizes.map((size, index) => (
              <strong key={`${product.id}-${index}`}>{size}</strong>
            ))
          ) : (
            <strong>No hay productos disponibles</strong>
          )}
        </div>

        {/* Títulos */}
        <div className={productscustom.TitlesCard}>
          <h4>{product.name}</h4>
          <h5>{product.description}</h5>
        </div>

        {/* Controles del carrito */}
        <div className={productscustom.CartContainer}>
          {productInCart ? (
            <div className={productscustom.SpanCountProducts}>
              <CartButton
                onClick={() => removeFromCart(product)}
                title="Quitar del carro"
              >
                <BsBagDash />
              </CartButton>
              <span>{productInCart.quantity}</span>
              <CartButton
                onClick={() => addToCart(product)}
                title="Agregar al carro"
              >
                <BsBagPlus />
              </CartButton>
            </div>
          ) : (
            <CartButton
              onClick={() => addToCart(product)}
              title="Agregar al carro"
            >
              <BsBagPlus />
            </CartButton>
          )}
          <strong className={productscustom.ArticlePrice}>
            $ {product.price}
          </strong>
        </div>
      </section>
    </article>
  );
};
