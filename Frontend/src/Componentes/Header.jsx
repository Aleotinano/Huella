import React from "react";

import headercustom from "./headercustom.module.css";
import { BuyButton } from "./BuyButton";

export const Header = () => {
  return (
    <div className={headercustom.HeaderContainer} id="Inicio">
      <h1 className={headercustom.TransformY}>VESTEA</h1>
      <h2 className={headercustom.TransformY}>Tienda de zapatos</h2>

      <BuyButton className={headercustom.TransformY} Href={"#Filtros"} />
    </div>
  );
};
