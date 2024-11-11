import {
  View,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import globalStyles from "@/styles/GlobalStyles";
import ButtonClass from "@/components/buttons";
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

type RootStackParamList = {
  IncomeExpenses: undefined;
  IncomeExpenseForm: { item: MovementItem, type: string };
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
  const { item, type: title } = route.params || {};
  console.log("titulo:", title);

  // Declaracion de variables
  const [type, setType] = useState(item?.type || "");
  const [payment_method, setPaymentMethod] = useState(
    item?.payment_method || ""
  );
  const [amount, setAmount] = useState<number | undefined>(
    item?.amount || undefined
  );
  const [concept, setConcept] = useState(item?.concept || "");
  const [category, setCategory] = useState(item?.category || "");
  const [credit_id, setCreditId] = useState<number | undefined>(
    (item as ExpenseItem)?.credit_card_id || undefined
  );
  const [debit_id, setDebitId] = useState<number | undefined>(
    item?.debit_card_id || undefined
  );

  useEffect(() => {
    if (item as IncomeItem) {
      setType(item.type);
      setAmount(item.amount);
      setConcept(item.concept);
      setPaymentMethod(item.payment_method);
      setDebitId(item.debit_card_id);
    }
    if (item as ExpenseItem) {
      setAmount(item.amount);
      setConcept(item.concept);
    }
  }, [item]);

  const handleAction = () => {
    // Verificar que los campos no esten vacios
    if (!type || !payment_method || !amount || !concept || !category) {
      alert("Por favor, completa todos los campos obligatiorios.");
      return;
    }

    // Convertir el undefined de monto en 0, si es que no hay monto
    amount === undefined ? 0 : amount;

    if (item) {
      // Si estamos editanto un item:
      handleEditIncomeExpense(
        navigation,
        item.transaction_id,
        type,
        amount,
        concept,
        payment_method,
        onItemUpdate
      );
    } else {
      // Si estamos creando un item nuevo:
      handleSubmitIncomeExpense(
        navigation,
        type,
        amount,
        concept,
        category,
        payment_method,
        credit_id,
        debit_id,
        onItemAdd
      );
    }
  };

  return (
    <>
      <TopBarForms title={item
        ? (title === 'income'
          ? "EDITAR INGRESO"
          : "EDITAR GASTO")
        : (title === 'income'
          ? "AGREGAR INGRESO"
          : "AGREGAR GASTO")}
      />
      <View style={globalStylesMenu.container}>
        <ScrollView style={globalStylesMenu.containerMiddle}>
          <View style={globalStyles.inputTextContainer}>
            <View>
              <Text style={globalStyles.textForm}>
                Selecciona una categoria:
              </Text>
            </View>

            <CategoryPickerComponent
              type={title}
              setCategory={setCategory}
            />

            <TextClass text="Titulo del movimiento" />
            <TextInput
              style={globalStyles.textInput}
              value={type}
              onChangeText={setType}
              placeholder="Ingresa un pequeño titulo acerca del movimiento"
            />

            <TextClass text="Concepto" />
            <TextInput
              style={globalStyles.textInput}
              value={concept}
              onChangeText={setConcept}
              placeholder="Ingresa una pequeña descripción del movimiento"
            />

            <MethodPickerComponent />

          </View>
          <View style={globalStylesMenu.containerBottom}>
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

