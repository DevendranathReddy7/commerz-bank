import styled from "styled-components";

export const DivAccountsList = styled.div`
  width: 75%;
  height: 90%;
  margin: 0 12%;
  margin-bottom: 100px;
`;

export const DivAccount = styled.div`
  border-radius: 3px;
  border-style: solid;
  margin-bottom: 30px;
  margin-top: -15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #eef5ff;
`;
export const ListItem = styled.li`
  list-style-type: none;
`;

export const Image = styled.img`
  width: 40px;
  padding: 10px 2px 10px 10px;
`;

export const NoAccountlistStyle = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #12141c;
  border-style: none;
  box-shadow: 10px 10px 20px beige;
  color: #0fbfeb;
  margin: 2% 15% 3% 25%;
  padding: ${(props) => (props.modal ? "2% 5% 3% 5%" : "5%")};
  font-weight: bold;
  border-radius: 3px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;
