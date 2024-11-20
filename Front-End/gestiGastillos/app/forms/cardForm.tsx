import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import globalStyles from "@/styles/GlobalStyles";
import { Picker } from "@react-native-picker/picker";
import TextClass from "@/components/TextClass";
import TopBarForms from "@/components/TopBarForms";
import {
  handleSubmit,
  CardItem,
  CreditCardItem,
  DebitCardItem,
  handleEdit,
  cardError
} from "../src/auth/api/cardServices";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
type RootStackParamList = {
  Card: undefined;
  CardForm: { card: CardItem };
};

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "CardForm">;
  route: RouteProp<RootStackParamList, "CardForm">;
  onCardAdd: () => void;
  onCardUpdate: () => void;
}

export default function Cardform({
  navigation,
  route,
  onCardAdd,
  onCardUpdate,
}: Props) {
  const { card } = route.params || {};
  console.log("item a actualizar: ", card);

  const [error, setError] = useState<{ title: string; errorMessages: string[] } | null>(null);


  useEffect(() => {
    setError(cardError); 
  }, [cardError]);




  const [name, setName] = useState(card?.card.card_name || "");
  const [type, setType] = useState(card?.type || "");
  const [digitos, setDigitos] = useState(card?.card.last_digits || "");
  const [limite, setLimite] = useState(
    card?.type === "credit"
      ? (card as CreditCardItem)?.credit_limit
      : (card as DebitCardItem)?.current_balance.toString() || ""
  );
  const [deudaActual, setDeudaActual] = useState<number | undefined>(
    card?.type === "credit" ? (card as CreditCardItem).debt : undefined
  );
  const [fechaVencimiento, setFechaVencimiento] = useState(
    card?.card.expiration_date || ""
  );

  const user_id = 2;

  useEffect(() => {
    if (card) {
      setName(card.card.card_name);
      setLimite(
        card.type === "credit"
          ? (card as CreditCardItem)?.credit_limit
          : (card as DebitCardItem)?.current_balance.toString() || ""
      );
      if (card.type === "credit") {
        setDeudaActual((card as CreditCardItem).debt || undefined);
      } else {
        setDeudaActual(undefined);
      }
    }
  }, [card]);

  const handleAction = () => {
    // Verificar que los campos no estén vacíos
    if (!name || !digitos || !fechaVencimiento || !limite) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Verificar si es una tarjeta de crédito
    if (type === "credit" && deudaActual === undefined) {
      alert("Por favor, ingrese la deuda actual de la tarjeta de crédito.");
      return;
    }

    // Convertir `deudaActual` a undefined si no está presente
    const deuda =
      type === "credit" && deudaActual === undefined ? 0 : deudaActual;

    if (card) {
      // Si ya estamos editando una tarjeta, llamamos a handleEdit
      handleEdit(
        navigation,
        card.type === "credit"
          ? card.tarjeta_credito_id
          : card.tarjeta_debito_id,
        type,
        name,
        limite,
        deuda,
        onCardUpdate
      );
    } else {
      // Si estamos creando una tarjeta nueva, llamamos a handleSubmit
      handleSubmit(
        navigation,
        type,
        user_id,
        name,
        digitos,
        fechaVencimiento,
        limite,
        deuda,
        onCardAdd,
      );
    }
  };

  return (
    <View style={globalStyles.container}>
      <TopBarForms title="TARJETAS" />
      <View style={globalStylesMenu.container}>
        <ScrollView style={globalStylesMenu.containerMiddle}>
          <View style={globalStyles.inputTextContainer}>
            <TextClass text="Nombre de la tarjeta" />
            <TextInput
              style={globalStyles.textInput}
              value={name}
              onChangeText={setName}
            />

            {!card ? (
              <>
                <TextClass text="Últimos 4 dígitos" />
                <TextInput
                  style={globalStyles.textInput}
                  value={digitos}
                  onChangeText={setDigitos}
                  keyboardType="numeric"
                />

                <TextClass text="Selecciona el tipo de tarjeta" />
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={type}
                    onValueChange={(itemValue) => setType(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Seleccionar" value="" />
                    <Picker.Item label="Tarjeta de Crédito" value="credit" />
                    <Picker.Item label="Tarjeta de Débito" value="debit" />
                  </Picker>
                </View>
              </>
            ) : null}

            {type ? (
              <>
                {type === "credit" ? (
                  <>
                    <TextClass text="Limite:" />
                    <TextInput
                      style={globalStyles.textInput}
                      value={limite}
                      onChangeText={setLimite}
                      keyboardType="numeric"
                    />

                    <TextClass text="Deuda:" />
                    <TextInput
                      style={globalStyles.textInput}
                      value={
                        deudaActual !== undefined ? deudaActual.toString() : ""
                      }
                      onChangeText={(text) => {
                        if (text === "") {
                          setDeudaActual(undefined);
                        } else {
                          const parsedValue = parseFloat(text);
                          // Verificamos si el valor es un número válido (isNaN)
                          if (!isNaN(parsedValue)) {
                            setDeudaActual(parsedValue);
                          }
                        }
                      }}
                      keyboardType="numeric"
                    />
                  </>
                ) : (
                  <>
                    <TextClass text="Balance:" />
                    <TextInput
                      style={globalStyles.textInput}
                      value={limite}
                      onChangeText={setLimite}
                      keyboardType="numeric"
                    />
                  </>
                )}
              </>
            ) : null}

            {!card ? (
              <>
                <TextClass text="Fecha de vencimiento" />
                <TextInput
                  style={globalStyles.textInput}
                  placeholder="YYYY-MM-DD"
                  value={fechaVencimiento}
                  onChangeText={setFechaVencimiento}
                  keyboardType="numeric"
                />
              </>
            ) : null}
          </View>
          <View style={globalStylesMenu.containerBottom}>
            {error &&  <Text style={globalStyles.error}>
                          {error.title}: {error.errorMessages.join(", ")}
                        </Text>}
            <Pressable style={globalStyles.button} onPress={handleAction} >
              <Text style={globalStyles.text}>
                {card ? "Editar" : "Agregar"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: "100%",
  },

  pickerContainer: {
    width: "70%",
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderColor: "black",
    marginBottom: 40,
  },
});
