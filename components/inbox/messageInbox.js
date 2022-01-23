import React, { useEffect, useState} from "react";
import firebase from "firebase";
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native'
import { Ionicons, Entypo, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { styles } from './messageInboxStyle'

function MessageInbox(props){
    const [users, setUsers] = useState([])
    const currentId = firebase.auth().currentUser.uid

    useEffect(()=>{
        const fetchData = async () => {
            firebase.firestore().collection("users").orderBy("createdAt").onSnapshot(snapshot=>{
                setUsers([])
                snapshot.docs.forEach(snap=>{
                    if(snap.data().userid !== currentId){
                        setUsers(prev=> [...prev, snap.data()])
                    }
                })
            })
        }
        fetchData()
    },[])
    return(
        <View style={styles.inboxMain}>
            <View style={[styles.card, styles.shadowProp]}>
                <TouchableOpacity style={styles.inboxOption}>
                    <FontAwesome5 name="inbox" size={54} color="#0096FF" />
                    <Text>Inbox</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inboxOption}>
                    <MaterialIcons name="phone-callback" size={54} color="#00A36C" />
                    <Text>Calls</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inboxOption}>
                    <Entypo name="new" size={54} color="black" />
                    <Text>New People</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.header}>Inbox</Text>
            </View>
            <ScrollView style={styles.conversationBox}>
                <TouchableOpacity style={styles.addUser}>
                    <Ionicons name="add-circle-sharp" size={44} color="#0096FF" />
                </TouchableOpacity>
                {users.map(m=>{
                    return(
                        <TouchableOpacity style={styles.messageBox} onPress={()=> props.navigation.navigate("user-message",{uid : m.userid})}>
                            <Image style={styles.image} source={{ uri : "https://www.booksie.com/files/profiles/22/mr-anonymous.png" }} />
                            <View style={{marginLeft : 10}}>
                                <Text style={styles.username}>{m.username}</Text>
                                <Text>Hey man Whatsup!</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default MessageInbox