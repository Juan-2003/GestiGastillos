import { View, StyleSheet, FlatList, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import ButtonClass from "@/components/buttons";
import ContextContainer from "@/components/ItemContainer";
import Income from "@/json/item.json";
import flatListComponent from "@/styles/FlatListComponent";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function DepositList({ navigation }: Props) {
  const items = Income.Incomes;

  return (
    <View style={flatListComponent.incomeContainer}>
      <View style={flatListComponent.flatListContainer}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) =>
            <ContextContainer item={item} />
          }
          ListEmptyComponent={
            <Text style={flatListComponent.emptyMessage}>
              No tienes ingresos registrados
            </Text>
          }
        />
      </View>
      <View style={flatListComponent.containerBottom}>
        <ButtonClass
          text="INGRESO"
          onPressNavigation={() => navigation.navigate("IncomeForm")}
        />
      </View>
    </View>
  );
}