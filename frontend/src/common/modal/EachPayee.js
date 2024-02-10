import React from "react";
import { Image } from "../../components/private/AccountsList/AccountsListStyles";
import { AccountListDropdown } from "../PaymentScreen/PaymentScreenStyles";

const EachPayee = ({ acc, onClick }) => {
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
            src={`${process.env.PUBLIC_URL}/pmnts/${acc.transferType}.png`}
            alt="account"
          />
        </div>
        <div>
          <span>
            <h4 style={{ marginBottom: "-15px" }}>Name:{acc.payeeName}</h4>
            <h4>
              To:
              {
                acc.transferType === "mobileNumber"
                  ? "Mobile" //payee.transferType.substring(0, 6)
                  : acc.transferType === "toAccount"
                  ? acc.transferType.substring(2, 9)
                  : "Email" //payee.transferType
              }
              ,{acc.email || acc.mobileNumber}
              {acc.toAccount}-{acc.ifscCode}
            </h4>
          </span>
        </div>
      </div>
    </AccountListDropdown>
  );
};
export default EachPayee;
