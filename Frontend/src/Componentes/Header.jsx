import React from "react";
import headercustom from "./headercustom.module.css";

export const Header = () => {
  return (
    <div className={headercustom.HeaderContainer} id="Inicio">
      <div className={"TransformY"}>
        <h1 className={headercustom.tittle1}>HUE</h1>
        <h1 className={headercustom.tittle2}>LLA</h1>
      </div>
      <div className={"TransformY"}>
        <h2 className={headercustom.tittle3}>Tienda de&nbsp; </h2>
        <h2 className={headercustom.tittle4}> zapatos</h2>
      </div>

      <a href="#Productos">
        <button className={`TransformY ${headercustom.HeaderButton}`}>
          Ver Productos
        </button>
      </a>
    </div>
  );
};
