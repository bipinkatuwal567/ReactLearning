import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountsSlice";
import customerReducer from "./features/customers/customerSlice";


const store = configureStore(
  {
    reducer: {
      account: accountReducer,
      customer: customerReducer,
    }
  }
)

export default store;
