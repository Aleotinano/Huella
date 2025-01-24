import React from "react";
import { Products } from "../../Componentes/Productos";
import { products as initialProducts } from "../../../products.json";
import { Header } from "../../Componentes/Header";
import { DescriptionItems } from "../../Componentes/DescriptionItems";

export const Home = (Incartcustom) => {
  return (
    <>
      <Header products={initialProducts} />
      <DescriptionItems />
      <Products products={initialProducts} Incartcustom={Incartcustom} />
    </>
  );
};
