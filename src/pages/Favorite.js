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
  TouchableWithoutFeedback,
} from 'react-native';
import Reactotron from 'reactotron-react-native';
import * as React from 'react';
import {NavigationContainer, CommonActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingModal from '../components/LoadingModal';
import {set} from 'date-fns';
export default function Favorite({navigation, route}) {
  const [dataFavorite, setDataFavorite] = useState([]);
  const [id, setID] = useState();
  const [isLogin, setIsLogin] = useState();
  const [isData, setIsData] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const getFavorite = async () => {
    const data = await AsyncStorage.getItem('@favorite').then(JSON.parse);
    setDataFavorite(data);
  };

  const getUserData = async () => {
    try {
      const accountData = await AsyncStorage.getItem('@account').then(
        JSON.parse,
      );
      accountData.map(acc => {
        if (acc.isLogin) {
          setID(acc.id);

          setShowLoading(false);
        }
      });
    } catch (err) {}
  };

  const favList = () => {
    return dataFavorite?.map(i => {
      if (id === i.userid) {
        return (
          <View className="bg-white rounded-xl my-3">
          <TouchableOpacity
            className="z-10 bg-white rounded-xl my-3"
            key={i.id}
            onPress={() =>
              navigation.navigate('Detail', {
                hotelName: i.name,
                hotelImage: i.image,
                hotelId: i.id,
                checkIn: i.checkIn,
                checkOut: i.checkOut,
                hotelPrice: i.price,
                guest: '2',
              })
            }>
            <Image
              source={{uri: i.image}}
              className="w-full h-44 object-contain"
            />
            <View className="p-5">
              <Text className="text-black text-2xl font-semibold mb-1">
                {i.name}
              </Text>
              <Text className="text-[#405189] mt-1 text-xl font-bold">
                {i.price}
              </Text>
              <Text className="text-md ">{i.location}</Text>
            </View>
          </TouchableOpacity>
          </View>

        );
      }
    });
  };

  const checkData = async () => {
    if (dataFavorite.length > 0) {
      setIsData(true);
      for (let i = 0; i < dataFavorite?.length; i++) {
        Reactotron.log(dataFavorite[i].userid);
        if (dataFavorite[i].userid === id) {
          setIsData(true);
        } else {
          setIsData(false);
        }
      }
    } else {
      setIsData(false);
    }
  };

  const checkNavigator = async () => {
    try {
      const loginCheck = await AsyncStorage.getItem('@loginNavigator').then(
        JSON.parse,
      );
      Reactotron.log(loginCheck);
      if (loginCheck) {
      } else {
        setShowLoading(false);
        AsyncStorage.setItem('@temporaryNavigation', 'home');
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {name: 'Home'},
              {
                name: 'Login',
              },
            ],
          }),
        );
      }
    } catch (error) {}
  };

  const noData = () => {
    return (
      <>
        <View className="w-screen h-[90vh] flex justify-center items-center">
          <Text className="text-2xl">No Data Yet</Text>
        </View>
      </>
    );
  };
  
  useEffect(() => {
    checkNavigator();
    getUserData();
   
    Reactotron.log(showLoading)
  }, [navigation]);

  React.useLayoutEffect(() => {
    getFavorite();
    checkData();
  });

  return (
    <SafeAreaView>
    
      <View className="bg-[#405189]  flex  flex-row">
        <View className="mb-4 grow">
          <TouchableWithoutFeedback
            onPress={() => navigation.goBack()}
            activeOpacity={1.0}>
            <Image
              className={'w-10 h-10 p-3 mt-4 ml-4'}
              source={require('../assets/Back.png')}
            />
          </TouchableWithoutFeedback>
        </View>

        <View className=" flex-1 justify-center ">
          <Text className="text-white text-2xl ">Favorite</Text>
        </View>
        <View className="grow"></View>
      </View>
      <ScrollView>
        <View> 
          {showLoading? <LoadingModal/> : isData ? favList() : noData()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
