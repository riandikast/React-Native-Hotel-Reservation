import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {Image} from 'react-native';

const initialState = {
  valid: true,
  favorite: [],
  value: '',
};

var BreakException = {};
export const favoriteSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {
    getFavoriteData: (state, action) => {
      state.favorite = action.payload.favorite;
    },
    addFavorite: (state, action) => {
 

      if (state.valid) {
        state.favorite = [...state.favorite, action.payload];
        AsyncStorage.setItem('@favorite', JSON.stringify(state.favorite));
      }
    },

    checkData: (state, action) => {
      state.favorite = action.payload.favorite;
      state.favorite.forEach(fav => {
        if (fav.id !== action.payload.id) {
          state.valid = true;

        } else {
          state.valid = false;
        }
      });
    },

    removeFavorite: (state, action) => {
        state.favorite = state.favorite.filter(
          fav => fav.id !== action.payload.id,
        );
        AsyncStorage.setItem('@favorite', JSON.stringify(state.favorite));
    

    },
  },
});

export const {addFavorite, removeFavorite, getFavoriteData, checkData} =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
