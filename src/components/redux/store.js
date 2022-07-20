import { createStore } from "redux";

const reducer = (state = { access_token: "", cart: [] }, action) => {
  switch (action.type) {
    case "LOGIN":
      return { access_token: action.token };
    case "LOGOUT":
      return { access_token: "" };
    case "PUT_CART":
      return { cart: action.cart };
  }
  return state;
};

const store = createStore(reducer);
export default store;
