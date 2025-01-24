import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import { FaShoppingCart, FaUser, FaHome } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { MdMenu, MdOutlinePermContactCalendar, MdLogout } from "react-icons/md";
import { PiTShirtFill } from "react-icons/pi";
import { CartContext } from "../../Componentes/Cart";
import { ProductsItem as ProductsInCart } from "../../Componentes/ProductosItem";
import navcustom from "./navcustom.module.css";
import { TbCategory } from "react-icons/tb";
import { SubmitButton } from "../../Componentes/SubmitButton";
import { AuthContext } from "../../context/AuthContext";
import { Modal } from "../../Componentes/Modal";
import { useCategories } from "../../Hooks/UseCategories";

export const Navegador = () => {
  const [NavScroll, setNavScroll] = useState(false);
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [isCartVisible, setCartVisible] = useState(false);
  const [ShowModal, setShowModal] = useState(false);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { authenticated, logout } = useContext(AuthContext);
  const categories = useCategories();

  const navigate = useNavigate();

  const toggleNavbar = () => setNavbarVisible(!isNavbarVisible);
  const toggleCart = () => setCartVisible(!isCartVisible);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleLogout = () => {
    logout();
    setShowModal(false);
    navigate("/");
  };

  const navigateAndScroll = (id) => {
    navigate("/");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 60);
  };

  useEffect(() => {
    const handleScroll = () => setNavScroll(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      to: "/",
      id: "Inicio",
      icon: <FaHome className="icon" />,
      label: "Inicio",
      title: "Inicio",
    },
    {
      to: "/Contactos",
      id: "Contactos",
      icon: <MdOutlinePermContactCalendar className="icon" />,
      label: "Contactos",
      title: "Contactos",
    },
    {
      to: "/#Productos",
      id: "Productos",
      icon: <PiTShirtFill className="icon" />,
      label: "Productos",
      title: "Productos",
    },
  ];

  return (
    <nav className={`${navcustom.Navegador} ${NavScroll ? "scrolled" : ""}`}>
      {/*menú movil*/}
      <MdMenu
        className={`icon ${navcustom.closemenu}`}
        onClick={toggleNavbar}
        title="Abrir Menu"
      />

      {/* Navegación */}
      <div
        className={`${navcustom.Links} ${
          isNavbarVisible ? navcustom.Navbarshow : navcustom.hideOffcanvas
        }`}
      >
        <IoCloseOutline
          className={`icon ${navcustom.closemenu}`}
          onClick={toggleNavbar}
          title="Cerrar Menu"
        />
        {navLinks.map(({ to, id, icon, label }) => (
          <Link
            key={label}
            to={to}
            className={navcustom.StrongLinks}
            title={label}
            onClick={id ? () => navigateAndScroll(id) : null}
          >
            {icon}
            <strong>{label}</strong>
          </Link>
        ))}
        {/* Dropdown de categorías */}
        <div className={navcustom.dropdown}>
          <button className={navcustom.dropbtn}>
            Categorías
            <TbCategory className={navcustom.icon} />
          </button>
          <div className={navcustom.dropdownContent}>
            {categories.map((category) => (
              <a href={`/#${category}`}>{category}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className={`icon ${navcustom.Controls}`}>
        <FaShoppingCart
          onClick={toggleCart}
          className={navcustom.ControlIcon}
          title="Ver Carro"
        />
        {authenticated ? (
          <>
            <Link
              to="/UserPanel"
              className={navcustom.StrongLinks}
              title="Perfil"
            >
              <FaUser className={navcustom.ControlIcon} />
            </Link>
            <MdLogout
              onClick={handleShowModal}
              className={navcustom.ControlIcon}
              title="Salir"
            />
          </>
        ) : (
          <>
            <Link
              to="/Login"
              className={navcustom.StrongLinks}
              title="Iniciar sesión"
            >
              <FaUser className={navcustom.ControlIcon} />
            </Link>
            <button className={navcustom.RegisterLink}>
              <Link to="/Register" title="Registrarse">
                Registrarse
              </Link>
            </button>
          </>
        )}
      </div>

      {/* Carro de compras */}
      <div
        className={`${navcustom.offcanvas} ${
          isCartVisible ? navcustom.showOffcanvas : navcustom.hideOffcanvas
        }`}
      >
        <div className={navcustom.CanvasHeader}>
          <h3>Carro de compras</h3>
          <IoCloseOutline
            className="icon"
            onClick={toggleCart}
            title="Cerrar Menu"
          />
        </div>
        <div className={navcustom.cartContainer}>
          {cart.length > 0 ? (
            cart.map((product) => (
              <ProductsInCart
                key={product.id}
                productInCart={product}
                product={product}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                Incartcustom={navcustom.IncartProduct}
              />
            ))
          ) : (
            <strong>No hay productos en el carrito.</strong>
          )}
        </div>
        <div className={navcustom.BuyButtonContainer}>
          <Link to="/Finalizar Compra">
            <SubmitButton>Comprar</SubmitButton>
          </Link>
        </div>
      </div>

      {/* Modal de confirmación de logout */}
      {ShowModal && (
        <Modal
          CloseModal={handleCloseModal}
          ModalTittle="¿Estás seguro de que deseas cerrar sesión?"
          onClickButtom={handleLogout}
        />
      )}
    </nav>
  );
};
