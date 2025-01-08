import React from "react";
import buybuttoncustom from "./buybuttoncustom.module.css";
import { FaShoppingCart } from "react-icons/fa";

export const BuyButton = ({ Href, disabled, type, className }) => {
  return (
    <a className={`${buybuttoncustom.buyButton} ${className}`} href={Href}>
      <button disabled={disabled} type={type}>
        <p>Comprar ahora</p>
        <FaShoppingCart className={buybuttoncustom.animatedicon} />
      </button>
    </a>
  );
};
