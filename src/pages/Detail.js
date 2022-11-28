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
  import { useEffect, useState } from 'react';
  import * as React from 'react';
  // import HTMLView from 'react-native-htmlview';
import axios from 'axios';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Detail({navigation, route}) {
  const exImage = require('../assets/hotel.jpeg');
  const locationIcon = require('../assets/location.png');
  const starIcon = require('../assets/star.png');
  const icon = require('../assets/Settings.png');
  const [hotel, setHotel] = useState([])
  const {hotelId} = route.params;
  const id = JSON.stringify(hotelId);
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

  useEffect(() => {

    const url = `https://hotels4.p.rapidapi.com/properties/get-details?id=${id}`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'e721593c35msha1107f39ce3305bp1f5ce2jsn0b3de96587f1',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => setHotel([json.data.body]))
      .catch(err => console.error('error:' + err));
  }, [])
  console.log(hotel)
  const getDetail = () => {
    return hotel?.map(i => { 
      return (
        <View key={i.pdpHeader.hotelId}>
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
                {i.propertyDescription.name}
              </Text>
              <View className="flex flex-row items-center my-1">
                <Image source={locationIcon} className="w-5 h-5 mr-1" />
                <Text className="text-white text-md text-left">
                  {i.propertyDescription.address.cityName}, {i.propertyDescription.address.countryName}
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
            {i.smallPrint.policies?.map(item => {
              // const htmlAbout = `${item}`;
              return (
                <Text>{item}</Text>
                // <HTMLView
                //   value={htmlAbout}
                // />
              )
            })}
          </View>

          {/* facilities */}
          <View className="mb-4 p-5">
            <Text className="text-black text-xl font-semibold mb-3">
              FACILITIES
            </Text>
              {i.amenities[0]?.listItems?.map(items => {
                return (
                <View className="mb-3">
                  <Text className="text-black text-md mb-1">{items.heading}</Text>
                  <ScrollView horizontal={true}>
                    {items.listItems?.map(item => {
                      return (
                        <View className="bg-white w-auto p-2 rounded-lg mr-3">
                          <Text>{item}</Text>
                        </View>
                      )
                    })}
                  </ScrollView>
                </View>
                )
              })}
          </View>

        </View>

      );
    });
  };

  return (
    <SafeAreaView>
      <ScrollView className="relative">
        {getDetail()}
        {/* button booking */}
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
