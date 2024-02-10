import React from "react";
import { Image } from "../../components/private/AccountsList/AccountsListStyles";
import { AccountListDropdown } from "../PaymentScreen/PaymentScreenStyles";

const EachAccount = ({ acc, onClick }) => {
  return (
    <AccountListDropdown onClick={() => onClick(acc)}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div>
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
        </div>
        <div>
          <span>
            <h4 style={{ marginBottom: "-15px" }}>{acc.accountName}</h4>
            <h4>{acc.accountNumber}</h4>
          </span>
        </div>
      </div>
      <div style={{ paddingRight: "10px" }}>
        <span>
          <h4 style={{ marginBottom: "-15px" }}>Balance</h4>
          <h4>{acc.balance}</h4>
        </span>
      </div>
    </AccountListDropdown>
  );
};
export default EachAccount;
