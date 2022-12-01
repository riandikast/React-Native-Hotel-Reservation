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
import SelectDropdown from 'react-native-select-dropdown';
export default function Booking({navigation}) {
  const [showLoading, setShowLoading] = useState(true);
  const [isinput, setIsInput] = useState(false);
  const dropdownIcon = require('../assets/Dropdown.png');
  const openedDropdownIcon = require('../assets/OpenedDropdown.png');
  const [gender, setGender] = useState();
  const genderOption = ['Male', 'Female'];
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
          <View>
            <Text className="text-[#405189] underline text-2xl mt-4 mb-1 ml-10  font-bold">
              Contact Information
            </Text>
            <View className="bg-white  mx-8   border-black ">
              <TextInput
                className="a py-4 px-4 rounded-lg mb-2 text-lg"
                placeholder="First Name"
                onChangeText={value => {
                  // setFirstname(value);
                }}
              />
            </View>

            <View className="bg-white mx-8 flex-row  border-black ">
              <Text className="text-black text-left my-3 text-xl ml-6 font-semibold">
                Gender
              </Text>
              <View className="ml-auto">
                <SelectDropdown
                  defaultValue={gender}
                  defaultButtonText={gender}
                  renderDropdownIcon={isOpened => {
                    return (
                      <Image
                        className="h-4 w-4 mr-3 -ml-36"
                        //   source={
                        //     isOpened ? openedDropdownIcon : dropdownIcon
                        //   }
                      />
                    );
                  }}
                  buttonTextStyle={{opacity: 50, color: '#fffff'}}
                  buttonStyle={{backgroundColor: '#ffffff'}}
                  data={genderOption}
                  onSelect={(selectedItem, index) => {
                    //     setGender(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
