import React, { useState } from "react";
import { Platform, View, StyleSheet, Text, StatusBar, TouchableOpacity, Button, ActivityIndicator,
ScrollView } from "react-native";
import ScreenHeader from "../screenHeader";
import MessageInbox from "../inbox/messageInbox";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
import {addCurrentUser} from '../../redux/actions/action'
import Spinner from "react-native-loading-spinner-overlay";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {styles} from './homescreenStyle'
import * as ImagePicker from 'expo-image-picker';


function HomeScreen(props){
    const [user, setUser] = useState()
    const currentUser = firebase.auth().currentUser
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [image, setImage] = useState(null);
    
    React.useEffect(()=>{    
        firebase.firestore().collection("users").onSnapshot(snapshot=>{
            snapshot.docs.forEach(snap=>{
                if(currentUser.email === snap.data().email){
                    setUser(snap.data())
                }
            })
        })
        setTimeout(()=>{
            setLoading(true)
        }, 3000)
    },[])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if(!result.cancelled) {
            setImage(result.uri)
            props.navigation.navigate("create-post",{imgid : result.uri})
        }
    };

    async function handlelLogOut() {
        try{
            await firebase.auth().signOut()
        }
        catch{
            console.log("Cannot logout")
        }
        dispatch(addCurrentUser({}))
        props.navigation.navigate("login")
    }

    if(loading === false){
        return(
            <View style={styles.spinner}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        )
    }
    
    return(
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.newPost} onPress={pickImage}>
                <MaterialCommunityIcons name="camera-image" size={30} />
                <Text style={styles.postHeader}>Add New Post</Text>
            </TouchableOpacity>
            <Text style={styles.header}>Hello, {user ? user.fullname : ''} </Text>
            <Button title="Logout" onPress={handlelLogOut} />
        </ScrollView>
    )
}

export default HomeScreen

