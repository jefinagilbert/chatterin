import React from "react";
import firebase from "firebase";
import { Text, View } from "react-native";

export default function  EditUserScreen(props) {
    React.useEffect(()=>{
        firebase.firestore().collection("users").onSnapshot(snapshot=>{
            let a = 0
            snapshot.docs.forEach(snap=>{
                
            })
        })
    },[])

    return (
        <View>
            <Text>Helllooooooo</Text>
        </View>
    )
}