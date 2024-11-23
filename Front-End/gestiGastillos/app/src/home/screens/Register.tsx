import { View, TextInput, Text, Pressable, Alert } from "react-native";
import globalStyles from "@/styles/GlobalStyles";
import ImagePicker from "@/components/ImagePicker";
import ButtonClass from "@/components/buttons";
import { StackNavigationProp } from "@react-navigation/stack";
import registerStyles from "@/styles/RegisterStyles";
import React, { useState } from "react";
import { ip } from "../../auth/IP/Ip";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function Register({ navigation }: Props) {
  const [error,setError]=useState(" ");
  const [name,setName]=useState("");

  const handleRegisterUser = async () => {
    try {
        const User = {
          name,
        };
        const response = await fetch(`http://${ip}:8080/gestiGastillos/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(User),
        });

        if (response.ok) {
            Alert.alert("Éxito", "Recordatorio creado exitosamente");
            navigation.navigate("Home");
        
        } else {
            const errorText = await response.text();
            setError(errorText)
            console.error(`Error ${response.status}:`, errorText);
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "Error de red al crear el recordatorio.");
    }
};
  return (
    <View style={globalStyles.container}>

      <View style={registerStyles.topContainer}>
        <ImagePicker />
      </View>

      <View style={registerStyles.middleContainer}>

        <View style={globalStyles.inputTextContainer}>
          <View style={globalStyles.textContainer}>
            <Text style={registerStyles.text}>Nombre</Text>
          </View>
          <TextInput
            style={globalStyles.textInput}
            placeholder="Ingresa tu texto aquí"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={registerStyles.buttonContainer}>
          {error ? <Text style={globalStyles.error}>{error}</Text> : null}
          <Pressable style={globalStyles.button} onPress={handleRegisterUser}>
              <Text style={globalStyles.text}>CREAR PERFIL</Text>
          </Pressable>
        </View>
        
      </View>

    </View>
  );
}
