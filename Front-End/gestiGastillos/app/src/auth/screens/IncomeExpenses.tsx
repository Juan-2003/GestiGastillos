import { View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import TopBar from "@/components/topBar";
import ExpenseList from "@/components/ItemList";
import globalStyles from "@/styles/GlobalStyles";
import ItemList from "@/components/ItemList";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function IncomeExpenses({ navigation }: Props) {
  return (
    <>
      <TopBar title="INGRESOS GASTOS" />
      <View style={globalStyles.middleContainer}>
        <View style={globalStyles.listContainer}>
          <ItemList navigation={navigation} type="ingreso"/>
          <ItemList navigation={navigation} type="egreso"/>
        </View>
      </View>
    </>
  );
}
