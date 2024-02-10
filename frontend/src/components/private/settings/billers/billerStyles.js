import styled from "styled-components";

export const ParentDiv = styled.div`
  display: flex;
  align-items: start;
  margin-left: 8.5%;
  justify-content: space-between;
`;

export const ChildDiv = styled.div`
  display: flex;
  align-items: center; /* Vertical alignment for labels and checkboxes */
  margin: 5px;
  gap: 2px;
  width: 70%;
`;

export const AddBillerBtn = styled.button`
  display: block;
  width: 100px;
  height: 50px;
  margin-top: 5px;
  background-color: transparent;
  border-style: solid;
  border-color: #0fbfeb;
  font-weight: bold;
  border-radius: 3px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 50px;
  border-style: solid;
  border-color: black;
  border-radius: 3px;
`;

export const DivBiller = styled.div`
  border-radius: 3px;
  border-style: none;
  margin-bottom: 3px;
  margin-top: 5px;
  margin-left: 9%;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #eef5ff;
`;

export const P = styled.p`
  font-size: 18px;
  color: ${(props) => (props.delete ? "red" : "#12141c")};
  padding-right: 15px;
  &:active,
  &:hover {
    text-decoration: ${(props) => (props.tip ? "none" : "underline")};
  }
`;
