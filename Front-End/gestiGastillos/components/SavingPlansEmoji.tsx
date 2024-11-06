import { View, Image,StyleSheet } from "react-native";


export default function SavingPlansEmoji(){
    return(
        <View style={styles.imageContainer}>
            <Image
              source={require("@/assets/images/emoji.png")}
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