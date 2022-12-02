import { configureStore } from "@reduxjs/toolkit";
import User from "./features/UserSlice";
import FavoriteSlice from "./features/FavoriteSlice";
import BookingSlice from "./features/BookingSlice";

export default configureStore({
  reducer: {
      account: User,
      favorite: FavoriteSlice,
      booking: BookingSlice,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});
