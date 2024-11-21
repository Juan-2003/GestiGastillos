import React from 'react';
import { View, StyleSheet, Image, Dimensions, Text, ScrollView, Alert, Button } from "react-native";
import globalStyles from "@/styles/GlobalStyles";
import TopBar from "@/components/topBar";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import { BarChart } from "react-native-chart-kit";

export default function Home() {
  const screenWidth = Dimensions.get('window').width; // Obtener el ancho de la pantalla

  const createPDF = async () => {
    try {
      const options = {
        html: `
          <h1 style="text-align: center; color: blue;">Mi primer PDF</h1>
          <p>Generado desde Expo con EAS Build</p>
        `,
        fileName: 'mi_primer_pdf',
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);

      Alert.alert('PDF generado', `Guardado en: ${file.filePath}`);
      console.log('PDF generado en:', file.filePath);
    } catch (error) {
      console.error('Error generando el PDF:', error);
    }
  };


  return (
    <View style={globalStyles.container}>
      <TopBar title="¡Hola, Usuario!" />
      <View style={globalStylesMenu.container}>
        <ScrollView style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require("@/assets/images/smilingIcon.png")}
              style={styles.image}
            />
          </View>
          <Text style={globalStyles.title}>Tu balance</Text>
          <BarChart
            data={{
              labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
              datasets: [
                {
                  data: [500, 1000, 2000, 8000, 2000, 3000],
                  color: (opacity = 1) => `rgba(39, 193, 249, ${opacity})`, // Barra 1
                },
                {
                  data: [300, 800, 1500, 5000, 1500, 2000],
                  color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Barra 2
                },
              ],
            }}
            width={screenWidth - 20}
            height={250}
            yAxisLabel="$"
            yAxisSuffix=""
            chartConfig={{
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(39, 193, 249, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={styles.graphContainer}

          />

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Generar PDF" onPress={createPDF} />
          </View>

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  graphContainer: {
    flex: 0.5,
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
});
