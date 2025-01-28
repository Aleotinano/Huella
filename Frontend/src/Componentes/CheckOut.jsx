import React, { useState, useContext } from "react";
import { CartContext } from "../Componentes/Cart";
import styles from "./checkout.module.css";
import { FaRegCreditCard } from "react-icons/fa";
import { SubmitButton } from "./SubmitButton";
import { BsPaypal } from "react-icons/bs";

export const Checkout = () => {
  const { cart, updateCartItemSize } = useContext(CartContext);
  const [selectedPayment, setSelectedPayment] = useState("");
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    paymentMethod: "",
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (e, itemId) => {
    updateCartItemSize(itemId, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Compra finalizada con los siguientes datos:", formData);
    alert("Compra realizada con éxito!");
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutContent}>
        <h2>Finalizar Compra</h2>
        <form onSubmit={handleSubmit} className={styles.checkoutForm}>
          <div className={styles.paymentMethods}>
            <SubmitButton
              className={selectedPayment === "credit" ? styles.active : ""}
              onClick={() => setSelectedPayment("credit")}
            >
              <FaRegCreditCard className="icon" />
              Tarjeta de Crédito
            </SubmitButton>
            <SubmitButton
              className={selectedPayment === "paypal" ? styles.active : ""}
              onClick={() => setSelectedPayment("paypal")}
            >
              <BsPaypal className="icon" />
              PayPal
            </SubmitButton>
          </div>
          {["cardName", "cardNumber", "expirationDate", "cvv"].map((field) => (
            <fieldset key={field}>
              <input
                type="text"
                name={field}
                placeholder=" "
                value={formData[field]}
                onChange={handleChange}
                required
              />
              <label>
                {field === "cvv"
                  ? "CVV"
                  : field === "cardName"
                  ? "Nombre en la tarjeta"
                  : field === "cardNumber"
                  ? "Número de tarjeta"
                  : "Fecha de expiración"}
              </label>
            </fieldset>
          ))}
          <SubmitButton type="submit">Confirmar Compra</SubmitButton>
        </form>
      </div>
      <div className={styles.checkoutCartSummary}>
        <h3>Resumen del Carrito</h3>
        <div className={styles.cartSummaryItems}>
          {cart.map((item) => (
            <div key={item.id} className={styles.checkoutCartItem}>
              <img
                src={`${process.env.PUBLIC_URL}/${product.img}`}
                alt={item.name}
                className={styles.cartItemImage}
              />
              <div className={styles.cartItemDetails}>
                <p>{item.name}</p>
                <select
                  value={item.selectedSize}
                  onChange={(e) => handleSizeChange(e, item.id)}
                >
                  {item.size.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <p>{item.quantity}</p>
                <p>${item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.checkoutTotalContainer}>
          <p className={styles.shippingSection}>Envío: $9.99</p>
          <p className={styles.checkoutTotal}>
            Total: ${(total + 9.99).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
