import styled from "styled-components";

export const Select = styled.select`
  width: 50%;
  height: 50px;
  background-color: #12141c;
  border-radius: 3px;
  color: white;
  margin: 0.5% 25% 0.5% 25%;
  font-weight: bold;
`;

export const Option = styled.option`
  width: 50%;
  height: 50px;
  background-color: #eef5ff;
  border-radius: 3px;
  color: #12141c;
  padding: 5% 25%;
  font-weight: bold;
`;

export const Label = styled.label`
  border-radius: 3px;
  margin: ${(props) => (props.addBiller ? "-1% 9% 3% 9%" : "1% 25%")};
  font-family: "Trebuchet MS", sans-serif;
  color: ${(props) => (props.err === true ? "red" : "black")};
`;

export const Input = styled.input`
  display: block;
  width: 49.5%;
  height: 50px;
  background-color: #eef5;
  border-style: solid;
  border-color: black;
  border-radius: 3px;
  color: black;
  margin: 0.5% 25% 0.5% 25%;
  font-weight: bold;
`;

export const CreateButtonStyles = styled.button`
  display: block;
  width: 50%;
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

export const ButtonsDiv = styled.div`
  display: flex;
  margin: ${(props) => (props.modal ? "1.5% 5% 0.5% 5%" : "1.5% 25% 0.5% 25%")};
  gap: 10px;
`;
