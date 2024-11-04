import TopBar from "@/components/topBar";
import globalStyles from "@/styles/GlobalStyles";
import { StyleSheet, View } from "react-native";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import DepositList from "../../../../components/DepositList";
import ExpenseList from "../../../../components/ExpenseList";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function IncomeExpenses({ navigation }: Props) {
  return (
    <View style={globalStyles.container}>
      <TopBar title="INGRESOS GASTOS" />
      <View style={globalStylesMenu.container}>
        <View style={styles.middleContainer}>
          <View style={styles.listContainer}>
            <DepositList navigation={navigation} />
            <ExpenseList navigation={navigation}/>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
  middleContainer: {
    flex: 2,
  },
  listContainer: {
    flex: 1,
    flexDirection: "row",
  },
});
