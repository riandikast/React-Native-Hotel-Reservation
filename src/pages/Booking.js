import {
      Button,
      StyleSheet,
      Text,
      TextInput,
      View,
      Keyboard,
      ImageBackground,
      SafeAreaView,
      TouchableWithoutFeedback,
      Image,
      TouchableOpacity,
    } from 'react-native';
    
    import * as React from 'react';
    import {NavigationContainer, CommonActions} from '@react-navigation/native';
    import {createNativeStackNavigator} from '@react-navigation/native-stack';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import {useState, useEffect} from 'react';
    import LoadingModal from '../components/LoadingModal';
    
    export default function Booking({navigation}) {
      const [showLoading, setShowLoading] = useState(true);
      const [isinput, setIsInput] = useState(false);
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
    
      return (
        <SafeAreaView>
          <View>
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
                <Text className="text-white text-2xl ">Book Now</Text>
              </View>
    
              <View className="grow"></View>
            </View>
    
            <View className="flex-col mb-12">
              <Text
                className={`text-4xl text-semibold p-2 text-[#405189] text-left mb-4 -ml-2 opacity-100 `}>
                Register
              </Text>
              <TextInput
                className="w-72  py-2 px-4 rounded-lg border mb-2"
                placeholder="First Name"
                onChangeText={value => {
                  // setFirstname(value);
                }}
              />
              <TextInput
                className="w-72  py-2 px-4 rounded-lg border mb-2"
                placeholder="Last Name"
                onChangeText={value => {
                  // setLastname(value);
                }}
              />
              <TextInput
                className="w-72  py-2 px-4 rounded-lg border mb-2"
                placeholder="Email"
                onChangeText={value => {
                  // setEmail(value);
                }}
              />
              <TextInput
                className="w-72 py-2 px-4 rounded-lg border mb-6"
                placeholder="Password"
                onChangeText={value => {
                  // setPassword(value);
                }}
              />
              <TouchableOpacity activeOpacity={1.0}>
                <Text
                  disabled={isinput ? false : true}
                   className={`bg-[#405189] p-2 border rounded-xl text-white text-center ${
                    isinput ? 'opacity-100' : 'opacity-60'
                  }`}>
                  Register
                </Text>
    
                <View className="flex flex-row mt-4 justify-center">
                  <Text className="text-base"> Already have an account ?</Text>
                  <Text
                    className="text-base  font-bold text-[#405189]"
                    onPress={() => navigation.navigate('Login')}>
                    {' '}
                    Login{' '}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
    }
    
    