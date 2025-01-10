import React from "react";
import headercustom from "./headercustom.module.css";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className={headercustom.HeaderContainer} id="Inicio">
      {/* Primer Contenedor: Título */}
      <div className={headercustom.firstContainer}>
        <h1>Welcome to Huella</h1>
        <p className={headercustom.description}>
          Huella es el lugar donde tus ideas toman forma. Explora, crea y
          conecta con nosotros. ¡Descubre todo lo que tenemos para ofrecerte!
        </p>
        <a href="#Productos" className={headercustom.linkButton}>
          Ver prouctos
        </a>
      </div>

      {/* Segundo Contenedor */}
      <div className={headercustom.secondContainer}>
        {/* Primera Imagen: Enlace 1 */}
        <div className={headercustom.secondContainerfirtsimg}>
          <a href="#Productos" className={headercustom.linkButton}>
            Zapatillas
          </a>
        </div>

        {/* Segunda Imagen: Enlace 2 */}
        <div className={headercustom.secondContainerSecondImg}>
          <a href="#Productos" className={headercustom.linkButton}>
            Remeras
          </a>
        </div>
      </div>
    </div>
  );
};
