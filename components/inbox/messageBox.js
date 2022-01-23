import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native'
import { Ionicons, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";

function MessageBox(props){
    const [messages, setMessages] = useState([])
    const [messageText, setMessageText] = useState("")
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const currentId = firebase.auth().currentUser.uid
    const oppUserid = props.route.params.uid

    useEffect(()=>{
        const fetchData = async () => {
            firebase.firestore().collection("users").orderBy("createdAt").onSnapshot(snapshot=>{
                snapshot.docs.forEach(snap=>{
                    if(snap.data().userid === oppUserid){
                        setUser(snap.data())
                    }
                    setUsers(prev=> [...prev, snap.data()])
                })
            })
            firebase.firestore().collection(currentId).doc(oppUserid).collection(oppUserid).orderBy("date").onSnapshot(snapshot=>{
                setMessages([])
                snapshot.docs.forEach(snap=>{
                    setMessages(prev=> [...prev, snap.data()])
                })
            })
        }
        fetchData()
    },[])

    const onSendMessage = async () => {
        const docRef =  firebase.firestore().collection(currentId).doc(oppUserid).collection(oppUserid).doc()
        const docRef1 = firebase.firestore().collection(oppUserid).doc(currentId).collection(currentId).doc()
        firebase.firestore().collection(currentId).doc(oppUserid).set({
            time : firebase.firestore.Timestamp.fromDate(new Date()).toDate(),
        })
        firebase.firestore().collection(oppUserid).doc(currentId).set({
            time : firebase.firestore.Timestamp.fromDate(new Date()).toDate(),
        })
        docRef.set({
            msgid    : docRef.id,
            rcmsgid  : docRef1.id,
            sentbyid : currentId,
            senttoid : oppUserid,
            message  : messageText,
            date     : firebase.firestore.Timestamp.fromDate(new Date()).toDate(),
            seen     : false
        })
        docRef1.set({
            msgid    : docRef1.id,
            rcmsgid  : docRef.id,
            sentbyid : currentId,
            senttoid : oppUserid,
            message  : messageText,
            date     : firebase.firestore.Timestamp.fromDate(new Date()).toDate(),
            seen     : false
        })
    }

    return(
        <View style={styles.messageBoxmai}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=> props.navigation.goBack()}>
                    <Ionicons name="arrow-back-circle" size={34} color="#0096FF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> props.navigation.navigate("profile",{oppUId : oppUserid})}>
                    <Text style={styles.headerTxt}>{user ? user.fullname : ""}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <SimpleLineIcons name="options-vertical" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.messages}>
                {messages.map(m=>{
                    if(m.sentbyid === currentId){
                        return(
                            <View style={styles.outgoingView} key={m.msgid}>
                                <Text style={styles.outgoingMessage}>{m.message}</Text>
                            </View>
                        )
                    }
                    else{
                        return(
                            <View style={styles.incomingView} key={m.msgid}>
                                <Text style={styles.incomingMessage}>{m.message}</Text>
                            </View>
                        )
                    }
                })}
            </ScrollView>
            <View style={styles.typeBox}>
                <TouchableOpacity>
                    <MaterialIcons name="photo-size-select-actual" size={30} color="black" />
                </TouchableOpacity>
                <TextInput style={{width : 280, fontSize : 20, marginLeft : 10}} value={messageText} placeholder="Enter a message" onChangeText={text=> setMessageText(text)} />
                <TouchableOpacity style={{ marginLeft : 10}} onPress={()=> {
                    onSendMessage()
                    setMessageText("")
                }}>
                    <Ionicons name="ios-send" size={30} color="#0096FF" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    messageBoxmai :  {
        height : '100%',
    },
    header : {
        paddingTop : 30,paddingLeft : 10,
        paddingBottom : 5,paddingRight : 10,
        backgroundColor : '#2C4226',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    headerTxt : {
        fontSize : 30, color : '#fff', fontFamily : 'Itim'
    },
    typeBox : {
        padding : 10,
        position : "absolute",
        bottom : 10,
        width : "100%",
        borderWidth : 1,
        borderColor : "#000",
        display : 'flex',
        flexDirection : 'row',
        borderRadius : 50,
    },
    messages : {
        padding : 30,
        height : 500,
        borderWidth : 1,
        borderColor : "#000",
    },
    outgoingView : {
        marginTop : 5,
        marginBottom : 5,
        backgroundColor : '#0096FF',
        borderRadius : 20,
        padding : 10,
        width : 250,
        alignSelf : 'flex-end',
    },
    outgoingMessage : {
        textAlign : 'right',
        color : "#fff",
        fontWeight : 'bold',
    },
    incomingView : {
        marginTop : 5, marginBottom : 5,
        backgroundColor : '#D70040', borderRadius : 15, 
        padding : 10, width : 250,
    },
    incomingMessage : {
        color : "#fff", fontWeight : 'bold',
    },
})

export default MessageBox