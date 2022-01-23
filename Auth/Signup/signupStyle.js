import {Platform, StatusBar, StyleSheet} from 'react-native'
import { CHATTERINCOLORS } from '../../components/constants/defaults';

export const styles = StyleSheet.create({
    container: {
      display:'flex', justifyContent:'center', backgroundColor:'#fff',
    },
    header:{
      display: 'flex',
      flexDirection:'row',
      justifyContent:'center',
      borderColor:'black',
      backgroundColor: CHATTERINCOLORS.BGCOLOR,
      paddingTop : Platform.OS === "android" ? StatusBar.currentHeight : 0 ,
      width:"100%",
      height : "30%"
    },
    logo:{
      marginTop : 15,
    },
    logotext:{
      color : '#fff',
      fontSize : 100,
      fontFamily : 'Billabong'
    },
    login:{
      width:'100%',
      height : '70%',
      paddingTop : "15%",
      display:'flex',
      justifyContent:'flex-start',
      alignItems : 'center'
    },
    input:{
      color : '#4d4949',
      width: 300,
      height : 40,
      borderWidth:1,
      backgroundColor:'#ebebeb',
      borderColor:'#cfc8c8',
      padding :10,
      marginTop : "3%",
      borderRadius: 5
    },
    loginbtn:{
      alignItems: 'center', backgroundColor: CHATTERINCOLORS.BTNCOLOR, width : 300, padding : 10,
      elevation: 3, display : 'flex', justifyContent : 'center', flexDirection :'row', borderRadius : 5
    },
    googlebtn : {
        width : 250, padding : 10, elevation: 3, backgroundColor : "#0a6cc2", alignItems : 'center', 
        marginTop : 20, borderRadius : 5
    },
    fgtpass:{
      marginTop : "10%"
    },
    or1:{
      position : 'relative',
      textAlign:'center',
      width:'100%',
      borderBottomColor:'#cfc8c8',
      borderWidth : 1,
      lineHeight : 0.1,
      marginTop : 30,
    },
    or2:{
      position : 'absolute',
      top : -13,
      left : "46%",
      color : '#2d353d',
      fontSize : 20,
      backgroundColor: '#fff',
      paddingLeft : 5,
      paddingRight : 5
    },
    signup : {
      marginTop : "auto", marginBottom : 10, display : 'flex', flexDirection : 'row'
    }
  });
  