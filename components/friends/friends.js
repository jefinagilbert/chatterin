import React, {useState, useEffect} from "react";
import {View, Text, useWindowDimensions, TouchableOpacity, ScrollView, Image} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { styles } from "./friendsStyle";
import { Ionicons, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import firebase from "firebase";

function Friends(props){
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(props.route.params.id);
    const givenId = props.route.params.currentId
    const [users, setUsers] = useState([])
    const currentId = firebase.auth().currentUser.uid
    const [pursuing, setPursuing] = useState([])
    const [stalkers, setStalkers] = useState([])

    useEffect(()=>{
        const fetchData = async () => {
            firebase.firestore().collection("users").onSnapshot(snapshot=>{
                snapshot.docs.forEach(snap=>{
                    if(snap.data().uid !== currentId){
                        setUsers(prev=>[...prev, snap.data()])
                    }
                })
            })
            firebase.firestore().collection(givenId+"friends").onSnapshot(snapshot=>{
                snapshot.docs.forEach(snap=>{
                    setPursuing(snap.data().pursuing)
                    setStalkers(snap.data().stalkers)
                })
            })
        }
        fetchData()
    }, [props])

    const renderTabBar = props => (
        <TabBar
          {...props}
          renderLabel={({ route, focused }) => (
            <Text style={{ color : '#000', margin: 8, fontSize : 20, fontFamily : 'Itim' }}>
              {route.title}
            </Text>
          )}
          indicatorStyle={{ backgroundColor: '#000' }}
          style={{ backgroundColor: '#fff', color : '#000', height : 60}}
        />
      );

    const FirstRoute = () => (
        <ScrollView>
            {stalkers.map(user=>{
                return(
                    <TouchableOpacity style={styles.messageBox}>
                        <Image style={styles.image} source={{ uri : user.propic !== "" ? user.propic : "https://www.booksie.com/files/profiles/22/mr-anonymous.png" }} />
                        <View style={{marginLeft : 10}}>
                            <Text style={styles.username}>{user.username}</Text>
                            <Text style={styles.fullname}>{user.fullname}</Text>
                        </View>
                        <TouchableOpacity style={styles.friends}>
                            <Text style={styles.friendSts}>Pursuing</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    );  

    const SecondRoute = () => (
        <ScrollView>
            {pursuing.map(user=>{
                return(
                    <TouchableOpacity style={styles.messageBox}>
                        <Image style={styles.image} source={{ uri : user.propic !== "" ? user.propic : "https://www.booksie.com/files/profiles/22/mr-anonymous.png" }} />
                        <View style={{marginLeft : 10}}>
                            <Text style={styles.username}>{user.username}</Text>
                            <Text style={styles.fullname}>{user.fullname}</Text>
                        </View>
                        <TouchableOpacity style={styles.friends}>
                            <Text style={styles.friendSts}>Pursuing</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });
    const [routes] = React.useState([
        { key: 'first', title: 'Stalkers' },
        { key: 'second', title: 'Pursuing' },
    ])

    console.log(index)

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=> props.navigation.goBack()}>
                    <Ionicons name="arrow-back-circle" size={34} color="#0096FF" />
                </TouchableOpacity>
                <Text style={styles.headerTxt}>kinglewis</Text>
                <TouchableOpacity>
                    
                </TouchableOpacity>
            </View>
            <TabView
                style={styles.tab}
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </View>
    );
}

export default Friends