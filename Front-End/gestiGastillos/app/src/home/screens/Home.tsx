import globalStyles from "@/styles/GlobalStyles";
import { View, Text, StyleSheet } from "react-native";
import TopBar from "@/components/topBar";
import globalStylesMenu from "@/styles/GlobalStylesMenu";

export default function Home() {
  
  return (
    <View style={globalStyles.container}>
      <TopBar title="MENU"/>
      <View style={globalStylesMenu.container}>
        <View style={globalStylesMenu.containerMiddle}></View>
        <View style={globalStylesMenu.containerBottom}></View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
});
