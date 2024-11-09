import TopBar from "@/components/topBar";
import globalStyles from "@/styles/GlobalStyles";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import ButtonClass from "@/components/buttons";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import ReminderItem from "@/components/ReminderItem";
import cards from "@/json/cards.json";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function Reminder({ navigation }: Props) {
  return (
    <View style={globalStyles.container}>
      <TopBar title="RECORDATORIOS" />
      <View style={globalStylesMenu.container}>
        <View style={globalStylesMenu.containerMiddle}>
          <ReminderItem />
        </View>
        <View style={globalStylesMenu.containerBottom}>
          <ButtonClass
            text="Agregar Recordatorio"
            onPressNavigation={() => navigation.navigate("ReminderForm")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
