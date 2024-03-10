import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ButtonStyles } from "../../../../common/Styles/Styles";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../../common/loading/Loader";

const PaymentsReview = () => {
  const pmtDetails = useSelector((state) => state.pmnts);
  const currentUser = useSelector((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  let endpoint = "";

  switch (path) {
    case "/payments/self-transfer-review":
      endpoint = "funds-transfer";
      break;
    case "/payments/bill-payments-review":
      endpoint = "bill-payment";
      break;
    case "/payments/pay-anyone-review":
      endpoint = "pay-anyone";
      break;
    default:
      endpoint = "";
  }
  const continueHandler = async () => {
    try {
      setIsLoading(true);
      let response;
      switch (pmtDetails.type) {
        case "ftx":
          response = await fetch(`http://localhost:5000/payments/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fromAccount: pmtDetails.fromAccount.accountNumber,
              toAccount: pmtDetails.toAccount.accountNumber,
              amount: pmtDetails.amount,
              message: pmtDetails.message,
              owner: currentUser.currentUser,
              type: pmtDetails.type,
            }),
          });
          break;
        case "bpay":
          response = await fetch(`http://localhost:5000/payments/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fromAccount: pmtDetails.fromAccount.accountNumber,
              biller: {
                billerName: pmtDetails.biller.billerName,
                billerCode: pmtDetails.biller.billerCode,
                billerRef: pmtDetails.biller.billerRef,
              },
              amount: pmtDetails.amount,
              message: pmtDetails.message,
              owner: currentUser.currentUser,
              type: pmtDetails.type,
            }),
          });
          break;
        case "pan":
          response = await fetch(`http://localhost:5000/payments/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fromAccount: pmtDetails.fromAccount.accountNumber,
              transferType: pmtDetails.transferType,
              amount: pmtDetails.amount,
              message: pmtDetails.message,
              payeeName: pmtDetails.payeeName,
              owner: currentUser.currentUser,
              type: pmtDetails.type,
              ifscCode: pmtDetails?.ifscCode,
              ...(pmtDetails.transferType === "email"
                ? { email: pmtDetails.email }
                : pmtDetails.transferType === "toAccount"
                ? {
                    toAccount: pmtDetails.toAccount,
                  }
                : { mobileNumber: pmtDetails.mobileNumber }),
            }),
          });
          break;
        default:
      }

      setIsLoading(false);
      if (response.ok) {
        navigate("/payments/status", {
          state: { status: "pass", message: "Payment Successful!" },
        });
      } else {
        navigate("/payments/status", {
          state: { status: "fail", message: "Payment Failed!" },
        });
      }
    } catch (err) {
      navigate("/payments/status", {
        state: { status: "fail", message: "Payment Failed!" },
      });
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader message="Posting your Payment" />
      ) : (
        <>
          <table>
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
                  <td>Biller Name:{pmtDetails?.biller?.billerName}</td>
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
                    <p style={{ margin: "-5% 0 0% 0" }}>
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
              margin: "-8px 10px 50px 1%",
              gap: "10px",
              width: "20%",
            }}
          >
            <ButtonStyles
              style={{
                backgroundColor: "transparent",
                borderStyle: "solid",
              }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </ButtonStyles>
            <ButtonStyles onClick={continueHandler}>Continue</ButtonStyles>
          </div>
        </>
      )}
    </>
  );
};
export default PaymentsReview;
