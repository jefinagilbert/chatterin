import React, { useEffect } from "react";
import firebase from "firebase";


function CheckLogin() {
    const userid = firebase.auth().currentUser.uid
    const fetchData = async () => {
        let a = 0
        await firebase.firestore().collection("users").where("userid","==",userid).get()
        .then(data=> {
            data.forEach(d=>{
                if(d.data()){
                    a += 1
                }
            })
        })
        .catch((err)=> {
            console.log(err)
        })
        if(a === 1){
            console.log("home-tabs")
            return true
        }
        else{
            console.log("upd")
            return false
            // await firebase.firestore().collection("users").add({

            // })
        }
    }
    return fetchData()
}


export default CheckLogin