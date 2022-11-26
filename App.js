/* eslint-disable prettier/prettier */
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import FlashMessage from 'react-native-flash-message';
import Home from './src/pages/Home';
import Favorite from './src/pages/Favorite';
import Profile from './src/pages/Profile';
import Settings from './src/pages/Settings';
import Splashscreen from './src/pages/Splashscreen';
import React, {useEffect} from 'react';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNav = () => {
  const searchIcon = require('./src/assets/SearchIcon.png');
  const favoriteIcon = require('./src/assets/Favorite.png');
  const userIcon = require('./src/assets/User.png');
  const settingsIcon = require('./src/assets/Settings.png');

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                style={{width: 35, height: 35, marginRight: 5}}
                source={searchIcon}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorite}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                style={{width: 35, height: 35, marginRight: 2, marginTop:4}}
                source={favoriteIcon}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profiles"
        component={Profile}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                style={{width: 32, height: 32, marginRight: 2}}
                source={userIcon}
              />
            );
          },
        }}
      />
      <Tab.Screen name="Settings" component={Settings}      options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                style={{width: 32, height: 32, marginRight: 2}}
                source={settingsIcon}
              />
            );
          },
        }}/>
    </Tab.Navigator>
  );
};

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splashscreen} />
      <Stack.Screen name="Home" component={TabNav} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {}, []);
  return (
    <>
      <NavigationContainer>
        {MyStack()}
        <FlashMessage position="top" />
      </NavigationContainer>
    </>
  );
}