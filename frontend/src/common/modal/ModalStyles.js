import styled from "styled-components";

export const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 40%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-content: center;
  background-color: #12141c;
  border-style: none;
  color: #0fbfeb;
  margin: 9% 15% 10% 25%;
  padding: 1% 6%;
  font-weight: bold;
  border-radius: 3px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;

/* Modal Content */
export const ModalContentDiv = styled.div`
  margin: 1% auto;
  padding: 25px;
  width: 80%;
`;

export const CloseButton = styled.button`
  /* color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold; */

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

// .close:hover,
// .close:focus {
//   color: black;
//   text-decoration: none;
//   cursor: pointer;
// }
