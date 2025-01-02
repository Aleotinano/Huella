import { useId } from "react";
import filerscustom from "./filterscustom.module.css";
import { Usefilters } from "../Hooks/Usefilters";

export const Filters = () => {
  const { filters, setFilters } = Usefilters();
  const maxpricefilterid = useId();
  const categoryfilterid = useId();
  const sizefilterid = useId();

  const handleChangueMinPrince = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: event.target.value,
    }));
  };

  const handleChangueCategory = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  const handleChangueSize = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      size: event.target.value,
    }));
  };

  const sizevalibles = ["all", "30", "31", "32", "33"];

  return (
    <section className={filerscustom.NavFilters}>
      <header className={filerscustom.FilterHeader}>
        <h1>Explora Nuestros Productos</h1>
      </header>
      <fieldset className={filerscustom.filterContainer}>
        <legend>Personaliza tu búsqueda</legend>
        <ul>
          <fieldset>
            <strong>Categoría</strong>
            <select
              id={categoryfilterid}
              defaultValue="all"
              onChange={handleChangueCategory}
              aria-placeholder="Categorías"
            >
              <option value="all">Todas</option>
              <option value="remeras">Remeras</option>
              <option value="zapatillas">Zapatillas</option>
            </select>
          </fieldset>

          <fieldset>
            <strong>Talle</strong>
            <select
              id={sizefilterid}
              defaultValue="all"
              onChange={handleChangueSize}
            >
              {sizevalibles.map((size, index) => (
                <option value={size} key={index}>
                  {size}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <strong>Desde</strong>
            <div className={filerscustom.rangeContainer}>
              <input
                type="range"
                id={maxpricefilterid}
                min={1000}
                max={10000}
                step={500}
                value={filters.minPrice}
                onChange={handleChangueMinPrince}
              />
              <strong>${filters.minPrice}</strong>
            </div>
          </fieldset>
        </ul>
      </fieldset>
    </section>
  );
};
