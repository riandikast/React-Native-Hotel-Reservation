import {
      Button,
      TextInput,
      Text,
      Image,
      View,
      ImageBackground,
      ScrollView,
      SafeAreaView,
      TouchableOpacity,
    } from 'react-native';
    
    import * as React from 'react';
    import axios from "axios"
    import {NavigationContainer} from '@react-navigation/native';
    import {createNativeStackNavigator} from '@react-navigation/native-stack';
    
    
  export default function Home({navigation}) {
    const exImage = require('../assets/hotel.jpeg');
    const searchIcon = require('../assets/SearchIcon.png');
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
            <ScrollView className="p-8">
              {/* search */}
              <View className="bg-white p-4 rounded-lg mb-5 relative">
                <TextInput className="h-10 m-5 border border-gray-500 p-5 rounded-lg" placeholder="Where do you want to go?" value=''/>
                <Image source={searchIcon} className="w-7 h-7 relative bottom-14 left-6" />
              </View>

              {/* content */}
              <View className="bg-white p-4 rounded-lg">
                <View className="mb-5">
                  <Text className="text-black text-lg font-semibold mb-3">TOP DESTINATIONS</Text>
                  <ScrollView horizontal={true} className="snap-x">
                    <View className="snap-center">
                      <ImageBackground source={exImage} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                          <Text className="text-xl text-white absolute bottom-3 left-4">Bali</Text>
                      </ImageBackground>
                    </View>
                    <View className="snap-center">
                      <ImageBackground source={exImage} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                        <Text className="text-xl text-white absolute bottom-3 left-4">Yogyakarta</Text>
                      </ImageBackground>
                    </View>
                    <View className="snap-center">
                      <ImageBackground source={exImage} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                        <Text className="text-xl text-white absolute bottom-3 left-4">Jakarta</Text>
                      </ImageBackground>
                    </View>
                    <View className="snap-center">
                      <ImageBackground source={exImage} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                        <Text className="text-xl text-white absolute bottom-3 left-4">Bandung</Text>
                      </ImageBackground>
                    </View>
                    <View className="snap-center">
                      <ImageBackground source={exImage} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                        <Text className="text-xl text-white absolute bottom-3 left-4">Karawang</Text>
                      </ImageBackground>
                    </View>
                  </ScrollView>
                </View>
                <View>
                  <Text className="text-black text-lg font-semibold mb-3">POPULAR DESTINATIONS</Text>
                  <ScrollView horizontal={true} className="snap-x">
                  <View className="snap-center">
                      <ImageBackground source={exImage} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                          <Text className="text-xl text-white absolute bottom-3 left-4">Bali</Text>
                      </ImageBackground>
                    </View>
                    <View className="snap-center">
                      <ImageBackground source={exImage} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                        <Text className="text-xl text-white absolute bottom-3 left-4">Yogyakarta</Text>
                      </ImageBackground>
                    </View>
                    <View className="snap-center">
                      <ImageBackground source={exImage} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                        <Text className="text-xl text-white absolute bottom-3 left-4">Jakarta</Text>
                      </ImageBackground>
                    </View>
                    <View className="snap-center">
                      <ImageBackground source={exImage} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                        <Text className="text-xl text-white absolute bottom-3 left-4">Bandung</Text>
                      </ImageBackground>
                    </View>
                    <View className="snap-center">
                      <ImageBackground source={exImage} className="mr-3 w-44 h-40" imageStyle={{ borderRadius: 10}}>
                        <Text className="text-xl text-white absolute bottom-3 left-4">Karawang</Text>
                      </ImageBackground>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      );
    }
    