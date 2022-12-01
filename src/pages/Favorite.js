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
import Reactotron from 'reactotron-react-native';
import * as React from 'react';
import {NavigationContainer, CommonActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingModal from '../components/LoadingModal';
export default function Favorite({navigation}) {
  const [dataFavorite, setDataFavorite] = useState([]);
  const [id, setID] = useState();
  const [isLogin, setIsLogin] = useState();
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
          <TouchableOpacity
            className="z-10 bg-white rounded-xl my-3"
            key={i.id}
            onPress={() => navigation.navigate('Detail', {hotelId: i.id})}>
            <Image
              source={require('../assets/hotel.jpeg')}
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
        );
      }
    });
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

  useEffect(() => {
    checkNavigator();
    getUserData();
    getFavorite();
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        {/* <View>{showLoading ? <LoadingModal /> : favList()}</View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
