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
import { useState } from 'react';
import DatePicker from 'react-native-date-picker'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';
import { getSearchList, searchQuery } from '../features/hotelServices';
import FormatDate from '../components/FormatDate';

  export default function Home({navigation}) {
    const [dateIn, setDateIn] = useState(new Date());
    const [dateOut, setDateOut] = useState(new Date());
    const [modalIn, setModalIn] = useState(false);
    const [modalOut, setModalOut] = useState(false);
    const [data, setData] = useState([]);
    const [inputSearch, setInputSearch] = useState('');
    const [inputGuest, setInputGuest] = useState('');

    const setNavigator = async () => {
      try {
        AsyncStorage.setItem('@temporaryNavigation', "home");
      }catch(err){

      }
      navigation.navigate('Login')

    }

    const fetchApiCall = async () => {
      const responseQuery = await searchQuery({inputSearch});
      const searchList = await getSearchList(
        {
          destination: responseQuery, 
          checkIn: FormatDate(dateIn.toISOString()), 
          checkOut: FormatDate(dateOut.toISOString()), 
          guest: inputGuest
        }
      );
      setData(searchList);
      Reactotron.log(searchList)
    }

    const getList = () => {
      return data?.map(i => {
        return (
          <TouchableOpacity 
            className="z-10 bg-white rounded-xl my-3"  
            key={i.id}
            onPress={ ()=> navigation.navigate('Detail', {
              hotelId: i.id, 
              checkIn: FormatDate(dateIn.toISOString()), 
              checkOut: FormatDate(dateOut.toISOString()), 
              guest: inputGuest 
            })}
          >
            {Reactotron.log(i.name)}
            <Image source={{uri: i.optimizedThumbUrls?.srpDesktop}} className="w-full h-44 object-contain"/>
            <View className="p-5">
              <Text className='text-black text-lg font-semibold mb-1'>{i.name}</Text>
              <Text className="text-[#405189] text-2xl font-bold">{i.ratePlan.price.current}</Text>
              <Text className="text-md ml-1">/night</Text>
            </View>
          </TouchableOpacity>
  
        );
      });
    };

      return (
        <SafeAreaView>
          {/* navbar */}
          <View className="bg-[#405189] flex flex-row justify-between p-3">
            <Text className="w-20"></Text>
            <Text className="text-white text-2xl">Home</Text>
            <TouchableOpacity activeOpacity={1.0}>
              <Text
                onPress={setNavigator}
                className={`bg-white p-2 border w-20 mr-2 rounded-xl text-[#405189] font-bold text-center `}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          {/* end navbar */}

          <ScrollView>
            <View className="p-8">
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
                  onPress={fetchApiCall}
                  >
                  <Text className="text-white text-xl text-center font-semibold">Search</Text>
                </TouchableOpacity>
              </View>
              {/* end search */}
              
              {/* search results */}
              <View>
                {getList()}
              </View>

              {/* content */}
              <View className="bg-white p-4 rounded-lg">
                <View className="mb-5">
                  <Text className="text-black text-lg font-semibold mb-3">TOP DESTINATIONS</Text>
                  <ScrollView horizontal={true} className="snap-x">
                    <View className="snap-center">
                      <ImageBackground source={require('../assets/hotel.jpeg')} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                          <Text className="text-xl text-white absolute bottom-3 left-4">Bali</Text>
                      </ImageBackground>
                    </View>
                    <View className="snap-center">
                      <ImageBackground source={require('../assets/hotel.jpeg')} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                        <Text className="text-xl text-white absolute bottom-3 left-4">Yogyakarta</Text>
                      </ImageBackground>
                    </View>
                    <View className="snap-center">
                      <ImageBackground source={require('../assets/hotel.jpeg')} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                        <Text className="text-xl text-white absolute bottom-3 left-4">Jakarta</Text>
                      </ImageBackground>
                    </View>
                    <View className="snap-center">
                      <ImageBackground source={require('../assets/hotel.jpeg')} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                        <Text className="text-xl text-white absolute bottom-3 left-4">Bandung</Text>
                      </ImageBackground>
                    </View>
                    <View className="snap-center">
                      <ImageBackground source={require('../assets/hotel.jpeg')} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                        <Text className="text-xl text-white absolute bottom-3 left-4">Karawang</Text>
                      </ImageBackground>
                    </View>
                  </ScrollView>
                </View>
                <View>
                  <Text className="text-black text-lg font-semibold mb-3">POPULAR DESTINATIONS</Text>
                  <ScrollView horizontal={true} className="snap-x">
                  <View className="snap-center">
                      <ImageBackground source={require('../assets/hotel.jpeg')} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                          <Text className="text-xl text-white absolute bottom-3 left-4">Bali</Text>
                      </ImageBackground>
                    </View>
                    <View className="snap-center">
                      <ImageBackground source={require('../assets/hotel.jpeg')} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                        <Text className="text-xl text-white absolute bottom-3 left-4">Yogyakarta</Text>
                      </ImageBackground>
                    </View>
                    <View className="snap-center">
                      <ImageBackground source={require('../assets/hotel.jpeg')} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                        <Text className="text-xl text-white absolute bottom-3 left-4">Jakarta</Text>
                      </ImageBackground>
                    </View>
                    <View className="snap-center">
                      <ImageBackground source={require('../assets/hotel.jpeg')} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                        <Text className="text-xl text-white absolute bottom-3 left-4">Bandung</Text>
                      </ImageBackground>
                    </View>
                    <View className="snap-center">
                      <ImageBackground source={require('../assets/hotel.jpeg')} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                        <Text className="text-xl text-white absolute bottom-3 left-4">Karawang</Text>
                      </ImageBackground>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
    