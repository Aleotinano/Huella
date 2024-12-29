import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./AppRoutes/AppRoutes";
import { CartProvider } from "./Componentes/Cart";
import { Navegador } from "./Pages/Navegador/Navegador";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navegador />
        <AppRoutes />
      </Router>
    </CartProvider>
  );
}

export default App;
