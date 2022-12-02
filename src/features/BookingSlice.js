import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {Image} from 'react-native';

const initialState = {
  valid: true,
  booking: [],
  value: '',
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    getBookingHistory: (state, action) => {
      state.booking = action.payload.booking;
    },

    bookingHotel: (state, action) => {
      state.booking= [...state.booking, action.payload];
      AsyncStorage.setItem('@booking', JSON.stringify(state.booking));
    },
  },
});

export const {bookingHotel, getBookingHistory} = bookingSlice.actions;
export default bookingSlice.reducer;
