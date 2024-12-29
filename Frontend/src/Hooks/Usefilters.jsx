import { useContext } from "react";
import { FiltersContext } from "../context/filters";

export function Usefilters() {
  const { filters, setFilters } = useContext(FiltersContext);

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.price >= filters.minPrice &&
        (filters.category === "all" || product.category === filters.category) &&
        (filters.size === "all" ||
          (Array.isArray(product.size)
            ? product.size.includes(filters.size)
            : product.size === filters.size))
      );
    });
  };
  return { filters, setFilters, filterProducts };
}
