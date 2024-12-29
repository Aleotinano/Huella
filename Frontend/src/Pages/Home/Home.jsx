import React from "react";
import { Filters } from "../../Componentes/Filters";
import { Products } from "../../Componentes/Productos";
import { Usefilters } from "../../Hooks/Usefilters";
import { products as initialProducts } from "../../../products.json";
import { Header } from "../../Componentes/Header";

export const Home = () => {
  const { filterProducts } = Usefilters();
  const filtredProducts = filterProducts(initialProducts); // Filtrado de productos

  return (
    <>
      <Header products={initialProducts} />
      <Filters />
      <Products products={filtredProducts} />
    </>
  );
};
