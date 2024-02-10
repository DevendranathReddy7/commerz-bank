import React from "react";
import Navbar, { Footer } from "../../../../common/NavBar/Navbar";
import {
  PaymentStatus,
  SidebySideDiv,
} from "../../../../common/PaymentScreen/PaymentScreenStyles";
import Sidebar from "../../../../common/Sidebar/Sidebar";
import { ButtonStyles } from "../../../../common/Styles/Styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";

const PaymentsSuccess = () => {
  const pmtDetails = useSelector((state) => state.pmnts);
  const navigate = useNavigate();
  const location = useLocation();

  const { state } = location;
  return (
    <>
      <Navbar />
      <SidebySideDiv>
        <Sidebar to="Payment" />
        <>
          <table>
            <PaymentStatus pmntStatus={state.status}>
              {state.status === "pass" ? (
                <TiTick size="30px" />
              ) : (
                <RxCross2 size="30px" />
              )}
              {state?.message}
            </PaymentStatus>

            <tbody>
              <tr style={{ fontWeight: "bold" }}>
                <th> Payment Details</th>
                <th>From</th>
                <th>To</th>
              </tr>
              <tr>
                <th>Account Name</th>
                <td>{pmtDetails?.fromAccount?.accountName}</td>
                {pmtDetails.type === "ftx" && (
                  <td>{pmtDetails?.toAccount?.accountName}</td>
                )}
                {pmtDetails.type === "bpay" && (
                  <td>Biller Code: {pmtDetails?.biller?.billerCode}</td>
                )}

                {pmtDetails.type === "pan" && (
                  <td>Payee Name:{pmtDetails?.payeeName}</td>
                )}
              </tr>
              {pmtDetails.type === "ftx" && (
                <tr>
                  <th>Account Number</th>
                  <td>{pmtDetails?.fromAccount?.accountNumber}</td>
                  <td>{pmtDetails?.toAccount?.accountNumber}</td>
                </tr>
              )}

              {pmtDetails.type === "bpay" && (
                <tr>
                  <th>Account Number</th>
                  <td>{pmtDetails?.fromAccount?.accountNumber}</td>
                  <td>
                    <p style={{ margin: "-5% 0 0 0" }}>
                      Biller Code: {pmtDetails?.biller?.billerCode}
                    </p>
                    Reference No: {pmtDetails?.biller?.billerRef}
                  </td>
                </tr>
              )}

              {pmtDetails.type === "pan" && (
                <tr>
                  <th>Account Number</th>
                  <td>{pmtDetails?.fromAccount?.accountNumber}</td>
                  <td>
                    <p style={{ margin: "-5% 0 0% 0" }}>
                      To: {pmtDetails?.transferType}
                    </p>
                    {pmtDetails?.email ||
                      pmtDetails?.mobileNumber ||
                      pmtDetails?.toAccount}
                  </td>
                </tr>
              )}

              <tr>
                <th>Amount</th>
                <td>{pmtDetails?.amount}</td>
              </tr>

              <tr>
                <th>Message</th>
                <td>{pmtDetails?.message || "Not provided"}</td>
              </tr>
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              margin: "-8px 10px 10px 1%",
              gap: "10px",
              width: "20%",
            }}
          >
            <ButtonStyles
              style={{
                backgroundColor: "transparent",
                borderStyle: "solid",
              }}
              onClick={() => navigate("/home")}
            >
              Home
            </ButtonStyles>
            <ButtonStyles onClick={() => navigate("/payments")}>
              New Payment
            </ButtonStyles>
          </div>
        </>
      </SidebySideDiv>
      <Footer />
    </>
  );
};
export default PaymentsSuccess;
