import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Button, ActivityIndicator } from 'react-native';
import {signInWithSocialMedia} from '../authContext';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import {addCurrentUser} from '../../redux/actions/action'
import CheckLogin from '../check_login';
import { styles } from './loginStyle';
import { CHATTERINCOLORS } from '../../components/constants/defaults'

function Login(props){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] =  useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  // React.useEffect(()=>{
  //   if(props.currentUser.email){
  //     props.navigation.navigate("home-tabs")
  //   }
  // },[props])

  async function loginUsingGoogle(){
    try{
      await signInWithSocialMedia()
      props.navigation.navigate('home-tabs')
    }
    catch{
      console.log("error")
    }
    // dispatch(addCurrentUser(cu))
    // props.navigation.navigate('home-tabs')
  }

  async function signinUsingEmail(){
    let a = 0
    setMessage("")
    setLoading(true)
    try{
      await firebase.auth().signInWithEmailAndPassword(email, password)
    }
    catch{
      setMessage("Invalid email or password")
      setLoading(false)
      return
    }
    if(await CheckLogin() === true){
      setEmail("")
      setPassword("")
      props.navigation.navigate('home-tabs')
    }
    else{
      setEmail("")
      setPassword("")
      props.navigation.navigate('update-profile')
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
        <TextInput value={email} style={styles.input} onChangeText={text=> setEmail(text)} placeholder="Email or username" type="email" />
        <TextInput value={password} style={styles.input} onChangeText={text=> setPassword(text)} placeholder="Password" secureTextEntry={true} />
        <Text style={{color : 'red', fontFamily : 'Itim'}}>{message}</Text>
        <TouchableOpacity style={[styles.loginbtn, { backgroundColor : loading ? '#021a09' : CHATTERINCOLORS.BTNCOLOR }]} 
          onPress={signinUsingEmail} disabled={loading}
        >
          <Text style={{color : '#fff', fontSize:16, letterSpacing: 0.25, fontWeight:'bold'}}>Login</Text>
          {loading ? <ActivityIndicator style={{marginLeft : 10}} size="small" color="#fff" /> : null}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.fgtpass, ]}>
          <Text style={{fontFamily : 'Itim', fontSize : 18}}>Forgot your password?</Text>
        </TouchableOpacity>
        <View style={styles.or1}><Text style={styles.or2}>OR</Text></View>
        <TouchableOpacity style={styles.googlebtn} 
          onPress={signinUsingEmail}
        >
          <Text style={{color : '#fff', fontSize:16, letterSpacing: 0.25, fontWeight:'bold'}}>Sign in with Google</Text>
        </TouchableOpacity>
        <View style={styles.signup}>
          <Text>Dont have an account?</Text>
          <TouchableOpacity onPress={()=> props.navigation.push("signup")}>
            <Text style={{color: CHATTERINCOLORS.BTNCOLOR, fontWeight : 'bold'}}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Login