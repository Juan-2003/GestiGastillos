import { View,Text,StyleSheet, TouchableOpacity, Image } from "react-native";
import cardStyles from "@/styles/CardStyles";

export default function ReminderItem(){
    return(
        <View style={styles.container}>
            <View style={styles.reminderContainer}>
                <View style={styles.interDataContainer}>
                    <View style={styles.dataContainer}>
                        <View style={styles.dateContainer}>
                            <Text style={styles.date}>04/11/1024</Text>
                        </View>
                        <View style={styles.digitsContainer}>
                            <Text style={styles.digits}>4567</Text>
                        </View>
                    </View>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity>
                            <Image
                            source={require("@/assets/images/editIcon.png")}
                            style={cardStyles.image}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                            source={require("@/assets/images/deleteIcon.png")}
                            style={cardStyles.image}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center"
    },
    reminderContainer:{
        width:"90%",
        height:"25%",
        marginTop:40,
        backgroundColor:"#27C1F9"
    },
    interDataContainer:{
        flex:1,
        flexDirection:"row",
    },
    dataContainer:{
        flex:4,
        //backgroundColor:"green",
        justifyContent:"center",
        alignItems:"center"
    },
    digitsContainer:{
        flex:3,
        alignItems:"center"
    },
    dateContainer:{
        flex:2,
        justifyContent:"center",
        alignItems:"center"
    },
    iconContainer:{
        flex:2,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    digits: {
        fontSize: 40,
        color: "#FFFFFF",
        fontWeight: "bold",  // Hace el texto más grueso
      },
    date: {
        fontSize: 25,
        color: "#FFFFFF",
        fontWeight: "bold",  // Hace el texto más grueso
      },

})