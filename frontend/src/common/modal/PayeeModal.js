import React, { useState } from "react";
import { AccountsModalDiv } from "../PaymentScreen/PaymentScreenStyles";
import { AddBillerBtn } from "../../components/private/settings/billers/billerStyles";
import { useNavigate } from "react-router-dom";
import EachPayee from "./EachPayee";

const PayeeModal = ({ modalOpen, items, onClick }) => {
  const [isModalOpen, setModalOpen] = useState(modalOpen);
  const navigate = useNavigate();

  const handleOverlayClick = (e) => {
    // Check if the click occurred on the overlay (outside the modal content)
    if (e.target === e.currentTarget) {
      setModalOpen(false);
    }
  };

  const modelHandle = (acc) => {
    setModalOpen((prev) => !prev);
    onClick(acc);
  };

  const clickAddPayeeHandler = (e) => {
    e.preventDefault();
    navigate("/settings/add-payee");
  };

  return (
    isModalOpen && (
      <AccountsModalDiv onClick={handleOverlayClick}>
        <form onSubmit={clickAddPayeeHandler}>
          <div
            style={{
              float: "right",
              marginBottom: "3%",
              backgroundColor: "#0fbfeb",
              borderRadius: "3px",
            }}
          >
            <AddBillerBtn>Add Payee</AddBillerBtn>
          </div>
        </form>
        <hr style={{ width: "100%", marginBottom: "4%", marginTop: "-1%" }} />
        {items?.length === 0 && (
          <p>
            No saved payees are available..please add a new one by clicking on
            Add Payee button.
          </p>
        )}
        {items?.map((acc) => (
          <EachPayee acc={acc} onClick={modelHandle} />
        ))}
      </AccountsModalDiv>
    )
  );
};
export default PayeeModal;
