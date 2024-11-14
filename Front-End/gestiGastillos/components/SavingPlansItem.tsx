import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { RootStackParamList } from "@/app";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native"; // Importamos el hook de navegación
import { deleteSaving } from "@/app/src/auth/api/savingPlanServices";
import globalStyles from "@/styles/GlobalStyles";

type EditSavingPlanScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditSavingPlans' 
>;

interface saving {
  saving_id: number;
  name: string;
  target_amount: number;
  status: string;
  current_balance: string;
  debit_card_id: number;
  debit_card_name: string;
  last_digits: string;
  onDelete: (id: number) => void;

}

export default function SavingPlansItem({
  saving_id,
  name,
  target_amount,
  status,
  current_balance,
  debit_card_id,
  last_digits,
  debit_card_name,
  onDelete,
}: saving) {
  const navigation = useNavigation<EditSavingPlanScreenNavigationProp>();
  const [showDetails, setShowDetails] = useState(false); // Estado para mostrar u ocultar detalles

  const handleEdit = () => {
    navigation.navigate("EditSavingPlans", { saving_id, name, target_amount, status, debit_card_id });
  };

  const handleDelete = async () => {
    
    const isDeleted = await deleteSaving(saving_id); // Llama al servicio para eliminar
    if (isDeleted) {
      onDelete(saving_id); // Actualiza la lista en el componente padre si se eliminó correctamente
    }
  };

  let imageUrl;
  if (status === "VERY_POOR") {
    imageUrl = require("@/assets/images/verybad.png");
  } else if (status === "EXCELENT") {
    imageUrl = require("@/assets/images/excelent.png");
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => setShowDetails(!showDetails)}>
      <View style={styles.SavingPlanContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.digits}>{name}</Text>
          <View style={styles.containerBottomText}>
            <Text style={styles.bottomText}>guardado: {current_balance}</Text>

          </View>
        </View>
        <View style={styles.RightContainer}>
          <View style={styles.ItemContainer}>
            <Image source={imageUrl} style={styles.image} />
            <TouchableOpacity onPress={handleEdit}>
              <Image source={require("@/assets/images/editIcon.png")} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Image source={require("@/assets/images/deleteIcon.png")} style={styles.image} />
            </TouchableOpacity>
          </View>
          <View style={styles.containerBottomText}>
            <Text style={styles.bottomText}>objetivo: {target_amount}$</Text>
          </View>
        </View>
      </View>
      {showDetails && (
        <>
        <View style={styles.showBotton}>
            <Text style={styles.bottomText}>Tarjeta: {debit_card_name}</Text>
            <Text style={styles.bottomText}>Nombre de tarjeta: {last_digits}</Text>
        </View>

        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

  },
  SavingPlanContainer: {
    flex:1,
    width: "85%",
    height: "100%",
    padding:20,
    marginTop: 40,
    backgroundColor: "#27C1F9",
    flexDirection: "row",

  },
  leftContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor:"red",
    paddingVertical:10,
  },
  RightContainer: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor:"blue"
  },
  ItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
    paddingHorizontal: 25,
  },
  digits: {
    fontSize: 25,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  containerBottomText: {
    flex: 0.4,
    alignItems:"center",
    width:"100%"
  },
  bottomText: {
    fontSize: 15,
    color: "#FFFFFF",
  },
  showBotton:{
    width: "80%",
    height: "30%",
    marginTop:10,
    justifyContent:"center",
    
    paddingHorizontal:20,
    backgroundColor: "#957EEC",
    borderRadius:10,
  }
});
