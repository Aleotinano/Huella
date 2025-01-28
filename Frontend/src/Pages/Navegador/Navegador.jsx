import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaHome } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { MdMenu, MdOutlinePermContactCalendar, MdLogout } from "react-icons/md";
import { PiTShirtFill } from "react-icons/pi";
import { TbCategory } from "react-icons/tb";
import { CartContext } from "../../Componentes/Cart";
import { ProductsItem as ProductsInCart } from "../../Componentes/ProductosItem";
import navcustom from "./navcustom.module.css";
import { SubmitButton } from "../../Componentes/SubmitButton";
import { AuthContext } from "../../context/AuthContext";
import { Modal } from "../../Componentes/Modal";
import { useCategories } from "../../Hooks/UseCategories";
import { Link } from "react-router-dom";

export const Navegador = () => {
  const [NavScroll, setNavScroll] = useState(false);
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [isCartVisible, setCartVisible] = useState(false);
  const [ShowModal, setShowModal] = useState(false);

  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { authenticated, logout } = useContext(AuthContext);
  const categories = useCategories();

  const navigate = useNavigate();

  const toggleState = (setter) => () => setter((prev) => !prev);

  const navigateAndScroll = (id) => {
    navigate("/Tienda-de-zapatos");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 60);
  };

  const handleLogout = () => {
    logout();
    setShowModal(false);
    navigate("/Tienda-de-zapatos");
  };

  const goToCheckout = () => navigate("/CheckOut");

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
    },
    {
      to: "/#Productos",
      id: "Productos",
      icon: <PiTShirtFill className="icon" />,
      label: "Productos",
    },
    {
      to: "/Contactos",
      id: "Contactos",
      icon: <MdOutlinePermContactCalendar className="icon" />,
      label: "Contactos",
    },
  ];

  const firstHalfLinks = navLinks.slice(0, Math.ceil(navLinks.length / 2));
  const secondHalfLinks = navLinks.slice(Math.ceil(navLinks.length / 2));

  return (
    <nav className={`${navcustom.Navegador} ${NavScroll ? "scrolled" : ""}`}>
      <MdMenu
        className={`icon ${navcustom.closemenu}`}
        onClick={toggleState(setNavbarVisible)}
        title="Abrir Menu"
      />

      <div
        className={`${navcustom.Links} ${
          isNavbarVisible ? navcustom.Navbarshow : navcustom.hideOffcanvas
        }`}
      >
        <IoCloseOutline
          className={`icon ${navcustom.closemenu}`}
          onClick={toggleState(setNavbarVisible)}
          title="Cerrar Menu"
        />
        {firstHalfLinks.map(({ to, id, icon, label }) => (
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

        <div className={navcustom.dropdown}>
          <button className={` ${navcustom.dropbtn} ${navcustom.StrongLinks}`}>
            <TbCategory className="icon" />
            Categorías
          </button>
          <div className={navcustom.dropdownContent}>
            {categories.map((category) => (
              <a href={`/Tienda-de-zapatos/#${category}`} key={category}>
                <TbCategory className="icon" />
                {category}
              </a>
            ))}
          </div>
        </div>

        {secondHalfLinks.map(({ to, id, icon, label }) => (
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

      <div className={`icon ${navcustom.Controls}`}>
        <FaShoppingCart
          onClick={toggleState(setCartVisible)}
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
              onClick={() => setShowModal(true)}
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

      <div
        className={`${navcustom.offcanvas} ${
          isCartVisible ? navcustom.showOffcanvas : navcustom.hideOffcanvas
        }`}
      >
        <div className={navcustom.CanvasHeader}>
          <h3>Carro de compras</h3>
          <IoCloseOutline
            className="icon"
            onClick={toggleState(setCartVisible)}
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
          <SubmitButton onClick={goToCheckout}>Comprar</SubmitButton>
        </div>
      </div>

      {ShowModal && (
        <Modal
          CloseModal={() => setShowModal(false)}
          ModalTittle="¿Estás seguro de que deseas cerrar sesión?"
          onClickButtom={handleLogout}
        />
      )}
    </nav>
  );
};
