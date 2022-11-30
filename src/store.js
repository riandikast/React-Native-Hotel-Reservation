import { configureStore } from "@reduxjs/toolkit";
import User from "./features/UserSlice";
import FavoriteSlice from "./features/FavoriteSlice";
export default configureStore({
  reducer: {
      account: User,
      favorite: FavoriteSlice,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});
