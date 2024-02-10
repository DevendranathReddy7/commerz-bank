import React, { useEffect, useState } from "react";
import {
  InputSelectAccount,
  PaymentButtons,
  PaymentsButtonsDiv,
} from "../../../common/PaymentScreen/PaymentScreenStyles";
import FromAccountSelector from "./common/FromAccountSelector";
import EachAccount from "../../../common/modal/EachAccount";
import BillerSelector from "./common/BillerSelector";
import EachBiller from "../../../common/modal/EachBiller";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { billPayment } from "../../../storeSetup/actions/paymentActions";

const BillPayments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pmntDetails = useSelector((state) => state.pmnts);

  const [selectedFromAccount, setSelectedFromAccount] = useState();
  const [isFromClicked, setIsFromCLicked] = useState(false);

  const [selectedBiller, setSelectedBiller] = useState();
  const [isBillerClicked, setIsBillerClicked] = useState(false);

  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState({ amount: 0 });

  const [error, setError] = useState(false);
  const [frmAcctError, setFrmAcctError] = useState(false);
  const [billerError, setBillerError] = useState(false);

  useEffect(() => {
    dispatch(
      billPayment({
        selectedFromAccount,
        selectedBiller,
        message,
        amount: amount.amount,
        type: "bpay",
      })
    );
  }, [dispatch, amount, message, selectedBiller, selectedFromAccount]);

  const accountClickHandler = () => {
    setIsFromCLicked((prev) => !prev);
    setIsBillerClicked(false);
  };

  const selectedAccount = (acc) => {
    setSelectedFromAccount(acc);
    setFrmAcctError(false);
  };

  const billerClickHandler = () => {
    setIsBillerClicked((prev) => !prev);
    setIsFromCLicked(false);
  };

  const clickedBiller = (acc) => {
    setSelectedBiller(acc);
    setBillerError(false);
  };

  const messageHandler = (e) => {
    setMessage(e.target.value);
  };

  const amountHandler = (value) => {
    const regex = /^\d+$/;
    setError(false);
    if (regex.test(value)) {
      if (
        Number(value) > Number(pmntDetails?.fromAccount?.balance) ||
        isNaN(value) ||
        Number(value) < 0
      ) {
        console.log("in amoutn--->");
        setError(true);
      } else {
        setAmount((prev) => ({ ...prev, amount: value }));
        setError(false);
      }
    } else {
      setError(true);
    }
  };

  const cancelHandle = () => {
    navigate("/payments");
  };

  const continueHandle = (e) => {
    e.preventDefault();

    // const amnt = pmntDetails?.amount;
    // const availableBalance = pmntDetails?.fromAccount.balance;

    if (!selectedFromAccount) {
      setFrmAcctError(true);
    } else if (!selectedBiller) {
      setBillerError(true);
    } else if (!amount.amount) {
      setError(true);
    } else {
      setFrmAcctError(false);
      setBillerError(false);
      setError(false);
      navigate("/payments/bill-payments-review");
    }
  };

  return (
    <div style={{ flex: 1 }}>
      <>
        {!selectedFromAccount && (
          <InputSelectAccount
            placeholder="Select from account"
            onClick={accountClickHandler}
          />
        )}

        {isFromClicked && <FromAccountSelector onClick={selectedAccount} />}

        {selectedFromAccount && (
          <EachAccount
            acc={selectedFromAccount}
            onClick={() => {
              accountClickHandler(true);
            }}
          />
        )}
        {frmAcctError && (
          <p style={{ margin: "-1% 9% 0.2%", color: "red" }}>
            Select an account to proceed
          </p>
        )}
      </>
      <>
        {!selectedBiller && (
          <InputSelectAccount
            placeholder="Select Biller"
            onClick={billerClickHandler}
          />
        )}

        {isBillerClicked && <BillerSelector onClick={clickedBiller} />}

        {selectedBiller && (
          <EachBiller
            acc={selectedBiller}
            onClick={() => {
              billerClickHandler(true);
            }}
          />
        )}
        {billerError && (
          <p style={{ margin: "-1% 9% 0.2%", color: "red" }}>
            Select a biller to proceed
          </p>
        )}
      </>

      <InputSelectAccount
        placeholder="Message"
        onChange={(e) => messageHandler(e)}
      />
      <InputSelectAccount
        placeholder="Amount"
        onChange={(e) => amountHandler(e.target.value)}
      />
      {error && (
        <p
          style={{
            color: "red",
            fontFamily: "revert-layer",
            marginLeft: "9%",
            marginTop: "-10px",
          }}
        >
          Please enter valid amount
        </p>
      )}

      <PaymentsButtonsDiv>
        <PaymentButtons cancel onClick={cancelHandle}>
          Cancel
        </PaymentButtons>
        <PaymentButtons
          onClick={continueHandle}
          disabled={error || frmAcctError || billerError}
        >
          Next
        </PaymentButtons>
      </PaymentsButtonsDiv>
    </div>
  );
};
export default BillPayments;
