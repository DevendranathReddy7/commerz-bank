import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EachBiller from "./EachBiller";
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
} from "./billerStyles";
import Loader from "../../../../common/loading/Loader";
import { useNavigate } from "react-router-dom";

const ManageBillers = () => {
  const currentUser = useSelector((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [billers, setBillers] = useState();
  const [deleteHandlerTrigger, setDeleteHandlerTrigger] = useState(false);
  const [showDeleteMsg, setShowDeleteMsg] = useState(false);
  const navigate = useNavigate();
  const deleteBillerHandler = useCallback(async (id) => {
    setIsLoading(true);
    const response = await fetch(
      `http://localhost:5000/settings/billers/${id}`,
      { method: "DELETE" }
    );
    await response.json();
    setDeleteHandlerTrigger((prev) => !prev);
    setShowDeleteMsg(true);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const getBillers = async () => {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5000/settings/billers/${currentUser.currentUser}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setBillers(data);
      setIsLoading(false);
    };
    getBillers();
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
    navigate("/settings/add-biller");
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
            Biller deleted successfully..
          </P>
        ) : (
          <P tip>
            Click on Add Biller to add & save biller for future transactions.
          </P>
        )}
      </Tip>
      <ParentDiv>
        <ChildDiv>
          <SearchInput type="search" placeholder="Search for biller code" />
        </ChildDiv>
        <form onSubmit={clickAddBillerHandler}>
          <AddBillerBtn>Add Biller</AddBillerBtn>
        </form>
      </ParentDiv>
      {isLoading ? (
        <Loader message="Fetching your saved billers" />
      ) : billers?.billers?.length === 0 ? (
        <NoAccountlistStyle>
          <VscError size={"25%"} color="#FF7F7F" />
          <span>
            <p>Nothing here to show</p>
            <p>
              Add a biller by clicking on Add Biller button on top to show your
              saved biller here.
            </p>
          </span>
        </NoAccountlistStyle>
      ) : (
        billers?.billers?.map((biller) => (
          <EachBiller
            key={biller._id}
            biller={biller}
            onClick={deleteBillerHandler}
          />
        ))
      )}
    </div>
  );
};
export default ManageBillers;
