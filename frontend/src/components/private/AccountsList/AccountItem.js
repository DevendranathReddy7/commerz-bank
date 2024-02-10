import React from "react";
import { DivAccount, Image } from "./AccountsListStyles";
import { IoIosArrowForward } from "react-icons/io";
const AccountItem = ({ acc }) => {
  return (
    <DivAccount>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "-2% 5px -2% 3px",
          padding: "-2% 5px -2% 3px",
        }}
      >
        <Image
          src={
            acc.accountName
              ? `${process.env.PUBLIC_URL}/accounts/${acc.accountName}.png`
              : `${process.env.PUBLIC_URL}/accounts/cheque.png`
          }
          onError={(e) => {
            e.target.src = `${process.env.PUBLIC_URL}/accounts/cheque.png`;
          }}
          alt="account"
        />
        <div style={{ paddingLeft: "10px" }}>
          <span>
            <h4 style={{ marginBottom: "-15px" }}>{acc.accountName}</h4>
            <h4>{acc.accountNumber}</h4>
          </span>
        </div>
      </div>

      <div
        style={{ display: "flex", paddingRight: "5%", alignItems: "center" }}
      >
        <div>
          <span>
            <h4 style={{ marginBottom: "-15px", paddingRight: "20px" }}>
              Balance
            </h4>
            <h4>{acc.balance}</h4>
          </span>
        </div>
        <div>
          <IoIosArrowForward />
        </div>
      </div>
    </DivAccount>
  );
};
export default AccountItem;
