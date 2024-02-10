import React from "react";
import Navbar, { Footer } from "../../../common/NavBar/Navbar";
import { SidebySideDiv } from "../../../common/PaymentScreen/PaymentScreenStyles";
import Sidebar from "../../../common/Sidebar/Sidebar";
import PayAnyone from "../../../components/private/payments/PayAnyone";

const PayAnyonePage = (props) => {
  return (
    <div>
      <Navbar title="Payments" />
      <SidebySideDiv>
        <Sidebar to="Payment" />
        <PayAnyone />
      </SidebySideDiv>
      <Footer />
    </div>
  );
};
export default PayAnyonePage;
