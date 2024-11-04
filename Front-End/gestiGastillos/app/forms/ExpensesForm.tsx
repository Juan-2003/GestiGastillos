import { View,Text,TextInput } from "react-native";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import globalStyles from "@/styles/GlobalStyles";
import ButtonClass from "@/components/buttons";
import TextClass from "@/components/TextClass";
import TopBarForms from "@/components/TopBarForms";

export default function ExpensesForm(){
    return(
        <View style={globalStyles.container}>
      
        <TopBarForms title="GASTO"/>
            <View style={globalStylesMenu.container}>
            
                <View style={globalStylesMenu.containerMiddle}>
                    <View style={globalStyles.inputTextContainer}>
                        
                        <TextClass text="Tipo"/>

                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu texto aquí"
                        />
                        
                        <TextClass text="Metodo de pago"/>

                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu texto aquí"
                        />

                        <TextClass text="Seleccione tarjeta"/>

                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu texto aquí"
                        />

                        <TextClass text="Monto"/>

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