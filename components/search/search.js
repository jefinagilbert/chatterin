import React, { useEffect, useState } from 'react'
import {View, Text, ScrollView, TouchableOpacity, Image, TextInput} from 'react-native'
import {styles} from './searchStyle'
import firebase from "firebase";
import { AntDesign } from '@expo/vector-icons';

function Search(props){
    const [users, setUsers] = useState([])
    const currentId = firebase.auth().currentUser.uid
    const [search, setSearch] = useState("")

    useEffect(()=>{
        const fetchData = async () => {
            firebase.firestore().collection("users").onSnapshot(snapshot=>{
                setUsers([])
                snapshot.docs.forEach(snap=>{
                    if(snap.data().uid !== currentId){
                        setUsers(prev=>[...prev, snap.data()])
                    }
                })
            })
        }
        fetchData()
    }, [])

    const onPressProfile = (uid)=> {
        props.navigation.navigate("profile",{oppUId : uid})
        if(uid === currentId){
            props.navigation.navigate("myprofile")
        }
    }
    
    return(
        <View style={{display : 'flex', alignItems : 'center'}}>
            <View style={styles.headerIcon2}>
                <TextInput value={search} onChangeText={text=> setSearch(text)} style={styles.search} placeholder="Search" placeholderTextColor="#000" />
                <AntDesign style={{marginTop : 7}} name="search1" size={22} color="#fcba03" />
            </View>
            <ScrollView style={{alignSelf : 'flex-start'}}>
                {users.map(user=>{
                    if(user.username.includes(search.toLocaleLowerCase()) && search.length !== 0){
                        return(
                            <TouchableOpacity key={user.userid} style={styles.messageBox} onPress={()=>onPressProfile(user.userid)}>
                                <Image style={styles.image} source={{ uri : user.propic !== "" ? user.propic : "https://www.booksie.com/files/profiles/22/mr-anonymous.png" }} />
                                <View style={{marginLeft : 10}}>
                                    <Text style={styles.username}>{user.username}</Text>
                                    <Text style={styles.fullname}>{user.fullname}</Text>
                                </View>
                                <TouchableOpacity style={styles.friends}>
                                    <Text style={styles.friendSts}>Pursuing</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )
                    }
                    else{
                        <TouchableOpacity key={user.userid}></TouchableOpacity>
                    }
                })}
            </ScrollView>
        </View>
    )
}

export default Search