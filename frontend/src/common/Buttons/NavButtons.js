import React from "react";
import { NavButtonStyle } from "../Styles/Styles";
import { Link } from "react-router-dom";
const NavButtons = ({ to, children }) => {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <NavButtonStyle>{children}</NavButtonStyle>
    </Link>
  );
};
export default NavButtons;
