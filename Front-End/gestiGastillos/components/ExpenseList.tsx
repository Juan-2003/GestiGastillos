import ButtonClass from "@/components/buttons";
import { View, StyleSheet } from "react-native";
import ContextContainer from "@/components/ContextContainer";

export default function ExpenseList() {
  return (
    <View style={styles.expenseContainer}>
      <View style={styles.flatListContainer}>
        {/*Aqui va un flatList o un ScrollView*/}
        <ContextContainer text="Frituras" />
        <ContextContainer text="Luz" />
        <ContextContainer text="Internet" />
        <ContextContainer text="Despensa" />
      </View>
      <View style={styles.containerBottom}>
        <ButtonClass text="GASTO" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 2,
  },
  expenseContainer: {
    flex: 1,
    borderLeftWidth: 1,
  },
  containerBottom: {
    flex: 0.2,
    paddingTop: 10,
    paddingBottom: 5,
    alignItems: "center",
  },
});
