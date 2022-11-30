import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

import * as React from 'react';
import {NavigationContainer, CommonActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import LoadingModal from '../components/LoadingModal';
export default function Profile({navigation}) {
  const [showLoading, setShowLoading] = useState(true);
  const checkNavigator = async () => {
    try {
      const loginCheck = await AsyncStorage.getItem('@loginNavigator').then(
        JSON.parse,
      );

      if (loginCheck) {
        setShowLoading(false); // yang bagian ini nanti pindahin ke habis loading data
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
  }, [navigation]);
  return (
    <SafeAreaView>
      <View>
        {showLoading ? (
          <LoadingModal />
        ) : (
          <>
            <View></View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
