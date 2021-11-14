import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity, TextInput, Button } from 'react-native';
import {signInWithSocialMedia} from './authContext'
import firebase from 'firebase'
import { useDispatch } from 'react-redux';
import {addCurrentUser} from '../components/action'


function Login(props){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  // React.useEffect(()=>{
  //   if(props.currentUser.email){
  //     props.navigation.navigate("home-tabs")
  //   }
  // },[props])

  async function loginUsingGoogle(){
    const res = await signInWithSocialMedia()
    console.log(res)
    // dispatch(addCurrentUser(cu))
    // props.navigation.navigate('home-tabs')
  }

  async function signinUsingEmail(){
    try{
      await firebase.auth().signInWithEmailAndPassword(email, password)
      props.navigation.navigate('home-tabs')
    }
    catch{
      console.log("error in Sign in")
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
        <TextInput style={styles.input} onChangeText={text=> setEmail(text)} placeholder="Email or username" type="email" />
        <TextInput style={styles.input} onChangeText={text=> setPassword(text)} placeholder="Password" secureTextEntry={true} />
        <TouchableOpacity style={styles.loginbtn} onPress={signinUsingEmail}>
          <Text style={{color : '#fff',fontSize:16,letterSpacing: 0.25,fontWeight:'bold'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fgtpass}>
          <Text>Forgot your password details?</Text>
        </TouchableOpacity>
        <Button onPress={loginUsingGoogle} title="Sign in with Google" />
        <View style={styles.or1}><Text style={styles.or2}>OR</Text></View>
        <View style={styles.signup}>
          <Text>Dont have an account?</Text>
          <TouchableOpacity onPress={()=> props.navigation.push("signup")}>
            <Text style={{color:'#1d75c2'}}> Sign up</Text>
          </TouchableOpacity>
        </View>
        <Text>hiii{firebase.auth().currentUser && firebase.auth().currentUser.email}</Text>
      </View>
    </View>
  );
}

export default Login

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