import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet,Pressable } from "react-native";
import { ip } from "../src/auth/IP/Ip";
import TopBarForms from "@/components/TopBarForms";
import globalStyles from "@/styles/GlobalStyles";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import TextClass from "@/components/TextClass";

interface EditReminderScreenProps {
  route: any;
  navigation: any;
}

export default function EditReminderScreen({ route, navigation }: EditReminderScreenProps) {
  const { id, name, message, date, card_id} = route.params; // Recibimos los parámetros de la navegación

  // Estado para los campos de texto del formulario
  const [newName, setNewName] = useState<string>(name);
  const [newMessage, setNewMessage] = useState<string>(message);
  const [newDate, setNewDate] = useState<string>(date);


  const handleUpdate = async () => {
    console.log(card_id)
    try {
      const updatedReminder = {
        reminder_id:id,
        name: newName,
        message: newMessage,
        date: newDate,
        card_id: card_id,  
      };

      
        // Usamos fetch para hacer la solicitud PUT
        const response = await fetch(`http://${ip}:8080/gestiGastillos/reminder/update`, {
          method: "PUT", // Método de la solicitud
          headers: {
            "Content-Type": "application/json", // Indicamos que estamos enviando JSON
          },
          body: JSON.stringify(updatedReminder), // Convertimos el objeto a JSON
        });

        if (response.ok) { // Verificamos si la respuesta es exitosa (status 200-299)
          navigation.goBack(); // Regresamos a la lista de recordatorios
        } else {
          const errorText = await response.text();
          console.error(`Error ${response.status}:`, errorText);
        }
    } catch (error) {
      console.error("Error al actualizar el recordatorioooo", error);
    }
  };

  return (

    <View style={globalStyles.container}>
      <TopBarForms title="RECORDATORIOS"/>
      <View style={globalStyles.middleContainer}>
        <View style={globalStyles.inputTextContainer}>
        <TextClass text ="nombre"/>
        <TextInput
          style={globalStyles.textInput}
          value={newName}
          onChangeText={setNewName}
          placeholder="Nombre"
        />

        <TextClass text ="Descripcion"/>
        <TextInput
          style={globalStyles.textInput}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Mensaje"
        />

        <TextClass text ="Fecha"/>
        <TextInput
          style={globalStyles.textInput}
          value={newDate}
          onChangeText={setNewDate}
          placeholder="Fecha"
        />
        </View>
        <View style={globalStylesMenu.containerBottom}>
          <Pressable style={globalStyles.button} onPress={handleUpdate}>
            <Text style={globalStyles.text}>Actualizar</Text>
          </Pressable>
        </View>
      </View>
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});
