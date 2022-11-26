import { configureStore } from "@reduxjs/toolkit";
import User from "./features/UserSlice";

export default configureStore({
  reducer: {
      account: User,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});
