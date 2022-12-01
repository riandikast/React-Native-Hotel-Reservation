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
  useWindowDimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {useEffect, useState, useCallback} from 'react';
import * as React from 'react';
import RenderHtml from 'react-native-render-html';
import {getHotelDetail} from '../features/hotelServices';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addFavorite,
  removeFavorite,
  getFavoriteData,
  checkData,
} from '../features/FavoriteSlice';
import {useDispatch, useSelector} from 'react-redux';
import Reactotron from 'reactotron-react-native';
import {useFocusEffect} from '@react-navigation/native';

export default function Detail({navigation, route}) {
  const exImage = require('../assets/hotel.jpeg');
  const locationIcon = require('../assets/location.png');
  const starIcon = require('../assets/star.png');
  const icon = require('../assets/Settings.png');

  const [hotel, setHotel] = useState([]);
  const [loved, setLoved] = useState(false);
  const [iconChanged, setIconChanged] = useState(false);
  const [loveIcon, setLoveIcon] = useState(require('../assets/Unlove.png'));
  const {hotelId, checkIn, checkOut, guest, hotelName, hotelPrice, hotelImage} = route.params;
  const [userID, setUserID] = useState();
  const id = Number(hotelId);
  const {width} = useWindowDimensions();
  const dispatch = useDispatch();

  const handleBooking = async () => {
    try {
      const loginCheck = await AsyncStorage.getItem('@loginNavigator').then(
        JSON.parse,
      );

      if (loginCheck) {
      } else {
        AsyncStorage.setItem('@temporaryNavigation', 'detail');
        navigation.navigate('Login');
        //milih pake local dr pada pake common action reset karna lebih singkat delay nya
      }
    } catch (err) {}
  };

  const getDetail = async () => {
    const detail = await getHotelDetail(id);
    setHotel([detail]);
  };

  const getFavIconState = async () => {
    const favoriteData =
      (await AsyncStorage.getItem('@favorite').then(JSON.parse)) || [];
    Reactotron.log(hotelName)
    dispatch(getFavoriteData({favorite: favoriteData}));
    for (let i = 0; i < favoriteData?.length; i++) {
      if (favoriteData[i].id === hotelId) {
        setLoveIcon(require('../assets/Love.png'));
        setLoved(true);
        break;
      } else {
        setLoveIcon(require('../assets/Unlove.png'));
      }
    }
  };

  const changeFavIconState = async () => {
    if (loved) {
      setLoveIcon(require('../assets/Unlove.png'));
      setIconChanged(true);
      setLoved(false);
    } else {
      setLoveIcon(require('../assets/Love.png'));
      setIconChanged(true);
      setLoved(true);
    }

    let saveHotel = {
      id: hotelId,
      userid: userID,
      name: hotelName,
      image: hotelImage,
      description: 'desc',
      // location: location,
      price: hotelPrice,
    };
    try {
      const favoriteData = await AsyncStorage.getItem('@favorite').then(
        JSON.parse || [],
      );
      checkData({favorite: favoriteData, id: saveHotel.id});
      if (!loved) {
        dispatch(addFavorite(saveHotel));
      } else {
        Reactotron.log(saveHotel.id, 'woi');
        dispatch(removeFavorite({id: saveHotel.id}));
      }
      const data = await AsyncStorage.getItem('@favorite').then(JSON.parse);
      Reactotron.log(data);
    } catch (error) {}
  };

  const getUserData = async () => {
    try {
      const accountData = await AsyncStorage.getItem('@account').then(
        JSON.parse,
      );
      accountData.map(acc => {
        if (acc.isLogin) {
          setUserID(acc.id);
        }
      });
    } catch (err) {}
  };

  const favoriteState = async () => {};

  useEffect(() => {
    getDetail();
    getFavIconState();
  }, []);

  useEffect(() => {
    getUserData();
    if (iconChanged) {
      favoriteState();
    }
  }, [loved]);

  const hotelDetail = () => {
    return hotel?.map(i => {
      return (
        <View key={i.summary?.id}>
          {/* hero */}
          <ImageBackground
            source={exImage}
            resizeMode="cover"
            className="w-screen h-64 flex flex-col justify-between p-5">
            <Text className="text-white text-xl font-semibold text-center">
              Hotel Detail
            </Text>
            <View>
              <Text
                className="text-white text-3xl font-semibold text-left"
                numberOfLines={2}>
                {i.summary?.name}
              </Text>
              <View className="flex flex-row items-center my-1">
                <Image source={locationIcon} className="w-5 h-5 mr-1" />
                <Text className="text-white text-md text-left">
                  {i.summary?.location?.address?.city},{' '}
                  {i.summary?.location?.address?.province}
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
          <View className="my-3 p-5">
            <Text className="text-black text-xl font-semibold mb-3">ABOUT</Text>
            <Text>
              {
                i.propertyContentSectionGroups?.aboutThisProperty?.sections[0]
                  .bodySubSections[0].elements[0].items[0].content?.text
              }
            </Text>
          </View>

          {/* facilities */}
          <View className="mb-4 p-5">
            <Text className="text-black text-xl font-semibold mb-3">
              FACILITIES
            </Text>
            <ScrollView horizontal={true}>
              {i.summary?.amenities?.topAmenities?.items.map(item => {
                return (
                  <Text className="bg-white w-auto p-2 rounded-lg mr-3">
                    {item.text}
                  </Text>
                );
              })}
            </ScrollView>
          </View>
        </View>
      );
    });
  };

  return (
    <SafeAreaView>
      <View className="flex flex-col h-screen ">
        <View>
          <ScrollView className="mb-10">{hotelDetail()}</ScrollView>
        </View>

        <View className="flex-row  mt-auto ">
          <View className="grow">
            <TouchableOpacity activeOpacity={1.0}>
              <Text
                className="bg-[#405189] fixed bottom-4 w-11/12 mx-auto p-2 mb-12 rounded-lg text-white text-xl font-bold text-center"
                onPress={handleBooking}>
                Book this Hotel
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableWithoutFeedback
              onPress={changeFavIconState}
              activeOpacity={1.0}>
              <Image
                className={' fixed bottom-4 w-12 h-11 mr-8'}
                source={loveIcon}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>

      {/* button booking */}
    </SafeAreaView>
  );
}
