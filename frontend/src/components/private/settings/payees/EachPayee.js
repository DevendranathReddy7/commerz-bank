import React, { useState } from "react";
import { Image } from "../../transactionHistory/TransactionHistoryStyles";
import { AccountsModalDiv } from "../../../../common/PaymentScreen/PaymentScreenStyles";
import { ButtonsDiv } from "../../../../pages/private/open account/OpenAnAccountStyles";
import { useNavigate } from "react-router-dom";
import { ButtonStyles } from "../../../../common/Styles/Styles";
import { DivBiller, P } from "../billers/billerStyles";

const EachPayee = ({ payee, onClick }) => {
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();

  const deletePayeeHandler = async () => {
    setWarning(true);
  };

  const editPayeeHandler = (payee) => {
    navigate("/settings/add-payee", {
      state: { editingPayee: payee, isEdit: true },
    });
  };

  const deletePayeeConfirm = (id) => {
    onClick(id);
    setWarning(false);
  };

  const cancelDeletePayee = () => {
    setWarning(false);
  };
  return (
    <>
      {warning && (
        <AccountsModalDiv style={{ margin: "20% 20% 20% 33%" }}>
          <p>
            This action is irreversible,Are you sure that you want to delete
            this payee?
          </p>
          <ButtonsDiv>
            <ButtonStyles onClick={() => cancelDeletePayee()}>
              cancel
            </ButtonStyles>
            <ButtonStyles onClick={() => deletePayeeConfirm(payee._id)}>
              Continue
            </ButtonStyles>
          </ButtonsDiv>
        </AccountsModalDiv>
      )}

      <DivBiller>
        <div
          style={{ display: "flex", alignItems: "center", margin: "-2% 1px" }}
        >
          <Image
            src={`${process.env.PUBLIC_URL}/pmnts/${payee.transferType}.png`}
            alt="biller"
          />
          <div style={{ marginLeft: "5px" }}>
            <h4 style={{ marginBottom: "-15px" }}> {payee.payeeName}</h4>
            <span style={{ display: "flex" }}>
              <h4>
                {
                  payee.transferType === "mobileNumber"
                    ? "Mobile" //payee.transferType.substring(0, 6)
                    : payee.transferType === "toAccount"
                    ? payee.transferType.substring(2, 9)
                    : "Email" //payee.transferType
                }
              </h4>
              <h4>
                ({payee.email || payee.mobileNumber}
                {payee.toAccount && payee.ifscCode
                  ? `${payee.toAccount}- ${payee.ifscCode}`
                  : ""}
                )
              </h4>
            </span>
          </div>
        </div>

        <div style={{ display: "flex", paddingLeft: "10px" }}>
          <div onClick={() => editPayeeHandler(payee)}>
            <P>Edit</P>
          </div>
          <div onClick={() => deletePayeeHandler(payee._id)}>
            <P delete>Delete</P>
          </div>
        </div>
      </DivBiller>
    </>
  );
};
export default EachPayee;
