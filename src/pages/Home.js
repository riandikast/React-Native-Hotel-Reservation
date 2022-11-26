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
    } from 'react-native';
    
    import * as React from 'react';
    import {NavigationContainer} from '@react-navigation/native';
    import {createNativeStackNavigator} from '@react-navigation/native-stack';
    
    
    export default function Home({navigation}) {
      return (
        <SafeAreaView>
          <View>
            <TouchableOpacity activeOpacity={1.0}>
              <Text
                onPress={() => navigation.navigate('Login')}
                className={`bg-[#405189] p-2 border w-20 mt-8 ml-4 rounded-xl text-white text-center `}>
                Login 
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
    