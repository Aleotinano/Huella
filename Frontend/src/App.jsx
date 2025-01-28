import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./AppRoutes/AppRoutes";
import { CartProvider } from "./Componentes/Cart";
import { Navegador } from "./Pages/Navegador/Navegador";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <Navegador />
          <AppRoutes />
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
