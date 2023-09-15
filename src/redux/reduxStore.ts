import { configureStore } from "@reduxjs/toolkit";
import staticReducer from "./StaticDataSlice";
import postReducer from "./PostBookingData";
import getReducer from "./GetBookingData";

const reduxStore = configureStore({
  reducer: {
    staticData: staticReducer,
    postData: postReducer,
    getData: getReducer,
  },
});

export type AppDispatch = typeof reduxStore.dispatch;
export type RootState = ReturnType<typeof reduxStore.getState>;
export default reduxStore;
