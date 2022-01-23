import React, { useState } from 'react';
import { Text, View,  TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import firebase from 'firebase'
import CheckLogin from '../check_login';
import { styles } from './signupStyle';
import { CHATTERINCOLORS } from '../../components/constants/defaults';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [conPassword, setConPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function signUpUsingEmail(){
    setLoading(true)
    setMessage("")
    if(email.length !== 0 && password.length !== 0 && conPassword.length !== 0){
      if(password.length > 7){
        if(password === conPassword){
          try{
            await firebase.auth().createUserWithEmailAndPassword(email, password)
          }catch(e){
            setMessage("Account Already Exist")
            setLoading(false)
            return
          }
          if(await CheckLogin() == true){
            navigation.navigate('home-tabs')
          }else{
            navigation.navigate('update-profile')
          }
        }else{
          setMessage("Password does not match")
        }
      }else{
        setMessage("Password is too weak")
      }
    }else{
      setMessage("Fill all the Boxes")
    }
    setLoading(false)
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.logo}>
          <Text style={styles.logotext}>ChatterIn</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.login}>
        <TextInput style={styles.input} placeholder="Email" onChangeText={text=> setEmail(text) } type="email" />
        <TextInput style={styles.input} placeholder="Password" onChangeText={text=> setPassword(text) } type="password" />
        <TextInput style={styles.input} placeholder="Confirm Password" onChangeText={text=> setConPassword(text) } type="password" />
        <Text style={{color : 'red', fontFamily : 'Itim'}}>{message}</Text>
        <TouchableOpacity disabled={loading} onPress={signUpUsingEmail}
          style={[styles.loginbtn, { backgroundColor : loading ? '#021a09' : CHATTERINCOLORS.BTNCOLOR }]}
        >
          <Text style={{color : '#fff',fontSize:16,letterSpacing: 0.25,fontWeight:'bold'}}>Signup</Text>
          {loading ? <ActivityIndicator style={{marginLeft : 10}} size="small" color="#fff" /> : null}
        </TouchableOpacity>
        <View style={styles.or1}><Text style={styles.or2}>OR</Text></View>
        <TouchableOpacity style={styles.googlebtn}>
          <Text style={{color : '#fff', fontSize:16, letterSpacing: 0.25, fontWeight:'bold'}}>Signup with Google</Text>
        </TouchableOpacity>
        <View style={styles.signup}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={()=> navigation.push("login")}>
            <Text style={{color: CHATTERINCOLORS.BTNCOLOR, fontWeight : 'bold'}}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}