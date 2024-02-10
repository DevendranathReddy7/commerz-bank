import React from "react";
import Navbar, { Footer } from "../../../common/NavBar/Navbar";
import Sidebar from "../../../common/Sidebar/Sidebar";
import { SidebySideDiv } from "../../../common/PaymentScreen/PaymentScreenStyles";

const PaymentsHomePage = (props) => {
  return (
    <div>
      <Navbar title="Payments" />
      <SidebySideDiv>
        <Sidebar to="Payment" />
      </SidebySideDiv>
      <Footer />
    </div>
  );
};
export default PaymentsHomePage;
