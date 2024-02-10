import React from "react";
import { NoAccountlistStyle } from "../../components/private/AccountsList/AccountsListStyles";
import { Link } from "react-router-dom";
import { ButtonStyles } from "../../common/Styles/Styles";
import { ButtonsDiv } from "../private/open account/OpenAnAccountStyles";
import { SiCommerzbank } from "react-icons/si";

const FirstPage = () => {
  return (
    <NoAccountlistStyle>
      <span>
        <SiCommerzbank size={"40px"} />
        <h1>Welcome Back</h1>
        <p>
          If you've an existing account with us you can use Login button else
          you can use Signin button to continue to Commerz internet banking.
        </p>
        <ButtonsDiv>
          <ButtonStyles>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#12141c" }}
            >
              Login
            </Link>
          </ButtonStyles>
          <ButtonStyles>
            <Link
              to="/signin"
              style={{ textDecoration: "none", color: "#12141c" }}
            >
              Sigin
            </Link>
          </ButtonStyles>
        </ButtonsDiv>
      </span>
    </NoAccountlistStyle>
  );
};
export default FirstPage;
