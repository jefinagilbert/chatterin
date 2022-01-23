import React, { useState } from 'react';
import firebase from "firebase";
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity, TextInput, Button, Pressable } from 'react-native';
import Login from './Auth/Login/login';
import Signup from './Auth/Signup/signup';
import AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';
import HomeScreen from './components/home/homescreen';
import MessageInbox from './components/inbox/messageInbox';
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, addNavigationHelpers } from "@react-navigation/native"
import ScreenHeader from './components/screenHeader';
import { Provider } from 'react-redux';
import LoadingScreen from './components/loadingScreen';
import { firebaseConfig } from "./config";
import EditUserScreen from './components/editUserScreen';
import { createStore } from 'redux';
import reducers from './redux/Reducer/reducer';
import fetchingDataSignin from './components/fetchDataSigin';
import UpdateProfile from './components/updateprofile/updateProfile';
import Search from './components/search/search';
import MessageBox from './components/inbox/messageBox';
import Notification from './components/notification/notification';
import Settings from './components/settings/settings';
import Profile from './components/profile/profile';
import MyProfile from './components/myprofile/myprofile'
import Friends from './components/friends/friends';
import CreatePost from './components/createPost/createPost';

const fetchFonts = () => {
  return Font.loadAsync({
    'Billabong': require('./assets/Billabong.ttf'),
    'Itim': require('./assets/Itim-Regular.ttf'),
    'Dongle' : require('./assets/Dongle.ttf'),
    'Balsamiq' : require('./assets/Balsamiq.ttf')
  });
};

const store = createStore(reducers)
const Stack = createStackNavigator()
const Tab = createMaterialTopTabNavigator()

const HomeScreenTab = () => {
  return(
    <Tab.Navigator initialRouteName="home" tabBar={(props) => <ScreenHeader {...props} />}>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="search" component={Search} />
      <Tab.Screen name="inbox" component={MessageInbox} />
      <Tab.Screen name="notification" component={Notification} />
      <Tab.Screen name="myprofile" component={MyProfile} />
    </Tab.Navigator>
  )
}

export default function App(){
  const [dataLoad, setDataLoad] = useState(false)
  const [load,setLoad] = useState(true)
  React.useEffect(()=>{
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }else {
        firebase.app()
    }
    setTimeout(() => setLoad(false))
  },[])

  if(!dataLoad){
    return(
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={()=> setDataLoad(true)}
        onError={()=> setDataLoad(true)}
      />
    )
  }

  return(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="loading" screenOptions={{ headerShown : false }}>
          <Stack.Screen name="loading" component={LoadingScreen} />
          <Stack.Screen name="home-tabs" component={HomeScreenTab} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="fetchingdata" component={fetchingDataSignin} />
          <Stack.Screen name="signup" component={Signup} />
          <Stack.Screen name="update-profile" component={UpdateProfile} />
          <Stack.Screen name="user-message" component={MessageBox} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="friends" component={Friends} />
          <Stack.Screen name="create-post" component={CreatePost} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  ) 
}

const styles = StyleSheet.create({
  
})