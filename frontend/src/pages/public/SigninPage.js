import React from "react";
import { Div1Styles, Div2Styles, DivStyles } from "./LoginPageStyle";
import { SiCommerzbank } from "react-icons/si";
import SignIn from "../../components/public/SignIn";

const SigninPage = (props) => {
  return (
    <DivStyles>
      <Div1Styles>
        <h3>
          <span>
            Register to Commerz <div>Internet Banking</div>
          </span>
        </h3>
        <center>
          <SiCommerzbank size={80} color={"#0fbfeb"} />
        </center>
      </Div1Styles>

      <Div2Styles>
        <SignIn />
      </Div2Styles>
    </DivStyles>
  );
};
export default SigninPage;
