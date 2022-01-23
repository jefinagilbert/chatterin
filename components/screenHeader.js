import React, {useState, useEffect} from "react";
import { Platform, View, StyleSheet, Text, StatusBar, TouchableOpacity, TextInput, Image } from "react-native";
import { Ionicons, Entypo, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import firebase from "firebase";

export default function ScreenHeader(props){
    const indexActive = props.state.index
    const [user, setUser]  = useState({})
    const noFace = "https://www.responsiblebusiness.com/wp-content/uploads/2019/05/Speaker-Unknown.jpg"
    const currentId = firebase.auth().currentUser.uid

    useEffect(()=>{
        const fetchData = () => {
            firebase.firestore().collection("users").onSnapshot(snapshot=>{
                snapshot.docs.forEach(snap=>{
                    if(snap.data().userid === currentId){
                        setUser(snap.data())
                    }
                })
            })
        }
        fetchData()
    }, [])

    return(
        <View style={styles.header}>
            <TouchableOpacity onPress={()=> props.navigation.navigate('home')}>
                <Text style={styles.logo}>ChatterIn</Text>
            </TouchableOpacity>
            <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.headerIconsOpacity} onPress={()=> props.navigation.navigate('home')}>
                    <Entypo name="home" size={25} color={ indexActive === 0 ? "#fcba03" : "#fff"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerIconsOpacity} onPress={()=> props.navigation.navigate('search')}>
                    <FontAwesome name="search" size={24} color={ indexActive === 1 ? "#fcba03" : "#fff"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerIconsOpacity} onPress={()=> props.navigation.navigate('inbox')}>
                    <MaterialIcons name="message" size={25} color={ indexActive === 2 ? "#fcba03" : "#fff"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerIconsOpacity} onPress={()=> props.navigation.navigate('notification')}>
                    <Ionicons name="notifications" size={25} color={ indexActive === 3 ? "#fcba03" : "#fff"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerIconsOpacity} onPress={()=> props.navigation.navigate('myprofile')}>
                    <Image style={[styles.profileImg, {borderColor : indexActive === 4 ? "#fcba03" : "#2C4226"}]} source={{ uri : user.propic ? user.propic : noFace }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
    },
    header : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingTop : Platform.OS === "android" ? StatusBar.currentHeight : 20,
        backgroundColor : '#2C4226',
    },
    logo:{
        color : '#fff',
        fontFamily : 'Billabong',
        fontSize : 30,
        marginTop : 17,
        marginLeft : 10
    }, 
    headerIcons : {
        marginTop : 20,
        display : 'flex',
        flexDirection : 'row',
    },
    headerIcon2 : {
        marginTop : 18,
        marginRight : 15,
        display : 'flex',
        flexDirection : 'row',
        backgroundColor:'#2C4226',
        height : 38,
        borderBottomWidth:1,
        borderColor:'#fcba03',
    },
    headerIconsOpacity : {
        marginRight : 15
    },
    search:{
        color : '#fff',
        width: 200,
        height : 35,
        backgroundColor:'#2C4226',
        fontSize : 15
    },
    profileImg : {
        width : 27, height : 27, borderRadius : 50, borderWidth : 2, borderColor : '#fcba03'
    }
})