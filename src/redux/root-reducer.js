import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import todosReducer from "./user/user.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["todos"],
};

const rootReducer = combineReducers({
  todos: checkoutReducer,
  // orders: ordersReducer,
});

export default persistReducer(persistConfig, rootReducer);
