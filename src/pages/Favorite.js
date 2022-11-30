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
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Favorite({navigation}) {
  const [dataFavorite, setDataFavorite] = useState([]);

  const getFavorite = async () => {
    const data = await AsyncStorage.getItem('@favorite').then(JSON.parse);
    setDataFavorite(data);
  };

  const favList = () => {
    return dataFavorite?.map(i => {
      return (
        <TouchableOpacity
          className="z-10 bg-white rounded-xl my-3"
          key={i.id}
          onPress={() => navigation.navigate('Detail', {hotelId: i.id})}>
          {Reactotron.log(i.id)}
          <Image source={require('../assets/hotel.jpeg')}className="w-full h-44 object-contain" />
          <View className="p-5">
            <Text className="text-black text-2xl font-semibold mb-1">
              {i.name}
            </Text>
            <Text className="text-[#405189] mt-1 text-xl font-bold">{i.price}</Text>
            <Text className="text-md ">{i.location}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  useEffect(() => {
    getFavorite();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>{favList()}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
