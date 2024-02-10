import { combineReducers } from "redux";
import LOGIN from "./loginReducer";
import SaveAccounts from "./accountsReducer";
import payments from "./paymentsReducer";
import billers from "./settingsReducer";

const rootReducer = combineReducers({
  login: LOGIN,
  accounts: SaveAccounts,
  pmnts: payments,
  billers: billers,
});

export default rootReducer;
