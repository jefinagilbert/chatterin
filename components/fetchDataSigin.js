import React, { useState,  useEffect } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity, TextInput, Button } from 'react-native';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/core';


export default function fetchingDataSignin({navigation}){
    useEffect(() => {
        console.log("dfkd")
        // if(firebase.auth().currentUser){
        //     navigation.navigate('home-tabs')
        // }
        // else{
        //     navigation.navigate('login')
        // }
    }, [navigation])
    return(
        <View>
            <Text>{firebase.auth().currentUser && firebase.auth().currentUser.email}</Text>
        </View>
    )
}