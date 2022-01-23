import React, { useState, useEffect } from 'react'
import {View, Text, ScrollView, Image, TouchableOpacity,} from 'react-native'
import { styles } from './profileStyle'
import firebase from "firebase";
import { AntDesign, SimpleLineIcons, Ionicons } from '@expo/vector-icons';

function Profile(props){
    const currentId = firebase.auth().currentUser.uid
    const [myuser, setMyuser] = useState({})
    const [user, setUser] = useState({})
    const [stalkers, setStalkers] = useState([])
    const [pursuing, setPursuing] = useState([])
    const [myPursuing, setMyPursuing] = useState([])
    const oppUserid = props.route.params.oppUId
    const [posts, setPosts] = useState([])
    const [friendsLoad, setFriendLoad] = useState(false)
    const noFace = "https://www.responsiblebusiness.com/wp-content/uploads/2019/05/Speaker-Unknown.jpg"

    useEffect(()=>{
        const fetchData = async () => {
            firebase.firestore().collection("users").onSnapshot(snapshot=>{
                setUser({})
                setMyuser({})
                snapshot.docs.forEach(snap=>{
                    if(snap.data().userid === oppUserid){
                        setUser(snap.data())
                    }
                    if(snap.data().userid === currentId){
                        setMyuser(snap.data())
                    }
                })
            })
            firebase.firestore().collection(oppUserid+"friends").onSnapshot(snapshot=>{
                setStalkers([])
                setPursuing([])
                snapshot.docs.forEach(snap=>{
                    setStalkers(snap.data().stalkers)
                    setPursuing(snap.data().pursuing)
                })
            })
            firebase.firestore().collection(currentId+"friends").onSnapshot(snapshot=>{
                setMyPursuing([])
                snapshot.docs.forEach(snap=>{
                    setMyPursuing(snap.data().pursuing)
                })
            })
            firebase.firestore().collection(oppUserid+"posts").onSnapshot(snapshot=>{
                setPosts([])
                snapshot.docs.forEach(snap=>{
                    setPosts(prev=> [...prev, snap.data()])
                })
            })
        }
        fetchData()
    }, [])

    const onHandlePursue = async () => {
        let a = stalkers.indexOf(currentId)
        if(a === -1){
            firebase.firestore().collection(currentId+"friends").doc(myuser.friendsdocid).update({
                pursuing : [...myPursuing, oppUserid]
            })
            firebase.firestore().collection(oppUserid+"friends").doc(user.friendsdocid).update({
                stalkers : [...stalkers, currentId]
            })
        }
        else{
            const pursuingg = [...myPursuing]
            const index = pursuingg.indexOf(oppUserid)
            pursuingg.splice(index,1)
            const stalkerss = [...stalkers]
            const index2 = stalkerss.indexOf(currentId)
            stalkerss.splice(index2,1)
            firebase.firestore().collection(currentId+"friends").doc(myuser.friendsdocid).update({
                pursuing : [...pursuingg]
            })
            firebase.firestore().collection(oppUserid+"friends").doc(user.friendsdocid).update({
                stalkers : [...stalkerss]
            })
        }
    }

    return(
        <View style={styles.profileMain}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=> props.navigation.goBack()}>
                    <Ionicons name="arrow-back-circle" size={34} color="#0096FF" />
                </TouchableOpacity>
                <Text style={styles.headerTxt}>{user.username}</Text>
                <TouchableOpacity>
                    <SimpleLineIcons name="options-vertical" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.profileHeader}>    
                    <Image style={styles.image} source={{ uri : user.propic ? user.propic : noFace }} />
                    <Text style={styles.username}>{user.fullname}</Text>
                    <Text>{user.bio}</Text>
                    <View style={{display : 'flex', flexDirection : 'row', justifyContent : 'center', alignItems : 'center'}}>
                        <TouchableOpacity onPress={()=> props.navigation.navigate("user-message", {uid : oppUserid})} style={styles.message} 
                        >
                            <Text>Message</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.followStatus} onPress={()=> onHandlePursue()}>
                            <Text>{stalkers.indexOf(currentId) !== -1 ? "Pursuing" : "Pursue"}</Text>
                            {stalkers.indexOf(currentId) !== -1 ? <AntDesign style={{marginLeft : 5}} name="check" size={18} color="black" /> : <Text></Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{display : 'flex', flexDirection : 'row', marginTop : 20, justifyContent : 'center', alignItems : 'center'}}>
                        <TouchableOpacity style={styles.spBox1}>
                            <Text style={{fontSize : 20}}>{stalkers.length} Stalkers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.spBox2}>
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
        </View>
    )
}

export default Profile