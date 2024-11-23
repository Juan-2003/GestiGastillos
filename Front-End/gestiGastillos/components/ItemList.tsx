import { View, FlatList, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import ItemComponent from "@/components/ItemComponent";
import ButtonClass from "@/components/buttons";
import flatListComponent from "@/styles/FlatListComponent";
import React from "react";
import {
  ExpenseItem,
  handleDeleteIncomeExpense,
  handleFetchIncomeExpense,
  IncomeItem,
  MovementItem,
} from "@/app/src/auth/api/IncomeExpensesServices";

interface Props {
  navigation: StackNavigationProp<any>;
  type: string;
}

export default function ItemList({ navigation, type }: Props) {
  const [item, setItem] = useState<MovementItem[]>([]);
  console.log(type);

  useEffect(() => {
    const fetchData = async () => {
      const data = await handleFetchIncomeExpense();
      console.log(data);
      const combinedItems: MovementItem[] = [
        ...data.incomes?.map((item) => ({ ...item, type: "ingreso" })), // Añadimos el tipo a los ingresos
        ...data.expenses?.map((item) => ({ ...item, type: "egreso" })), // Añadimos el tipo a los gastos
      ];

      // Filtramos los items según el tipo que se pasa como prop
      const filteredItems = combinedItems.filter((item) => item.type === type);

      setItem(filteredItems);
      console.log("Datos almacenados en items:", filteredItems);
    };
    fetchData();
  }, []);

  const handleDeleteItem = async (itemId: number, itemType: string) => {
    await handleDeleteIncomeExpense(itemId, itemType, () => {
      // Actualizamos el estado local para eliminar la tarjeta de la lista
      setItem((prevItems) =>
        prevItems.filter((item) =>
          itemType === "income"
            ? (item as IncomeItem).transaction_id !== itemId
            : (item as ExpenseItem).transaction_id !== itemId
        )
      );
    });
  };

  const handleUpdateItem = (item: MovementItem) => {
    navigation.navigate("IncomeExpenseForm", {
      Movement: item,
      type: type,
    });
  };

  console.log("items : !!!!", item);
  return (
    <View style={flatListComponent.expenseContainer}>
      <View style={flatListComponent.flatListContainer}>
        <FlatList
          data={item}
          keyExtractor={(item) => {
            if (type === "ingreso") {
              return `ingreso_${(
                item as IncomeItem
              ).transaction_id?.toString()}`;
            } else {
              return `egreso_${(
                item as ExpenseItem
              ).transaction_id?.toString()}`;
            }
          }}
          renderItem={({ item }) => (
            <ItemComponent
              item={item}
              onDelete={handleDeleteItem}
              onUpdate={handleUpdateItem}
            />
          )}
          ListEmptyComponent={
            <Text style={flatListComponent.emptyMessage}>
              No has registrado nada aún
            </Text>
          }
        />
      </View>
      <View style={flatListComponent.containerBottom}>
        <ButtonClass
          text={type === "ingreso" ? "INGRESO" : "GASTO"}
          onPressNavigation={() =>
            navigation.navigate("IncomeExpenseForm", {
              type: type,
            })
          }
        />
      </View>
    </View>
  );
}
