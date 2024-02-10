import React from "react";
import Navbar, { Footer } from "../../../common/NavBar/Navbar";
import { SidebySideDiv } from "../../../common/PaymentScreen/PaymentScreenStyles";
import Sidebar from "../../../common/Sidebar/Sidebar";
import TransactionHistory from "../../../components/private/transactionHistory/TransactionHistory";

const TransactionHistoryPage = (props) => {
  return (
    <>
      <Navbar />
      <SidebySideDiv>
        <Sidebar to="Payment" />
        <TransactionHistory />
      </SidebySideDiv>
      <Footer />
    </>
  );
};
export default TransactionHistoryPage;
