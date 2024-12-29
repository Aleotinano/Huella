import React from "react";
import buybuttoncustom from "./buybuttoncustom.module.css";
import { FaShoppingCart } from "react-icons/fa";

export const BuyButton = ({ Href }) => {
  return (
    <a className={buybuttoncustom.buyButton} href={Href}>
      <strong className={buybuttoncustom.stronganimated}>Comprar ahora</strong>
      <FaShoppingCart className={buybuttoncustom.animatedicon} />
    </a>
  );
};
