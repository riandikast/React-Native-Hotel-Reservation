import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  ImageBackground,
  SafeAreaView,
  Image,
} from 'react-native';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {logoutAcc, updateAcc} from '../features/UserSlice';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import SelectDropdown from 'react-native-select-dropdown';

export default function Settings({navigation}) {
  const [id, setID] = useState();
  const [image, setImage] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState();
  const dispatch = useDispatch();
  const dropdownIcon = require('../assets/Dropdown.png');
  const openedDropdownIcon = require('../assets/OpenedDropdown.png');
  const genderOption = ['Male', 'Female'];
  const handleLogout = async () => {
    try {
      const accountData = await AsyncStorage.getItem('@account').then(
        JSON.parse,
      );
      dispatch(logoutAcc({account: accountData}));
    } catch (err) {}
  };

  const getUserData = async () => {
    try {
      const accountData = await AsyncStorage.getItem('@account').then(
        JSON.parse,
      );
      accountData.map(acc => {
        if (acc.isLogin) {
          setID(acc.id);
          setFirstname(acc.firstname);
          setLastname(acc.lastname);
          setPassword(acc.password);
          setEmail(acc.email);
          setGender(acc.gender);
        }
      });
    } catch (err) {}
  };

  const updateUserData = async () => {
    try {
      const accountData = await AsyncStorage.getItem('@account').then(
        JSON.parse,
      );
      dispatch(
        updateAcc({
          account: accountData,
          id: id,
          image: image,
          firstname: firstname,
          lastname: lastname,
          email: email,
          gender: gender,
        }),
      );
    } catch (err) {}
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    updateUserData();
  }, [email, password, image, gender, firstname, lastname]);

  return (
    <SafeAreaView>
      <View className="bg-[#405189]">
        <TouchableOpacity className="flex " activeOpacity={1.0}>
          <Image
            className={'w-10 h-10 p-3 -mb-8 mt-4 ml-4 relative'}
            source={require('../assets/Back.png')}
          />

          <Text className="text-white text-center mb-6 text-xl ">Settings</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity activeOpacity={1.0}>
        <View className="flex-1 flex-row justify-center ">
          <Image
            className={'w-44 h-44  mt-10 rounded-full border-black border-2 '}
            source={require('../assets/Profile.png')}
          />
        </View>
        <View className="justify-center items-center">
          <Image
            className={'w-20 h-20  mt-36 ml-28 '}
            source={require('../assets/EditIcon.png')}
          />
        </View>

        <View>
          <Text className="text-[#405189] underline text-3xl mt-4 mb-1 ml-10  font-bold">
            Account
          </Text>
          <View className="bg-white mx-8 flex-row   border-black ">
            <Text className="text-black text-left my-3 text-xl ml-6 font-semibold">
              First Name
            </Text>
            <TextInput
              className="text-black text-left my-1 text-xl ml-auto mr-12 opacity-50"
              onChangeText={value => {
                setFirstname(value);
              }}>
              {firstname}
            </TextInput>
          </View>

          <View className="bg-white mx-8 flex-row   border-black ">
            <Text className="text-black text-left my-3 text-xl ml-6 font-semibold">
              Last Name
            </Text>
            <TextInput
              className="text-black text-left my-1 text-xl ml-auto mr-12 opacity-50"
              onChangeText={value => {
                setLastname(value);
              }}>
              {lastname}
            </TextInput>
          </View>

          <View className="bg-white mx-8 flex-row  border-black ">
            <Text className="text-black text-left my-3 text-xl ml-6 font-semibold">
              Email
            </Text>
            <TextInput
              className="text-black text-left my-1 text-xl ml-auto mr-12 opacity-50"
              onChangeText={value => {
                setEmail(value);
              }}>
              {email}
            </TextInput>
          </View>
          <View className="bg-white mx-8 flex-row  border-black ">
            <Text className="text-black text-left my-3 text-xl ml-6 font-semibold">
              Gender
            </Text>
            <View className='ml-auto'>
              <SelectDropdown
                defaultValue={gender}
                defaultButtonText={gender}
               
                renderDropdownIcon={isOpened => {
                  return (
                    <Image
                      className="h-4 w-4 mr-3 -ml-36"
                      source={isOpened ? openedDropdownIcon : dropdownIcon}
                    />
                  );
                }}
                buttonTextStyle={{opacity: 50, color:'#fffff'}}
                buttonStyle={{backgroundColor: '#ffffff'}}
                data={genderOption}
                onSelect={(selectedItem, index) => {
                  setGender(selectedItem)
        
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
        <View>
          <Text className="text-[#405189] underline text-3xl mt-8 mb-1 ml-10 font-bold">
            Support
          </Text>

          <View className="bg-white mx-8 flex-row  border-black ">
            <Text className="text-black text-left my-3 text-xl ml-6 font-semibold">
              Terms and Policy
            </Text>

            <Image
              className={'w-6 h-6 ml-auto mt-4 mr-3 '}
              source={require('../assets/Forward.png')}
            />
          </View>

          <View className="bg-white mx-8 flex-row  border-black ">
            <Text
              onPress={handleLogout}
              className="text-[#d72323] text-left my-3 text-xl ml-6 font-semibold">
              Logout
            </Text>

            <Image
              className={'w-6 h-6 ml-auto mt-4 mr-3 '}
              source={require('../assets/Forward.png')}
            />
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
