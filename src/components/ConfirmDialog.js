import React from 'react';

import {
  Text,
  Button,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';

export default function ConfirmDialog({
  msg,
  positiveText,
  negativeText,
  isVisible,
  positiveClick,
  negativeClick,
}) {
  return (
   
    <Modal  animationType='fade' transparent={true} isVisible={isVisible}>

      <View className=" bg-[#f2f2f2] border-2 border-black relative top-10 my-auto mx-auto    h-44 w-80 ">
        <View className="flex flex-col my-auto">
          <View>
            <Text className="text-[#405189] text-2xl mx-auto">
              {msg}
            </Text>
          </View>

          <View className="flex-row space-x-4 mt-4  justify-center">
            <View>
              <TouchableWithoutFeedback onPress={negativeClick}>
                <Text className='text-white bg-[#405189] p-2'>{negativeText}</Text>
              </TouchableWithoutFeedback>
            </View>
            <View>
              <TouchableWithoutFeedback  onPress={positiveClick}>
                <Text className='text-white bg-[#405189] p-2'>{positiveText}</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
