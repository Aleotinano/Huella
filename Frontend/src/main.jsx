// import { StrictMode } from "react"; desactiavo por el uso de use contxt
import { createRoot } from "react-dom/client";
import "./index.css";
import "./variables.css";
import { FilterProvider } from "./context/filters.jsx";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <FilterProvider>
    <App />
  </FilterProvider>
);
