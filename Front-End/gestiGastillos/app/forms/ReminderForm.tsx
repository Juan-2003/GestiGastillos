import { View,TextInput } from "react-native";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import globalStyles from "@/styles/GlobalStyles";
import ButtonClass from "@/components/buttons";
import TextClass from "@/components/TextClass";
import TopBarForms from "@/components/TopBarForms";

export default function ReminderForm(){
    return(
        <View style={globalStyles.container}>
      
        <TopBarForms title="RECORDATORIOS"/>
            <View style={globalStylesMenu.container}>
            
                <View style={globalStylesMenu.containerMiddle}>
                    <View style={globalStyles.inputTextContainer}>
                        
                        <TextClass text="Titulo"/>

                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu texto aquí"
                        />
                        
                        <TextClass text="Descripcion"/>

                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu texto aquí"
                        />

                        <TextClass text="Fecha de recordatorio"/>

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