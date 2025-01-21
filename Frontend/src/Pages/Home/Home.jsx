import React from "react";
import { Products } from "../../Componentes/Productos";
import { Usefilters } from "../../Hooks/Usefilters";
import { products as initialProducts } from "../../../products.json";
import { Header } from "../../Componentes/Header";
import { DescriptionItems } from "../../Componentes/DescriptionItems";

export const Home = (Incartcustom) => {
  const { filterProducts } = Usefilters();
  const filtredProducts = filterProducts(initialProducts); // Filtrado de productos

  return (
    <>
      <Header products={initialProducts} />
      <DescriptionItems />
      <Products products={filtredProducts} Incartcustom={Incartcustom} />
    </>
  );
};
