import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity, TextInput, Button, Pressable } from 'react-native';
import firebase from 'firebase'

export default function Signup({ navigation }) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [conPassword, setConPassword] = useState("")

  async function signUpUsingEmail(){
    if(password.length > 7){
      if(password === conPassword){
        await firebase.auth().createUserWithEmailAndPassword(email, password)
      }
    }
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
        <TouchableOpacity style={styles.loginbtn} onPress={signUpUsingEmail}>
          <Text style={{color : '#fff',fontSize:16,letterSpacing: 0.25,fontWeight:'bold'}}>Signup</Text>
        </TouchableOpacity>
        <View style={styles.or1}><Text style={styles.or2}>OR</Text></View>
        <View style={styles.signup}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={()=> navigation.push("login")}>
            <Text style={{color:'#1d75c2'}}> Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    justifyContent:'center',
    backgroundColor:'#fff',
  },
  header:{
    display: 'flex',
    flexDirection:'row',
    justifyContent:'center',
    borderColor:'black',
    backgroundColor:'#2C4226',
    paddingTop : Platform.OS === "android" ? StatusBar.currentHeight : 0 ,
    width:"100%",
    height : "30%"
  },
  logo:{
    marginTop : 15,
  },
  logotext:{
    color : '#fff',
    fontSize : 100,
    fontFamily : 'Billabong'
  },
  login:{
    width:'100%',
    height : '70%',
    paddingTop : "20%",
    display:'flex',
    justifyContent:'flex-start',
    alignItems : 'center'
  },
  input:{
    color : '#4d4949',
    width: 300,
    height : 40,
    borderWidth:1,
    backgroundColor:'#ebebeb',
    borderColor:'#cfc8c8',
    padding :10,
    marginTop : "5%",
    borderRadius: 5
  },
  loginbtn:{
    marginTop : "5%",
    alignItems: 'center',
    backgroundColor: '#1d75c2',
    width : 300,
    padding : 10,
    elevation: 3,
  },
  fgtpass:{
    marginTop : "10%"
  },
  or1:{
    position : 'relative',
    textAlign:'center',
    width:'100%',
    borderBottomColor:'#cfc8c8',
    borderWidth : 1,
    lineHeight : 0.1,
    marginTop : "10%",
  },
  or2:{
    position : 'absolute',
    top : -13,
    left : "46%",
    color : '#2d353d',
    fontSize : 20,
    backgroundColor: '#fff',
    paddingLeft : 5,
    paddingRight : 5
  },
  signup : {
    marginTop : "10%",
    display : 'flex',
    flexDirection : 'row'
  }
});
