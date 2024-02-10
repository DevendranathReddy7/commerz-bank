import React, { useEffect, useState } from "react";
import {
  InputSelectAccount,
  PaymentButtons,
  PaymentsButtonsDiv,
} from "../../../common/PaymentScreen/PaymentScreenStyles";
import { useNavigate } from "react-router-dom";
import FromAccountSelector from "./common/FromAccountSelector";
import EachAccount from "../../../common/modal/EachAccount";
import { useDispatch, useSelector } from "react-redux";
import { ftxPayment } from "../../../storeSetup/actions/paymentActions";

const FundsTransfer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pmntDetails = useSelector((state) => state.pmnts);
  const [isFromClicked, setIsFromCLicked] = useState(false);
  const [isToClicked, setIsToCLicked] = useState(false);

  const [selectedFromAccount, setSelectedFromAccount] = useState();
  const [selectedToAccount, setSelectedToAccount] = useState();

  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState({ amount: 0 });

  const [error, setError] = useState(false);
  const [accountsError, setaccountsError] = useState(false);
  const [frmAcctError, setFrmAcctError] = useState(false);
  const [toAcctError, setToAcctError] = useState(false);
  useEffect(() => {
    dispatch(
      ftxPayment({
        selectedFromAccount,
        selectedToAccount,
        message,
        amount: amount.amount,
        type: "ftx",
      })
    );
  }, [dispatch, amount, message, selectedToAccount, selectedFromAccount]);

  const accountClickHandler = () => {
    setIsFromCLicked((prev) => !prev);
    setIsToCLicked(false);
  };

  const selectedAccount = (acc) => {
    setSelectedFromAccount(acc);
    setaccountsError(false);
    setFrmAcctError(false);
  };

  const toAccount = (acc) => {
    setSelectedToAccount(acc);
    setaccountsError(false);
  };

  const clickedtoAccount = () => {
    setIsToCLicked((prev) => !prev);
    setIsFromCLicked(false);
    setToAcctError(false);
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
    const frmAccount = pmntDetails?.fromAccount?.accountNumber;
    const to_account = pmntDetails?.toAccount?.accountNumber;

    //  else if (parseInt(amnt) > parseInt(availableBalance)) {
    //   setError(true);
    //   return;
    // }

    if (!selectedFromAccount) {
      setFrmAcctError(true);
    } else if (!selectedToAccount) {
      setToAcctError(true);
    } else if (frmAccount === to_account) {
      setaccountsError(true);
    } else if (!amount.amount) {
      setError(true);
    } else {
      setFrmAcctError(false);
      setToAcctError(false);
      setError(false);
      setaccountsError(false);
      navigate("/payments/self-transfer-review");
    }
  };

  return (
    <>
      <div style={{ flex: 1 }}>
        {/* From Account */}
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

        {/* To Account */}
        {!selectedToAccount && (
          <InputSelectAccount
            placeholder="Select to account"
            onClick={clickedtoAccount}
          />
        )}

        {isToClicked && <FromAccountSelector onClick={toAccount} />}

        {selectedToAccount && (
          <EachAccount
            acc={selectedToAccount}
            onClick={() => clickedtoAccount(true)}
          />
        )}
        {toAcctError && (
          <p style={{ margin: "-1% 9% 0.2%", color: "red" }}>
            Select an account to proceed
          </p>
        )}
        {accountsError && (
          <p
            style={{
              color: "red",
              fontFamily: "revert-layer",
              marginLeft: "9%",
              marginTop: "-10px",
            }}
          >
            you've selected same account in both From & To..please select
            different accounts
          </p>
        )}
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
            disabled={error || frmAcctError || toAcctError}
          >
            Next
          </PaymentButtons>
        </PaymentsButtonsDiv>
      </div>
    </>
  );
};
export default FundsTransfer;
