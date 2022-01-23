import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    notificationMain : {
        width : '100%'
    },
    notiHeader : {
        fontSize : 25, fontFamily : 'Balsamiq', textAlign : 'center'
    },
    notifications : {
        padding : 5, display : 'flex', flexDirection : 'row', backgroundColor:'#ebebeb',
        flexWrap : "wrap", marginTop : 10
    },
    notiImage : {
        width : 50, height : 50, borderRadius : 50
    },
    cmtName : {
        color : '#0ac2ff', fontSize : 28, fontFamily : 'Dongle'
    },
    cmtConcept : {
        color : '#c4c4c4', fontFamily : 'Itim', fontSize : 14
    },
    cmtContent : {
        color : '#6b6b6b', fontFamily : 'Itim', fontSize : 14
    },
    center : {
        display : 'flex', justifyContent : 'center', alignItems : 'center'
    }
})