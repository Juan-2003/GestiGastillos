import React, { useEffect, useState } from "react";
import { View, TextInput, Alert,Pressable, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";  // Importa Picker
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import globalStyles from "@/styles/GlobalStyles";
import TextClass from "@/components/TextClass";
import TopBarForms from "@/components/TopBarForms";
import { handleFetchItem } from "../src/auth/api/cardServices";
import { ip } from "../src/auth/IP/Ip";
import { getDebitCardsList, DebitCardResponseDTO} from "../src/auth/api/debitCardServices";
import { StackNavigationProp } from "@react-navigation/stack";
import { getSavingList } from "../src/auth/api/savingPlanServices";

interface Props {
    navigation: StackNavigationProp<any>;
  }

export default function SavingPlansForm({ navigation }: Props) {
    const [debitCardId, setDebitCardId] = useState<number | null>(null);
    const [target_amount, setTargetAmount] = useState<string>("");    const [name, setName] = useState("");
    const [debitCards, setDebitCards] = useState<DebitCardResponseDTO[]>([]);



    useEffect(() => {
        const fetchCards = async () => {
            const fetchedCards = await handleFetchItem();
            const allCards = [...(fetchedCards.debit_cards || [])];
            console.log("Tarjetas:", allCards);
            setDebitCards(allCards);
        };
        fetchCards();
    }, []);

    const handleAddReminder = async () => {
        console.log(debitCardId);
        console.log(name)
        console.log(target_amount)
        const amount = parseFloat(target_amount);
        try {
            const SavingPlans = {
                name:name,
                target_amount:amount,
                debit_card_id: debitCardId,
            };

            const response = await fetch(`http://${ip}:8080/gestiGastillos/saving`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(SavingPlans),
            });

            if (response.ok) {
                Alert.alert("Éxito", "Recordatorio creado exitosamente");
                await getSavingList()
                navigation.goBack();
            
            } else {
                const errorText = await response.text();
                console.error(`Error ${response.status}:`, errorText);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Error de red al crear el recordatorio.");
        }
    };

    return (
        <View style={globalStyles.container}>
            <TopBarForms title="PLANES DE AHORRO" />
            <View style={globalStylesMenu.container}>
                <View style={globalStylesMenu.containerMiddle}>
                    <View style={globalStyles.inputTextContainer}>
                        <TextClass text="Nombre del plan de ahorro" />
                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu texto aquí"
                            value={name}
                            onChangeText={setName}
                        />

                        <TextClass text="Seleccione la tarjeta que desea usar" />
                        <Picker
                            selectedValue={debitCardId}
                            style={globalStyles.textInput}
                            onValueChange={(itemValue) => setDebitCardId(itemValue)}
                        >
                            <Picker.Item label="Selecciona una tarjeta" value="" />
                            {debitCards.map((card) => (
                                <Picker.Item
                                    key={card.card.card_id}
                                    label={`${card.card.card_name} - ${card.card.last_digits}`} // o el campo que quieras mostrar como etiqueta
                                    value={card.tarjeta_debito_id}
                                />
                            ))}
                        </Picker>

                        <TextClass text="Ingrese el objetivo de gasto" />
                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Agrega el objetivo aqui"
                            value={target_amount}
                            onChangeText={(text) => setTargetAmount(text)}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={globalStylesMenu.containerBottom}>
          <Pressable style={globalStyles.button} onPress={handleAddReminder}>
            <Text style={globalStyles.text}>Agregar</Text>
          </Pressable>
        </View>
            </View>
        </View>
    );
}
