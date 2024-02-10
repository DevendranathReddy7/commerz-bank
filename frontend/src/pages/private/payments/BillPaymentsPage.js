import React from "react";
import BillPayments from "../../../components/private/payments/BillPayments";
import Navbar, { Footer } from "../../../common/NavBar/Navbar";
import { SidebySideDiv } from "../../../common/PaymentScreen/PaymentScreenStyles";
import Sidebar from "../../../common/Sidebar/Sidebar";

const BillPaymentsPage = (props) => {
  return (
    <div>
      <Navbar title="Payments" />
      <SidebySideDiv>
        <Sidebar to="Payment" />
        <BillPayments />
      </SidebySideDiv>
      <Footer />
    </div>
  );
};
export default BillPaymentsPage;
