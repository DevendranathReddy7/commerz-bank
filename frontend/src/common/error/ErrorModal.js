import React from "react";
import { DivErrorModal } from "../Styles/Styles";

const ErrorModal = ({ message, onClose }) => {
  const clickHandler = () => {
    onClose();
  };
  return (
    <>
      <DivErrorModal>
        <div>
          <h4>{message}</h4>
        </div>
        <div>
          <button onClick={clickHandler}>X</button>
        </div>
      </DivErrorModal>
    </>
  );
};
export default ErrorModal;
