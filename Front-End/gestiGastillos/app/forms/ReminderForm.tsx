import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import globalStyles from "@/styles/GlobalStyles";
import ButtonClass from "@/components/buttons";
import TextClass from "@/components/TextClass";
import TopBarForms from "@/components/TopBarForms";
import { handleFetchItem, CardItem } from "../src/auth/api/cardServices";
import { Picker } from "@react-native-picker/picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { ip } from "../src/auth/IP/Ip";
import { fetchReminders } from "../src/auth/api/reminderServices";
import { ScrollView } from "react-native-gesture-handler";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function ReminderForm({ navigation }: Props) {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [card_id, setCardId] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [cardType, setCardType] = useState<"credit" | "debit" | null>(null);
  const [error,setError]=useState(" ")
  const [useCard, setUseCard] = useState<"yes" | "no" | null>(null); // Nuevo estado


  useEffect(() => {
    const fetchCards = async () => {
      const fetchedCards = await handleFetchItem();
      const allCards = [
        ...(fetchedCards.credit_cards || []),
        ...(fetchedCards.debit_cards || []),
      ];
      console.log("Tarjetas:", allCards);
      setCards(allCards);
    };
    fetchCards();
  }, []);

  const handleAddReminder = async () => {
    console.log("Selected card_id:", card_id);

    try {
      const reminderData = {
        name,
        message,
        date,
        credit_card_id: cardType === "credit" ? card_id : null,
        debit_card_id: cardType === "debit" ? card_id : null,
      };

      const response = await fetch(`http://${ip}:8080/gestiGastillos/reminder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reminderData),
      });

      if (response.ok) {
        alert("Recordatorio creado exitosamente");
        await fetchReminders();
        navigation.goBack();
      } else {
        const errorText = await response.text();
        setError(errorText);
        console.error(`Error ${response.status}:`, errorText);
      }
    } catch (error) {
      console.error(error);
      alert("Error de red al crear el recordatorio.");
    }
  };

  return (
    <View style={globalStyles.container}>
      <TopBarForms title="RECORDATORIOS" />
      <View style={globalStylesMenu.container}>
        <View style={globalStylesMenu.containerMiddle}>
        <ScrollView>
          <View style={globalStyles.inputTextContainer}>
            <TextClass text="deseas utilizar una tarjeta"/>
            <View  style={styles.pickerContainer}>
              <Picker
                  selectedValue={useCard}
                  onValueChange={(value) => {
                    setUseCard(value);
                    if (value === "no") {
                      // Resetear valores si elige "No"
                      setCardType(null);
                      setCardId(null);
                    }
                  }}
                  style={globalStyles.picker}
                >
                  <Picker.Item label="Selecciona una opción" value={null} />
                  <Picker.Item label="Sí" value="yes" />
                  <Picker.Item label="No" value="no" />
              </Picker>
            </View>

          {useCard === "yes" && (
              <>
                <TextClass text="Selecciona el tipo de tarjeta" />
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={cardType}
                    onValueChange={(value) => {
                      setCardType(value);
                      setCardId(null); // Resetear el ID de la tarjeta al cambiar el tipo
                    }}
                    style={globalStyles.picker}
                  >
                    <Picker.Item label="Selecciona el tipo de tarjeta" value={null} />
                    <Picker.Item label="Crédito" value="credit" />
                    <Picker.Item label="Débito" value="debit" />
                  </Picker>
                </View>

                <TextClass text="Selecciona una tarjeta" />
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={card_id}
                    onValueChange={(itemValue) => setCardId(itemValue)}
                    style={globalStyles.picker}
                    enabled={cardType !== null}
                  >
                    <Picker.Item label="Selecciona una tarjeta" value={null} />
                    {cards
                      .filter((card) =>
                        (cardType === "credit" && card.tarjeta_credito_id) ||
                        (cardType === "debit" && card.tarjeta_debito_id)
                      )
                      .map((card) => (
                        <Picker.Item
                          key={
                            cardType === "credit"
                              ? card.tarjeta_credito_id
                              : card.tarjeta_debito_id
                          }
                          label={`${card.card.card_name} - ${card.card.last_digits}`}
                          value={
                            cardType === "credit"
                              ? card.tarjeta_credito_id
                              : card.tarjeta_debito_id
                          }
                        />
                      ))}
                  </Picker>
                </View>
              </>
            )}

            <TextClass text="Título" />
            <TextInput
              style={globalStyles.textInput}
              placeholder="Ingresa tu texto aquí"
              onChangeText={setName}
              value={name}
            />

            <TextClass text="Descripción" />
            <TextInput
              style={globalStyles.textInput}
              placeholder="Ingresa tu texto aquí"
              onChangeText={setMessage}
              value={message}
            />

            <TextClass text="Fecha de recordatorio" />
            <TextInput
              style={globalStyles.textInput}
              placeholder="YYYY-MM-DD"
              onChangeText={setDate}
              value={date}
            />
          </View>
          </ScrollView>
        </View>

      
        <View style={globalStylesMenu.containerBottom}>
        {error ? <Text style={styles.error}>{error}</Text> : null}
          <Pressable style={globalStyles.button} onPress={handleAddReminder}>
            <Text style={globalStyles.text}>Agregar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    width: "70%",
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderColor: "black",
    marginBottom: 40,
  },
  error:{
    fontSize:9,
    color:"red",
    width:"80%"
  }
});
