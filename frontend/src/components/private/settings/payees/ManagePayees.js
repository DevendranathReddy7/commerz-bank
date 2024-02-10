import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NoAccountlistStyle } from "../../AccountsList/AccountsListStyles";
import { VscError } from "react-icons/vsc";
import { Tip } from "../../transactionHistory/TransactionHistoryStyles";
import { LuBadgeInfo } from "react-icons/lu";
import {
  AddBillerBtn,
  ChildDiv,
  P,
  ParentDiv,
  SearchInput,
} from "../billers/billerStyles";
import Loader from "../../../../common/loading/Loader";
import { useNavigate } from "react-router-dom";
import EachPayee from "./EachPayee";

const Managepayees = () => {
  const currentUser = useSelector((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [payees, setPayees] = useState();
  const [deleteHandlerTrigger, setDeleteHandlerTrigger] = useState(false);
  const [showDeleteMsg, setShowDeleteMsg] = useState(false);
  const navigate = useNavigate();

  const deletePayeeHandler = useCallback(async (id) => {
    setIsLoading(true);
    const response = await fetch(
      `http://localhost:5000/settings/payees/${id}`,
      { method: "DELETE" }
    );
    await response.json();
    setDeleteHandlerTrigger((prev) => !prev);
    setShowDeleteMsg(true);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const getPayees = async () => {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5000/settings/payees/${currentUser.currentUser}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setPayees(data);
      setIsLoading(false);
    };
    getPayees();
  }, [currentUser, deleteHandlerTrigger]);

  useEffect(() => {
    if (showDeleteMsg) {
      setTimeout(() => {
        setShowDeleteMsg(false);
      }, 3000);
    }
  }, [showDeleteMsg]);

  const clickAddBillerHandler = (e) => {
    e.preventDefault();
    navigate("/settings/add-payee");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "60%",
      }}
    >
      <Tip biller>
        <LuBadgeInfo />
        {showDeleteMsg ? (
          <P delete tip>
            Payee deleted successfully..
          </P>
        ) : (
          <P tip>
            Click on Add Payee to add & save Payee for future transactions.
          </P>
        )}
      </Tip>
      <ParentDiv>
        <ChildDiv>
          <SearchInput type="search" placeholder="Search for biller code" />
        </ChildDiv>
        <form onSubmit={clickAddBillerHandler}>
          <AddBillerBtn>Add Payee</AddBillerBtn>
        </form>
      </ParentDiv>
      {isLoading ? (
        <Loader message="Fetching your saved payees" />
      ) : payees?.payees?.length === 0 ? (
        !isLoading && (
          <NoAccountlistStyle>
            <VscError size={"25%"} color="#FF7F7F" />
            <span>
              <p>Nothing here to show</p>
              <p>
                Add a payee by clicking on Add Payee button on the top to show
                your saved payees here.
              </p>
            </span>
          </NoAccountlistStyle>
        )
      ) : (
        payees?.payees.map((payee) => (
          <EachPayee payee={payee} onClick={deletePayeeHandler} />
        ))
      )}
    </div>
  );
};
export default Managepayees;
