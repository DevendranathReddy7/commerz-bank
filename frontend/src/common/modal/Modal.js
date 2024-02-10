import React, { useState } from "react";
import { ButtonsDiv } from "../../pages/private/open account/OpenAnAccountStyles";
import { useNavigate } from "react-router-dom";
import { CloseButton, ModalContentDiv, ModalDiv } from "./ModalStyles";

const Modal = ({ modalOpen, children }) => {
  const [isModalOpen, setModalOpen] = useState(modalOpen);
  const navigate = useNavigate();
  return (
    isModalOpen && (
      <ModalDiv>
        <ModalContentDiv>
          {children}
          <ButtonsDiv modal>
            <CloseButton
              cancel
              modal
              type="button"
              onClick={() => navigate("/home")}
            >
              Go Home
            </CloseButton>
            <CloseButton
              modal
              type="button"
              onClick={() => setModalOpen(false)}
            >
              Create another account
            </CloseButton>
          </ButtonsDiv>
        </ModalContentDiv>
      </ModalDiv>
    )
  );
};
export default Modal;
