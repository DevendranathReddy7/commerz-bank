import React, { useEffect, useState } from "react";
import {
  InputSelectAccount,
  PaymentButtons,
  PaymentsButtonsDiv,
} from "../../../common/PaymentScreen/PaymentScreenStyles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FromAccountSelector from "./common/FromAccountSelector";
import EachAccount from "../../../common/modal/EachAccount";
import PayeeSelector from "./common/PayeeSelector";
import EachPayee from "../../../common/modal/EachPayee";
import { panPayment } from "../../../storeSetup/actions/paymentActions";

const PayAnyone = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pmntDetails = useSelector((state) => state.pmnts);
  const [isFromClicked, setIsFromCLicked] = useState(false);
  const [isToClicked, setIsToCLicked] = useState(false);

  const [selectedFromAccount, setSelectedFromAccount] = useState();
  const [selectedToPayee, setselectedToPayee] = useState();

  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState({ amount: 0 });

  const [fromAccError, setFrmAcctError] = useState(false);

  const [toPayeeError, setToPayeeError] = useState(false);

  const [amountError, setAmountError] = useState(false);

  useEffect(() => {
    dispatch(
      panPayment({
        selectedFromAccount,
        selectedToPayee,
        message,
        amount: amount.amount,
        type: "pan",
      })
    );
  }, [dispatch, amount, message, selectedToPayee, selectedFromAccount]);

  const fromAccountHandler = () => {
    setIsFromCLicked((prev) => !prev);
    setIsToCLicked(false);
  };

  const selectedAccounts = (acc) => {
    setSelectedFromAccount(acc);
    setFrmAcctError(false);
  };

  const toAccountHandler = () => {
    setIsToCLicked((prev) => !prev);
    setIsFromCLicked(false);
  };

  const selectedPayees = (acc) => {
    setselectedToPayee(acc);
    setToPayeeError(false);
  };

  const messageHandler = (value) => {
    setMessage(value);
  };

  const amountHandler = (value) => {
    const regex = /^\d+$/;
    setAmountError(false);
    if (regex.test(value)) {
      if (
        Number(value) > Number(pmntDetails?.fromAccount?.balance) ||
        isNaN(value) ||
        Number(value) < 0
      ) {
        setAmountError(true);
      } else {
        setAmount((prev) => ({ ...prev, amount: value }));
        setAmountError(false);
      }
    } else {
      setAmountError(true);
    }
  };

  const cancelHandle = () => {
    navigate("/payments");
  };

  const continueHandle = (e) => {
    e.preventDefault();
    if (!selectedFromAccount) {
      setFrmAcctError(true);
    } else if (!selectedToPayee) {
      setToPayeeError(true);
    } else if (!amount.amount) {
      setAmountError(true);
    } else {
      setFrmAcctError(false);
      setToPayeeError(false);
      setAmountError(false);
      navigate("/payments/pay-anyone-review");
    }
  };

  return (
    <div style={{ flex: 1 }}>
      {!selectedFromAccount && (
        <InputSelectAccount
          placeholder="Select from account"
          onClick={fromAccountHandler}
        />
      )}
      {isFromClicked && <FromAccountSelector onClick={selectedAccounts} />}

      {selectedFromAccount && (
        <EachAccount
          acc={selectedFromAccount}
          onClick={() => {
            fromAccountHandler(true);
          }}
        />
      )}
      {fromAccError && (
        <p style={{ margin: "-1% 9% 0.2%", color: "red" }}>
          Select an account to proceed
        </p>
      )}
      {!selectedToPayee && (
        <InputSelectAccount
          placeholder="Select Payee"
          onClick={toAccountHandler}
        />
      )}
      {isToClicked && <PayeeSelector onClick={selectedPayees} />}

      {selectedToPayee && (
        <EachPayee
          acc={selectedToPayee}
          onClick={() => {
            toAccountHandler(true);
          }}
        />
      )}
      {toPayeeError && (
        <p style={{ margin: "-1% 9% 0.2%", color: "red" }}>
          Select a payee to proceed
        </p>
      )}
      <InputSelectAccount
        placeholder="Message"
        onChange={(e) => messageHandler(e.target.value)}
      />
      <InputSelectAccount
        placeholder="Amount"
        onChange={(e) => amountHandler(e.target.value)}
      />
      {amountError && (
        <p style={{ margin: "-1% 9%", color: "red" }}>Enter valid amount</p>
      )}

      <PaymentsButtonsDiv>
        <PaymentButtons cancel onClick={cancelHandle}>
          Cancel
        </PaymentButtons>
        <PaymentButtons
          onClick={continueHandle}
          disabled={amountError || fromAccError || toPayeeError}
        >
          Next
        </PaymentButtons>
      </PaymentsButtonsDiv>
    </div>
  );
};
export default PayAnyone;
