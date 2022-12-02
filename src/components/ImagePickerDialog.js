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
} from 'react-native';

export default function ImagePickerDialog({
  galleryClick,
  cameraClick,
  deleteClick,
  isShow,
  onClosed,
}) {
  return (
    <Modal
      backButtonClose={true}
      onClosed={onClosed}
      isOpen={isShow}
      backdrop={false}
      style={{backgroundColor: '#405189', marginTop: 600}}
      position={'bottom'}>
      <View className="flex flex-col z-50 ">
        <View className="flex flex-row">
          <Text className="text-white text-3xl mt-8 ml-8">Profile Photo</Text>
          <TouchableWithoutFeedback onPress={deleteClick}>
            <Image
              className="w-11 h-11 ml-auto mt-7 mr-12"
              source={require('../assets/FullTrash.png')}></Image>
          </TouchableWithoutFeedback>
        </View>
        <View className="flex flex-row space-x-12 ml-12 mt-8">
          <View className="flex flex-col items-center">
            <TouchableWithoutFeedback onPress={galleryClick}>
              <Image
                className="w-20 h-20  mt-7 "
                source={require('../assets/Gallery.png')}></Image>
            </TouchableWithoutFeedback>
            <Text className="text-white text-xl ">Gallery</Text>
          </View>
          <View className="flex flex-col items-center">
            <TouchableWithoutFeedback onPress={cameraClick}>
              <Image
                className="w-20 h-20  mt-7 "
                source={require('../assets/Camera.png')}></Image>
            </TouchableWithoutFeedback>
            <Text className="text-white text-xl ">Camera</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
