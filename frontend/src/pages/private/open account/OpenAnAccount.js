import React, { useState } from "react";
import Navbar, { Footer } from "../../../common/NavBar/Navbar";
import {
  ButtonsDiv,
  CreateButtonStyles,
  Input,
  Label,
  Option,
  Select,
} from "./OpenAnAccountStyles";
import { MdOutlineDownloadDone } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../../../common/modal/Modal";
import Loader from "../../../common/loading/Loader";

const OpenAnAccount = () => {
  const currentUser = useSelector((state) => state.login.currentUser);
  const navigate = useNavigate();
  const state = {
    accountName: "",
    accountNumber: "",
    balance: "",
    owner: currentUser,
  };
  const [formData, setFormData] = useState(state);
  const [success, setSuccess] = useState(false);
  const [Balerror, setBalError] = useState(false);
  const [Accerror, setAccError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeHandle = (e) => {
    if (e.target.value % 100 === 0 && e.target.value > 99) {
      setBalError(false);
      setFormData((prev) => ({
        ...prev,
        balance: e.target.value,
      }));
    } else {
      setBalError(true);
    }
  };

  const accountHandle = (e) => {
    setAccError(false);
    setFormData((prev) => ({ ...prev, accountName: e.target.value }));
  };

  const cancelHandle = () => {
    setFormData(state);
    navigate("/home");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBalError(false);
    setSuccess(false);
    setAccError(false);

    if (formData.accountName === "") {
      return setAccError(true);
    }

    if (formData.balance === undefined || formData.balance === "") {
      return setBalError(true);
    } else {
      setBalError(false);
    }

    setIsLoading(true);
    const responseData = await fetch(
      "http://localhost:5000/accounts/open-an-account",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountName: formData.accountName,
          accountNumber: formData.accountNumber,
          balance: formData.balance,
          owner: formData.owner,
        }),
      }
    );
    await responseData.json();
    if (responseData.ok) {
      setIsLoading(false);
      setSuccess(true);
    }
  };
  return (
    <div style={{ marginBottom: "20%" }}>
      <Navbar />
      <form onSubmit={submitHandler}>
        {!currentUser && (
          <Label>
            This is Unauthorised action.Please login to Commerz first! by
            clicking on Login button.
          </Label>
        )}
        {isLoading && <Loader message="Creating your account" />}
        {success && (
          <Modal modalOpen={success}>
            <MdOutlineDownloadDone size={"30%"} color="green" />
            <p>Your account got created successfully! </p>
          </Modal>
        )}
        <Select onChange={(e) => accountHandle(e)}>
          <Option disabled selected>
            Choose An Account
          </Option>
          <Option>Cheque Account</Option>
          <Option>Credit Card</Option>
          <Option>Loan Account</Option>
          <Option>Reward Account</Option>
          <Option>Savings Account</Option>
        </Select>
        {Accerror && (
          <Label err={Accerror}>Please choose an account type.</Label>
        )}

        <Input
          type="text"
          onChange={(e) => changeHandle(e)}
          placeholder="Amount to be deposited"
        />
        <Label err={Balerror}>
          Note: you have to depost in 100 multiples only.
        </Label>
        {/* <Input value={currentUser} type="hidden" /> */}

        <ButtonsDiv>
          <CreateButtonStyles cancel type="button" onClick={cancelHandle}>
            Cancel
          </CreateButtonStyles>
          <CreateButtonStyles
            disabled={Balerror || Accerror || isLoading || !currentUser}
          >
            Create Account
          </CreateButtonStyles>
        </ButtonsDiv>
      </form>
      <Footer />
    </div>
  );
};
export default OpenAnAccount;
