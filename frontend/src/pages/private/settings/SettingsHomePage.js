import React from "react";
import Navbar, { Footer } from "../../../common/NavBar/Navbar";
import Sidebar from "../../../common/Sidebar/Sidebar";
import { SidebySideDiv } from "../../../common/PaymentScreen/PaymentScreenStyles";

const SettingsHomePage = (props) => {
  return (
    <div>
      <Navbar title="Settings" />
      <SidebySideDiv>
        <Sidebar to="Settings" />
      </SidebySideDiv>
      <Footer />
    </div>
  );
};
export default SettingsHomePage;
