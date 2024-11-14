import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "./src/home/screens/Welcome";
import Register from "./src/home/screens/Register";
import DrawerNavigation from "./navigation/DraweNavigation";
import Cardform from "./forms/cardForm";
import ReminderForm from "./forms/ReminderForm";
import SavingPlansForm from "./forms/SavingPlansForm";
import { useEffect } from "react";
import Card from "./src/auth/screens/Card";
import EditReminderScreen from "./updateForms/EditReminderScreen";
import IncomeExpenseForm from "./forms/IncomeExpenseForm";
import EditSavingPlans from "./updateForms/EditSavingPlans";
import IncomeExpenses from "./src/auth/screens/IncomeExpenses";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  ReminderList: undefined;
  EditReminderScreen: {
    id: number;
    name: string;
    message: string;
    date: string;
  };
  SavingPlansList: undefined;
  EditSavingPlans: {
    saving_id: number;
    name: string;
    target_amount: number;
    status: string;
    debit_card_id: number;
  };
};

const StackParam = createStackNavigator<RootStackParamList>();
export default function Index() {
  useEffect(() => {
    StatusBar.setBackgroundColor("black");
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Home"
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
          name="Income/Expense"
          component={IncomeExpenses}
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

        <StackParam.Screen
          name="EditReminderScreen"
          component={EditReminderScreen}
          options={{ headerShown: false }}
        />

        <StackParam.Screen
          name="EditSavingPlans"
          component={EditSavingPlans}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}
