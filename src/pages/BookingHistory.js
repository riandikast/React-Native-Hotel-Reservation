import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
    Keyboard,
    ImageBackground,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
  } from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookingHistory({navigation}) {

  return (
    <SafeAreaView>
      {/* navbar */}
      <View className="bg-[#405189] flex flex-row justify-center p-3">
        <Text className="text-white text-2xl">Booking History</Text>
      </View>
      {/* end navbar */}

      <ScrollView className="px-8 pt-8 pb-20">
        <View className="bg-white rounded-lg p-4">
          <View className="flex flex-row justify-around mt-5 mb-3">
            <Image source={require('../assets/hotel.jpeg')} className="w-44 h-44 rounded-lg" />
            <View className="flex flex-col">
              <Text className="text-black font-bold text-xl mb-2">Nama Hotel</Text>
              <Text className="text-black text-lg">Nama orang</Text>
              <Text className="text-black text-lg">email orang</Text>
              <Text className="text-black text-lg">3 days, 1 room, 2 orang</Text>
              <View className="flex flex-row justify-between mt-3">
                <Text className="text-black text-lg">price</Text>
                <Text className="text-black font-semibold text-lg">$100</Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
  