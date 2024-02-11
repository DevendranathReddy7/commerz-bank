import React, { useEffect, useState } from "react";
import {
  InputSelectAccount,
  PaymentButtons,
  PaymentsButtonsDiv,
} from "../../../../common/PaymentScreen/PaymentScreenStyles";
import {
  CheckBox,
  CheckboxChildDiv,
  CheckboxParentDiv,
  Label,
  Tip,
} from "../../transactionHistory/TransactionHistoryStyles";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../../../common/loading/Loader";
import { TiTick } from "react-icons/ti";
import { P } from "../billers/billerStyles";

const paymentModes = [
  { id: 1, label: "Account Number" },
  { id: 2, label: "Email" },
  { id: 3, label: "Mobile Number" },
];

const AddPayee = () => {
  const currentUser = useSelector((state) => state.login.currentUser);
  const [payeeDetails, setPayeeDetails] = useState({
    payeeName: "",
    payeeType: "",
    payeeValue: "",
    ifscCode: "",
    owner: currentUser,
  });
  const navigate = useNavigate();
  const { state } = useLocation();
  const [selectedRadioButton, setSelectedRadioButton] = useState({
    id:
      state?.editingPayee?.transferType === "email"
        ? 2
        : state?.editingPayee?.transferType === "mobileNumber"
        ? 3
        : 1,
    label:
      state?.editingPayee?.transferType === "email"
        ? "Email"
        : state?.editingPayee?.transferType === "mobileNumber"
        ? "Mobile Number"
        : "Account Number",
  });
  const [emailValidation, setemailValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSucess] = useState(false);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSucess(false);
      }, 3000);
    }
  }, [success]);

  useEffect(() => {
    if (state?.editingPayee) {
      setPayeeDetails((prev) => ({
        ...prev,
        ...state.editingPayee,
        payeeValue:
          state.editingPayee.toAccount ||
          state.editingPayee.email ||
          state.editingPayee.mobileNumber,
      }));
    }
  }, [state]);

  const radioButtonHandle = (pmnt) => {
    setSelectedRadioButton(pmnt);
    setemailValidation(false);
    setPayeeDetails((prev) => ({ ...prev, payeeType: "", payeeValue: "" }));
  };

  const fromAccountHandle = (value) => {
    setPayeeDetails((prev) => ({ ...prev, payeeName: value }));
  };

  const ifscHandle = (value) => {
    setPayeeDetails((prev) => ({ ...prev, ifscCode: value }));
  };

  const toAccountHandle = (mode, value) => {
    setemailValidation(false);
    if (mode === "Email") {
      let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
      const isEmailValid = regex.test(value);
      if (!isEmailValid) {
        setemailValidation(true);
      }
    }
    setPayeeDetails((prev) => ({
      ...prev,
      payeeType: mode,
      payeeValue: value,
    }));
  };

  const cancelHandle = () => {
    navigate("/settings/manage-payees");
  };
  const AddPayeeHandle = async () => {
    setIsLoading(true);
    setSucess(false);
    const response = await fetch(
      "http://localhost:5000/settings/create-payees",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payeeName: payeeDetails.payeeName,
          transferType: payeeDetails.payeeType,
          paymentValue: payeeDetails.payeeValue,
          ifscCode: payeeDetails.ifscCode,
          owner: payeeDetails.owner,
        }),
      }
    );
    setPayeeDetails({
      payeeName: "",
      payeeType: "",
      payeeValue: "",
      ifscCode: "",
      owner: currentUser,
    });
    setIsLoading(false);
    setSucess(true);
    await response.json();
  };

  const SavePayeeDetails = async () => {
    setIsLoading(true);
    setSucess(false);
    const response = await fetch("http://localhost:5000/settings/edit-payees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payeeName: payeeDetails.payeeName,
        transferType: payeeDetails.payeeType,
        paymentValue: payeeDetails.payeeValue,
        ifscCode: payeeDetails.ifscCode,
        owner: payeeDetails.owner,
      }),
    });
    setPayeeDetails({
      payeeName: "",
      payeeType: "",
      payeeValue: "",
      ifscCode: "",
      owner: currentUser,
    });
    setIsLoading(false);
    setSucess(true);
    await response.json();
  };
  return (
    <div style={{ flex: 1 }}>
      {isLoading && <Loader message="saving details" />}
      {success && (
        <Tip addBiller>
          <TiTick size={"40px"} />
          <P tip>Payee {state?.isEdit ? "updated" : "added"} successfully!</P>
        </Tip>
      )}
      <Label style={{ marginLeft: "9%" }}>Select transfer mode:</Label>

      <CheckboxParentDiv>
        {paymentModes.map((pmnt) => (
          <CheckboxChildDiv key={pmnt.id}>
            <CheckBox
              type="radio"
              onChange={() => radioButtonHandle(pmnt)}
              checked={selectedRadioButton?.id === pmnt?.id}
            />
            <Label>{pmnt.label}</Label>
          </CheckboxChildDiv>
        ))}
      </CheckboxParentDiv>

      <InputSelectAccount
        placeholder="Payee name"
        value={payeeDetails.payeeName}
        onChange={(e) => fromAccountHandle(e.target.value)}
      />

      {selectedRadioButton.label === "Account Number" && (
        <InputSelectAccount
          placeholder="Enter IFSC code"
          value={payeeDetails.ifscCode}
          onChange={(e) => ifscHandle(e.target.value)}
        />
      )}

      <InputSelectAccount
        placeholder={selectedRadioButton.label}
        value={payeeDetails.payeeValue}
        onChange={(e) =>
          toAccountHandle(selectedRadioButton.label, e.target.value)
        }
      />
      {emailValidation && (
        <Label style={{ marginLeft: "9%", color: "red" }}>
          Enter a valid email!
        </Label>
      )}
      <PaymentsButtonsDiv>
        <PaymentButtons cancel onClick={cancelHandle}>
          Cancel
        </PaymentButtons>
        <PaymentButtons
          onClick={state?.isEdit ? SavePayeeDetails : AddPayeeHandle}
          type="submit"
          disabled={emailValidation}
        >
          {state?.isEdit ? "Save" : "Add"}
        </PaymentButtons>
      </PaymentsButtonsDiv>
    </div>
  );
};
export default AddPayee;
