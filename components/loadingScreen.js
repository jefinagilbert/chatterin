import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import firebase from "firebase";

export default function LoadingScreen({navigation}) {
    React.useEffect(()=>{
        // firebase.auth().onAuthStateChanged(user =>{
        //     if(user){
        //         navigation.navigate('home-tabs')
        //     }
        //     else{
        //         navigation.navigate('login')
        //     }
        // })\
        console.log("11")
        if(firebase.auth().currentUser){
            navigation.navigate('home-tabs')
        }
        else{
            navigation.navigate('login')
        }
    },[firebase])
    
    console.log("22")
    return(
        <View style={styles.loadContainer}>
          <Text style={styles.loadLogo}>ChatterIn</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    loadContainer : {
        width:'100%',height:'100%',backgroundColor:'#2C4226',
        flex : 1, justifyContent : 'center', alignItems : 'center'
    },
    loadLogo : {
        color : '#fff',
        fontSize : 50,
        fontFamily : 'Billabong'
    }
})