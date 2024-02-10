import React, { useEffect, useState } from "react";
import {
  InputSelectAccount,
  PaymentButtons,
  PaymentsButtonsDiv,
} from "../../../../common/PaymentScreen/PaymentScreenStyles";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Tip } from "../../transactionHistory/TransactionHistoryStyles";
import { TiTick } from "react-icons/ti";
import { P } from "./billerStyles";
import { Label } from "../../../../pages/private/open account/OpenAnAccountStyles";
import Loader from "../../../../common/loading/Loader";

const AddBiller = () => {
  const currentUser = useSelector((state) => state.login.currentUser);
  const initialState = {
    billerName: "",
    billerCode: "",
    billerRef: "",
    owner: currentUser,
  };
  const navigate = useNavigate();
  const { state } = useLocation();
  const [billerData, setBillerData] = useState(initialState);
  const [nameError, setNameError] = useState(false);
  const [codeErr, setCodeError] = useState(false);
  const [refError, setrefError] = useState(false);
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
    if (state?.editingBiller) {
      setBillerData(state.editingBiller);
    }
  }, [state]);

  const changeHandler = async (field, value) => {
    await validateInput(field, value);
    switch (field) {
      case "billerName":
        setNameError(false);
        setBillerData((prev) => ({ ...prev, billerName: value }));
        break;
      case "billerCode":
        setBillerData((prev) => ({ ...prev, billerCode: value }));
        break;
      case "refNum":
        setBillerData((prev) => ({ ...prev, billerRef: value }));
        break;
      default:
        return;
    }
  };

  const validateInput = (field, value) => {
    if (!/^\d*$/.test(value)) {
      if (field === "billerCode") {
        setCodeError(true);
      } else if (field === "refNum") {
        setrefError(true);
      }
    } else {
      if (field === "billerCode") {
        setCodeError(false);
      } else if (field === "refNum") {
        setrefError(false);
      }
    }
  };

  const cancelHandle = () => {
    navigate("/settings/manage-billers");
  };

  const ValidateOnSubmit = () => {
    if (!billerData.billerName) {
      setNameError(true);
    } else if (!billerData.billerCode) {
      setCodeError(true);
    } else if (!billerData.billerRef) {
      setrefError(true);
    } else {
      setCodeError(false);
      setrefError(false);
      setNameError(false);
    }
  };
  const AddBilllerHandle = async () => {
    ValidateOnSubmit();
    if (!nameError || !codeErr || !refError) {
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://localhost:5000/settings/create-billers",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              billerName: billerData.billerName,
              billerCode: billerData.billerCode,
              billerRef: billerData.billerRef,
              owner: billerData.owner,
            }),
          }
        );
        await response.json();
        setSucess(true);
        setIsLoading(false);
      } catch (err) {}
      setBillerData(initialState);
    }
  };

  const SaveBillerHandle = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:5000/settings/edit-biller",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            billerName: billerData.billerName,
            billerCode: billerData.billerCode,
            billerRef: billerData.billerRef,
            owner: billerData.owner,
            billerId: state.editingBiller._id,
          }),
        }
      );
      await response.json();
      setSucess(true);
      setIsLoading(false);
    } catch (err) {}
    setBillerData(initialState);
  };

  return (
    <>
      <div style={{ flex: 1 }}>
        {isLoading && <Loader message="saving details" />}
        {success && (
          <Tip addBiller>
            <TiTick size={"40px"} />
            <P tip>
              Biller {state?.isEdit ? "updated" : "added"} successfully!
            </P>
          </Tip>
        )}
        <InputSelectAccount
          placeholder="Biller Name"
          value={billerData.billerName}
          onChange={(e) => changeHandler("billerName", e.target.value)}
        />
        {nameError && (
          <Label addBiller err={nameError}>
            Enter biller name
          </Label>
        )}
        <InputSelectAccount
          placeholder="Biller Code"
          value={billerData.billerCode}
          onChange={(e) => changeHandler("billerCode", e.target.value)}
        />
        {codeErr && (
          <Label addBiller err={codeErr}>
            Only digits are allowed
          </Label>
        )}
        <InputSelectAccount
          placeholder="Reference Number"
          value={billerData.billerRef}
          onChange={(e) => changeHandler("refNum", e.target.value)}
        />
        {refError && (
          <Label addBiller err={refError}>
            Only digits are allowed
          </Label>
        )}

        <PaymentsButtonsDiv>
          <PaymentButtons cancel onClick={cancelHandle}>
            Cancel
          </PaymentButtons>
          <PaymentButtons
            onClick={state?.isEdit ? SaveBillerHandle : AddBilllerHandle}
            type="submit"
            disabled={codeErr || refError || nameError}
          >
            {state?.isEdit ? "Save" : "Add"}
          </PaymentButtons>
        </PaymentsButtonsDiv>
      </div>
    </>
  );
};
export default AddBiller;
