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
  ActivityIndicator,
} from 'react-native';

export default function LoadingModal({
  msg,
  positiveText,
  negativeText,
  isVisible,
  positiveClick,
  negativeClick,
}) {
  return (
    <Modal animationType="fade" transparent={true} isVisible={isVisible}>
      <View className="  h-full w-full">
        <View className=" my-auto mx-auto">
          <ActivityIndicator size={60} color="#405189" />
        </View>
      </View>
    </Modal>
  );
}
