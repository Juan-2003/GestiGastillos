import { View, StyleSheet, FlatList, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import ButtonClass from "@/components/buttons";
import ContextContainer from "@/components/ItemContainer";
import Income from "@/json/item.json";
import flatListComponent from "@/styles/FlatListComponent";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function ExpenseList({ navigation }: Props) {
  const items = Income.Expenses;

  return (
    <View style={flatListComponent.expenseContainer}>
      <View style={flatListComponent.flatListContainer}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) =>
            <ContextContainer item={item} />
          }
          ListEmptyComponent={
            <Text style={flatListComponent.emptyMessage}>
              No tienes gastos registrados
            </Text>
          }
        />
      </View>
      <View style={flatListComponent.containerBottom}>
        <ButtonClass
          text="GASTO"
          onPressNavigation={() => navigation.navigate("ExpensesForm")}
        />
      </View>
    </View>
  );
}