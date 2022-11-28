import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

import * as React from 'react';
import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage from 'react-native-flash-message';
import {loginAcc, getAccountData} from '../features/UserSlice';
import {showMessage, hideMessage} from 'react-native-flash-message';

export default function Login({navigation}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isinput, setIsInput] = useState(false);
  const dispatch = useDispatch();
  const checkTextInput = () => {
    if (email && password) {
      return setIsInput(true);
    } else {
      return setIsInput(false);
    }
  };

  const handleLogin = async () => {
    try {

      dispatch(loginAcc({email: email, password: password}));
      getData();
    } catch (err) {

    }
    checkNavigator()
  };

  const getData = async () => {
    const accountData =
      (await AsyncStorage.getItem('@account').then(JSON.parse)) || [];

    dispatch(getAccountData({account: accountData}));
  };

  const checkNavigator = async () => {
    const accountData = await AsyncStorage.getItem('@account').then(JSON.parse);
    const navigator = await AsyncStorage.getItem('@temporaryNavigation');

    accountData?.forEach(acc => {
      if (acc.isLogin === true) {
        if (navigator === 'home') {
          navigation.navigate('Home');
        } else if (navigator === 'detail') {
          navigation.navigate('Detail');
        }
      }
    });
  };

  useEffect(() => {
    checkTextInput();
  }, [email, password]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <View className="flex-1 flex-col items-center justify-center">
        <View className="self-start grow justify-start mt-12  ml-8 ">
          <TouchableWithoutFeedback
            onPress={() => navigation.goBack()}
            activeOpacity={1.0}>
            <Image
              className={'w-10 h-10 p-3 mt-4 ml-4'}
              source={require('../assets/BlueBack.png')}
            />
          </TouchableWithoutFeedback>
        </View>
      <View className="flex-col  mb-12">
    
        <Text
          className={`text-4xl text-semibold p-2 text-[#405189] text-left mb-4 -ml-2 opacity-100 `}>
          Login
        </Text>
        <TextInput
          className="w-72  py-2 px-4 rounded-lg border mb-2"
          placeholder="Email "
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
            onPress={handleLogin}
            disabled={isinput ? false : true}
            className={`bg-[#405189] p-2 border rounded-xl text-white text-center ${
              isinput ? 'opacity-100' : 'opacity-60'
            }`}>
            Login
          </Text>

          <View className="flex flex-row mt-4 justify-center">
            <Text className="text-base"> Doesnt have an account ?</Text>
            <Text
              className="text-base font-bold text-[#405189]"
              onPress={() => navigation.navigate('Register')}>
              {' '}
              Register{' '}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className='grow'></View>
    </View>
  );
}
