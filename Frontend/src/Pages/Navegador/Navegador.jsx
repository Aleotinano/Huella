import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import { FaShoppingCart, FaUser, FaHome } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { MdMenu, MdOutlinePermContactCalendar, MdLogout } from "react-icons/md";
import { CartContext } from "../../Componentes/Cart";
import { ProductsItem as ProductsInCart } from "../../Componentes/ProductosItem";
import navcustom from "./navcustom.module.css";
import { GiRunningShoe } from "react-icons/gi";
import { TbCategory } from "react-icons/tb";
import { SubmitButton } from "../../Componentes/SubmitButton";
import { AuthContext } from "../../context/AuthContext";
import { Modal } from "../../Componentes/Modal";

export const Navegador = () => {
  const [NavScroll, setNavScroll] = useState(false);
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [isCartVisible, setCartVisible] = useState(false);
  const [ShowModal, setShowModal] = useState(false);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { authenticated, logout } = useContext(AuthContext);

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
      to: "/",
      id: "Categorias",
      icon: <TbCategory className="icon" />,
      label: "Categorias",
      title: "Categorias",
    },
    {
      to: "/",
      id: "Productos",
      icon: <GiRunningShoe className="icon" />,
      label: "Productos",
      title: "Productos",
    },
    {
      to: "/Contactos",
      id: null,
      icon: <MdOutlinePermContactCalendar className="icon" />,
      label: "Contactos",
      title: "Contactos",
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
      </div>

      {/* Controles */}
      <div className={`icon ${navcustom.Controls}`}>
        <FaShoppingCart
          onClick={toggleCart}
          className="icon"
          title="Ver Carro"
        />
        {authenticated ? (
          <>
            <Link
              to="/UserPanel"
              className={navcustom.StrongLinks}
              title="Perfil"
            >
              <FaUser className="icon" />
            </Link>
            <MdLogout
              onClick={handleShowModal}
              className="icon"
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
              <FaUser className="icon" />
            </Link>
            <Link
              to="/Register"
              className={navcustom.StrongLinks}
              title="Registrarse"
            >
              <strong>Registrarse</strong>
            </Link>
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
