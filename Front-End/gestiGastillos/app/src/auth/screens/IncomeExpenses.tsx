import TopBar from "@/components/topBar";
import globalStyles from "@/styles/GlobalStyles";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import ButtonClass from "@/components/buttons";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function IncomeExpenses({ navigation }: Props) {
  return (
    <View style={globalStyles.container}>
      <TopBar title="INGRESOS EGRESOS" />
      <View style={globalStylesMenu.container}>
        <View style={styles.containerMiddle}>
          <View style={styles.listContainer}>
            <View style={styles.incomeContainer}>
              <View style={styles.containerIncomeExpense}>
                <View style={styles.containerIncomeExpenseMiddle}>
                  <Text style={globalStyles.text}>putas</Text>
                  <View style={styles.iconsContainer}>
                    <MaterialCommunityIcons
                        name="pencil"
                        size={20}
                        color="white"
                      />
                      <MaterialCommunityIcons
                        name="trash-can"
                        size={20}
                        color="white"
                      />
                  </View>
                </View>  
              </View>
              <View style={styles.flatListContainer}></View>
              <View style={styles.containerBottom}>
                <ButtonClass text="Ingreso" />
              </View>
            </View>
            <View style={styles.expensesContainer}>
              <View style={styles.flatListContainer}></View>
              <View style={styles.containerBottom}>
                <ButtonClass text="Egreso" />
              </View>
            </View>
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
  containerMiddle: {
    flex: 2,
    //backgroundColor: "green",
  },
  flatListContainer: {
    flex: 2,
    //backgroundColor: "purple",
  },
  containerBottom: {
    flex: 0.2,
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    flexDirection: "row",
    //backgroundColor: "green",
  },
  expensesContainer: {
    flex: 1,
    borderLeftWidth: 1,
    //backgroundColor: 'red'
  },
  incomeContainer: {
    flex: 1,

    borderRightWidth: 1,
    //backgroundColor: 'purple'
  },
  containerIncomeExpense:{
    alignItems:"center",
    padding:10,
    justifyContent:"center"
  },
  containerIncomeExpenseMiddle:{
    backgroundColor:"#A63738",
    width:"95%",
    padding:10,
    flexDirection:"row",
    justifyContent:"space-around"
  },
  iconsContainer:{
    flexDirection:"row"
  }
});
