import { useState, useEffect, useCallback } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import ReminderItem from "@/components/ReminderItem";
import globalStyles from "@/styles/GlobalStyles";
import { ip } from "../IP/Ip";
import TopBar from "@/components/topBar";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import ButtonClass from "@/components/buttons";
import { StackNavigationProp } from "@react-navigation/stack";
import { fetchReminders } from "../api/reminderServices";
import { useFocusEffect } from "expo-router";
interface Props {
  navigation: StackNavigationProp<any>;
}

export default function Reminder({ navigation }: Props) {
  const [reminders, setReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReminders = async () => {
    try {
      setLoading(true);
      const data = await fetchReminders();
      setReminders(data);
    } catch (error) {
      console.error("Error al cargar los recordatorios:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteReminder = (id: number) => {
    setReminders((prevReminders) => prevReminders.filter(reminder => reminder.reminder_id !== id));
  };
  // useFocusEffect vuelve a ejecutar loadReminders cada vez que la pantalla está en foco
  useFocusEffect(
    useCallback(() => {
      loadReminders();
    }, [])
  );

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.reminderContainer}>
      <ReminderItem
        key={item.reminder_id}
        id={item.reminder_id} 
        date={item.date}
        name={item.name}
        message={item.message}
        onDelete={handleDeleteReminder}
      />
      </View>
    );
  };

  if (loading) {
    return (

      <View style={globalStyles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
        <TopBar title="RECORDATORIOS" />
        <View style={globalStylesMenu.container}>
          <View style={globalStylesMenu.containerMiddle}>
            <FlatList
              data={reminders}
              renderItem={renderItem}
              keyExtractor={(item) => item.reminder_id.toString()}
            />
        <View style={globalStylesMenu.containerBottom}>
          <ButtonClass
            text="Agregar Recordatorio"
            onPressNavigation={() => navigation.navigate("ReminderForm")}
          />
        </View>
          </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  reminderContainer:{
    marginTop:30,
    marginBottom:10,
  }
});
