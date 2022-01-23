import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        padding : 10
    },
    spinner : {
        display : 'flex', justifyContent : 'center', alignItems : 'center', height : '100%', width : '100%'
    },
    header:{
        fontSize : 30,
        marginLeft : 40
    },
    spinnerTextStyle:{
        color: '#FFF'
    },
    newPost : {
        display : 'flex', flexDirection : 'row', justifyContent : 'center', alignItems : 'center'
    },
    postHeader : {
        fontFamily : 'Itim', fontSize : 20, marginLeft : 10
    }
})