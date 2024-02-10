import React, { useState } from "react";
import { DivBiller, P } from "./billerStyles";
import { Image } from "../../transactionHistory/TransactionHistoryStyles";
import { ButtonStyles } from "../../../../common/Styles/Styles";
import { AccountsModalDiv } from "../../../../common/PaymentScreen/PaymentScreenStyles";
import { ButtonsDiv } from "../../../../pages/private/open account/OpenAnAccountStyles";
import { useNavigate } from "react-router-dom";

const EachBiller = ({ biller, onClick }) => {
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();

  const deleteBillerHandler = async () => {
    setWarning(true);
  };

  const editBillerHandler = (biller) => {
    navigate("/settings/add-biller", {
      state: { editingBiller: biller, isEdit: true },
    });
  };

  const deleteBillerConfirm = (id) => {
    onClick(id);
    setWarning(false);
  };

  const cancelDeleteBiller = () => {
    setWarning(false);
  };
  return (
    <>
      {warning && (
        <AccountsModalDiv style={{ margin: "20% 20% 20% 33%" }}>
          <p>
            This action is irreversible,Are you sure that you want to delete
            this biller?
          </p>
          <ButtonsDiv>
            <ButtonStyles onClick={() => cancelDeleteBiller()}>
              cancel
            </ButtonStyles>
            <ButtonStyles onClick={() => deleteBillerConfirm(biller._id)}>
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
            src={`${process.env.PUBLIC_URL}/pmnts/biller.png`}
            alt="biller"
          />
          <div style={{ marginLeft: "5px" }}>
            <h4 style={{ marginBottom: "-15px" }}>Name: {biller.billerName}</h4>
            <span style={{ display: "flex" }}>
              <h4>Code: {biller.billerCode},</h4>
              <h4>Ref: {biller.billerRef}</h4>
            </span>
          </div>
        </div>

        <div style={{ display: "flex", paddingLeft: "10px" }}>
          <div onClick={() => editBillerHandler(biller)}>
            <P>Edit</P>
          </div>
          <div onClick={() => deleteBillerHandler(biller._id)}>
            <P delete>Delete</P>
          </div>
        </div>
      </DivBiller>
    </>
  );
};
export default EachBiller;
