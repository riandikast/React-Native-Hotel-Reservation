import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  ImageBackground,
} from 'react-native';
import {useEffect} from 'react';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/stack';

const staticImage = require('../assets/Splashscreen.png');

export default function Splashscreen({navigation}) {
  const quitSplash = () => {
    setTimeout(() => navigation.navigate('Home'), 3000);
    setTimeout(
      () =>
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      3000,
    );
  };
  useEffect(() => {
    quitSplash();
  }, []);

  return (
    <View className="justify-center  flex-1 flex-col bg-[#405189] ">
      <View className="items-center">
        <ImageBackground
          source={staticImage}
          className={` w-40 h-40 mx-auto mt-64`}
        />
      </View>

      <View className="">
        <Text className="text-3xl text-bold text-center mt-60 text-bold text-white ">
          Stay
        </Text>
        <Text className="text-2xl text-bold text-center mt-3 text-bold text-white">
          Hotel Reservation
        </Text>
      </View>
    </View>
  );
}
