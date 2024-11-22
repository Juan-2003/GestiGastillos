import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import globalStyles from "@/styles/GlobalStyles";
import TopBar from "@/components/topBar";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import BarChartComponent from "@/components/BarChartComponent";
import TransactionComponent from "@/components/TransactionComponent";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

export default function Home() {
  const html = `
    <html>
      <body>
        <h1>Hola</h1>
        <p style="color: red;">Este es un PDF de prueba</p>
      </body>
    </html>
  `;
  const createPDF = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri); 
  };

  return (
    <View style={globalStyles.container}>
      <TopBar title="¡Hola, Usuario!" />
      <View style={globalStylesMenu.container}>
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={require("@/assets/images/smilingIcon.png")}
                style={styles.image}
              />
            </View>

            <BarChartComponent />

            <TransactionComponent />

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={createPDF}
            >
              <Text style={styles.text}>Generar reporte</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 60,
  },
  buttonContainer: {
    backgroundColor: "#0078FF",
    height: 50,
    width: "60%",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    // Sombras en iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Sombras en Android
    elevation: 5,
    marginVertical: 40,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#005AC0",
  },
  text: {
    color: "white",
    fontWeight: "semibold",
    fontSize: 24,
    textAlign: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
});
