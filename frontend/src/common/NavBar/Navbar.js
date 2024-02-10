import { SiCommerzbank } from "react-icons/si";
import { GoHome } from "react-icons/go";
import {
  ButtonStyles,
  DivNav,
  FooterContainer,
  FooterPara,
  TitleElemnt,
} from "../Styles/Styles";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { DivNotifications } from "../../pages/private/HomePage/HomePageStyles";
import NavButtons from "../Buttons/NavButtons";
import { useCallback } from "react";
const Navbar = () => {
  const selectLoginInfo = useCallback(
    (state) => ({
      userName: state.login.name,
      currentUser: state.login.currentUser,
    }),
    []
  );

  const { userName, currentUser } = useSelector(selectLoginInfo);
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  return (
    <>
      <DivNav>
        <div style={{ display: "inline-flex" }}>
          <SiCommerzbank size={40} color="#0fbfeb" />
          <div onClick={() => navigate("/home")}>
            <TitleElemnt>Commerz</TitleElemnt>
          </div>
          <div>
            <TitleElemnt>{userName}</TitleElemnt>
          </div>
        </div>
        <div>
          <ButtonStyles
            login
            onClick={
              !currentUser ? () => navigate("/login") : () => navigate("/")
            }
          >
            {currentUser ? "🔒 Logout" : "🔒 Login"}
          </ButtonStyles>
        </div>
      </DivNav>
      {pathName === "/home" ? (
        <DivNotifications>
          <NavButtons to="/home">
            <GoHome />
          </NavButtons>
          <NavButtons to="/payments">Payments</NavButtons>
          <NavButtons to="/settings">Settings</NavButtons>
          <NavButtons to="/open-new-account">Open new account</NavButtons>
        </DivNotifications>
      ) : (
        <>
          <NavButtons to="/home">
            <GoHome />
          </NavButtons>
          <NavButtons to="/payments">Payments</NavButtons>
          <NavButtons to="/settings">Settings</NavButtons>
          <NavButtons to="/open-new-account">Open new account</NavButtons>
        </>
      )}
    </>
  );
};
export default Navbar;

export const Footer = () => {
  return (
    <FooterContainer>
      <DivNav>
        <FooterPara>©️ 2024 Commerz Bank. All rights reserved</FooterPara>
      </DivNav>
    </FooterContainer>
  );
};
