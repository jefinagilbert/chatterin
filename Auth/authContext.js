import React from "react";
import firebase from 'firebase'
import { useNavigation } from "@react-navigation/core";
import * as Google from 'expo-google-app-auth';
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";


export async function signInWithSocialMedia() {
  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;
      for (let i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          return true;
        }
      }
    }
    return false;
  }
  
  function onSignIn(googleUser) {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(()=>{
          console.log("signed in")
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }
  
  
  try {
    const result = await Google.logInAsync({
      androidClientId: '110800145155-vv08752a7ad3l9lik1hmil086d251s02.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
    if (result.type === 'success'){
      onSignIn(result)
      return result.user;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}