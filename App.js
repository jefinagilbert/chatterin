import React, { useState } from 'react';
import firebase from "firebase";
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity, TextInput, Button, Pressable } from 'react-native';
import Login from './Auth/login';
import Signup from './Auth/signup';
import AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';
import HomeScreen from './components/homescreen';
import MessageInbox from './components/messageInbox';
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, addNavigationHelpers } from "@react-navigation/native"
import ScreenHeader from './components/screenHeader';
import { Provider } from 'react-redux';
import LoadingScreen from './components/loadingScreen';
import { firebaseConfig } from "./config";
import EditUserScreen from './components/editUserScreen';
import { createStore } from 'redux';
import reducers from './Reducer/reducer';
import fetchingDataSignin from './components/fetchDataSigin';

const fetchFonts = () => {
  return Font.loadAsync({
    'Billabong': require('./assets/Billabong.ttf'),
  });
};

const store = createStore(reducers)
const Stack = createStackNavigator()
const Tab = createMaterialTopTabNavigator()

const HomeScreenTab = () => {
  return(
    <Tab.Navigator initialRouteName="home" tabBar={(props) => <ScreenHeader {...props} />}>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="inbox" component={MessageInbox} />
      <Tab.Screen name="edituser" component={EditUserScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  ) 
}

const styles = StyleSheet.create({
  
})