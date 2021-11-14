import React, { useState } from "react";
import { Platform, View, StyleSheet, Text, StatusBar, TouchableOpacity, Button } from "react-native";
import ScreenHeader from "./screenHeader";
import MessageInbox from "./messageInbox";
import { connect, useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
import {addCurrentUser} from './action'


function HomeScreen(props){
    const user = useSelector(state=> state.currentUser)
    const dispatch = useDispatch()
    React.useEffect(()=>{    
        // firebase.firestore().collection("users").onSnapshot(snapshot=>{
        //     let a = 0
        //     snapshot.docs.forEach(snap=>{
                
        //     })
        //     if(a === 0){
        //         props.navigation.navigate('edituser')
        //     }
        // })
    },[])

    async function handlelLogOut() {
        try{
            await firebase.auth().signOut()
            dispatch(addCurrentUser({}))
            props.navigation.navigate("login")
        }
        catch{
            console.log("Cannot logout")
        }
    }
    console.log(firebase.auth().currentUser)
    return(
        <View style={styles.container}>
            <Text style={styles.header}>Hello, {firebase.auth().currentUser && firebase.auth().currentUser.email} </Text>
            <Button title="Logout" onPress={handlelLogOut} />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container : {
    },
    header:{
        fontSize : 30,
        marginTop : 50,
        marginLeft : 40
    }
})