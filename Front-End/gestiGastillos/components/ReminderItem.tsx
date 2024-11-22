import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation,  } from "@react-navigation/native"; // Importamos el hook de navegación
import React from "react";
import cardStyles from "@/styles/CardStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app";
import { Alert } from "react-native";
import { ip } from "@/app/src/auth/IP/Ip";
import { deleteReminder } from "@/app/src/auth/api/reminderServices";
import { useState } from "react";
import globalStyles from "@/styles/GlobalStyles";

type EditReminderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditReminderScreen' 
  >;
interface ReminderItemProps {
  date: string;
  name: string;
  message: string;
  id: number; // Necesitamos el ID para editar el recordatorio
  card_name:string;
  last_digits:string
  onDelete: (id: number) => void;
}

export default function ReminderItem({ date, name, message, id,card_name,last_digits,onDelete }: ReminderItemProps) {
    const navigation = useNavigation<EditReminderScreenNavigationProp>();
    const [showDetails, setShowDetails] = useState(false); // Estado para mostrar u ocultar detalles

    
  const handleEdit = () => {
    // Navegar a la pantalla de edición pasando los datos del recordatorio
    navigation.navigate("EditReminderScreen", { id, name, message, date });
  };

  const handleDelete = async () => {
    
    const isDeleted = await deleteReminder(id); // Llama al servicio para eliminar
    if (isDeleted) {
      onDelete(id); // Actualiza la lista en el componente padre si se eliminó correctamente
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => setShowDetails(!showDetails)}>

    
      <View style={styles.reminderContainer}>
        <View style={styles.interDataContainer}>
          <View style={styles.dataContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{date}</Text>
            </View>
            <View style={styles.digitsContainer}>
              <Text style={styles.digits}>{name}</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleEdit}>
              <Image
                source={require("@/assets/images/editIcon.png")}
                style={cardStyles.image}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Image
                source={require("@/assets/images/deleteIcon.png")}
                style={cardStyles.image}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    {showDetails && (
        <>
        <View style={styles.showBotton}>
        

           <Text style={globalStyles.text}>Descripcion: {message}</Text>
           {card_name ? <Text style={globalStyles.text}>Tarjeta:{card_name}</Text> : null}
           {last_digits ? <Text style={globalStyles.text}>Digitos:{last_digits}</Text> : null}
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
  reminderContainer: {
    flex:1,
    width: "90%",
    height: "100%",
    backgroundColor: "#27C1F9",
    borderRadius:10,
    paddingVertical: 25,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#1E91BB"
  },
  interDataContainer: {
    flex: 1,
    flexDirection: "row",
  },
  dataContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  digitsContainer: {
    flex: 3,
    alignItems: "center",
  },
  dateContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  digits: {
    fontSize: 40,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  date: {
    fontSize: 25,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  message: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  showBotton:{
    flex:1,
    width: "90%",
    height: "30%",
    marginTop:10,
    justifyContent:"center",
    paddingHorizontal:20,
    paddingVertical:10,
    backgroundColor: "#27C1F9",
    borderRadius:10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#1E91BB"
  }
});
