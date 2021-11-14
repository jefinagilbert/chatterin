import React, {useState} from "react";
import { Platform, View, StyleSheet, Text, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons, Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';

export default function ScreenHeader(props){

    const indexActive = props.state.index
    console.log(props.state.index)
    return(
        <View style={styles.header}>
            <TouchableOpacity onPress={()=> props.navigation.navigate('home')}>
                <Text style={styles.logo}>ChatterIn</Text>
            </TouchableOpacity>
            <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.headerIconsOpacity} onPress={()=> props.navigation.navigate('home')}>
                    <Entypo name="home" size={25} color={ indexActive === 0 ? "#fcba03" : "#fff"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerIconsOpacity} onPress={()=> props.navigation.navigate('inbox')}>
                    <MaterialIcons name="message" size={25} color={ indexActive === 1 ? "#fcba03" : "#fff"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerIconsOpacity}>
                    <Ionicons name="notifications" size={25} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerIconsOpacity} onPress={()=> props.navigation.navigate('edituser')}>
                    <AntDesign name="profile" size={25} color={ indexActive === 2 ? "#fcba03" : "#fff"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerIconsOpacity}>
                    <Ionicons name="settings-sharp" size={25} color="#fff" />
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
    headerIconsOpacity : {
        marginRight : 15
    }
})