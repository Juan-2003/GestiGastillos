import { View,TextInput, ScrollView } from "react-native";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import globalStyles from "@/styles/GlobalStyles";
import ButtonClass from "@/components/buttons";
import TextClass from "@/components/TextClass";
import TopBarForms from "@/components/TopBarForms";
import MethodPickerComponent from "@/components/MethodPickerComponent";

export default function IncomeForm(){
    return(
        <>
            <TopBarForms title="INGRESO" />
            <View style={globalStylesMenu.container}>

                <ScrollView style={globalStylesMenu.containerMiddle}>
                    <View style={globalStyles.inputTextContainer}>

                        <TextClass text="Tipo" />
                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa el tipo de gasto que es, ejemplo: Comida"
                        />

                        <MethodPickerComponent />

                        <TextClass text="Concepto" />
                        <TextInput
                            style={globalStyles.textInput}
                        />

                        <TextClass text="Monto" />
                        <TextInput
                            style={globalStyles.textInput}
                            keyboardType="numeric"
                        />

                    </View>
                    <View style={globalStylesMenu.containerBottom}>
                        <ButtonClass text="Agregar" />
                    </View >
                </ScrollView >

            </View>
        </>
    );
}