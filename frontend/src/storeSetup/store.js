import { createStore } from "redux";

import rootReducer from "./Reducers/rootReducers"; // You need to create reducers

const store = createStore(rootReducer);

export default store;
