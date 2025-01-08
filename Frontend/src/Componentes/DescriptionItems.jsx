import React from "react";
import { FaPaperPlane } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import styles from "./Descriptionitemscustom.module.css";

export const DescriptionItems = () => {
  return (
    <div className={styles.Container}>
      <ul>
        <li>
          <FaPaperPlane className={styles.Item} />
          <p> Envios a toda la provincia</p>
        </li>
        <li>
          <FaRegCreditCard className={styles.Item} />
          <p> Obten un 10% de descuento en compras online</p>
        </li>
        <li>
          <RiSecurePaymentLine className={styles.Item} />
          <p>Tu compra esta segura con nosotros</p>
        </li>
      </ul>
    </div>
  );
};
