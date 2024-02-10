import React from "react";
import {
  DivSideBar,
  PaymentButtonStyle,
  SidebarContainer,
} from "../Styles/Styles";
import { Link } from "react-router-dom";
const Payment = [
  { path: "/payments/self-transfer", name: "Self Transfer" },
  { path: "/payments/bill-payment", name: "Bill Payments" },
  { path: "/payments/pay-anyone", name: "Pay Any One" },
  { path: "/payments/history", name: "Payment History" },
];
const Settings = [
  { path: "/settings/manage-billers", name: "Manage Billers" },
  { path: "/settings/manage-payees", name: "Manage Payees" },
];
const Sidebar = ({ to }) => {
  const page = to === "Payment" ? Payment : Settings;
  return (
    <>
      <SidebarContainer>
        {page?.map((item, index) => (
          <DivSideBar>
            <PaymentButtonStyle key={index}>
              <Link
                to={item.path}
                style={{ textDecoration: "none", color: "#0fbfeb" }}
              >
                {item.name}
              </Link>
            </PaymentButtonStyle>
          </DivSideBar>
        ))}
      </SidebarContainer>
    </>
  );
};
export default Sidebar;
