import React from "react";
import { Text, Dimensions, StyleSheet } from "react-native";
import globalStyles from "@/styles/GlobalStyles";
import BarChart from "react-native-chart-kit/dist/BarChart";

export default function BarChartComponent() {
    const screenWidth = Dimensions.get('window').width; // Obtener el ancho de la pantalla

    return (
        <>
            <Text style={globalStyles.title}>Tu balance</Text>
            <BarChart
                data={{
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                    datasets: [
                        {
                            data: [10000, 13000, 12000, 10500, 11000, 10000],
                        },
                        {
                            data: [300, 800, 1500, 5000, 1500, 2000],
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
                    barPercentage: 0.5,
                    color: (opacity = 1) => `rgba(39, 193, 249, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                style={styles.graphContainer}
                fromZero
                verticalLabelRotation={20}
            />
        </>
    );
}

const styles = StyleSheet.create({
    graphContainer: {
        flex: 0.5,
        marginRight: 10,
        marginVertical: 20,
    },
})