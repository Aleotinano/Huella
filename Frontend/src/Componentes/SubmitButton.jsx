import React from "react";
import styles from "./buybuttoncustom.module.css";

export const SubmitButton = ({ disabled, children, onClick }) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      className={styles.SubmitButton}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
