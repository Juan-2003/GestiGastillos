import { StyleSheet, Text, View, Pressable, SafeAreaView } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { DrawerActions, NavigationContainer, useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
}

export default function TopBar({ title }: Props) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemContainer}>
        <Pressable style={styles.iconContainer} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <MaterialCommunityIcons name="menu" size={50} color="white" />
        </Pressable>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.65,
    backgroundColor: "rgba(98, 21, 21, 0.95)",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    //backgroundColor: 'purple'
  },
  title: {
    flex: 1,
    paddingRight: 65,
    textAlign: 'center',
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    //backgroundColor: 'red'
  },
  iconContainer: {
    paddingHorizontal: 10,
    //backgroundColor: 'green'
  },
});