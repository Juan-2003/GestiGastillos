import ButtonClass from "@/components/buttons";
import { View, StyleSheet, FlatList, Text } from "react-native";
import ContextContainer from "@/components/ContextContainer";
import { useState } from "react";
import Income from "@/json/item.json";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function DepositList({ navigation }: Props) {
  const items = Income.Incomes;

  return (
    <View style={styles.incomeContainer}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) =>
            <ContextContainer item={item} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>
              No tienes ingresos registrados
            </Text>
          }
        />
      </View>
      <View style={styles.containerBottom}>
        <ButtonClass
          text="INGRESO"
          onPressNavigation={() => navigation.navigate("IncomeForm")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
  },
  containerBottom: {
    flex: 0.1,
    paddingTop: 20,
    alignItems: "center",
  },
  incomeContainer: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#27C1F9',
  },
  emptyMessage: {
    fontSize: 20,
    color: "#F80000FF",
    textAlign: 'center',
    marginVertical: 230,
  },
});