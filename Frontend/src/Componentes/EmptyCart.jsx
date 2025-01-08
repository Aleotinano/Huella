import React from "react";
import productscustom from "./produsctoscustom.module.css";

export const EmptyCart = () => {
  return (
    <article className={productscustom.CardContainer} key={product.id}>
      {/* Imagen */}

      <section>
        <img
          src={product.img}
          alt={product.name}
          className={productscustom.ImgSize}
        />
      </section>

      {/* Talles */}

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

        {/* Descripcion */}

        <div className={productscustom.TitlesCard}>
          <h4>{product.name}</h4>
          <h5>{product.description}</h5>
        </div>

        {/* Precio */}

        <div className={productscustom.CartContainer}>
          <strong className={productscustom.ArticlePrice}>
            $ {product.price}
          </strong>
        </div>
      </section>
    </article>
  );
};
