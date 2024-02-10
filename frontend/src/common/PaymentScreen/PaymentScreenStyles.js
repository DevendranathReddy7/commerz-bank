import styled from "styled-components";
export const InputSelectAccount = styled.input`
  width: 80.5%;
  height: 70px;
  border-style: solid;
  border-color: black;
  margin-left: 9%;
  margin-bottom: 1%;
  border-radius: 3px;
`;

export const SidebySideDiv = styled.div`
  display: flex;
`;

export const PaymentButtons = styled.button`
  display: block;
  width: 31%;
  height: 50px;
  background-color: ${(props) =>
    props.cancel ? "#eef5" : props.disabled === true ? "grey" : "#0fbfeb"};
  border-style: solid;
  border-color: ${(props) => (props.cancel ? "#12141c" : "")};
  font-weight: bold;
  border-radius: 3px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;

export const PaymentsButtonsDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2%;
  gap: 10px;
`;

export const AccountList = styled.li`
  width: 81%;
  height: 70px;
  border-style: solid;
  border-color: black;
  margin-left: 9%;
  margin-bottom: 1%;
  border-radius: 3px;
  list-style-type: none;
`;

export const AccountsModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 40%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  background-color: #12141c;
  border-radius: 3px;
  border-style: none;
  color: #0fbfeb;
  margin: 10% 5% 10% 36%;
  padding: 1% 6%;
  font-weight: bold;
  border-radius: 3px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;

export const AccountListDropdown = styled.li`
  width: 81%;
  height: 70px;
  display: flex;
  border-style: solid;
  border-color: black;
  margin-left: 9%;
  margin-top: -1%;
  margin-bottom: 2%;
  border-radius: 3px;
  list-style-type: none;
  background-color: #e8f9fe;
  border-color: #e8f9fe;

  align-items: center;
  justify-content: space-between;
`;

export const PaymentStatus = styled.h4`
  background-color: ${(props) =>
    props.pmntStatus === "pass" ? "green" : "red"};
  padding: 10px;
  margin: 0% 0 -13% 1%;
  border-radius: 3px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2%;
`;
