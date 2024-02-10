import React from "react";
import { HistoryList, Image } from "./TransactionHistoryStyles";
import { formatDate } from "../../../utils/getReadableDate";

const EachTransaction = ({ tran }) => {
  let to;
  if (tran.hasOwnProperty("toAccount")) {
    to = "toAccount";
  } else if (tran.hasOwnProperty("biller")) {
    to = "biller";
  } else if (tran.hasOwnProperty("email")) {
    to = "email";
  } else if (tran.hasOwnProperty("number")) {
    //eslint-disable-next-line
    to = "number";
  }
  return (
    <>
      <HistoryList bgC={tran.status}>
        <Image
          src={
            tran.type ? `${process.env.PUBLIC_URL}/pmnts/${tran.type}.png` : ""
          }
          onError={(e) => {
            e.target.src = `${process.env.PUBLIC_URL}/pmnts/na.png`;
          }}
          alt="type"
        />
        <div>{formatDate(tran.paymentDate)}</div>
        <div>{tran.fromAccount}</div>
        <div>
          {tran?.toAccount ||
            (tran?.biller?.billerName, tran?.biller?.billerCode) ||
            tran?.email ||
            tran?.mobileNumber}
          {"-" && tran?.ifscCode}
        </div>
        <div>{tran.amount}</div> <div>{tran.message || "NA"}</div>
      </HistoryList>
    </>
  );
};
export default EachTransaction;
