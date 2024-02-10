const initialState = {
  currentUser: "",
  name: "",
};

const LOGIN = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        currentUser: action.payload.id,
        name: action.payload.name,
      };

    default:
      return state;
  }
};

export default LOGIN;
