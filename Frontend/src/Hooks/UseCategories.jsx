import { useMemo } from "react";
import { products } from "../../products.json";

export const useCategories = () => {
  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products]
  );

  return categories;
};
