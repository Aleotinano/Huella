import React from "react";
import headercustom from "./headercustom.module.css";

export const Header = () => {
  return (
    <div className={headercustom.HeaderContainer} id="Inicio">
      <div className={headercustom.firstContainer}>
        <h1 tabIndex="0">Huella</h1>
        <p className={headercustom.description}>
          Explora todos nuestros productos de la más alta calidad
        </p>
        <a
          href="#Productos"
          className={`${headercustom.linkButton} ${headercustom.linkButtonHeader}`}
          aria-label="Ver productos"
        >
          Ver productos
        </a>
      </div>

      <div className={headercustom.secondContainer}>
        <div
          className={headercustom.secondContainerSecondImg}
          aria-label="Explorar remeras"
        >
          <a
            href="#remeras"
            aria-label="Ver remeras"
            className={headercustom.linkButton}
          >
            Remeras
          </a>
        </div>
        <div
          className={headercustom.secondContainerfirtsimg}
          aria-label="Explorar zapatillas"
        >
          <a
            href="#zapatillas"
            className={headercustom.linkButton}
            aria-label="Ver zapatillas"
          >
            Zapatillas
          </a>
        </div>
      </div>
    </div>
  );
};
