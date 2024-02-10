import React from "react";
import { Image } from "../../components/private/AccountsList/AccountsListStyles";
import { AccountListDropdown } from "../PaymentScreen/PaymentScreenStyles";

const EachBiller = ({ acc, onClick }) => {
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
            src={`${process.env.PUBLIC_URL}/pmnts/biller.png`}
            alt="account"
          />
        </div>
        <div>
          <span>
            <h4 style={{ marginBottom: "-15px" }}>{acc.billerName}</h4>
            <h4>
              {acc.billerCode},{acc.billerRef}
            </h4>
          </span>
        </div>
      </div>
    </AccountListDropdown>
  );
};
export default EachBiller;
