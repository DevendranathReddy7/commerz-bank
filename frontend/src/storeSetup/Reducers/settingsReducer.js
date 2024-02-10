const intitalState = {
  billerName: "",
  billerCode: "",
  billerRef: "",
  payeeName: "",
  transferType: "",
  email: "",
  toAccount: "",
  mobileNumber: "",
};

const settings = (state = intitalState, action) => {
  switch (action.type) {
    case "SAVE_BILLERS":
      return {
        ...state,
        billerName: action.payload.selectedFromAccount,
        billerCode: action.payload.selectedToAccount,
        billerRef: action.payload.message,
      };
    case "SAVE_PAYEES":
      return {
        ...state,
        payeeName: action.payload.payeeName,
        transferType: action.payload.transferType,
        email:
          action.payload.transferType === "email" ? action.payload.email : null,
        toAccount:
          action.payload.transferType === "toAccount"
            ? action.payload.toAccount
            : null,
        mobileNumber:
          action.payload.transferType === "mobileNumber"
            ? action.payload.mobileNumber
            : null,
      };
    default:
      return state;
  }
};

export default settings;
