import React from 'react';
import Modal from 'react-native-modalbox';

import {
  Text,
  Button,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {useState, useEffect} from 'react';
export default function ZoomImageDialog({
  editClick,
  text,
  isShow,
  onClosed,
  backClick,
  imageSource,
}) {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View className="flex flex-col  ">
      <View className="z-10 bg-[#405189] flex flex-row">
        <View className="grow mb-4">
          <TouchableWithoutFeedback onPress={backClick} activeOpacity={1.0}>
            <Image
              className={'w-10 h-10 p-3  mt-3 ml-4 relative'}
              source={require('../assets/Back.png')}
            />
          </TouchableWithoutFeedback>
        </View>

        <View className="justify-center flex-1 mt-4">
          <Text className="text-white text-center  mb-5 text-xl ">
            {text}
          </Text>
        </View>

        <View className="grow">
          <TouchableWithoutFeedback onPress={editClick} activeOpacity={1.0}>
            <Image
              className={'w-7 h-7 p-3  mt-5 mr-8 ml-auto'}
              source={require('../assets/EditIcon.png')}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>

      <View className="h-screen bg-black -mt-16">
        <View className="py-52 ">
          <Image
            className="my-auto mx-auto  w-full h-full"
            source={imageSource}></Image>
        </View>
      </View>
    </Animated.View>
  );
}
