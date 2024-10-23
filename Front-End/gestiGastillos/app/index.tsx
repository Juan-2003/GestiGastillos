import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from "react-native";
const Stack = createNativeStackNavigator();

import Welcome from "./src/home/screens/Welcome"; // Asegúrate de que esta ruta sea correcta
import Register from "./src/home/screens/Register";

import DrawerNavigation from "./navigation/DraweNavigation";
import Cardform from "./forms/cardForm";
import ExpensesForm from "./forms/ExpensesForm";
import IncomeForm from "./forms/IncomeForm";
import ReminderForm from "./forms/ReminderForm";
import SavingPlansForm from "./forms/SavingPlansForm";
export default function Index() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Stack.Navigator
        initialRouteName="Register"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrawerNavigation"
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cardform"
          component={Cardform}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IncomeForm"
          component={IncomeForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExpensesForm"
          component={ExpensesForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReminderForm"
          component={ReminderForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SavingPlansForm"
          component={SavingPlansForm}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      
    </>
  );
}
