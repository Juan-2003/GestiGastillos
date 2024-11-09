import { View, FlatList, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import ItemComponent from "@/components/ItemComponent";
import ButtonClass from "@/components/buttons";
import flatListComponent from "@/styles/FlatListComponent";
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await handleFetchIncomeExpense(type);
      const combinedItems: MovementItem[] = [
        ...data.income_item?.map((item) => ({ ...item, type: "income" })), // Añadimos el tipo a los ingresos
        ...data.expense_item?.map((item) => ({ ...item, type: "expense" })), // Añadimos el tipo a los gastos
      ];
      setItem(combinedItems);
      console.log("Datos almacenados en items:", data); // Verificar los datos aquí
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
    });
  };

  return (
    <View style={flatListComponent.expenseContainer}>
      <View style={flatListComponent.flatListContainer}>
        <FlatList
          data={item}
          keyExtractor={(item) => {
            if (item.type === "income") {
              return `income_${(
                item as IncomeItem
              ).transaction_id?.toString()}`;
            } else {
              return `expense_${(
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
          text={type === 'income' ? 'INGRESO' : 'GASTO'}
          onPressNavigation={() => navigation.navigate("IncomeExpenseForm")}
        />
      </View>
    </View>
  );
}
