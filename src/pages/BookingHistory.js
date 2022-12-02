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

export default function BookingHistory({navigation, route}) {
  const [dataBooking, setDataBooking] = useState([]);
  const [id, setID] = useState();
  const [isLogin, setIsLogin] = useState();
  const [showLoading, setShowLoading] = useState(true);
  const [isData, setIsData] = useState();
  const getHistory = async () => {
    const data = await AsyncStorage.getItem('@booking').then(JSON.parse);
    setDataBooking(data);
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

  const historyList = () => {
    return dataBooking?.map(i => {
        if (id === i.userid) {
        return (
          <View className="bg-white rounded-xl my-3">
            <View className="flex flex-row justify-between p-3">
              <Image source={{uri: i.image}} className="w-40 h-44 my-auto object-contain rounded-lg"/>
              <View className="w-3/5">
              <Text className='text-black text-xl font-semibold mb-1' numberOfLines={2}>{i.hotelName}</Text>
                <View className="flex flex-row justify-end mt-1">
                  <Text className="text-black text-lg">{i.name}</Text>
                </View>
                <View className="flex flex-row justify-end mt-1">
                  <Text className="text-black text-lg">{i.email}</Text>
                </View>
                <Text className="text-black text-lg font-semibold mt-2">{i.totalDay} Day, {i.totalRoom} Room, {i.guest} Guest</Text>
                <View className="flex flex-row justify-between mt-1">
                  <Text className="text-black font-semibold text-lg">Total</Text>
                  <Text className="text-black font-semibold text-lg">${i.totalPrice}</Text>
                </View>
              </View>
            </View>
          </View>
        )
      }
    })
  }

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

  const checkData = async () => {
    if (dataBooking.length > 0) {
      setIsData(true);
      for (let i = 0; i < dataBooking?.length; i++) {
        Reactotron.log(dataBooking[i].userid);
        if (dataBooking[i].userid === id) {
          setIsData(true);
        } else {
          setIsData(false);
        }
      }
    } else {
      setIsData(false);
    }
  };

  const noData = () => {
    return (
      <>
        <View className="w-screen h-[80vh]  right-10  bottom-5 flex justify-center items-center">
          <Text className="text-2xl">No Data Yet</Text>
        </View>
      </>
    );
  };
  useEffect(() => {
    checkNavigator();
    getUserData();
    checkData()
  }, [navigation]);

  React.useLayoutEffect(() => {
    getHistory();
  }, []);

  return (
    <SafeAreaView>
      <View className="bg-[#405189]  flex  flex-row">
        <View className="mb-4 w-2/6">
          <TouchableWithoutFeedback
            onPress={() => navigation.goBack()}
            activeOpacity={1.0}>
            <Image
              className={'w-10 h-10 p-3 mt-4 ml-4'}
              source={require('../assets/Back.png')}
            />
          </TouchableWithoutFeedback>
        </View>

        <View className=" flex-1 justify-center mr-2">
          <Text className="text-white text-2xl ">Booking History</Text>
        </View>
        <View className="w-3/12"></View>
      </View>
      <ScrollView>
        <View className="px-8 pt-8 pb-20">{showLoading ? <LoadingModal /> : isData ? historyList() : noData()}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
