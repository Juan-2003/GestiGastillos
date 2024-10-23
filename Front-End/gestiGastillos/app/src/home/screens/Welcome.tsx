import { View, Text, Pressable, Button, Image } from "react-native";
import ButtonClass from "../../../../components/buttons";
import globalStyles from "@/styles/GlobalStyles";
import { StyleSheet } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack'

interface Props {
    navigation: StackNavigationProp<any>
}

export default function Welcome({navigation}:Props) {
  return (
    <View style={globalStyles.container}>

      <View style={globalStyles.imageContainer}>
        <Image
          source={require("@/assets/images/Logo.png")}
          style={globalStyles.image} // Ajusta el tamaño según sea necesario
        />
      </View>

      <View style={styles.buttonContainer}>

        <ButtonClass text="Registro" onPressNavigation={() => navigation.navigate('Register')} />

        <Pressable style={globalStyles.button}>
          <Text style={globalStyles.text}>Salir</Text>
        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 25,
    //backgroundColor: "green",
  },
  
});
