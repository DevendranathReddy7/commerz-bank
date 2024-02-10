import React, { useEffect, useState } from "react";
import PayeeModal from "../../../../common/modal/PayeeModal";
import { useDispatch, useSelector } from "react-redux";
import { savePayees } from "../../../../storeSetup/actions/settingsActions";

const PayeeSelector = ({ onClick }) => {
  const [payees, setPayees] = useState();
  const currentUserId = useSelector((state) => state.login.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const getBillers = async () => {
      const responseData = await fetch(
        `http://localhost:5000/settings/payees/${currentUserId}`
      );
      const response = await responseData.json();
      dispatch(savePayees(response.payees));
      setPayees(response.payees);
    };
    getBillers();
  }, [currentUserId, dispatch]);

  const selectedPayee = (acc) => {
    onClick(acc);
  };

  return (
    <div>
      <PayeeModal
        modalOpen={true}
        items={payees}
        onClick={selectedPayee}
      ></PayeeModal>
    </div>
  );
};
export default PayeeSelector;
