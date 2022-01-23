import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    main : {
        width : '100%', height : '100%'      
    }, 
    header : {
        height : 70, backgroundColor:'#2C4226', display : 'flex', paddingTop : 40, paddingLeft : 10, paddingBottom : 10,
        paddingRight : 10, flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center'
    },
    headerTxt : {
        fontFamily : 'Itim', color : '#fff', fontSize : 30
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
        marginBottom : 5
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