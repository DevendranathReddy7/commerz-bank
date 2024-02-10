export const saveBillers = (billers) => {
  return { type: "SAVE_BILLERS", payload: billers };
};

export const savePayees = (payees) => {
  return { type: "SAVE_PAYEES", payload: payees };
};
