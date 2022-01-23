import { StyleSheet, Platform, StatusBar }from 'react-native'

export const styles = StyleSheet.create({
    up_main:{
        
    },
    header:{
        paddingTop : Platform.OS === "android" ? StatusBar.currentHeight+10 : 20 ,
        width:"100%",
        backgroundColor:'#2C4226',
    },
    input:{
        color : '#4d4949', width: 300, height : 40,
        borderWidth:1, backgroundColor:'#ebebeb', borderColor:'#cfc8c8',
        padding :10, marginTop : "5%", borderRadius: 5
    },
    inputview:{
        padding:20,
        height : '80%',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },
    inputtabs:{
        marginTop : 20
    },
    logotext:{
        margin : 0,
        textAlign:'center',
        color : '#fff',
        fontSize : 30,
        fontFamily : 'Billabong'
    },
    updateText:{
        color : '#4d4949',
    },
    updateInput:{
        color : '#808080',
        width: 300, 
        borderBottomWidth:1,
        fontSize:18
    },
    userInput:{
        color : '#808080',
        width: 275, 
        borderBottomWidth:1,
        fontSize:18
    },
    userView : {
        display : 'flex',
        flexDirection : 'row'
    },
    updateButton:{
        marginTop : 30, width : "100%", padding : 10,
        flexDirection : 'row', alignItems: 'center', justifyContent : 'center'
    },
    updateText1:{
        color : '#fff',
        fontWeight : 'bold',
        elevation: 3,
    },
    messageTxt : {
        color:'#D2042D', fontSize:10, fontFamily : 'Itim'
    }
})