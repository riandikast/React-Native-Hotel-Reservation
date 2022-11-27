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
  TouchableHighlight,
  TouchableWithoutFeedback,
  PermissionsAndroid,
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
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import ImagePickerDialog from '../components/ImagePickerDialog';
import ZoomImageDialog from '../components/ZoomImageDialog';
import Modal from 'react-native-modalbox';

export default function Settings({navigation}) {
  const [id, setID] = useState();
  const [image, setImage] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState();
  const [filePath, setFilePath] = useState({});
  const [imagePicker, setImagePicker] = useState(false);
  const [isZoom, setZoom] = useState(false);
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
          setImage(acc.image);
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
          password: password,
          firstname: firstname,
          lastname: lastname,
          email: email,
          gender: gender,
        }),
      );
    } catch (err) {}
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      } else {
        setImage(response.assets[0].uri);
      }
      console.log('base64 -> ', response.assets[0].base64);
      console.log('uri -> ', response.assets[0].uri);
      console.log('width -> ', response.assets[0].width);
      console.log('height -> ', response.assets[0].height);
      console.log('fileSize -> ', response.assets[0].fileSize);
      console.log('type -> ', response.assets[0].type);
      console.log('fileName -> ', response.assets[0].fileName);
      setFilePath(response);
      setImagePicker(false);
    });
  };

  const getImageUser = () => {
    if (image === null) {
      return require('../assets/Profile.png');
    } else {
      if (Object.keys(filePath).length !== 0) {
        return {uri: filePath.assets[0].uri};
      }
      return {uri: image};
    }
  };

  const deleteImageUser = () => {
    setImage(null);
    setFilePath({});
    setImagePicker(false);
    setZoom(false);
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        } else {
          setImage(response.assets[0].uri);
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
        setImagePicker(false);
      });
    }
  };

  const zoomImage = () => {
    if (image === null) {
      setImagePicker(true);
    } else {
      setZoom(true);
    }
  };
  const zoomLayout = () => {
    return (
      <ZoomImageDialog
        backClick={() => setZoom(false)}
        text="Profile Photo"
        editClick={() => setImagePicker(true)}
        imageSource={{uri: image}}></ZoomImageDialog>
    );
  };
  const pickImage = () => {
    return (
      <ImagePickerDialog
        cameraClick={() => captureImage('photo')}
        deleteClick={deleteImageUser}
        galleryClick={() => chooseFile('photo')}
        isShow={imagePicker}
        onClosed={() => setImagePicker(false)}></ImagePickerDialog>
    );
  };

  const hideTabBar = () => {
    if (imagePicker) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else if (isZoom) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    updateUserData();
  }, [email, password, image, gender, firstname, lastname]);

  useEffect(() => {
    hideTabBar();
  }, [imagePicker, isZoom]);

  return (
    <SafeAreaView>
      {isZoom && (
        <>
          <View className="z-50">
            {pickImage()}
            {zoomLayout()}
          </View>
        </>
      )}

      <View className="bg-[#405189]">
        <TouchableWithoutFeedback activeOpacity={1.0}>
          <Image
            className={'w-10 h-10 p-3 -mb-8 mt-4 ml-4 relative'}
            source={require('../assets/Back.png')}
          />
        </TouchableWithoutFeedback>

        <Text className="text-white text-center mb-6 text-xl ">Settings</Text>
      </View>

      <TouchableOpacity activeOpacity={1.0}>
        <View className="flex-1 flex-row justify-center ">
          <TouchableWithoutFeedback
            activeOpacity={1.0}
            onPress={() => zoomImage()}>
            <Image
              className={'w-44 h-44  mt-10 rounded-full border-black border-2 '}
              source={getImageUser()}
            />
          </TouchableWithoutFeedback>
        </View>
        <View className="justify-center items-center">
          <TouchableWithoutFeedback
            activeOpacity={1.0}
            onPress={() => setImagePicker(true)}>
            <Image
              className={'w-20 h-20  mt-36 ml-28 '}
              source={require('../assets/EditIcon.png')}
            />
          </TouchableWithoutFeedback>
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
            <View className="ml-auto">
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
                buttonTextStyle={{opacity: 50, color: '#fffff'}}
                buttonStyle={{backgroundColor: '#ffffff'}}
                data={genderOption}
                onSelect={(selectedItem, index) => {
                  setGender(selectedItem);
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
          <TouchableWithoutFeedback onPress={handleLogout} activeOpacity={1.0}>
            <View className="bg-white mx-8 flex-row  border-black ">
              <Text
              
                className="text-[#d72323] text-left my-3 text-xl ml-6 font-semibold">
                Logout
              </Text>

              <Image
                className={'w-6 h-6 ml-auto mt-4 mr-3 '}
                source={require('../assets/Forward.png')}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
      {!isZoom && pickImage()}
    </SafeAreaView>
  );
}
