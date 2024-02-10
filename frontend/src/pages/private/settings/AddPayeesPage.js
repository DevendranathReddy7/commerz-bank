import React from "react";
import Navbar, { Footer } from "../../../common/NavBar/Navbar";
import { SidebySideDiv } from "../../../common/PaymentScreen/PaymentScreenStyles";
import Sidebar from "../../../common/Sidebar/Sidebar";
import AddPayee from "../../../components/private/settings/payees/AddPayee";

const AddPayeesPage = (props) => {
  return (
    <div>
      <Navbar />
      <SidebySideDiv>
        <Sidebar to="Settings" />
        <AddPayee />
      </SidebySideDiv>
      <Footer />
    </div>
  );
};
export default AddPayeesPage;
