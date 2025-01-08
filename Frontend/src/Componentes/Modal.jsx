import React from "react";
import styles from "./modalcustom.module.css";
import { IoMdCloseCircle } from "react-icons/io";
import { SubmitButton } from "./SubmitButton";
import { Link } from "react-router-dom";

export const Modal = ({
  ModalTittle,
  CloseModal,
  onClickButtom,
  ButtonLabel,
}) => {
  return (
    <div className={styles.ModalContainer}>
      <div className={styles.TittleContainer}>
        <h1>{ModalTittle}</h1>
        <IoMdCloseCircle
          onClick={CloseModal}
          title="Cerrar modal"
          aria-label="Cerrar modal"
          className="color icon"
        />
      </div>
      <div className={styles.ButtonContainer}>
        <SubmitButton onClick={onClickButtom}>
          {ButtonLabel || "Confirmar"}
        </SubmitButton>
        <Link To={Href}>
          <button className={styles.CloseButtonCustom} onClick={CloseModal}>
            Volver
          </button>
        </Link>
      </div>
    </div>
  );
};
