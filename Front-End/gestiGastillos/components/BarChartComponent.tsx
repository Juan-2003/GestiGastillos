import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import BarChartTitle from "./BarChartTitle";
import { handleFetchEstadistic } from "@/app/src/auth/api/estadisticsService";
import { useMyContext } from "@/app/contextProvider";
import { useFocusEffect } from "@react-navigation/native";

// El tipo para cada barra en el gráfico
interface barDataItem {
  value: number;
  label: string;
  frontColor: string;
  spacing?: number;
  labelWidth?: number;
  labelTextStyle?: { color: string };
}

export default function BarChartComponent() {
  const [item, setItem] = useState<barDataItem[]>([]);
  const { userId: user_id } = useMyContext();

  // Función para obtener los datos del backend
  useFocusEffect(
    React.useCallback(() => {
      console.log("useFocusEffect ejecutado, obteniendo datos...");
      const fetchData = async () => {
        try {
          const data = await handleFetchEstadistic({ user_id });
          console.log("Estadísticas obtenidas:", data);

          // Transformar los datos a un formato compatible con el BarChart
          const barData = data
            .map((monthData) => {
              const { month, transactionListResponseDTO } = monthData;
              const { income_sum, expense_sum } = transactionListResponseDTO;

              return [
                {
                  value: income_sum,
                  label: month,
                  frontColor: "rgba(39, 193, 249, 0.5)", // Color para los ingresos
                  spacing: 1,
                  labelWidth: 40,
                  labelTextStyle: { color: "gray" },
                },
                {
                  value: expense_sum,
                  frontColor: "rgba(39, 193, 249, 1)", // Color para los egresos
                },
              ];
            })
            .flat(); // `.flat()` aplana la estructura para que tengamos un solo arreglo

          console.log("BarData transformado:", barData);
          setItem(barData); // Aquí guardamos los datos transformados en el estado
        } catch (error) {
          console.error("Error al obtener las estadísticas:", error);
        }
      };

      fetchData(); // Llamamos la función para obtener los datos
    }, [user_id]) // Dependencia para refrescar cada vez que el user_id cambie
  );

  return (
    <View style={styles.graphContainer}>
      <BarChartTitle />
      <View style={styles.graph}>
        <BarChart
          data={item} // Usamos el estado 'item' que contiene los datos transformados
          barWidth={22}
          noOfSections={6}
          xAxisThickness={0}
          yAxisThickness={0}
          initialSpacing={10}
          spacing={14}
          dashGap={6}
          rulesColor={"#AEE8FD"}
          yAxisLabelPrefix="$"
          yAxisLabelTexts={["0", "4k", "8k", "12k", "16k", "20k", "24k"]}
          yAxisTextStyle={{ color: "grey" }}
          stepValue={4000}
          isAnimated
          renderTooltip={(item: any) => {
            return (
              <View
                style={{
                  marginLeft: -12,
                  position: "absolute",
                  bottom: -55,
                  backgroundColor: "#F8F8F8F4",
                  elevation: 2,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 2,
                }}
              >
                <Text style={{ color: "grey" }}>{item.value}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  graphContainer: {
    width: "100%",
    marginVertical: 20,
    paddingVertical: 20,
  },
  graph: {
    marginHorizontal: 6,
    marginVertical: 5,
  },
});
