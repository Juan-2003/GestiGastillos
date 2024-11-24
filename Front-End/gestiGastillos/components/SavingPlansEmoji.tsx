import { View, Image,StyleSheet } from "react-native";
import React from "react";

interface Props{
    status:any
}
export default function SavingPlansEmoji({status}:Props){
    console.log("status es: ",status);

    let imageUrl;
    if (status === "VERY_POOR") {
      imageUrl = require("@/assets/images/VERY_POORSAVING.png");
    } else if (status === "EXCELENT") {
      imageUrl = require("@/assets/images/EXCELENTSAVING.png");
    }else if (status === "GOOD") {
      imageUrl = require("@/assets/images/GOODSAVING.png");
    }
    else if (status === "POOR") {
      imageUrl = require("@/assets/images/POORSAVING.png");
    }

    return(
        <View style={styles.imageContainer}>
            <Image
              source={imageUrl}
              style={styles.image}
            />
        </View>
    )
}

const styles=StyleSheet.create({
    imageContainer:{
        flex:2,
        alignItems:"center",
    },
   
    image: {
        width:"65%",
        height: "100%",
        borderRadius: 200,
        resizeMode: 'contain'
        //backgroundColor: 'green'
     },
    
})