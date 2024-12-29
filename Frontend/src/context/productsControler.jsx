import React from "react";

export const ProductsControler = ({ stockquatity }) => {
  return (
    <div>
      <li>
        <label htmlFor={stockControlerid}></label>

        <input type="text" value={stockquatity} />
      </li>
    </div>
  );
};
