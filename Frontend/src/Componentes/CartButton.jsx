import React from "react";
import cartbuttoncustom from "./cartbuttoncustom.module.css";

export const CartButton = ({ onClick, children, title }) => (
  <button
    className={cartbuttoncustom.Cartbutton}
    onClick={onClick}
    title={title}
  >
    {children}
  </button>
);
