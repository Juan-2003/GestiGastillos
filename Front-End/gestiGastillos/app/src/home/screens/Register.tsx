import { View, TextInput, Text, StyleSheet } from "react-native";
import globalStyles from "@/styles/GlobalStyles";
import ImagePicker from "@/components/ImagePicker";
import ButtonClass from "@/components/buttons";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function Register({ navigation }: Props) {
  return (
    <View style={globalStyles.container}>
      <View style={styles.topContainer}>
        <ImagePicker />
      </View>
      <View style={styles.middleContainer}>

        <View style={globalStyles.inputTextContainer}>
          <View style={globalStyles.textContainer}>
            <Text style={styles.text}>Nombre</Text>
          </View>

          <TextInput
            style={globalStyles.textInput}
          />
        </View>

        <View style={styles.buttonContainer}>
          <ButtonClass
            text="Crear Perfil"
            onPressNavigation={() => navigation.navigate("DrawerNavigation")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 3.5,
    alignItems: "center",
    justifyContent: "center",
  },
  middleContainer: {
    flex: 2.5,
    //backgroundColor: "red",
  },
  buttonContainer: {
    alignItems: "center",
    paddingTop: 30
    //backgroundColor: "green",
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
