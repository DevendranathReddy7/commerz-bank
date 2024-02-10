import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./storeSetup/store";
import { Provider } from "react-redux";

import LoginPage from "./pages/public/LoginPage";
import SigninPage from "./pages/public/SigninPage";
import HomePage from "./pages/private/HomePage/HomePage";
import PaymentsHomePage from "./pages/private/payments/PaymentsHomePage";
import SettingsHomePage from "./pages/private/settings/SettingsHomePage";
import OpenAnAccount from "./pages/private/open account/OpenAnAccount";
import FundsTransferPage from "./pages/private/payments/FundsTransferPage";
import FirstPage from "./pages/public/FirstPage";
import BillPaymentsPage from "./pages/private/payments/BillPaymentsPage";
import PaymentReviewPage from "./pages/private/payments/PaymentReviewPage";
import PaymentsSuccess from "./components/private/payments/common/PaymentsSuccess";
import TransactionHistoryPage from "./pages/private/transactionHistory/TransactionHistoryPage";
import ManageBillersPage from "./pages/private/settings/ManageBillersPage";
import AddBillerPage from "./pages/private/settings/AddBillerPage";
import PayAnyonePage from "./pages/private/payments/PayAnyonePage";
import ManagePayeesPage from "./pages/private/settings/ManagePayeesPage";
import AddPayeesPage from "./pages/private/settings/AddPayeesPage";

const App = () => {
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     const message =
  //       "Unfortunately you can't reload the session, if you continue you have to login again if you want to use internet banking.Please click Cancel if wish to continue in the same session";
  //     event.returnValue = message; // Standard for most browsers
  //     return message; // For some older browsers
  //   };

  //   // Add event listener when the component mounts
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []); // Empty dependency array ensures this effect runs only once

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/payments" element={<PaymentsHomePage />}></Route>
          <Route
            path="payments/self-transfer"
            element={<FundsTransferPage />}
          />
          <Route
            path="payments/self-transfer-review"
            element={<PaymentReviewPage />}
          />
          <Route
            path="payments/bill-payments-review"
            element={<PaymentReviewPage />}
          />
          <Route
            path="payments/pay-anyone-review"
            element={<PaymentReviewPage />}
          />

          <Route path="payments/history" element={<TransactionHistoryPage />} />
          <Route path="payments/status" element={<PaymentsSuccess />} />
          <Route path="/payments/bill-payment" element={<BillPaymentsPage />} />
          <Route path="/payments/pay-anyone" element={<PayAnyonePage />} />
          <Route path="/payments/history" element={""} />
          <Route path="/settings" element={<SettingsHomePage />}></Route>
          <Route
            path="/settings/manage-billers"
            element={<ManageBillersPage />}
          />
          <Route path="/settings/add-biller" element={<AddBillerPage />} />
          <Route
            path="/settings/manage-payees"
            element={<ManagePayeesPage />}
          />
          <Route path="/settings/add-payee" element={<AddPayeesPage />} />
          <Route path="/open-new-account" element={<OpenAnAccount />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
