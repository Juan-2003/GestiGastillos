import React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import TextClass from "@/components/TextClass";
import { CardItem, handleFetchItem } from "@/app/src/auth/api/cardServices";
import globalStyles from "@/styles/GlobalStyles";

interface Props {
  setPaymentMethod: (payment_method: string) => void;
  setAmount: (amount: number) => void;
  setCreditId: (credit_id: number) => void;
  setDebitId: (debit_id: number) => void;
  title: string;
}

export default function MethodPickerComponent({
  setPaymentMethod,
  setAmount,
  setCreditId,
  setDebitId,
  title,
}: Props) {
  const [type, setType] = useState("");
  const [cards, setCards] = useState<CardItem[]>([]);
  const [card, setCard] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await handleFetchItem();
      const combinedCards: CardItem[] = [
        ...data.credit_cards?.map((card) => ({ ...card, type: "credit" })), // Añadimos el tipo a las tarjetas de crédito
        ...data.debit_cards?.map((card) => ({ ...card, type: "debit" })), // Añadimos el tipo a las tarjetas de débito
      ];
      setCards(combinedCards);
      console.log("Datos almacenados en cards dentro del picker:", data); // Verificar los datos aquí
    };
    fetchData();
  }, []);

  // Filtrar tarjetas según el tipo seleccionado
  const filteredCards = cards.filter(
    (card) =>
      (type === "tarjeta_credito" && card.type === "credit") ||
      (type === "tarjeta_debito" && card.type === "debit")
  );

  return (
    <>
      <TextClass text="Metodo de pago" />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => {
            setType(itemValue);
            setPaymentMethod(itemValue);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Seleccionar" value="" />
          <Picker.Item label="Efectivo" value="efectivo" />
          {title !== "ingreso" && (
            <Picker.Item label="Tarjeta de Crédito" value="tarjeta_credito" />
          )}
          <Picker.Item label="Tarjeta de Débito" value="tarjeta_debito" />
        </Picker>
      </View>

      {type ? (
        type === "tarjeta_credito" || type === "tarjeta_debito" ? (
          <>
            <TextClass text="Elije tu tarjeta" />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={card}
                onValueChange={(cardValue) => {
                  setCard(cardValue);
                  // Si el tipo es tarjeta de crédito, se establece el ID de la tarjeta de crédito
                  if (type === "tarjeta_credito") {
                    setCreditId(Number(cardValue)); // Asegúrate de convertir el valor a un número
                  }
                  // Si el tipo es tarjeta de débito, se establece el ID de la tarjeta de débito
                  else if (type === "tarjeta_debito") {
                    setDebitId(Number(cardValue)); // Asegúrate de convertir el valor a un número
                  }
                }}
                style={styles.picker}
              >
                <Picker.Item label="Seleccionar tarjeta" value="" />
                {filteredCards.map((cardItem) => (
                  <Picker.Item
                    key={
                      type === "tarjeta_credito"
                        ? cardItem.tarjeta_credito_id
                        : cardItem.tarjeta_debito_id
                    }
                    label={cardItem.card.card_name}
                    value={
                      type === "tarjeta_credito"
                        ? cardItem.tarjeta_credito_id // Usamos tarjeta_credito_id aquí
                        : cardItem.tarjeta_debito_id // Usamos tarjeta_debito_id aquí
                    }
                  />
                ))}
              </Picker>
            </View>
            <TextClass text="Monto" />
            <TextInput
              style={globalStyles.textInput}
              onChangeText={(text) => setAmount(Number(text))}
              keyboardType="numeric"
              placeholder="Ingresa la cantidad"
            />
          </>
        ) : (
          <>
            <TextClass text="Monto" />
            <TextInput
              style={globalStyles.textInput}
              onChangeText={(text) => setAmount(Number(text))}
              keyboardType="numeric"
              placeholder="Ingresa la cantidad"
            />
          </>
        )
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  picker: {
    width: "100%",
  },

  pickerContainer: {
    width: "70%",
    borderBottomWidth: 1,
    borderColor: "#000000",
    marginBottom: 40,
  },
  text: {
    fontSize: 14,
  },
});
