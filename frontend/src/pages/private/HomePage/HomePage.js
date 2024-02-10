import React from "react";
import Navbar, { Footer } from "../../../common/NavBar/Navbar";
import AccountsList from "../../../components/private/AccountsList/AccountsList";

const HomePage = (props) => {
  return (
    <div>
      <Navbar />
      <AccountsList />
      <Footer />
    </div>
  );
};
export default HomePage;
