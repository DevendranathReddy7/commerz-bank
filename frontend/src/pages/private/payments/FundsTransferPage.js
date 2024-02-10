import React from "react";
import FundsTransfer from "../../../components/private/payments/FundsTransfer";
import Navbar, { Footer } from "../../../common/NavBar/Navbar";
import { SidebySideDiv } from "../../../common/PaymentScreen/PaymentScreenStyles";
import Sidebar from "../../../common/Sidebar/Sidebar";

const FundsTransferPage = (props) => {
  return (
    <>
      <Navbar title="Payments" />
      <SidebySideDiv>
        <Sidebar to="Payment" />
        <FundsTransfer />
      </SidebySideDiv>
      <Footer />
    </>
  );
};
export default FundsTransferPage;
