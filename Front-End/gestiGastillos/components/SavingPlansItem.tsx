import { View, StyleSheet,Text, TouchableOpacity, Image } from "react-native";
import cardStyles from "@/styles/CardStyles";
import ItemContainer from "./ItemComponent";
import { RootStackParamList } from "@/app";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation,  } from "@react-navigation/native"; // Importamos el hook de navegación

type EditSavingPlanScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditSavingPlans' 
  >;

interface saving{
    saving_id: number;
    name: string,
    target_amount: number;
    status: string;
    current_balance: string;
    debit_card_id: number;
    debit_card_name:string,
    last_digits:string
}


export default function SavingPlansItem({ saving_id, name, target_amount, status,current_balance,debit_card_id,last_digits,debit_card_name }: saving){

    const navigation = useNavigation< EditSavingPlanScreenNavigationProp>();


    const handleEdit = () => {
        navigation.navigate("EditSavingPlans", { saving_id, name, target_amount,status,debit_card_id});
    };
    let imageUrl;
    if (status === "VERY_POOR") {
      imageUrl = require("@/assets/images/verybad.jpg");
    } else if (status === "EXCELENT") {
      imageUrl = require("@/assets/images/excelent.png");
    }

    return(
        <View style={styles.container}>
            <View style={styles.SavingPlanContainer}>
                <View style={styles.leftContaier}>
                    <Text style={styles.digits}>{name}</Text>
                    <View style={styles.containerBottonText}>
                        <Text style={styles.bottonText}>objetivo:{target_amount}$ </Text>
                    </View>
                </View>
                <View style={styles.RightContaier}>
                    <View style={styles.ItemContainer}>
                        <Image 
                            source={imageUrl}
                            style={styles.image}
                        />
                        <TouchableOpacity onPress={handleEdit}>
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
                        <Text style={styles.bottonText}>guardado:{current_balance}</Text>
                        <Text style={styles.bottonText}>hola:{last_digits}</Text>
                        <Text style={styles.bottonText}>adios:{debit_card_name}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1, 
        alignItems:"center"
    },
    SavingPlanContainer:{
        width:"80%",
        height:"100%",
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

