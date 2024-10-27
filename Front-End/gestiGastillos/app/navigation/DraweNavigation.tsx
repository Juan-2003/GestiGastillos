import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "react-native";
import { useEffect } from "react";
import Home from "../src/home/screens/Home";
import Card from "../src/auth/screens/Card";
import IncomeExpenses from "../src/auth/screens/IncomeExpenses";
import Reminder from "../src/auth/screens/Reminder";
import SavingPlans from "../src/auth/screens/SavingPlans";
const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  useEffect(() => {
    StatusBar.setBackgroundColor('black');
    StatusBar.setBarStyle('light-content');
  }, []);
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          backgroundColor: "#6B0D0DFF",
        },
        drawerItemStyle: {
          marginVertical: 10,
        },
        drawerActiveTintColor: "white", // Color del texto y de los íconos para el item activo
        drawerInactiveTintColor: "#FFFFFFE7",

      }}
    >
      <Drawer.Screen
        name="Menú"
        component={Home}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Tarjetas"
        component={Card}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Ingresos/Gastos"
        component={IncomeExpenses}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Recordatorios"
        component={Reminder}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Planes de Ahorro"
        component={SavingPlans}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}
