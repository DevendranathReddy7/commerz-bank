import React from "react";
import { useSelector } from "react-redux";
import AccountsModal from "../../../../common/modal/AccountsModal";

const FromAccountSelector = ({ onClick }) => {
  const accounts = useSelector((state) => state.accounts.accounts);
  const selecteFromAccount = (acc) => {
    onClick(acc);
  };
  return (
    <div>
      <AccountsModal
        modalOpen={true}
        acc={accounts}
        onClick={selecteFromAccount}
      ></AccountsModal>
    </div>
  );
};
export default FromAccountSelector;
