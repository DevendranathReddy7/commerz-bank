import React from "react";
import Navbar, { Footer } from "../../../common/NavBar/Navbar";
import { SidebySideDiv } from "../../../common/PaymentScreen/PaymentScreenStyles";
import Sidebar from "../../../common/Sidebar/Sidebar";
import AddBiller from "../../../components/private/settings/billers/AddBiller";

const AddBillerPage = (props) => {
  return (
    <div>
      <Navbar />
      <SidebySideDiv>
        <Sidebar to="Settings" />
        <AddBiller />
      </SidebySideDiv>
      <Footer />
    </div>
  );
};
export default AddBillerPage;
