import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import { FaShoppingCart, FaUser, FaHome } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { MdMenu, MdOutlinePermContactCalendar } from "react-icons/md";
import { CartContext } from "../../Componentes/Cart";
import { ProductsItem as ProductsInCart } from "../../Componentes/ProductosItem";
import navcustom from "./navcustom.module.css";
import { GiRunningShoe } from "react-icons/gi";
import { TbCategory } from "react-icons/tb";
import { BuyButton } from "../../Componentes/BuyButton";
import { AuthContext } from "../../context/AuthContext";

export const Navegador = () => {
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [isCartVisible, setCartVisible] = useState(false);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { authenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const toggleNavbar = () => setNavbarVisible(!isNavbarVisible);
  const toggleCart = () => setCartVisible(!isCartVisible);

  // Función para manejar la navegación y desplazarse a una sección específica
  const navigateAndScroll = (id) => {
    navigate("/");
    setTimeout(() => {
      const targetElement = document.getElementById(id);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100); // Agrega un retraso para asegurar que la página cargue antes de hacer scroll
  };

  return (
    <nav className={navcustom.Navegador}>
      <MdMenu
        className={`${navcustom.icon} ${navcustom.closemenu}`}
        onClick={toggleNavbar}
      />

      <div
        className={`${navcustom.Links} ${
          isNavbarVisible ? navcustom.Navbarshow : navcustom.hideOffcanvas
        }`}
      >
        <IoCloseOutline
          className={`${navcustom.icon} ${navcustom.closemenu}`}
          onClick={toggleNavbar}
        />
        <Link
          to="/"
          className={navcustom.StrongLinks}
          title="Inicio"
          onClick={() => navigateAndScroll("Inicio")}
        >
          <FaHome className={navcustom.icon} />
          <strong className={navcustom.animatedlink}>Inicio</strong>
        </Link>
        <Link
          to="/"
          onClick={() => navigateAndScroll("Filtros")} // Navegar a Filtros
          className={navcustom.StrongLinks}
          title="Categorias"
        >
          <TbCategory className={navcustom.icon} />
          <strong className={navcustom.animatedlink}>Categorias</strong>
        </Link>
        <Link
          to="/"
          onClick={() => navigateAndScroll("Filtros")}
          className={navcustom.StrongLinks}
          title="Productos"
        >
          <GiRunningShoe className={navcustom.icon} />
          <strong className={navcustom.animatedlink}>Productos</strong>
        </Link>
        <Link
          to="/Contactos"
          className={navcustom.StrongLinks}
          title="Contactos"
        >
          <MdOutlinePermContactCalendar className={navcustom.icon} />
          <strong className={navcustom.animatedlink}>Contactos</strong>
        </Link>
      </div>
      {authenticated ? (
        <div className={navcustom.Links}>
          <FaShoppingCart
            onClick={toggleCart}
            className={`${navcustom.StrongLinks} ${navcustom.icon}`}
          />

          <Link to="/UserPanel" className={navcustom.StrongLinks}>
            <FaUser className={navcustom.icon} />
          </Link>
        </div>
      ) : (
        <div className={navcustom.Links}>
          <FaShoppingCart
            onClick={toggleCart}
            className={`${navcustom.StrongLinks} ${navcustom.icon}`}
          />
          <Link to="/Login" className={navcustom.StrongLinks}>
            <FaUser className={navcustom.icon} />
          </Link>
          <Link to="/Register" className={navcustom.StrongLinks}>
            <strong>Register</strong>
          </Link>
        </div>
      )}

      <div
        className={`${navcustom.offcanvas} ${
          isCartVisible ? navcustom.showOffcanvas : navcustom.hideOffcanvas
        }`}
      >
        <div className={navcustom.CanvasHeader}>
          <h3>Carro de compras</h3>
          <i>
            <IoCloseOutline
              className={`${navcustom.StrongLinks} ${navcustom.ClossedCart}`}
              onClick={toggleCart}
            />
          </i>
        </div>
        <div className={navcustom.cartContainer}>
          {cart.length > 0 ? (
            cart.map((product) => (
              <ProductsInCart
                productInCart={product}
                key={product.id}
                product={product}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                IncartCustom={navcustom.IncartCustom}
              />
            ))
          ) : (
            <strong>No hay productos en el carrito.</strong>
          )}
        </div>
        <div className={navcustom.BuyButtonContainer}>
          <BuyButton Href={"/Home#Filtros"} />
        </div>
      </div>
    </nav>
  );
};
