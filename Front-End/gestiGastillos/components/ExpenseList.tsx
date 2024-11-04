import ButtonClass from "@/components/buttons";
import { View, StyleSheet, FlatList, Text } from "react-native";
import ContextContainer from "@/components/ContextContainer";
import { useEffect, useState } from "react";
import Income from "@/json/item.json";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function ExpenseList({ navigation }: Props) {
  const items = Income.Expenses;

  return (
    <View style={styles.expenseContainer}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) =>
            <ContextContainer item={item} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>
              No tienes gastos registrados
            </Text>
          }
        />
      </View>
      <View style={styles.containerBottom}>
        <ButtonClass
          text="GASTO"
          onPressNavigation={() => navigation.navigate("ExpensesForm")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
  },
  expenseContainer: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: '#27C1F9'
  },
  containerBottom: {
    flex: 0.1,
    paddingTop: 20,
    alignItems: "center",
  },
  emptyMessage: {
    fontSize: 20,
    color: "#F80000FF",
    textAlign: 'center',
    marginVertical: 230,
  },
});
