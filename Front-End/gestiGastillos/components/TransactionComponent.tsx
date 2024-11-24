import globalStyles from "@/styles/GlobalStyles";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  handleFetchIncomeExpense,
  MovementItem,
} from "@/app/src/auth/api/IncomeExpensesServices";
import { FlatList } from "react-native-gesture-handler";

interface Props {
  type: string;
}

export default function TransactionComponent({ type }: Props) {
  const [item, setItem] = useState<MovementItem[]>([]);

  // Funcion para obtener los datos del backEnd
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const data = await handleFetchIncomeExpense();
        console.log(data);
        const expensesItems: MovementItem[] = [
          ...(data.expenses?.map((item: any) => ({
            ...item,
            type: "egreso",
          })) || []),
        ];

        // Filtrar y ordenar los items de mayor a menor por una propiedad (e.g., "amount" o "value")
        const sortedItems = expensesItems
          .sort((a, b) => (b.amount || 0) - (a.amount || 0)) // Ordenar de mayor a menor por 'amount'
          .slice(0, 3); // Obtener solo los primeros 3 elementos

        console.log("Items filtrados y ordenados:", sortedItems);
        setItem(sortedItems);

        // Solo actualiza el estado si los datos han cambiado
        setItem((prevItems) => {
          // Si los datos son iguales, no se hace nada
          if (JSON.stringify(prevItems) !== JSON.stringify(sortedItems)) {
            return sortedItems;
          }
          return prevItems;
        });
      };

      fetchData();
    }, [type]) // Ahora 'type' es una dependencia, se ejecutará cada vez que 'type' cambie
  );

  return (
    <>
      <Text style={globalStyles.title}>Tus gastos mas caros</Text>
      <View style={styles.expensesMainContainer}>
        <View style={styles.expensesContainer}>
          {item.map((item) => (
            <View key={item.transaction_id} style={styles.itemContainer}>
              <Text style={styles.text}>
                {item.title} - ${item.amount}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  expensesMainContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 50,
  },
  expensesContainer: {
    height: 150,
    width: 300,
    backgroundColor: "#4FCFFD",
    borderRadius: 3,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#25ADDFFF",
  },
  itemContainer: {
    flex: 0.333,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-evenly",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBlockColor: "#19B5EEFF",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "semibold",
    fontSize: 25,
    textAlign: "center",
  },
});
