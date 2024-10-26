import ButtonClass from "@/components/buttons";
import { View, StyleSheet, Text } from "react-native";
import ContextContainer from "./ContextContainer";

export default function DepositList (){
    return (
        <View style={styles.incomeContainer}>
              <View style={styles.flatListContainer}>
                <ContextContainer text="Quincena"/>
                <ContextContainer text="Tanda"/>
              </View>
              <View style={styles.containerBottom}>
                <ButtonClass text="INGRESO" />
              </View>
            </View>
    );
}

const styles = StyleSheet.create({
    flatListContainer: {
      flex: 2,
    },
    containerBottom: {
      flex: 0.2,
      paddingTop: 10,
      paddingBottom: 5,
      alignItems: "center",
    },
    incomeContainer: {
      flex: 1,
      borderRightWidth: 1,
    },
  });