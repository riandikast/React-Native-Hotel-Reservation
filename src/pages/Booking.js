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

import DatePicker from 'react-native-date-picker';
import {differenceInDays} from 'date-fns';
import * as React from 'react';
import {NavigationContainer, CommonActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import LoadingModal from '../components/LoadingModal';
import SelectDropdown from 'react-native-select-dropdown';
import Reactotron from 'reactotron-react-native';
import FormatDate from '../components/FormatDate';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {bookingSlice} from '../features/BookingSlice';
import {bookingHotel, getBookingHistory} from '../features/BookingSlice';
import {useDispatch, useSelector} from 'react-redux';

export default function Booking({navigation, route}) {
  const [showLoading, setShowLoading] = useState(true);
  const [isInput, setIsInput] = useState(false);
  const dropdownIcon = require('../assets/Dropdown.png');
  const openedDropdownIcon = require('../assets/OpenedDropdown.png');
  const [dateIn, setDateIn] = useState(new Date());
  const [dateOut, setDateOut] = useState(new Date());
  const [modalIn, setModalIn] = useState(false);
  const [modalOut, setModalOut] = useState(false);
  const {hotelId, hotelName, hotelPrice, hotelImage} = route.params;
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [room, setRooms] = useState();
  const [guest, setGuest] = useState();
  const [totalDay, setTotalDay] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [userID, setUserID] = useState();

  const dispatch = useDispatch();
  const CustomAlert = (msg, position, img, mt) => {
    return showMessage({
      message: msg,
      position: position,
      animated: true,
      animationDuration: 500,
      style: {
        marginTop: mt,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        marginVertical: 5,
      },
      icon: props => <Image source={img} {...props} />,
      type: 'error',
    });
  };

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

  const checkTextInput = () => {
    if (name && email && phoneNumber && room && guest && totalPrice > 0) {
      return setIsInput(true);
    } else {
      return setIsInput(false);
    }
  };

  const getTotalDays = () => {
    const startDate = FormatDate(dateIn.toISOString());

    const startYear = startDate.slice(0, 4);
    const startMonth = startDate.slice(5, 7);
    const startDay = startDate.slice(8);

    const endDate = FormatDate(dateOut.toISOString());

    const endYear = endDate.slice(0, 4);
    const endMonth = endDate.slice(5, 7);
    const endDay = endDate.slice(8);

    const currentDate = FormatDate(new Date().toISOString());

    const currentDateYear = currentDate.slice(0, 4);
    const currentDateMonth = currentDate.slice(5, 7);
    const currentDateDay = currentDate.slice(8);

    const formatingStartDate = new Date(startYear, startMonth, startDay);
    const formatingEndDate = new Date(endYear, endMonth, endDay);
    const formatingCurrentDate = new Date(
      currentDateYear,
      currentDateMonth,
      currentDateDay,
    );

    const result = differenceInDays(formatingEndDate, formatingStartDate);
    const isPastStartDay = differenceInDays(
      formatingStartDate,
      formatingCurrentDate,
    );
    const isPastEndDay = differenceInDays(
      formatingEndDate,
      formatingCurrentDate,
    );
    if (isPastStartDay < 0 || isPastEndDay < 0) {
      CustomAlert(
        'Cant Set the Date to Past Day',
        'center',
        require('../assets/Warning.png'),
      );
      setDateIn(new Date());
      setDateOut(new Date());
    } else {
      if (result >= 0) {
        setTotalDay(result);
      } else {
        setTotalDay(0);
        CustomAlert(
          'End Date cannot be Earlier than Start Date',
          'center',
          require('../assets/Warning.png'),
        );
        setDateIn(new Date());
        setDateOut(new Date());
      }
    }
    Reactotron.log(isPastStartDay);

    const price = hotelPrice.slice(1);
    const numberPrice = Number(price);
    const numberRoom = Number(room);
    if (room && startDate && endDate) {
      setTotalPrice(totalDay * numberPrice * numberRoom);
    }
  };

  const getUserData = async () => {
    try {
      const accountData = await AsyncStorage.getItem('@account').then(
        JSON.parse,
      );
      accountData.map(acc => {
        if (acc.isLogin) {
          setUserID(acc.id);
        }
      });
    } catch (err) {}
  };

  const handleBooking = async () => {
    let bookingData = {
      userid: userID,
      name: name,
      email: email,
      image: hotelImage,
      hotelName: hotelName,
      totalPrice: totalPrice,
      phoneNumber: phoneNumber,
      hotelId: hotelId,
      price: hotelPrice,
      totalRoom: room,
      guest: guest,
      startDate: dateIn,
      endDate: dateOut,
      totalDay: totalDay,
      totalPrice: totalPrice,
    };
    dispatch(bookingHotel(bookingData));
    navigation.navigate('')
  };

  const getOldBookingData = async () => {
    const bookingData =
      (await AsyncStorage.getItem('@booking').then(JSON.parse)) || [];
      Reactotron.log(bookingData)
    dispatch(getBookingHistory({booking: bookingData}));
 
  };

  useEffect(() => {
    getTotalDays();
  }, [dateIn, dateOut, totalDay, totalPrice, room]);

  useEffect(() => {
    getUserData();
    getOldBookingData();
  }, [navigation]);

  React.useLayoutEffect(() => {
    checkTextInput();
  });

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
          <View className="mt-8">
            <Text className="text-[#405189] underline text-2xl mt-4 mb-1 ml-10  font-bold">
              Contact Information
            </Text>
            <View className="bg-white  mx-8 mb-4   border-black ">
              <TextInput
                className="a py-3 px-4 rounded-lg mb-2 text-lg"
                placeholder="Name"
                onChangeText={value => {
                  setName(value);
                }}
              />
            </View>

            <View className="bg-white  mx-8 mb-4   border-black ">
              <TextInput
                className="a py-3 px-4 rounded-lg mb-2 text-lg"
                placeholder="Email"
                onChangeText={value => {
                  setEmail(value);
                }}
              />
            </View>

            <View className="bg-white  mx-8 mb-4   border-black ">
              <TextInput
                className="a py-3 px-4 rounded-lg mb-2 text-lg"
                placeholder="Phone Number"
                onChangeText={value => {
                  setPhoneNumber(value);
                }}
              />
            </View>
            <Text className="text-[#405189] underline text-2xl mt-4 mb-1 ml-10  font-bold">
              Detail
            </Text>
            <View className="bg-white  mx-8 mb-4   border-black ">
              <TextInput
                className="a py-3 px-4 rounded-lg mb-2 text-lg"
                placeholder="How many Rooms?"
                keyboardType="numeric"
                onChangeText={value => {
                  setRooms(value);
                }}
              />
            </View>

            <View className="bg-white  mx-8 mb-4   border-black ">
              <TextInput
                className="a py-3 px-4 rounded-lg mb-2 text-lg"
                placeholder="How many Guest? (Max 9)"
                keyboardType="numeric"
                maxLength={1}
                onChangeText={value => {
                  setGuest(value);
                }}
              />
            </View>

            <View className="flex flex-row mx-8">
              {/* check in */}

              <View className="mr-2 w-44">
                <TouchableOpacity
                  className="px-2 rounded-md bg-white py-4 flex flex-row"
                  onPress={() => setModalIn(true)}>
                  <Image
                    source={require('../assets/Calendar.png')}
                    className="w- h-6 mr-2"
                  />

                  <Text>{dateIn.toDateString()}</Text>
                </TouchableOpacity>

                <DatePicker
                  modal
                  mode="date"
                  open={modalIn}
                  date={dateIn}
                  onConfirm={date => {
                    setModalIn(false);
                    setDateIn(date);
                  }}
                  onCancel={() => {
                    setModalIn(false);
                  }}
                />
              </View>
              {/* end check in */}

              {/* check out */}
              <View className=" mr-2 w-44">
                <TouchableOpacity
                  className="px-2 rounded-md bg-white py-4 flex flex-row"
                  onPress={() => setModalOut(true)}>
                  <Image
                    source={require('../assets/Calendar.png')}
                    className="w-6 h-6 mr-2"
                  />
                  <Text>{dateOut.toDateString()}</Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  mode="date"
                  open={modalOut}
                  date={dateOut}
                  onConfirm={date => {
                    setModalOut(false);
                    setDateOut(date);
                  }}
                  onCancel={() => {
                    setModalOut(false);
                  }}
                />
              </View>
              <View className="bg-white grow  border-black">
                <Text className="a py-3 px-4 rounded-lg  text-lg text-center">
                  {' '}
                  {totalDay} Day
                </Text>
              </View>
              {/* end check out */}
            </View>

            <Text className="text-[#405189] underline text-2xl mt-4 mb-1 ml-10  font-bold">
              Summary
            </Text>

            <Text className="text-[#405189] bg-white mx-8 py-3 px-4 underline text-lg mt-2    font-bold">
              {`Price ${hotelPrice} / Room for 1 Day`}
            </Text>
            <View className="bg-white mx-8 flex-row   border-black ">
              <Text className="text-black text-left my-3 text-xl ml-6 font-semibold">
                Total
              </Text>
              <Text className="text-black text-left my-1 text-xl ml-auto mr-12 opacity-70">
                ${totalPrice}
              </Text>
            </View>
          </View>
        </View>
        <View className="grow mx-8">
          <TouchableOpacity
            activeOpacity={1.0}
            onPress={handleBooking}
            disabled={isInput ? false : true}>
            <Text
              className={`bg-[#405189]  fixed bottom-2 w-full mx-auto p-2 mb-12 rounded-lg text-white text-xl font-bold text-center ${
                isInput ? 'opacity-100' : 'opacity-50'
              }`}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
