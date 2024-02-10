import styled from "styled-components";

export const CheckBox = styled.input`
  height: 40px;
  width: 20px;
`;

export const CheckboxParentDiv = styled.div`
  display: flex;
  align-items: start;
  margin-left: 8.5%;
`;

export const CheckboxChildDiv = styled.div`
  display: flex;
  align-items: center; /* Vertical alignment for labels and checkboxes */
  margin: 5px;
  gap: 2px;
`;

export const Label = styled.label`
  margin-right: 10px; /* Adjust spacing between label and checkbox */
  font-weight: bold;
`;

export const Tip = styled.p`
  margin-left: 9%; /* Adjust spacing between label and checkbox */
  background-color: ${(props) => (props.err === true ? "red" : "#e8f9fe")};
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: -8px;
  width: ${(prop) => (prop.biller ? "89%" : prop.addBiller ? "79%" : "100%")};
`;
export const SearchButton = styled.button`
  display: block;
  width: 100px;
  height: 35px;
  margin-top: 10%;
  background-color: #0fbfeb;
  border-style: none;
  font-weight: bold;
  border-radius: 3px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;

export const HistoryList = styled.li`
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: 1fr 1.5fr 2fr 2fr 1fr 1fr;
  border-style: solid;
  border-color: black;
  margin-left: 9%;
  margin-top: ${(props) => (props.heading ? "1%" : "0%")};
  margin-bottom: 1%;
  border-radius: 5px;
  list-style-type: none;
  background-color: ${(props) =>
    props.heading ? "#12141c" : props.bgC === "failed" ? "#fc6f6f" : "#e8f9fe"};
  color: ${(props) => (props.heading ? "white" : "black")};
  border-color: #e8f9fe;
  padding: 0px 5px;
  align-items: center;
`;

export const Image = styled.img`
  width: 30px;
  padding: 10px 2px 10px 1px;
  /* &:hover {
    width: 40px;
  } */
`;
