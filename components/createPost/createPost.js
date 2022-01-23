import React, { useEffect, useState } from "react";
import { Image, View, TouchableOpacity, Text, TextInput, ActivityIndicator } from "react-native";
import {styles} from './createPostStyle'
import firebase from "firebase";

function CreatePost(props){
    const imgid = props.route.params.imgid
    const currentId = firebase.auth().currentUser.uid
    const [user, setUser] = useState({})
    const noFacePic = "https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f469ea85cc82fc8d6083f05%2F0x0.jpg"
    const [loading, setLoading] = useState(false)
    const [caption, setCaption] = useState("")
    const [location, setLocation] = useState("")

    let len  = imgid.length-4
    let img = ""
    for (let i = len-1; i > 0; i--) {
        if(imgid[i] === "/"){
            break
        }
        img += imgid[i]
        console.log(i)
    }
    const imgname = img

    useEffect(()=>{
        const fetchData = () => {
            firebase.firestore().collection("users").onSnapshot(snapshot=>{
                snapshot.docs.forEach(snap=>{
                    if(snap.data().userid === currentId){
                        setUser(snap.data())
                    }
                })
            })
        }
        fetchData()
    },[])

    const onClickPost = async () => {
        setLoading(true)
        const response = await fetch(imgid);
        const blob = await response.blob();
        await handleChange(blob)
        props.navigation.goBack()
    }

    const handleChange = async e => {
        const image = e
        const uploadTask = firebase.storage().ref(currentId+"posts"+'/'+currentId+imgname).put(image)
        uploadTask.on(
            'state_changed',
            snapshot => {},
            error => {
                console.log(error)
            },
            async ()  => {
                await firebase.storage()
                    .ref(currentId+"posts")
                    .child(currentId+imgname)
                    .getDownloadURL()
                    .then(url => {
                        addPost(url)
                    })
            }
        )
    }

    const addPost = (url) => {
        const docid = firebase.firestore().collection(currentId+"posts").doc()
        docid.set({
            createdAt : firebase.firestore.Timestamp.fromDate(new Date()).toDate(),
            postUrl : url, postDocId : docid, userid : currentId, 
            caption, location, likes : [], comments : []
        })
    }

    const onClickCancel = () => {
        if(!loading){
            props.navigation.goBack()
        }
    }

    return(
        <View styles={styles.main}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text style={[styles.headerTxt, {marginLeft : '10%'}]} onPress={onClickCancel}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    {loading ? <ActivityIndicator size="small" style={{marginLeft : '73%'}} color="#3668ff" /> : 
                    <Text style={[styles.headerTxt, {marginLeft : '73%'}]} onPress={onClickPost}>Post</Text> }
                </TouchableOpacity>
            </View>
            <View style={styles.imgBox}>
                <Image style={styles.image} source={{ uri : imgid ? imgid : '' }} />
            </View>
            <View style={styles.cmtBox}>
                <Image style={styles.imagePro} source={{ uri : user.propic === "" ? noFacePic : user.propic }} />
                <TextInput multiline={true} style={styles.input} value={caption} onChangeText={t=> setCaption(t)} placeholder="Write Something..." />
            </View>
            <View
                style={{
                    borderBottomColor: '#d1d1d1',
                    borderBottomWidth: 1,
                }}
            />
            <View style={styles.cmtBox}>
                <View style={{width : '80%'}}>
                <Text style={styles.locationHeader}>Location</Text>
                <TextInput style={styles.locationInput} value={location} onChangeText={t=> setLocation(t)} placeholder="" />
                <Text style={[styles.locationHeader, {color : '#b80000'}]}>Note : This field comes under Username</Text>
                </View>
            </View>
        </View>
    )
}

export default CreatePost