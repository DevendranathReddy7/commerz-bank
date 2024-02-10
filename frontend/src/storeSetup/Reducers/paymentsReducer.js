const intitalState = {
  fromAccount: {},
  toAccount: {},
  message: "",
  amount: 0,
  type: "",
  biller: {
    billerName: "",
    billerCode: "",
    billerRef: "",
  },
  payeeName: "",
  transferType: "",
  email: "",
  mobileNumber: "",
};

const payments = (state = intitalState, action) => {
  switch (action.type) {
    case "ftx_payment":
      return {
        ...state,
        fromAccount: action.payload.selectedFromAccount,
        toAccount: action.payload.selectedToAccount,
        message: action.payload.message,
        amount: action.payload.amount,
        type: action.payload.type,
      };
    case "bill_payment":
      return {
        ...state,
        fromAccount: action.payload.selectedFromAccount,
        message: action.payload.message,
        amount: action.payload.amount,
        type: action.payload.type,
        biller: action.payload.selectedBiller,
      };
    case "pan_payment":
      return {
        ...state,
        fromAccount: action.payload.selectedFromAccount,
        message: action.payload.message,
        amount: action.payload.amount,
        payeeName: action.payload?.selectedToPayee?.payeeName,
        type: action.payload.type,
        transferType: action.payload?.selectedToPayee?.transferType,
        ifscCode: action.payload?.selectedToPayee?.ifscCode,
        email:
          action.payload?.selectedToPayee?.transferType === "email"
            ? action.payload?.selectedToPayee?.email
            : null,
        toAccount:
          action.payload?.selectedToPayee?.transferType === "toAccount"
            ? action.payload?.selectedToPayee?.toAccount
            : null,
        mobileNumber:
          action.payload?.selectedToPayee?.transferType === "mobileNumber"
            ? action.payload?.selectedToPayee?.mobileNumber
            : null,
      };
    default:
      return state;
  }
};

export default payments;
