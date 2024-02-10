import React, { useState } from "react";
import { ButtonStyles, InputStyles } from "../../common/Styles/Styles";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../../common/error/ErrorModal";
import { login } from "../../storeSetup/actions/loginAction";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    number: "",
    password: "",
  });
  const [error, setError] = useState({ error: false, msg: "" });
  const [manadatoryFiledCheck, setMandatoryFiledCheck] = useState(false);
  const dataHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (formData.number.trim() === "") {
      const elm = document.getElementById("mobile");
      setMandatoryFiledCheck(true);
      elm.focus();
      return;
    }

    if (formData.password.trim() === "") {
      const elm = document.getElementById("password");
      setMandatoryFiledCheck(true);
      elm.focus();
      return;
    }
    setMandatoryFiledCheck(false);
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      dispatch(login(data.user));
      setError((prev) => ({ ...prev, error: false, msg: "" }));
      navigate("/home");
    } else {
      setError((prev) => ({ ...prev, error: true, msg: data.message }));
    }
  };

  const errorCloseHandler = () => {
    setError((prev) => ({ ...prev, error: false, msg: "" }));
  };
  return (
    <>
      {error.error && (
        <ErrorModal message={error.msg} onClose={errorCloseHandler} />
      )}
      <form onSubmit={submitHandler}>
        <label>Enter Mobile Number</label>
        <InputStyles
          onChange={dataHandler}
          name="number"
          id="mobile"
          err={manadatoryFiledCheck}
        />
        <label>Enter Password</label>
        <InputStyles
          type="password"
          onChange={dataHandler}
          name="password"
          id="password"
          err={manadatoryFiledCheck}
        />
        <ButtonStyles>🔒Log-in</ButtonStyles>
        <hr />
        <p>
          New to Commerz?{" "}
          <Link to="/signin" style={{ textDecoration: "none" }}>
            <ButtonStyles>Open an account</ButtonStyles>
          </Link>
        </p>
      </form>
    </>
  );
};
export default Login;
