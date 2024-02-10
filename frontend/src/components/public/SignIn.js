import React, { useEffect, useState } from "react";

import { ButtonStyles, InputStyles } from "../../common/Styles/Styles";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../../common/error/ErrorModal";
import { useDispatch } from "react-redux";
import { login } from "../../storeSetup/actions/loginAction";

const SignIn = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    password: "",
  });
  const [mandatoryFieldCheck, setMandatoryFieldCheck] = useState({});
  const [error, setError] = useState({ status: false, msg: "" });

  const dataHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (
      formData.name.trim() === "" ||
      formData.number.trim() === "" ||
      formData.password.trim().length < 6
    ) {
      setMandatoryFieldCheck(true);
    } else {
      setMandatoryFieldCheck(false);
    }
  }, [formData.name, formData.number, formData.password]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    //in future generate a random number for each signin

    const data = await response.json();

    if (response.ok) {
      setError({ status: false, msg: "" });
      dispatch(login(data.user));
      navigate("/home");
    } else {
      setError((prev) => ({ ...prev, status: true, msg: data.message }));
    }
  };

  const errorCloseHandler = () => {
    setError((prev) => ({ ...prev, status: false, msg: "" }));
  };

  return (
    <form onSubmit={submitHandler}>
      {error.status && (
        <ErrorModal message={error.msg} onClose={errorCloseHandler} />
      )}
      <label>Enter Name</label>
      <InputStyles onChange={dataHandler} name="name" />
      <label>Enter Mobile Number</label>
      <InputStyles onChange={dataHandler} name="number" />
      <label>Enter Password</label>
      <InputStyles
        onChange={dataHandler}
        name="password"
        placeholder="Enter atleast 6 chars"
      />
      <ButtonStyles type="submit" disabled={mandatoryFieldCheck}>
        Create an Account
      </ButtonStyles>
      <hr />
      <p>
        Existing Customer?
        <Link to="/login" style={{ textDecoration: "none" }}>
          <ButtonStyles>Login</ButtonStyles>
        </Link>
      </p>
    </form>
  );
};
export default SignIn;
