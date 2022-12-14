import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {Image} from 'react-native';

const CustomAlert = (msg, position, img, mt) => {
  return showMessage({
    message: msg,
    position: position,
    animated: true,
    animationDuration: 500,
    style: {
      marginTop: mt,
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

var BreakException = {};
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
        if (
          acc.email === action.payload.email &&
          acc.password === action.payload.password
        ) {
          acc.isLogin = true;
          AsyncStorage.setItem('@account', JSON.stringify(state.account));
          AsyncStorage.setItem('@loginNavigator', 'true');
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

    logoutAcc: (state, action) => {
      state.account = action.payload.account;
      state.account.forEach(acc => {
        if (acc.isLogin === true) {
          acc.isLogin = false;
          AsyncStorage.setItem('@account', JSON.stringify(state.account));
          AsyncStorage.removeItem('@loginNavigator');
          CustomAlert('You are Logged Out', 'center',     require('../assets/Success.png'));
    
        }
      });
    },

    updateAcc: (state, action) => {
      state.account = action.payload.account;
      state.account.forEach(acc => {
        if (acc.id === action.payload.id) {
          acc.image = action.payload.image;
          acc.firstname = action.payload.firstname;
          acc.lastname = action.payload.lastname;
          acc.email = action.payload.email;
          acc.gender = action.payload.gender;
          AsyncStorage.setItem('@account', JSON.stringify(state.account));
          throw BreakException;
        }
      });
    },

    updatePassword: (state, action) => {
      state.account = action.payload.account;
      state.account.forEach(acc => {
        if (acc.id === action.payload.id) {
          if (acc.password !== action.payload.password) {
            CustomAlert(
              'Password Updated',
              'center',
              require('../assets/Success.png'),
              250
            );
            acc.password = action.payload.password;
            AsyncStorage.setItem('@account', JSON.stringify(state.account));
          }else{
            CustomAlert(
              'New Password Cannot be the same as Before',
              'center',
              require('../assets/Warning.png'),
              250
            );
          }
        }
      });
    },
  },
});

export const {
  addAcc,
  loginAcc,
  getAccountData,
  logoutAcc,
  updateAcc,
  updatePassword,
} = accountSlice.actions;
export default accountSlice.reducer;
