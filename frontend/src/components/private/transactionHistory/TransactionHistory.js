import React, { useState } from "react";
import {
  CheckBox,
  CheckboxChildDiv,
  CheckboxParentDiv,
  HistoryList,
  Label,
  SearchButton,
  Tip,
} from "./TransactionHistoryStyles";
import { useSelector } from "react-redux";
import EachTransaction from "./EachTransaction";
import Loader from "../../../common/loading/Loader";
import { NoAccountlistStyle } from "../AccountsList/AccountsListStyles";
import { VscError } from "react-icons/vsc";
import { LuBadgeInfo } from "react-icons/lu";

const selectPayments = [
  { id: 1, label: "Self Transfer" },
  { id: 2, label: "Bill Payments" },
  { id: 3, label: "Pay anyone" },
];
const TransactionHistory = () => {
  const currentUser = useSelector((state) => state.login);
  const [paymentsHistory, setPaymentsHistory] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedPaymnets, setSelectedPaymnets] = useState({
    selfTransfer: false,
    billPayments: false,
    payAnyone: false,
  });

  const paymentClickHandler = (pmnt) => {
    setError(false);

    switch (pmnt.label) {
      case "Self Transfer":
        setSelectedPaymnets((prev) => ({
          ...prev,
          selfTransfer: !prev.selfTransfer,
        }));
        break;
      case "Bill Payments":
        setSelectedPaymnets((prev) => ({
          ...prev,
          billPayments: !prev.billPayments,
        }));
        break;
      case "Pay anyone":
        setSelectedPaymnets((prev) => ({
          ...prev,
          payAnyone: !prev.payAnyone,
        }));
        break;
      default:
        setSelectedPaymnets({
          selfTransfer: false,
          billPayments: false,
          payAnyone: false,
        });
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    let queryParam = [];
    if (
      selectedPaymnets.selfTransfer !== true &&
      selectedPaymnets.billPayments !== true &&
      selectedPaymnets.payAnyone !== true
    ) {
      return setError(true);
    }
    if (selectedPaymnets.selfTransfer === true) {
      queryParam.push("transfertype=ft");
      setError(false);
    }
    if (selectedPaymnets.billPayments === true) {
      queryParam.push("transfertype=bpay");
      setError(false);
    }
    if (selectedPaymnets.payAnyone === true) {
      queryParam.push("transfertype=pan");
      setError(false);
    }
    const newsearch = queryParam.join("&");

    setIsLoading(true);
    const response = await fetch(
      `http://localhost:5000/payments/history/${currentUser.currentUser}/?${newsearch}`,
      { method: "GET" }
    );
    const payments = await response.json();

    if (response.ok) {
      setPaymentsHistory(payments.payments);
    }
    setIsLoading(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "60%",
      }}
    >
      <Tip err={error}>
        <LuBadgeInfo />
        Click on search button by selecting payment type(s) to get past
        transactions.
      </Tip>
      <CheckboxParentDiv>
        {selectPayments.map((pmnt) => (
          <CheckboxChildDiv key={pmnt.id}>
            <CheckBox
              type="checkbox"
              onChange={() => paymentClickHandler(pmnt)}
            />
            <Label>{pmnt.label}</Label>
          </CheckboxChildDiv>
        ))}
        <form onSubmit={searchHandler}>
          <SearchButton>Search</SearchButton>
        </form>
      </CheckboxParentDiv>
      {isLoading && <Loader message="Fetching your transaction history" />}
      {!isLoading && paymentsHistory?.length > 0 ? (
        <>
          <HistoryList heading>
            <div>Type</div>
            <div>Date</div>
            <div>From </div>
            <div>To </div>
            <div>Amount</div>
            <div>Message</div>
          </HistoryList>
          {paymentsHistory?.map((pmnt) => (
            <EachTransaction tran={pmnt} />
          ))}
        </>
      ) : (
        !isLoading && (
          <NoAccountlistStyle style={{ paddingBottom: "-5%" }}>
            <VscError size={"25%"} color="#FF7F7F" />
            <span>
              <p>Nothing here to show</p>
              <p>
                Click the search button by selecting required checkboxe's to get
                the past transactions.
              </p>
              <p>If you're first time user then try posting a payment</p>
            </span>
          </NoAccountlistStyle>
        )
      )}
    </div>
  );
};
export default TransactionHistory;
