import TopBar from "@/components/topBar";
import globalStyles from "@/styles/GlobalStyles";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import ButtonClass from "@/components/buttons";
import globalStylesMenu from "@/styles/GlobalStylesMenu";

import cards from "@/json/cards.json";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function IncomeExpenses({ navigation }: Props) {
  return (
    <View style={globalStyles.container}>
      <TopBar title="INGRESOS EGRESOS" />
      <View style={globalStylesMenu.container}>
        <View style={globalStylesMenu.containerMiddle}></View>

        <View style={styles.containerBottom}>
          <ButtonClass
            text="Agregar ingreso"
            onPressNavigation={() => navigation.navigate("IncomeForm")}
          />
          <ButtonClass
            text="Agregar egreso"
            onPressNavigation={() => navigation.navigate("ExpensesForm")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
  containerMiddle: {
    flex: 2,
    backgroundColor: "green",
  },
  containerBottom: {
    flex: 0.4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
