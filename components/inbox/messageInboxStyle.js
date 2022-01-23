import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    inboxMain : {
        padding : 20,
        height : '100%',
    },
    card: {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-around',
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 45,
        paddingHorizontal: 25,
        marginVertical: 10,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    inboxOption : {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },
    header : {
        fontSize : 30,
        fontWeight : "bold",
        textAlign : "center",
        fontFamily : 'sans-serif'
    },
    conversationBox : {
        height : 400,
        borderWidth : 2,
        borderColor : "#000",
        overflow : 'scroll'
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
    addUser : {
        position : "absolute",
        zIndex : 9,
        bottom : 20,
        right : 10
    }
})