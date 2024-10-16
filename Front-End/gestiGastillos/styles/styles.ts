// App/styles.ts
import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
   container:{
    flex:1,
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
    },
  buttonContainer:{
    flexDirection:"column",
    justifyContent:"space-around",
    alignItems:"center",
    width:"100%",
    height:"30%"
    },
  button:{
    backgroundColor:"#BA2828",
    alignItems:"center",
    width:"40%",
    padding:10,
    borderRadius:20
  },
  text:{
    color:"white"
  },
  input: {
    borderColor: 'gray',
    borderBottomWidth: 2,
    
    paddingHorizontal: 10,
    width: '50%',
},
   
});

export default globalStyles;
