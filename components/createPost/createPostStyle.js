import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    main : {
        width : '100%', 
    },
    image : {
        width : "90%", height : 400,
    },
    header : {
        display : 'flex', flexDirection : 'row', alignItems : 'center',
        paddingTop : 40, width : '100%'
    },
    headerTxt : {
        color : '#3668ff', fontFamily : 'Itim', fontSize : 20
    },
    imgBox : {
        width : '100%', display : 'flex', justifyContent : 'center', alignItems : 'center', marginTop : 30
    },
    input: {
        padding: 10, lineHeight: 23, textAlignVertical: "top",
        width : "80%", fontFamily : 'Itim'
    },
    imagePro : {
        width : 30, height : 30, borderRadius : 50
    },
    cmtBox : {
        display : 'flex', flexDirection : 'row', alignItems : 'center', marginTop : 20, justifyContent : 'center'
    },
    locationHeader : {
        color : '#061d52', fontSize : 15, fontFamily : 'Itim'
    },
    locationInput : {
        borderWidth : 1, borderColor : '#c9c9c9', padding : 5, width : '100%'
    }
})