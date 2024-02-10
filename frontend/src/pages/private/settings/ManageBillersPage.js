import React from "react";
import Navbar, { Footer } from "../../../common/NavBar/Navbar";
import { SidebySideDiv } from "../../../common/PaymentScreen/PaymentScreenStyles";
import Sidebar from "../../../common/Sidebar/Sidebar";
import ManageBillers from "../../../components/private/settings/billers/ManageBillers";

const ManageBillersPage = (props) => {
  return (
    <div>
      <Navbar />
      <SidebySideDiv>
        <Sidebar to="Settings" />
        <ManageBillers />
      </SidebySideDiv>
      <Footer />
    </div>
  );
};
export default ManageBillersPage;
