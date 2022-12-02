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
import { useLayoutEffect, useState } from 'react';
import * as React from 'react';
import DatePicker from 'react-native-date-picker'
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';
import { getSearchList, searchQuery } from '../features/hotelServices';
import FormatDate from '../components/FormatDate';
import { useEffect } from 'react';
import LoadingModal from '../components/LoadingModal';

  export default function Home({navigation}) {
    const [dateIn, setDateIn] = useState(new Date());
    const [dateOut, setDateOut] = useState(new Date());
    const [modalIn, setModalIn] = useState(false);
    const [modalOut, setModalOut] = useState(false);
    const [data, setData] = useState([]);
    const [topBali, setTopBali] = useState([]);
    const [topYogya, setTopYogya] = useState([]);
    const [inputSearch, setInputSearch] = useState('');
    const [inputGuest, setInputGuest] = useState('');
    const [showLoginButton, setShowLoginButton] = useState(true);
    const [showLoading, setShowLoading] = useState(true);

    const checkNavigator = async () => {
      try {
        const loginCheck = await AsyncStorage.getItem('@loginNavigator').then(
          JSON.parse,
        );
  
        if (loginCheck) {
          setShowLoginButton(false);
        } else {
        }
      } catch (error) {}
    };
  
    const setNavigator = async () => {
      try {
        AsyncStorage.setItem('@temporaryNavigation', 'home');
      } catch (err) {}
      navigation.navigate('Login');
    };  

    const fetchSearchHotel = async () => {
      setShowLoading(true)
      const responseQuery = await searchQuery({inputSearch});
      const searchList = await getSearchList(
        {
          city: responseQuery, 
          checkIn: FormatDate(dateIn.toISOString()), 
          checkOut: FormatDate(dateOut.toISOString()), 
          guest: inputGuest
        }
      );
      setData(searchList);
      if (data.length > 0) {
        setShowLoading(false)
        }
    }

    const fetchTopHotel = async () => {
      const baliHotel = await getSearchList(
        {
          city: '8956', 
          checkIn: FormatDate(dateIn.toISOString()), 
          checkOut: FormatDate(dateOut.toISOString()), 
          guest: '2',
        }
      );
      const yogyaHotel = await getSearchList(
        {
          city: '6223339', 
          checkIn: FormatDate(dateIn.toISOString()), 
          checkOut: FormatDate(dateOut.toISOString()), 
          guest: '2'
        }
      );
      setTopBali(baliHotel);
      setTopYogya(yogyaHotel);
      if (topBali.length > 0 && topYogya.length > 0) {
      setShowLoading(false)

      }
    }
    
    useEffect(() => {
      fetchTopHotel();
    }, [])
    
    useFocusEffect(() => {
      checkNavigator();
    })

    const getList = () => {
      return data?.slice(0,10).map(i => {
        return (
          <TouchableOpacity 
            className="z-10 bg-white rounded-xl my-3"  
            key={i.id}
            onPress={ ()=> navigation.navigate('Detail', {
              hotelName: i.name,
              hotelPrice: i.price?.lead?.formatted,
              hotelImage: i.propertyImage?.image?.url,
              hotelId: i.id, 
              checkIn: FormatDate(dateIn.toISOString()), 
              checkOut: FormatDate(dateOut.toISOString()), 
              guest: inputGuest 
            })}
          >
            <Image source={{uri: i.propertyImage?.image?.url}} className="w-full h-44 object-contain"/>
            <View className="p-5">
              <Text className='text-black text-lg font-semibold mb-1'>{i.name}</Text>
              <Text className="text-[#405189] text-2xl font-bold">{i.price?.lead?.formatted}</Text>
              <Text className="text-md ml-1">/night</Text>
            </View>
          </TouchableOpacity>
  
        );
      });
    };

      return (
        <SafeAreaView>
          {/* navbar */}
          <View className="bg-[#405189] flex flex-row p-3">
            <View className="grow mr-36"></View>
            <View className="justify-center">
              <Text className="text-white text-2xl">Home</Text>
            </View>
            {showLoginButton ? (
              <View className="grow">
                <TouchableOpacity activeOpacity={1.0}>
                  <Text
                    onPress={setNavigator}
                    className={`bg-white p-2 border ml-28 rounded-xl text-[#405189] font-bold text-center `}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
            <View className="grow ml-32"></View>
            )}
          </View>
          {/* end navbar */}

          <ScrollView>
            <View className="px-8 pt-8 pb-20">
              {/* search */}
              <View className="bg-neutral-50 p-8 rounded-lg mb-5 relative">
                <TextInput className="rounded-lg bg-white pl-12" placeholder="Where do you want to go?" onChangeText={(value) => setInputSearch(value)}/>
                <Image source={require('../assets/SearchOutline.png')} className="w-7 h-7 relative bottom-10 left-3" />
                {/* input date */}
                <View className="flex flex-row justify-between">
                  {/* check in */}
                  <View className="mr-2">
                    <TouchableOpacity
                      className="p-2 rounded-md bg-white flex flex-row"
                      onPress={() => setModalIn(true)}>
                        <Image source={require('../assets/Calendar.png')} className="w- h-6 mr-2"/>
                      <Text>{dateIn.toDateString()}</Text>
                    </TouchableOpacity>
                    <DatePicker
                      modal
                      mode='date'
                      open={modalIn}
                      date={dateIn}
                      onConfirm={date => {
                        setModalIn(false);
                        setDateIn(date);
                      }}
                      onCancel={() => {
                        setModalIn(false);
                      }}
                    />
                  </View>
                  {/* end check in */}

                  {/* check out */}
                  <View className="">
                    <TouchableOpacity
                      className="p-2 rounded-md bg-white flex flex-row"
                      onPress={() => setModalOut(true)}>
                      <Image source={require('../assets/Calendar.png')} className="w-6 h-6 mr-2"/>
                      <Text>{dateOut.toDateString()}</Text>
                    </TouchableOpacity>
                    <DatePicker
                      modal
                      mode='date'
                      open={modalOut}
                      date={dateOut}
                      onConfirm={date => {
                        setModalOut(false);
                        setDateOut(date);
                      }}
                      onCancel={() => {
                        setModalOut(false);
                      }}
                    />
                  </View>
                  {/* end check out */}
                </View>
                {/* end input date */}

                {/* input guest */}
                <View className="relative my-3">
                  <TextInput 
                    className="rounded-lg bg-white pl-12" 
                    keyboardType="numeric" 
                    placeholder="Guest"
                    onChangeText={(value) => setInputGuest(value)} 
                  />
                  <Image source={require('../assets/UserOutline.png')} className="w-6 h-6 relative bottom-10 left-3" />
                </View>
                {/* end input guest */}
                
                {/* button search */}
                <TouchableOpacity
                  className="p-2 rounded-lg bg-[#405189]"
                  onPress={fetchSearchHotel}
                  >
                  <Text className="text-white text-xl text-center font-semibold">Search</Text>
                </TouchableOpacity>
              </View>
              {/* end search */}
              
              {/* search results */}
              <View>{getList()}</View>

              {/* content */}
              {showLoading ? (
                <LoadingModal />
              ) : (
                <View className="bg-white px-4 pt-4 pb-8 rounded-lg">
                  <View className="mb-5">
                    <Text className="text-black text-lg font-semibold mb-3">POPULAR HOTELS IN BALI</Text>
                    <ScrollView horizontal={true} className="snap-x">
                      {topBali?.slice(0,7).map(hotel => {
                        {Reactotron.log(hotel)}
                        return <TouchableOpacity key={hotel.id} 
                          onPress={ ()=> navigation.navigate('Detail', {
                            hotelName: hotel.name,
                            hotelPrice: hotel.price?.lead?.formatted,
                            hotelImage: hotel.propertyImage?.image?.url,
                            hotelId: hotel.id, 
                            checkIn: FormatDate(dateIn.toISOString()), 
                            checkOut: FormatDate(dateOut.toISOString()), 
                            guest: '2'
                        })}>
                          <View className="snap-center">
                            <ImageBackground source={{uri: hotel.propertyImage?.image?.url}} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                                <Text className="text-xl text-white font-semibold absolute bottom-3 px-3" numberOfLines={2}>{hotel.name}</Text>
                            </ImageBackground>
                          </View>
                        </TouchableOpacity>
                      })}
                    </ScrollView>
                  </View>
                  <View>
                    <Text className="text-black text-lg font-semibold mb-3">POPULAR HOTELS IN YOGYAKARTA</Text>
                    <ScrollView horizontal={true} className="snap-x">
                      {topYogya?.slice(0,7).map(hotel => {
                        return <TouchableOpacity key={hotel.id} 
                          onPress={ ()=> navigation.navigate('Detail', {
                            hotelName: hotel.name,
                            hotelPrice: hotel.price?.lead?.formatted,
                            hotelImage: hotel.propertyImage?.image?.url,
                            hotelId: hotel.id, 
                            checkIn: FormatDate(dateIn.toISOString()), 
                            checkOut: FormatDate(dateOut.toISOString()), 
                            guest: '2'
                        })}>
                          <View className="snap-center" key={hotel.id}>
                            <ImageBackground source={{uri: hotel.propertyImage?.image?.url}} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                                <Text className="text-xl text-white font-semibold absolute bottom-3 px-3" numberOfLines={2}>{hotel.name}</Text>
                            </ImageBackground>
                          </View>
                        </TouchableOpacity>
                      })}
                    </ScrollView>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
    