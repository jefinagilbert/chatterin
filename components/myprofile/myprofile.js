import React, {useState, useEffect, useRef} from 'react'
import {View, Text, ScrollView, Image, TouchableOpacity, TextInput} from 'react-native'
import { styles } from './myprofileStyle'
import firebase from "firebase";
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from 'expo-image-picker';

function MyProfile(props){
    const currentId = firebase.auth().currentUser.uid
    const [user, setUser] = useState({})
    const [stalkers, setStalkers] = useState([])
    const [pursuing, setPursuing] = useState([])
    const refRBSheet = useRef();
    const noFacePic = "https://www.responsiblebusiness.com/wp-content/uploads/2019/05/Speaker-Unknown.jpg"
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        const fetchData = () => {
            firebase.firestore().collection("users").onSnapshot(snapshot=>{
                setUser({})
                snapshot.docs.forEach(snap=>{
                    if(snap.data().userid === currentId){
                        setUser(snap.data())
                    }
                })
            })
            firebase.firestore().collection(currentId+"friends").onSnapshot(snapshot=>{
                snapshot.docs.forEach(snap=>{
                    setStalkers(snap.data().stalkers)
                    setPursuing(snap.data().pursuing)
                })
            })
            firebase.firestore().collection(currentId+"posts").orderBy('createdAt', 'desc').onSnapshot(snapshot=>{
                setPosts([])
                snapshot.docs.forEach(snap=>{
                    setPosts(prev=>[...prev, snap.data()])
                })
            })
        }
        fetchData()
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if(!result.cancelled) {
            const response = await fetch(result.uri);
            const blob = await response.blob();
            handleChange(blob)
        }
        refRBSheet.current.close()
    };

    const handleChange = e => {
        const image = e
        const uploadTask = firebase.storage().ref('profile-pictures/'+currentId+"profile").put(image)
        uploadTask.on(
            'state_changed',
            snapshot => {},
            error => {
                console.log(error)
            },
            () => {
                firebase.storage()
                    .ref("profile-pictures")
                    .child(currentId+"profile")
                    .getDownloadURL()
                    .then(url => {
                        console.log("hiiii dood")
                        updateProfile(url)
                    })
            }
        )
    }

    const updateProfile = async (uri) => {
        firebase.firestore().collection("users").doc(user.docid).update({
            propic : uri
        })
    }

    const removeProPic = async (uri) => {
        firebase.firestore().collection("users").doc(user.docid).update({
            propic : ""
        })
    }

    return(
        <View style={styles.profileMain}>
            <ScrollView>
                <View style={styles.profileHeader}>
                    <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                        <Image style={styles.image} source={{ uri : user.propic === "" ? noFacePic : user.propic }} />
                    </TouchableOpacity>
                    <Text style={styles.username}>{user.username}</Text>
                    <Text>{user.bio}</Text>
                    <View style={{display : 'flex', flexDirection : 'row', justifyContent : 'center', alignItems : 'center'}}>
                        <TouchableOpacity style={[styles.message, {width : '40%'}]} 
                        >
                            <Text>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{display : 'flex', flexDirection : 'row', marginTop : 30}}>
                        <TouchableOpacity style={styles.spBox1} onPress={()=> props.navigation.navigate('friends', {id : 0, currentId})}>
                            <Text style={{fontSize : 20}}>{stalkers.length} Stalkers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.spBox2} onPress={()=> props.navigation.navigate('friends', {id : 1, currentId})}>
                            <Text style={{fontSize : 20}}>{pursuing.length} Pursuing</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{display : 'flex', justifyContent : 'center', alignItems : 'center', marginTop : 30}}>
                        <Text style={{fontSize : 38, fontFamily : 'Itim'}}>Posts</Text>
                    </View>
                </View>
                <View style={styles.posts}>
                    {posts.map(post=>{
                        return(
                            <TouchableOpacity style={styles.postImage}>
                                <Image style={styles.image2} source={{ uri : post.postUrl ? post.postUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Columbus_Pano_2.jpg/660px-Columbus_Pano_2.jpg" }} />
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={120}
                customStyles={{
                wrapper: {
                    backgroundColor: "transparent",
                },
                draggableIcon: {
                    backgroundColor: "#000"
                }
                }}
            >
                <View style={styles.profileChangeBox}>
                    <TouchableOpacity style={{marginRight : '10%'}} onPress={pickImage}>
                        <Entypo name="upload" size={44} color="#215cff" />
                        <Text style={{color : '#215cff'}}>Upload</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft : '10%', display : 'flex', alignItems : 'center'}} onPress={removeProPic}>
                        <FontAwesome name="remove" size={44} color="#ff1f44" />
                        <Text style={{color:'#ff1f44'}}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </RBSheet>
        </View>
    )
}

export default MyProfile