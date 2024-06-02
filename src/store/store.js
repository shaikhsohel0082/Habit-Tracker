import { configureStore } from "@reduxjs/toolkit";
import { habitReducer } from "../Components/redux/habitRedux";
const store = configureStore({
  reducer: {
    habitReducer,
  },
});
export default store;
