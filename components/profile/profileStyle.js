import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    profileMain : {
        height : '100%',
    },
    profileHeader : {
        display : 'flex', alignItems : 'center'
    },
    image : {
        width : 150, height : 150, borderRadius : 100, marginTop : 20
    },
    username : {
        fontSize : 30, fontWeight : "900"
    },
    message : {
        borderWidth : 1, borderColor : '#000', paddingTop : 5, paddingBottom : 5, paddingLeft : 15, paddingRight : 15,
        marginTop : 10, display : 'flex', flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginRight : "10%"
    },
    followStatus : {
        borderWidth : 1, borderColor : '#000', paddingTop : 5, paddingBottom : 5, paddingLeft : 15, paddingRight : 15,
        marginTop : 10, display : 'flex', flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginLeft : "10%"
    },
    posts : {
        marginTop : 20, display : 'flex', flexDirection: 'row', flexWrap: 'wrap'
    },
    postImage : {
        width : "30%", height : 100, backgroundColor : '#000', marginLeft : '3%', marginTop : 10
    },
    image2 : {
        width : "100%", height : "100%"
    },
    spBox1 : {
        marginRight : 20,
    }, 
    spBox2 : {
        display : 'flex', flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginLeft : 20,
    }, 
    profileChangeBox : {
        display : 'flex', flexDirection : 'row', justifyContent : 'center', alignItems : 'center'
    },
    header : {
        paddingTop : 30,paddingLeft : 10,
        paddingBottom : 10,paddingRight : 10,
        backgroundColor : '#2C4226',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center', height : 80
    },
    headerTxt : {
        fontSize : 25, fontWeight : 'bold',
        color : '#fff',
    },
})