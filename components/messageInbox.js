import React, { useState} from "react";
import {View, Text, Button, TextInput} from 'react-native'
import ScreenHeader from "./screenHeader";
import { useDispatch} from "react-redux";
import currentUserReducer from "../Reducer/reducer";

function MessageInbox(props){
    const [email,setEmail] = useState('')
    const [userid,setUserid] = useState('')
    const [username,setUsername] = useState('')
    return(
        <View>
            <Text> hello this is Inbox</Text>
            <TextInput style={{height:40, borderColor:'black',borderWidth:1, marginTop:10}} value={email} onChangeText={e=> setEmail(e) } placeholder="Email" />
            <TextInput style={{height:40, borderColor:'black',borderWidth:1, marginTop:10}} value={userid} onChangeText={e=> setUserid(e) } placeholder="UserId" />
            <TextInput style={{height:40, borderColor:'black',borderWidth:1, marginTop:10}} value={username} onChangeText={e=> setUsername(e) } placeholder="Username" />
            <Button title="ADD USER" />
        </View>
    )
}

export default MessageInbox