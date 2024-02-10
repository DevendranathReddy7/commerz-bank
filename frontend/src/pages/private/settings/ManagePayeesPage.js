import React from "react";
import Navbar, { Footer } from "../../../common/NavBar/Navbar";
import { SidebySideDiv } from "../../../common/PaymentScreen/PaymentScreenStyles";
import Sidebar from "../../../common/Sidebar/Sidebar";
import ManagePayees from "../../../components/private/settings/payees/ManagePayees";

const ManagePayeesPage = (props) => {
  return (
    <div>
      <Navbar />
      <SidebySideDiv>
        <Sidebar to="Settings" />
        <ManagePayees />
      </SidebySideDiv>
      <Footer />
    </div>
  );
};
export default ManagePayeesPage;
