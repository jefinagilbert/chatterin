import React, { useState} from "react";
import firebase from "firebase";
import {View, TextInput, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { styles } from './updateProfileStyle'
import { CHATTERINCOLORS } from '../constants/defaults'

function UpdateProfile({navigation}){

    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [dob, setDob] = useState("")
    const [userAvailable, setUserAvailable] = useState(false)
    const [error, setError] = useState("")
    const [errorNo, setErrorNo] = useState(0)
    const currentUser = firebase.auth().currentUser
    const [loading , setLoading] = useState(false)

    const onChangeUsername = (text) => {
        setUserAvailable(true)
        setUsername(text)
        let i = 0
        while(i < text.length){
            let a = text.charAt(i)
            if(a === a.toUpperCase()){
                setUserAvailable(false)
                return
            }
            i += 1
        }
        if(text.length < 7){
            setUserAvailable(false)
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        setError("")
        setErrorNo(0)
        if(userAvailable === false){
            setError("incorrect username for more details read the info")
            setLoading(false)
            return 
        }
        if(fullname === ""){
            setErrorNo(1)
            setLoading(false)
            return
        }
        if(dob === ""){
            setErrorNo(2)
            setLoading(false)
            return
        }
        const docid = firebase.firestore().collection("users").doc() 
        const docid2 = firebase.firestore().collection(currentUser.uid+"friends").doc()
        await docid.set({
            docid : docid.id, friendsdocid : docid2.id, userid : currentUser.uid, email : currentUser.email,
            username, fullname, dob, bio : '', propic : '', gender : '',
            createdAt : firebase.firestore.Timestamp.fromDate(new Date()).toDate(),
            active_now : true, account_privacy : false, show_active_status : true, 
        })
        await docid2.set({
            stalkers : [], pursuing : []
        })
        navigation.navigate("home-tabs")
    }

    return(
        <View style={styles.up_main}>
            <View style={styles.header}>
                <Text style={styles.logotext}>ChatterIn</Text>
            </View>
            <View style={styles.inputview}>
                <View style={styles.inputtabs}>
                    <Text style={styles.updateText}>Username</Text>
                    <View style={styles.userView}>
                        <TextInput style={styles.userInput} value={username} onChangeText={t=> onChangeUsername(t)} />
                        {userAvailable === true ? <AntDesign name="checkcircle" size={20} color={"#008000"} /> : <AntDesign name="closecircle" size={20} color={"#D2042D"} />}
                    </View>
                    <Text style={styles.messageTxt}>{error ? "*"+error : ''}</Text>
                </View>
                <View style={styles.inputtabs}>
                    <Text style={styles.updateText}>Full Name</Text>
                    <TextInput style={styles.updateInput} value={fullname} onChangeText={text=> setFullname(text)}/>
                    <Text style={styles.messageTxt}>{errorNo === 1 ? "*Fill this block" : ''}</Text>
                </View>
                <View style={styles.inputtabs}>
                    <Text style={styles.updateText} >E-mail</Text>
                    <TextInput style={styles.updateInput} value={currentUser.email} />
                </View>
                <View style={styles.inputtabs}>
                    <Text style={styles.updateText}>Date of Birth</Text>
                    <TextInput style={styles.updateInput} value={dob} onChangeText={text=> setDob(text)} />
                    <Text style={styles.messageTxt}>{errorNo === 2 ? "*Fill this block" : ''}</Text>
                </View>
                <TouchableOpacity style={[styles.updateButton, { backgroundColor: loading ? "#021a09" : CHATTERINCOLORS.BTNCOLOR}]} 
                    onPress={handleSubmit} disabled={loading}
                >
                    <Text style={styles.updateText1}>Update Button</Text>
                    {loading ? <ActivityIndicator style={{marginLeft : 10}} size="small" color="#fff" /> : null}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UpdateProfile