import React from "react";
import Navbar, { Footer } from "../../../common/NavBar/Navbar";
import { SidebySideDiv } from "../../../common/PaymentScreen/PaymentScreenStyles";
import Sidebar from "../../../common/Sidebar/Sidebar";
import PaymentsReview from "../../../components/private/payments/common/PaymentsReview";

const PaymentReviewPage = (props) => {
  return (
    <div>
      <Navbar />
      <SidebySideDiv>
        <Sidebar to="Payment" />
        <PaymentsReview />
      </SidebySideDiv>
      <Footer />
    </div>
  );
};
export default PaymentReviewPage;
