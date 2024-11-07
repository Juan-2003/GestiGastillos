import { View, StyleSheet,Text, TouchableOpacity, Image } from "react-native";
import cardStyles from "@/styles/CardStyles";
import ItemContainer from "./ItemContainer";

export default function SavingPlansItem(){
    return(
        <View style={styles.container}>
            <View style={styles.SavingPlanContainer}>
                <View style={styles.leftContaier}>
                    <Text style={styles.digits}>4545</Text>
                    <View style={styles.containerBottonText}>
                        <Text style={styles.bottonText}>limite:400 </Text>
                    </View>
                </View>
                <View style={styles.RightContaier}>
                    <View style={styles.ItemContainer}>
                        <Image
                            source={require("@/assets/images/emoji.png")}
                            style={styles.image}
                        />
                        <TouchableOpacity>
                            <Image
                                source={require("@/assets/images/editIcon.png")}
                                style={styles.image}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require("@/assets/images/deleteIcon.png")}
                                style={styles.image}
                                />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerBottonText}>
                        <Text style={styles.bottonText}>Gastado: 1000</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:3, 
        alignItems:"center"
    },
    SavingPlanContainer:{
        width:"70%",
        height:"30%",
        marginTop:40,
        backgroundColor:"#27C1F9",
        flexDirection:"row"
    },
    leftContaier:{
        flex:2,
        //backgroundColor:"red",
        alignItems:"center",
        justifyContent:"center"
    },
    RightContaier:{
        flex:2,
        //backgroundColor:"green",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        
    },
    ItemContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    image: {
        height: 35,
        width: 35,
        resizeMode: 'contain',
        paddingHorizontal:25
      },
      digits: {
        fontSize: 30,
        color: "#FFFFFF",
        fontWeight: "bold",
      },
    containerBottonText:{
        flex:0.4,
        //backgroundColor:"blue",   
    },
    bottonText:{
        fontSize: 15,
        color: "#FFFFFF",
    }
})

