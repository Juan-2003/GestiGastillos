import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import ButtonClass from "../../../../components/buttons";
import globalStyles from "@/styles/GlobalStyles";
import { StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useMyContext } from "@/app/contextProvider";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function Welcome({ navigation }: Props) {
  const { userName, userId: user_id, isRegistered } = useMyContext(); // Accede al userName desde el contexto

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.imageContainer}>
        <Image
          source={require("@/assets/images/Logo2.png")}
          style={globalStyles.image} // Ajusta el tamaño según sea necesario
        />
      </View>

      <View style={styles.buttonContainer}>
        <ButtonClass
          text={isRegistered ? "ENTRAR" : "REGISTRO"}
          onPressNavigation={
            isRegistered
              ? () => navigation.navigate("Home")
              : () => navigation.navigate("Register")
          }
        />
        <Pressable style={globalStyles.button}>
          <Text style={globalStyles.text}>SALIR</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 25,
  },
});
