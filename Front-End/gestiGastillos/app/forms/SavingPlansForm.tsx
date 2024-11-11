import React, { useEffect, useState } from "react";
import { View, TextInput, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";  // Importa Picker
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import globalStyles from "@/styles/GlobalStyles";
import ButtonClass from "@/components/buttons";
import TextClass from "@/components/TextClass";
import TopBarForms from "@/components/TopBarForms";
import { handleFetchItem } from "../src/auth/api/cardServices";
import { CardItem } from "../src/auth/api/cardServices";
import { ip } from "../src/auth/IP/Ip";
export default function SavingPlansForm() {
    const [debitCardId, setDebitCardId] = useState("");
    const [target_amount, setTargetAmount] = useState("");
    const [name, setName] = useState("");
    const [cards, setCards] = useState<CardItem[]>([]);

    useEffect(() => {
        const fetchCards = async () => {
            const fetchedCards = await handleFetchItem();
            const allCards = [...(fetchedCards.debit_cards || [])];
            console.log("Tarjetas:", allCards);
            setCards(allCards);
        };
        fetchCards();
    }, []);

    const handleAddReminder = async () => {
        try {
            const reminderData = {
                name,
                target_amount,
                debit_card_id: debitCardId,
            };

            const response = await fetch(`http://${ip}:8080/gestiGastillos/reminder`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reminderData),
            });

            if (response.ok) {
                Alert.alert("Éxito", "Recordatorio creado exitosamente");
            
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
                            {cards.map((card) => (
                                <Picker.Item
                                    key={card.card.card_id}
                                    label={card.card.card_name} // o el campo que quieras mostrar como etiqueta
                                    value={`${card.card.card_name} - ${card.card.last_digits}`}
                                />
                            ))}
                        </Picker>

                        <TextClass text="Ingrese el objetivo de gasto" />
                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Ingresa tu texto aquí"
                            value={target_amount}
                            onChangeText={setTargetAmount}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={globalStylesMenu.containerBottom}>
                    <ButtonClass text="Agregar" onPress={handleAddReminder} />
                </View>
            </View>
        </View>
    );
}
