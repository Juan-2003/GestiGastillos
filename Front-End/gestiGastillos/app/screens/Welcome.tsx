import { View,Text, Pressable, Button,Image } from "react-native";
import ButtonClass from "../components/buttons";
import globalStyles from "@/styles/styles";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Welcome(){
    return(
        <View style={globalStyles.container}>
            <Image 
                source={require('../../assets/images/Logo.png')} 
                style={{ width: 300, height: 300, borderRadius:100}} // Ajusta el tamaño según sea necesario
            />

            <SafeAreaView style={globalStyles.buttonContainer}>
                <Pressable style={globalStyles.button}>
                    <Text style={globalStyles.text}>Registrate</Text>
                </Pressable>
                <Pressable style={globalStyles.button}>
                    <Text style={globalStyles.text}>Salir</Text>
                </Pressable>
            </SafeAreaView>
    
                
            
        </View>
    )
}

