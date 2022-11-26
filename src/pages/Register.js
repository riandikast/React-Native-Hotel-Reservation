import {useState, useEffect} from 'react';

import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {addAcc, getAccountData} from '../features/UserSlice';
import {acc} from 'react-native-reanimated';

export default function Register({navigation}) {
  const [id, setID] = useState(Number(0));
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isinput, setIsInput] = useState(false);
  const dispatch = useDispatch();

  const checkTextInput = () => {
    if (firstname && lastname && email && password) {
      return setIsInput(true);
    } else {
      return setIsInput(false);
    }
  };

  const handleRegis = async () => {
    let acc = {
      id: id + 1,
      image: null,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      gender: 'Not set',
      isLogin: false,
    };

    try {
      if (firstname && lastname && email && password) {
        getLastID();
        dispatch(addAcc(acc, id + 1));
      }
      const data = await AsyncStorage.getItem('@account').then(JSON.parse);

      Reactotron.log(data);
    } catch (err) {
      console.log(err);
    }

    Keyboard.dismiss();
  };

  const getLastID = async () => {
    const data = await AsyncStorage.getItem('@saveLastID').then(JSON.parse);
    const accountData =
      (await AsyncStorage.getItem('@account').then(JSON.parse)) || [];

    dispatch(getAccountData({account: accountData}));

    setID(Number(data));
  };
  useEffect(() => {
    getLastID();
  }, [id]);

  useEffect(() => {
    checkTextInput();
  }, [firstname, lastname, email, password]);

  return (
    <View className="flex-1 flex-col items-center justify-center">
      <View className="">
        <Text
          className={`text-4xl text-semibold p-2 text-[#405189] text-left mb-4 -ml-2 opacity-100 `}>
          Register
        </Text>
        <TextInput
          className="w-72  py-2 px-4 rounded-lg border mb-2"
          placeholder="First Name"
          onChangeText={value => {
            setFirstname(value);
          }}
        />
        <TextInput
          className="w-72  py-2 px-4 rounded-lg border mb-2"
          placeholder="Last Name"
          onChangeText={value => {
            setLastname(value);
          }}
        />
        <TextInput
          className="w-72  py-2 px-4 rounded-lg border mb-2"
          placeholder="Email"
          onChangeText={value => {
            setEmail(value);
          }}
        />
        <TextInput
          className="w-72 py-2 px-4 rounded-lg border mb-6"
          placeholder="Password"
          onChangeText={value => {
            setPassword(value);
          }}
        />
        <TouchableOpacity activeOpacity={1.0}>
          <Text
            disabled={isinput ? false : true}
            onPress={handleRegis}
            className={`bg-[#405189] p-2 border rounded-xl text-white text-center ${
              isinput ? 'opacity-100' : 'opacity-60'
            }`}>
            Register
          </Text>

          <View className="flex flex-row mt-4 justify-center">
            <Text className="text-base"> Already have an account ?</Text>
            <Text
              className="text-base  font-bold text-[#405189]"
              onPress={() => navigation.navigate('Login')}>
              {' '}
              Login{' '}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
