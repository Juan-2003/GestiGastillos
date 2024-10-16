import { View, TextInput, Text } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet } from "react-native";
import globalStyles from "@/styles/styles";


export default function Register(){
    return(
        <View style={globalStyles.container}>
            <Pressable>
                <MaterialCommunityIcons name="account" size={300} color="black" />
            </Pressable>

        
        <View style={globalStyles.buttonContainer}>
            <Text style={{justifyContent:"flex-start"}}>Nombre</Text>
            <TextInput
                style={globalStyles.input}
                placeholder="Ingresa tu texto aquí"
                 // Actualiza el estado cuando cambia el texto
            />  
            <Pressable style={globalStyles.button}>
                <Text style={globalStyles.text}>Crear perfil</Text>
            </Pressable>
        </View>
            
        </View>
    )
}

