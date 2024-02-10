import { useEffect, useState } from "react";
import { AccountsModalDiv } from "../PaymentScreen/PaymentScreenStyles";
import EachAccount from "./EachAccount";
import { SaveAccounts } from "../../storeSetup/actions/accountsAction";
import { useDispatch, useSelector } from "react-redux";

const AccountsModal = ({ modalOpen, acc, onClick }) => {
  const [isModalOpen, setModalOpen] = useState(modalOpen);
  const currentUserId = useSelector((state) => state.login.currentUser);
  const dispatch = useDispatch();

  const handleOverlayClick = (e) => {
    // Check if the click occurred on the overlay (outside the modal content)
    if (e.target === e.currentTarget) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    const getAccounts = async () => {
      const responseData = await fetch(
        `http://localhost:5000/accounts/${currentUserId}`
      );
      const response = await responseData.json();
      dispatch(SaveAccounts({ accounts: response.accounts, currentUserId }));
      //setAccounts(response.accounts);
    };
    getAccounts();
    //eslint-disable-next-line
  }, [currentUserId]);

  const modelHandle = (acc) => {
    setModalOpen((prev) => !prev);
    onClick(acc);
  };
  return (
    isModalOpen && (
      <AccountsModalDiv onClick={handleOverlayClick}>
        {acc?.map((acc) => (
          <EachAccount acc={acc} onClick={modelHandle} />
        ))}
      </AccountsModalDiv>
    )
  );
};
export default AccountsModal;
