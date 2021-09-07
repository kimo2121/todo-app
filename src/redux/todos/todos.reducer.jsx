import { useEffect } from "react";
import CartActionTypes from "./cart.types";

const INITIAL_STATE = {
  todosList: [],
};
useEffect(() => {}, []);

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};
export default cartReducer;
