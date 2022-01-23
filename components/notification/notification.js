import  {ScrollView, Text, View, TouchableOpacity, Image} from 'react-native'
import React from "react";
import {styles} from './notificationStyle'

function Notification(){
    return(
        <View style={styles.notificationMain}>
            <Text style={styles.notiHeader}>Notifications</Text>
            <View style={{ padding : 10}}>
                <TouchableOpacity style={styles.notifications}>
                    <View style={[styles.center, {width : '15%'}]}>
                        <Image
                            style={styles.notiImage}
                            source={{uri:'https://media.allure.com/photos/616d9b242e0ceea95e7828d9/1:1/w_2800,h_2800,c_limit/zendaya%20.jpg'}}
                        />
                    </View>
                    <View style={{paddingLeft : 10,width : '70%'}}>
                        <Text style={styles.cmtName}>Zendaya Young</Text>
                        <Text style={styles.cmtConcept}>Commented on your photo</Text>
                        <Text style={styles.cmtContent}>wow, it is really awesome</Text>
                    </View>
                    <View style={{width : '15%'}}>
                        <Text style={[styles.cmtConcept, {color : '#9c9c9c'}]}>5 mins</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.notifications}>
                    <View style={[styles.center, {width : '15%'}]}>
                        <Image
                            style={styles.notiImage}
                            source={{uri:'https://media.allure.com/photos/616d9b242e0ceea95e7828d9/1:1/w_2800,h_2800,c_limit/zendaya%20.jpg'}}
                        />
                    </View>
                    <View style={{paddingLeft : 10,width : '70%'}}>
                        <Text style={styles.cmtName}>Zendaya Young</Text>
                        <Text style={styles.cmtConcept}>Liked on your photo</Text>
                    </View>
                    <View style={{width : '15%'}}>
                        <Text style={[styles.cmtConcept, {color : '#9c9c9c'}]}>5 mins</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Notification