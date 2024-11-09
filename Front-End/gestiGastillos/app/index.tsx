import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";

import Welcome from "./src/home/screens/Welcome";
import Register from "./src/home/screens/Register";
import DrawerNavigation from "./navigation/DraweNavigation";
import Cardform from "./forms/cardForm";
import ExpensesForm from "./forms/IncomeExpenseForm";
import ReminderForm from "./forms/ReminderForm";
import SavingPlansForm from "./forms/SavingPlansForm";
import { useEffect } from "react";
import Card from "./src/auth/screens/Card";
import IncomeExpenseForm from "./forms/IncomeExpenseForm";

const Stack = createNativeStackNavigator();

export default function Index() {
  useEffect(() => {
    StatusBar.setBackgroundColor("black");
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="IncomeExpenseForm"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: "fade_from_bottom",
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={DrawerNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Card"
        component={Card}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cardform"
        component={Cardform}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IncomeExpenseForm"
        component={IncomeExpenseForm}
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
  );
}
