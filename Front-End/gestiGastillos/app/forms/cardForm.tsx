import { View,Text,TextInput } from "react-native";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import globalStyles from "@/styles/GlobalStyles";
import TopBar from "@/components/topBar";
import ButtonClass from "@/components/buttons";
import TextClass from "@/components/TextClass";
import RNFS from 'react-native-fs';
export default function Cardform(){
    const [name, setName] = useState('');
    const [saldo, setSaldo] = useState('');
    const [deudaActual, setDeudaActual] = useState('');
    const [digitos, setDigitos] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    
    return(
        <View style={globalStyles.container}>
      
        <TopBar title="TARJETAS"/>
            <View style={globalStylesMenu.container}>
            
                <View style={globalStylesMenu.containerMiddle}>
                    <View style={globalStyles.inputTextContainer}>
                        
                        <TextClass text="nombre"/>

                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu texto aquí"
                            value ={name}
                            onChangeText={setName}
                        />
                        
                        <TextClass text="Ultimos 4 digitos"/>

                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu texto aquí"
                        />

                        <TextClass text="Saldo actual"/>

                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu texto aquí"
                        />

                        <TextClass text="Deuda actual"/>

                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu texto aquí"
                        />

                        <View style={globalStyles.textContainer}>
                            <Text>fecha de nacimiento</Text>
                        </View>

                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu texto aquí"
                        />
                    </View>
                </View >
                <View style={globalStylesMenu.containerBottom}>
                    <ButtonClass text="Agregar"/>
                </View >
                
            </View>
        </View>
    );
}