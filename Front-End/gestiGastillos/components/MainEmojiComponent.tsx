import { useMyContext } from "@/app/contextProvider";
import { handleFetchEstadistic } from "@/app/src/auth/api/estadisticsService";
import homeStyles from "@/styles/HomeStyles";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Image } from "react-native";
import { barDataItem } from "react-native-gifted-charts";

export default function MainEmojiComponent() {
  const [statusImage, setStatusImage] = useState<string>("neutral"); // Estado para manejar la imagen
  const { userId: user_id } = useMyContext();

  // Mapear las imágenes con claves
  const imageMap: { [key: string]: any } = {
    positive: require("@/assets/images/EXCELENTSAVING.png"), // Imagen cuando el balance es positivo
    negative: require("@/assets/images/POORSAVING.png"), // Imagen cuando el balance es negativo
    neutral: require("@/assets/images/GOODSAVING.png"), // Imagen cuando el balance es cero
  };

  // Función para obtener los datos del backend
  useFocusEffect(
    React.useCallback(() => {
      console.log("useFocusEffect ejecutado, obteniendo datos...");
      const fetchData = async () => {
        try {
          const data = await handleFetchEstadistic({ user_id });
          console.log("Estadísticas obtenidas dentro del emoji:", data);

          const currentMonthName = new Date()
            .toLocaleString("default", { month: "long" })
            .toUpperCase(); // Obtiene el mes actual
          console.log(currentMonthName);

          const currentMonthData = data.find(
            (monthData: any) => monthData.month === currentMonthName
          );

          if (currentMonthData) {
            const { total_sum } = currentMonthData.transactionListResponseDTO;

            // Lógica para decidir qué imagen mostrar
            if (total_sum > 0) {
              setStatusImage("positive"); // Imagen positiva: más ingresos que gastos
            } else if (total_sum < 0) {
              setStatusImage("negative"); // Imagen negativa: más gastos que ingresos
            } else {
              setStatusImage("neutral"); // Imagen neutral: ingresos igual a gastos
            }
          }
        } catch (error) {
          console.error("Error al obtener las estadísticas:", error);
        }
      };

      fetchData(); // Llamamos a la función para obtener los datos
    }, [user_id]) // Dependencia para refrescar cada vez que el user_id cambie
  );

  return (
    <View style={homeStyles.imageContainer}>
      <Image source={imageMap[statusImage]} style={homeStyles.image} />
    </View>
  );
}
