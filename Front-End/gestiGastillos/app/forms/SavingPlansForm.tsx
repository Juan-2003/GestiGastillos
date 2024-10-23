import { View,Text,TextInput } from "react-native";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import globalStyles from "@/styles/GlobalStyles";
import TopBar from "@/components/topBar";
import ButtonClass from "@/components/buttons";
import TextClass from "@/components/TextClass";

export default function SavingPlansForm(){
    return(
        <View style={globalStyles.container}>
      
        <TopBar title="Planes de ahorro"/>
            <View style={globalStylesMenu.container}>
            
                <View style={globalStylesMenu.containerMiddle}>
                    <View style={globalStyles.inputTextContainer}>
                        
                        <TextClass text="Nombre del plan de ahorro"/>

                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu texto aquí"
                        />
                        
                        <TextClass text="Seleccione la tarjeta que desea usar"/>

                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu texto aquí"
                        />

                        <TextClass text="Ingrese el limite de gasto"/>

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