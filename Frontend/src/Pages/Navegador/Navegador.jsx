import { useState, useContext } from "react";
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
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [isCartVisible, setCartVisible] = useState(false);
  const [ShowModal, setShowModal] = useState(false);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { authenticated, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const toggleNavbar = () => setNavbarVisible(!isNavbarVisible);
  const toggleCart = () => setCartVisible(!isCartVisible);

  // Maneja la apertura de la modal
  const handleShowModal = () => {
    setShowModal(true); // Abre la modal
  };

  // Maneja el cierre de la modal
  const handleCloseModal = () => {
    setShowModal(false); // Cierra la modal
  };

  // Maneja la acción de logout
  const handleLogout = () => {
    logout(); // Ejecuta la función de logout desde el contexto
    setShowModal(false); // Cierra la modal después del logout
    navigate("/"); // Redirige al usuario al inicio
  };

  // Función para manejar la navegación y desplazarse a una sección específica
  const navigateAndScroll = (id) => {
    navigate("/");
    setTimeout(() => {
      const targetElement = document.getElementById(id);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 60);
  };

  return (
    <nav className={navcustom.Navegador}>
      <MdMenu
        className={`icon color ${navcustom.closemenu}`}
        onClick={toggleNavbar}
        title="Abrir Menu"
      />

      <div
        className={`${navcustom.Links} ${
          isNavbarVisible ? navcustom.Navbarshow : navcustom.hideOffcanvas
        }`}
      >
        <IoCloseOutline
          className={`icon color ${navcustom.closemenu}`}
          onClick={toggleNavbar}
          title="Cerrar Menu"
        />
        <Link
          to="/"
          className={navcustom.StrongLinks}
          title="Inicio"
          onClick={() => navigateAndScroll("Inicio")}
        >
          <FaHome className="icon" />
          <strong>Inicio</strong>
        </Link>
        <Link
          to="/"
          onClick={() => navigateAndScroll("Productos")}
          className={navcustom.StrongLinks}
          title="Categorias"
        >
          <TbCategory className="icon" />
          <strong>Categorias</strong>
        </Link>
        <Link
          to="/"
          onClick={() => navigateAndScroll("Productos")}
          className={navcustom.StrongLinks}
          title="Productos"
        >
          <GiRunningShoe className="icon" />
          <strong>Productos</strong>
        </Link>
        <Link
          to="/Contactos"
          className={navcustom.StrongLinks}
          title="Contactos"
        >
          <MdOutlinePermContactCalendar className="icon" />
          <strong>Contactos</strong>
        </Link>
      </div>
      <div className={navcustom.Controls}>
        <FaShoppingCart
          onClick={toggleCart}
          className="icon color"
          title="Ver Carro"
        />

        {authenticated ? (
          <>
            <Link
              to="/UserPanel"
              className={navcustom.StrongLinks}
              title="Perfil "
            >
              <FaUser className="icon" />
            </Link>
            <MdLogout
              onClick={handleShowModal} // Llama a la función para abrir la modal
              className="icon color"
              title="Salir"
            />
          </>
        ) : (
          <>
            <Link
              to="/Login"
              className={navcustom.StrongLinks}
              title="Iniciar sesion "
            >
              <FaUser className="icon" />
            </Link>
            <Link
              to="/Register"
              className={navcustom.StrongLinks}
              title="Registrarse"
            >
              <strong>Register</strong>
            </Link>
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
            className="icon color"
            onClick={toggleCart}
            title="Cerrar Menu"
          />
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
              />
            ))
          ) : (
            <strong>No hay productos en el carrito.</strong>
          )}
        </div>
        <div className={navcustom.BuyButtonContainer}>
          <Link to={"/Finalizar Compra"}>
            <SubmitButton>Comprar</SubmitButton>
          </Link>
        </div>
      </div>

      {/* Modal para confirmar el logout */}
      {ShowModal && (
        <Modal
          CloseModal={handleCloseModal}
          ModalTittle={"¿Estás seguro de que deseas cerrar sesión?"}
          onClickButtom={handleLogout}
        ></Modal>
      )}
    </nav>
  );
};
