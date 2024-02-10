import React, { useEffect, useState } from "react";
import BillerModal from "../../../../common/modal/BillerModal";
import { saveBillers } from "../../../../storeSetup/actions/settingsActions";
import { useDispatch, useSelector } from "react-redux";

const BillerSelector = ({ onClick }) => {
  const [billers, setBilers] = useState();
  const currentUserId = useSelector((state) => state.login.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const getBillers = async () => {
      const responseData = await fetch(
        `http://localhost:5000/settings/billers/${currentUserId}`
      );
      const response = await responseData.json();
      dispatch(saveBillers({ billers: response.billers, currentUserId }));
      setBilers(response.billers);
    };
    getBillers();
  }, [currentUserId, dispatch]);

  const selecteFromAccount = (acc) => {
    onClick(acc);
  };

  return (
    <div>
      <BillerModal
        modalOpen={true}
        onClick={selecteFromAccount}
        items={billers}
      ></BillerModal>
    </div>
  );
};

export default BillerSelector;
