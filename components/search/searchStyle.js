import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    headerIcon2 : {
        width: 230,
        marginTop : 18,
        marginRight : 15,
        display : 'flex',
        flexDirection : 'row',
        height : 38,
        borderBottomWidth:3,
        borderColor:'#fcba03',
        textAlign : 'center'
    },
    search:{
        color : '#000',
        width: 200,
        height : 35,
        fontSize : 15
    },
    image : {
        width : 50,
        height : 50,
        borderRadius : 50
    },
    messageBox : {
        padding : 5,
        display : 'flex',
        flexDirection : 'row',
        marginTop : 10,
        marginBottom : 5, width : '100%'
    },
    username : {
        fontSize : 18,
        fontWeight : "bold"
    },
    fullname : {
        color : '#756d6c'
    },
    friends : {
        borderColor : '#9e9d9d', borderWidth : 1, height : 30, padding : 3, alignSelf : 'center', marginLeft : 'auto', 
        marginRight: "10%", paddingLeft : 10, paddingRight : 10
    },
    friendSts : {
        color : '#140f0d', 
    }
})