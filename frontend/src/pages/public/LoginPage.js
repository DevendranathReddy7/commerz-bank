import React from "react";
import { SiCommerzbank } from "react-icons/si";
import Login from "../../components/public/Login";
import { Div1Styles, Div2Styles, DivStyles } from "./LoginPageStyle.js";

const LoginPage = (props) => {
  return (
    <DivStyles>
      <Div1Styles>
        <h3>
          <span>
            Login to Commerz <div>Internet Banking</div>
          </span>
        </h3>
        <center>
          <SiCommerzbank size={80} color={"#0fbfeb"} />
        </center>
      </Div1Styles>
      <Div2Styles>
        <Login />
      </Div2Styles>
    </DivStyles>
  );
};
export default LoginPage;
