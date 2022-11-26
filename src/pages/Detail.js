import {
  Button,
  TextInput,
  Text,
  Image,
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import * as React from 'react';
import axios from 'axios';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Detail({navigation}) {
  const exImage = require('../assets/hotel.jpeg');
  const locationIcon = require('../assets/location.png');
  const starIcon = require('../assets/star.png');
  const icon = require('../assets/Settings.png');
  const handleBooking = async () => {
    try {
      const accountData = await AsyncStorage.getItem('@account').then(
        JSON.parse,
      );
      accountData.map(acc => {
        if (!acc.isLogin) {
          AsyncStorage.setItem('@temporaryNavigation', 'detail');
          navigation.navigate('Login');
        } else {
         
        }
      });
    } catch (err) {}
  };
  return (
    <SafeAreaView>
      <ScrollView className="relative">
        {/* hero */}
        <ImageBackground
          source={exImage}
          resizeMode="cover"
          className="w-screen h-64 flex flex-col justify-between p-5">
          <Text className="text-white text-xl font-semibold text-center">
            Hotel Detail
          </Text>
          <View>
            <Text className="text-white text-3xl font-semibold text-left">
              Yogya Hotel
            </Text>
            <View className="flex flex-row items-center my-1">
              <Image source={locationIcon} className="w-5 h-5 mr-1" />
              <Text className="text-white text-md text-left">
                Sleman, Yogyakarta
              </Text>
            </View>
            <View className="flex flex-row items-center mt-1">
              <Image source={starIcon} className="w-6 h-6" />
              <Image source={starIcon} className="w-6 h-6" />
              <Image source={starIcon} className="w-6 h-6" />
              <Image source={starIcon} className="w-6 h-6" />
            </View>
          </View>
        </ImageBackground>

        {/* about */}
        <View className="my-4 p-5">
          <Text className="text-black text-xl font-semibold mb-3">ABOUT</Text>
          <Text className="text-black text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text className="text-sky-600 text-lg font-semibold text-right mt-2">
            Read More
          </Text>
        </View>

        {/* facilities */}
        <View className="mb-4 p-5">
          <Text className="text-black text-xl font-semibold mb-3">
            FACILITIES
          </Text>
          <ScrollView horizontal={true}>
            <View className="bg-white w-20 h-16 p-2 rounded-lg flex flex-col justify-center items-center mr-3">
              <Image source={icon} className="w-8 h-8" />
              <Text>Wifi</Text>
            </View>
            <View className="bg-white w-20 h-16 p-2 rounded-lg flex flex-col justify-center items-center mr-3">
              <Image source={icon} className="w-8 h-8" />
              <Text>Wifi</Text>
            </View>
            <View className="bg-white w-20 h-16 p-2 rounded-lg flex flex-col justify-center items-center mr-3">
              <Image source={icon} className="w-8 h-8" />
              <Text>Wifi</Text>
            </View>
            <View className="bg-white w-20 h-16 p-2 rounded-lg flex flex-col justify-center items-center mr-3">
              <Image source={icon} className="w-8 h-8" />
              <Text>Wifi</Text>
            </View>
            <View className="bg-white w-20 h-16 p-2 rounded-lg flex flex-col justify-center items-center mr-3">
              <Image source={icon} className="w-8 h-8" />
              <Text>Wifi</Text>
            </View>
          </ScrollView>
        </View>

        {/* button book */}
        <TouchableOpacity activeOpacity={1.0}>
          <Text
            className={`bg-[#405189] fixed bottom-2 w-11/12 mx-auto p-2 rounded-lg text-white text-xl font-bold text-center `} onPress={handleBooking}>
            Book this Hotel
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
