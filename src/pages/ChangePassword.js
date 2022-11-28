import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import * as React from 'react';
import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage from 'react-native-flash-message';
import {updatePassword, getAccountData} from '../features/UserSlice';
import {showMessage, hideMessage} from 'react-native-flash-message';

export default function ChangePassword({navigation}) {
  const [userID, setUserID] = useState();
  const [oldPass, setOldPass] = useState(null);
  const [password, setPassword] = useState();
  const [newPass, setNewPass] = useState();
  const [isInput, setIsInput] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isPassChanged, setIsPassChanged] = useState(false);

  const dispatch = useDispatch();
  const checkTextInput = () => {
    if (password) {
      return setIsInput(true);
    } else if (newPass) {
      return setIsInput(true);
    } else {
      return setIsInput(false);
    }
  };

  const handleConfirm = async () => {
    try {
      if (password === oldPass) {
        setIsConfirm(true);
        setPassword();
      } else {
        showMessage({
          message: 'Wrong Password',
          position: 'center',
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
          icon: props => (
            <Image source={require('../assets/Warning.png')} {...props} />
          ),
          type: 'error',
        });
      }
    } catch (err) {}
  };

  const handleUpdatePassword = async () => {
    getData();
    if (oldPass !== newPass) {
      setIsPassChanged(true);
    }

    try {
      const accountData = await AsyncStorage.getItem('@account').then(
        JSON.parse,
      );
      dispatch(
        updatePassword({account: accountData, id: userID, password: newPass}),
      );
    } catch (err) {}
  };

  const getData = async () => {
    const accountData =
      (await AsyncStorage.getItem('@account').then(JSON.parse)) || [];
    dispatch(getAccountData({account: accountData}));
    accountData.map(acc => {
      if (acc.isLogin) {
        setUserID(acc.id);
        setOldPass(acc.password);

        Reactotron.log(oldPass);
      }
    });
  };

  const confirmForm = () => {
    return (
      <>
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
        <View className="flex-col mb-12 ">
          <Text
            className={`text-xl text-semibold p-2 text-[#405189] text-left mb-2 -ml-2 opacity-100 `}>
            Enter Old Password
          </Text>
          <TextInput
            className="w-72  py-2 px-4 rounded-lg border mb-2"
            value={password}
            placeholder="Password"
            onChangeText={value => {
              setPassword(value);
            }}
          />

          <TouchableOpacity activeOpacity={1.0}>
            <Text
              onPress={handleConfirm}
              disabled={isInput ? false : true}
              className={`bg-[#405189] p-2 border rounded-xl text-white text-center mt-1 ${
                isInput ? 'opacity-100' : 'opacity-60'
              }`}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
        <View className="grow"></View>
      </>
    );
  };

  const inputForm = () => {
    return (
      <>
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
        <View className="flex-col mb-12">
          <Text
            className={`text-xl text-semibold p-2 text-[#405189] text-left mb-2 -ml-2 opacity-100 `}>
            Enter New Password
          </Text>
          <TextInput
            className="w-72  py-2 px-4 rounded-lg border mb-2"
            placeholder="Password"
            value={newPass}
            onChangeText={value => {
              setNewPass(value);
            }}
          />

          <TouchableOpacity activeOpacity={1.0}>
            <Text
              onPress={handleUpdatePassword}
              disabled={isInput ? false : true}
              className={`bg-[#405189] p-2 border rounded-xl text-white text-center mt-1 ${
                isInput ? 'opacity-100' : 'opacity-60'
              }`}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
        <View className="grow"></View>
      </>
    );
  };
  useEffect(() => {
    checkTextInput();
  }, [oldPass, newPass, password]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isPassChanged) {
      navigation.navigate('Settings');
    }
  }, [oldPass]);

  return (
    <View className="flex-1 flex-col items-center justify-center ">
      {isConfirm ? inputForm() : confirmForm()}
    </View>
  );
}
