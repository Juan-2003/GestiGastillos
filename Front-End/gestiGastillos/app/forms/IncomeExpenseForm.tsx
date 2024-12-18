import React from "react";
import { View, TextInput, ScrollView, Text, Pressable } from "react-native";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import globalStyles from "@/styles/GlobalStyles";
import TextClass from "@/components/TextClass";
import TopBarForms from "@/components/TopBarForms";
import MethodPickerComponent from "@/components/MethodPickerComponent";
import {
  ExpenseItem,
  handleEditIncomeExpense,
  handleSubmitIncomeExpense,
  IncomeItem,
  MovementItem,
} from "../src/auth/api/IncomeExpensesServices";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import CategoryPickerComponent from "@/components/CategoryPickerComponent";
import { cardError } from "../src/auth/api/cardServices";
import { useMyContext } from "../contextProvider";

type RootStackParamList = {
  IncomeExpenses: undefined;
  IncomeExpenseForm: { Movement: MovementItem; type: string };
};

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "IncomeExpenseForm">;
  route: RouteProp<RootStackParamList, "IncomeExpenseForm">;
  onItemAdd: () => void;
  onItemUpdate: () => void;
}

export default function IncomeExpenseForm({
  navigation,
  route,
  onItemAdd,
  onItemUpdate,
}: Props) {
  // Recibir los datos si es que obtenemos un objeto en la ruta
  const { Movement: item, type: tipo } = route.params || {};
  const [error, setError] = useState<{
    title: string;
    errorMessages: string[];
  } | null>(null);

  useEffect(() => {
    setError(cardError);
  }, [cardError]);

  const { userId: user_id } = useMyContext();  // Accede al userName desde el contexto

  // Declaracion de variables
  const [type, setType] = useState<string | undefined>(tipo || "");
  const [payment_method, setPaymentMethod] = useState<string | undefined>(
    item?.payment_method || ""
  );
  const [amount, setAmount] = useState<number | undefined>(
    item?.amount || undefined
  );
  const [concept, setConcept] = useState<string | undefined>(
    item?.concept || ""
  );
  const [category, setCategory] = useState<string | undefined>(
    item?.category || ""
  );
  const [credit_id, setCreditId] = useState<number | undefined>(
    (item as ExpenseItem)?.credit_card_id || undefined
  );
  const [debit_id, setDebitId] = useState<number | undefined>(
    item?.debit_card_id || undefined
  );
  const [date, setDate] = useState<string | undefined>(
    item?.date || new Date().toISOString().split("T")[0]
  );
  const [title, setTitle] = useState<string | undefined>(item?.title || "");

  // Agregamos los valores de las variables si entra a actualizar
  useEffect(() => {
    if (item as IncomeItem) {
      setType(item?.type);
      setTitle(item?.title);
      setAmount(item?.amount || 0);
      setConcept(item?.concept);
      setPaymentMethod(item?.payment_method);
      setDebitId(item?.debit_card_id);
    }
    if (item as ExpenseItem) {
      setTitle(item?.title);
      setAmount(item?.amount);
      setConcept(item?.concept);
    }
  }, [item]);

  const handleAction = () => {
    console.log("Item!!!!!!!!!!!: ", item);
    if (item?.transaction_id) {
      // Si estamos editanto un item:
      console.log("Entro a actualizar!!!!!!!");
      console.log(
        "Tipo:",
        type,
        "Titulo:",
        title,
        "Cantidad:",
        amount,
        "Concepto:",
        concept
      );

      handleEditIncomeExpense(
        navigation,
        item.transaction_id,
        type,
        title,
        amount,
        concept,
        date,
        onItemUpdate,
        setError
      );
    } else {
      // Si estamos creando un item nuevo:
      console.log("Entro a crear!!!!!!!");
      console.log(
        "Tipo:",
        type,
        "ID:",
        user_id,
        "Titulo:",
        title,
        "Cantidad:",
        amount,
        "Concepto:",
        concept,
        "Categoria:",
        category,
        "Metodo:",
        payment_method,
        "Fecha:",
        date,
        "CreditoID:",
        credit_id,
        "DebitoID:",
        debit_id
      );

      handleSubmitIncomeExpense(
        navigation,
        user_id,
        type,
        title,
        amount,
        concept,
        category,
        payment_method,
        date,
        credit_id,
        debit_id,
        onItemAdd,
        setError
      );
    }
  };

  return (
    <>
      <TopBarForms
        title={
          item
            ? tipo === "ingreso"
              ? "EDITAR INGRESO"
              : "EDITAR GASTO"
            : tipo === "ingreso"
            ? "AGREGAR INGRESO"
            : "AGREGAR GASTO"
        }
      />
      <View style={globalStylesMenu.container}>
        <ScrollView style={globalStylesMenu.containerMiddle}>
          <View style={globalStyles.inputTextContainer}>
            // Si no es editar, seleccionas categoria
            {!item && (
              <>
                <View>
                  <Text style={globalStyles.textForm}>
                    Selecciona una categoria:
                  </Text>
                </View>
                <CategoryPickerComponent
                  type={tipo}
                  setCategory={setCategory}
                />
              </>
            )}
            <TextClass text="Titulo" />
            <TextInput
              style={globalStyles.textInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Ingresa un pequeño titulo del movimiento"
            />
            console.log(title)
            <TextClass text="Concepto" />
            <TextInput
              style={globalStyles.textInput}
              value={concept}
              onChangeText={setConcept}
              placeholder="Ingresa una pequeña descripción del movimiento"
            />
            {!item ? (
              <MethodPickerComponent
                setAmount={setAmount}
                setPaymentMethod={setPaymentMethod}
                setCreditId={setCreditId}
                setDebitId={setDebitId}
                title={tipo}
              />
            ) : (
              <>
                <TextClass text="Monto" />
                <TextInput
                  style={globalStyles.textInput}
                  value={amount ? String(amount) : ""}
                  onChangeText={(text) => setAmount(Number(text))}
                  keyboardType="numeric"
                  placeholder="Ingresa la cantidad"
                />
              </>
            )}
            <TextClass text="Fecha del movimiento" />
            <TextInput
              style={globalStyles.textInput}
              value={date}
              onChangeText={setDate}
              placeholder="Fecha del movimiento"
            />
          </View>
          <View style={globalStylesMenu.containerBottom}>
            {error && (
              <Text style={globalStyles.error}>
                {error.title}: {error.errorMessages.join(", ")}
              </Text>
            )}
            <Pressable style={globalStyles.button} onPress={handleAction}>
              <Text style={globalStyles.text}>
                {item ? "Editar" : "Agregar"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
