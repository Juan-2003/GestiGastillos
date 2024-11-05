import { View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import TopBar from "@/components/topBar";
import DepositList from "@/components/DepositList";
import ExpenseList from "@/components/ExpenseList";
import globalStyles from "@/styles/GlobalStyles";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function IncomeExpenses({ navigation }: Props) {
  return (
    <>
      <TopBar title="INGRESOS GASTOS" />
      <View style={globalStyles.middleContainer}>
        <View style={globalStyles.listContainer}>
          <DepositList navigation={navigation} />
          <ExpenseList navigation={navigation} />
        </View>
      </View>
    </>
  );
}
