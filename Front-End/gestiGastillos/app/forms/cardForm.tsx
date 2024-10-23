import { View, Text, TextInput, Alert,Pressable } from "react-native"; 
import { useState } from "react";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import globalStyles from "@/styles/GlobalStyles";
import TopBar from "@/components/topBar";
import ButtonClass from "@/components/buttons";
import TextClass from "@/components/TextClass";

export default function Cardform() {
    const [name, setName] = useState('');
    const [digitos, setDigitos] = useState('');
    const [saldo, setSaldo] = useState('');
    const [deudaActual, setDeudaActual] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    
    const handleSubmit = async () => {
        const url = 'http://IP_DEL_BACKEND:PUERTO'; // Reemplaza con la IP y el puerto del backend
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    digitos,
                    saldo,
                    deudaActual,
                    fechaVencimiento,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // Manejar la respuesta del servidor aquí
            Alert.alert('Success', 'Datos enviados correctamente');
        } catch (error) {
            // Manejar errores aquí
            Alert.alert('Error', 'No se pudo enviar los datos');
        }
    };
    
    return (
        <View style={globalStyles.container}>
            <TopBar title="TARJETAS"/>
            <View style={globalStylesMenu.container}>
                <View style={globalStylesMenu.containerMiddle}>
                    <View style={globalStyles.inputTextContainer}>
                        
                        <TextClass text="nombre"/>
                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu nombre"
                            value={name}
                            onChangeText={setName}
                        />

                        <TextClass text="Selecciones el tipo de tarjeta"/>
                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu nombre"
                            value={name}
                            onChangeText={setName}
                        />
                        
                        <TextClass text="Últimos 4 dígitos"/>
                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa los últimos 4 dígitos"
                            value={digitos}
                            onChangeText={setDigitos}
                        />

                        <TextClass text="Saldo actual"/>
                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu saldo actual"
                            value={saldo}
                            onChangeText={setSaldo}
                        />

                        <TextClass text="Deuda actual"/>
                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu deuda actual"
                            value={deudaActual}
                            onChangeText={setDeudaActual}
                        />

                        
                        <TextClass text="Fecha de vencimiento" />
                        
                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa la fecha de vencimiento"
                            value={fechaVencimiento}
                            onChangeText={setFechaVencimiento}
                        />
                    </View>
                </View>
                <View style={globalStylesMenu.containerBottom}>
                <Pressable 
                    style={globalStyles.button}
                    onPress = {handleSubmit} 
                >
                    <Text style={globalStyles.text}>Agregar</Text>
                </Pressable>
                </View>
            </View>
        </View>
    );
}
