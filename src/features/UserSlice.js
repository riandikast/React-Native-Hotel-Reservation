import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {Image} from 'react-native';

const CustomAlert = (msg, position, img) => {
  return showMessage({
    message: msg,
    position: position,
    animated: true,
    animationDuration: 500,
    style: {
      height: 70,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 2,
      marginVertical: 5,
    },
    icon: props => <Image source={img} {...props} />,
    type: 'error',
  });
};

const initialState = {
  valid: true,
  account: [],
  value: '',
};

export const accountSlice = createSlice({
  name: 'acc',
  initialState,
  reducers: {
    getAccountData: (state, action) => {
      state.account = action.payload.account;
      Reactotron.log(state.account);
    },

    addAcc: (state, action) => {
      Reactotron.log(state.account.length, 'length');
      if (state.account.length === 0) {
        CustomAlert(
          'Registration Success',
          'center',
          require('../assets/Success.png'),
        );
      }
      state.account.forEach(acc => {
        var BreakException = {};

        if (acc.email === action.payload.email) {
          state.valid = false;
          CustomAlert(
            'Email already registered',
            'center',
            require('../assets/Warning.png'),
          );
          throw BreakException;
        } else if (acc.email !== action.payload.email) {
          state.valid = true;
          CustomAlert(
            'Registration Success',
            'center',
            require('../assets/Success.png'),
          );
        }
      });

      if (state.valid) {
        state.account = [...state.account, action.payload];
        AsyncStorage.setItem('@account', JSON.stringify(state.account));
        AsyncStorage.setItem('@saveLastID', JSON.stringify(action.payload.id));
        //{buat testing kalo mau hapus}
        // state.account= []
        // AsyncStorage.removeItem('@account')
      }
    },

    loginAcc: (state, action) => {
      if (state.account.length === 0) {
            CustomAlert(
                  'Email or Password are Wrong',
                  'center',
                  require('../assets/Warning.png'),
                );
          }
      state.account.forEach(acc => {
        var BreakException = {};
        console.log('lo', action.payload.email);
        if (
          acc.email === action.payload.email &&
          acc.password === action.payload.password
        ) {
          CustomAlert(
            'Login Successfull',
            'center',
            require('../assets/Success.png'),
          );
          throw BreakException;
        } else {
          CustomAlert(
            'Email or Password are Wrong',
            'center',
            require('../assets/Warning.png'),
          );
        }
      });
    },
  },
});

export const {addAcc, loginAcc, getAccountData} = accountSlice.actions;
export default accountSlice.reducer;
