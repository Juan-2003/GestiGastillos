import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet,Pressable } from "react-native";
import { ip } from "../src/auth/IP/Ip";
import TopBarForms from "@/components/TopBarForms";
import globalStyles from "@/styles/GlobalStyles";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import TextClass from "@/components/TextClass";

interface EditSavinPlansScreenProps {
  route: any;
  navigation: any;
}

export default function EditSavingPlans({ route, navigation }:EditSavinPlansScreenProps) {
  const { saving_id, name, target_amount,status,debit_card_id} = route.params; // Recibimos los parámetros de la navegación

  // Estado para los campos de texto del formulario
  const [newName, setNewName] = useState<string>(name);
  const [newTargetAmount, setNewTargetAmount] = useState<string>(target_amount.toString());


  const handleUpdate = async () => {
    const amount = parseFloat(newTargetAmount);
    console.log(amount)
    console.log(target_amount)
    try {
      const updatedSaving = {
        saving_id,
        name: newName,
        target_amount:amount,
        debit_card_id,
      };

      
        // Usamos fetch para hacer la solicitud PUT
        const response = await fetch(`http://${ip}:8080/gestiGastillos/saving/update`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json", // Indicamos que estamos enviando JSON
          },
          body: JSON.stringify(updatedSaving), // Convertimos el objeto a JSON
        });

        if (response.ok) { // Verificamos si la respuesta es exitosa (status 200-299)

          navigation.goBack(); 
        } else {
          const errorText = await response.text();
          console.error(`Error ${response.status}:`, errorText);
        }
    } catch (error) {
      console.error("Error al actualizar el plan", error);
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

        <TextClass text ="Objetivo de ahorro"/>
        <TextInput
            style={globalStyles.textInput}
            placeholder="Agrega el objetivo aquí"
            value={newTargetAmount}
            onChangeText={setNewTargetAmount}
            keyboardType="numeric"
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
