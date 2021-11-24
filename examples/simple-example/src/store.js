import { configureStore } from "@reduxjs/toolkit";
import { storeSubScribeMiddleWare } from "redux-store-subscribe";
import { exampleReducer } from "./slice";

export const store = configureStore({
  reducer: {
    exampleReducer,
  },
  middleware: [storeSubScribeMiddleWare()]
});
