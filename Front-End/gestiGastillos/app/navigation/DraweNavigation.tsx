import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar, Image } from "react-native";
import { useEffect } from "react";
import Home from "../src/home/screens/Home";
import Card from "../src/auth/screens/Card";
import IncomeExpenses from "../src/auth/screens/IncomeExpenses";
import Reminder from "../src/auth/screens/Reminder";
import SavingPlans from "../src/auth/screens/SavingPlans";
import globalStyles from "@/styles/GlobalStyles";
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
        drawerStyle: {
          backgroundColor: "#27C1F9",
        },
        drawerItemStyle: {
          marginVertical: 10,
        },
        drawerLabelStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "#FFFFFFE7",
      }}
    >
      <Drawer.Screen
        name="Menú"
        component={Home}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Image
              source={require("@/assets/images/homeIcon.png")}
              style={globalStyles.iconImage}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Tarjetas"
        component={Card}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Image
              source={require("@/assets/images/cardIcon.png")}
              style={globalStyles.iconImage}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Ingresos/Gastos"
        component={IncomeExpenses}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Image
              source={require("@/assets/images/cashIcon.png")}
              style={globalStyles.iconImage}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Recordatorios"
        component={Reminder}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Image
              source={require("@/assets/images/bellIcon.png")}
              style={globalStyles.iconImage}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Planes de Ahorro"
        component={SavingPlans}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Image
              source={require("@/assets/images/piggyBankIcon.png")}
              style={globalStyles.iconImage}
            />
          )
        }}
      />
    </Drawer.Navigator>
  );
}
