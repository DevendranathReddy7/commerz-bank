const initialState = {
  currentUser: "",
  accounts: [],
};

const SaveAccounts = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_ACCOUNTS":
      return {
        ...state,
        currentUser: action.payload.currentUserId,
        accounts: action.payload.accounts,
      };

    default:
      return state;
  }
};

export default SaveAccounts;
