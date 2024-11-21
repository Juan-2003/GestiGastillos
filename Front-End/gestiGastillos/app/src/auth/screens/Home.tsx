import React from 'react';
import { View, StyleSheet, Image, Dimensions, Text, ScrollView } from "react-native";
import globalStyles from "@/styles/GlobalStyles";
import TopBar from "@/components/topBar";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import { BarChart } from "react-native-chart-kit";

export default function Home() {
  const screenWidth = Dimensions.get('window').width; // Obtener el ancho de la pantalla

  const data1 = [
    { x: 'Ene', y: 500 },
    { x: 'Feb', y: 1000 },
    { x: 'Mar', y: 2000 },
    { x: 'Abr', y: 8000 },
    { x: 'May', y: 2000 },
    { x: 'Jun', y: 3000 },
  ];
  const data2 = [
    { x: 'Ene', y: 300 },
    { x: 'Feb', y: 800 },
    { x: 'Mar', y: 1500 },
    { x: 'Abr', y: 5000 },
    { x: 'May', y: 1500 },
    { x: 'Jun', y: 2000 },
  ];

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
