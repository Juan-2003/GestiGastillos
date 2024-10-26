import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../src/home/screens/Home";
import Card from "../src/auth/screens/Card";
import IncomeExpenses from "../src/auth/screens/IncomeExpenses";
import Reminder from "../src/auth/screens/Reminder";
import SavingPlans from "../src/auth/screens/SavingPlans";
import { StatusBar } from "react-native";
const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: true,
            drawerStyle:{
              backgroundColor: "#881818",

              
            },
            drawerItemStyle: {
              marginVertical: 10, 
            },
            drawerActiveTintColor: "white", // Color del texto y de los íconos para el item activo
            drawerInactiveTintColor: "#808080",
          
          }}
        >
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Card"
            component={Card}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Ingresos/Egresos"
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
    </>
  );
}
