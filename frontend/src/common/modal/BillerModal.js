import React, { useState } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { AccountsModalDiv } from "../PaymentScreen/PaymentScreenStyles";
import EachBiller from "./EachBiller";
//import { saveBillers } from "../../storeSetup/actions/settingsActions";
import { AddBillerBtn } from "../../components/private/settings/billers/billerStyles";
import { useNavigate } from "react-router-dom";

const BillerModal = ({ modalOpen, items, onClick }) => {
  const [isModalOpen, setModalOpen] = useState(modalOpen);
  // const [billers, setBilers] = useState();
  // const currentUserId = useSelector((state) => state.login.currentUser);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOverlayClick = (e) => {
    // Check if the click occurred on the overlay (outside the modal content)
    if (e.target === e.currentTarget) {
      setModalOpen(false);
    }
  };
  // useEffect(() => {
  //   const getBillers = async () => {
  //     const responseData = await fetch(
  //       `http://localhost:5000/settings/billers/${currentUserId}`
  //     );
  //     const response = await responseData.json();
  //     dispatch(saveBillers({ billers: response.billers, currentUserId }));
  //     setBilers(response.billers);
  //   };
  //   getBillers();
  // }, [currentUserId, dispatch]);

  const modelHandle = (acc) => {
    setModalOpen((prev) => !prev);
    onClick(acc);
  };

  const clickAddBillerHandler = (e) => {
    e.preventDefault();
    navigate("/settings/add-biller");
  };
  return (
    isModalOpen && (
      <AccountsModalDiv onClick={handleOverlayClick}>
        <form onSubmit={clickAddBillerHandler}>
          <div
            style={{
              float: "right",
              marginBottom: "3%",
              backgroundColor: "#0fbfeb",
              borderRadius: "3px",
            }}
          >
            <AddBillerBtn>Add Biller</AddBillerBtn>
          </div>
        </form>
        <hr style={{ width: "100%", marginBottom: "4%", marginTop: "-1%" }} />
        {items?.length === 0 && (
          <p>
            No saved billers available..please add a new one by clicking on Add
            Biller button.
          </p>
        )}
        {items?.map((acc) => (
          <EachBiller acc={acc} onClick={modelHandle} />
        ))}
      </AccountsModalDiv>
    )
  );
};
export default BillerModal;
