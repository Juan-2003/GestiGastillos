import React, { useEffect, useState } from "react";
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import globalStyles from "@/styles/GlobalStyles";
import TopBar from "@/components/topBar";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import BarChartComponent from "@/components/BarChartComponent";
import TransactionComponent from "@/components/TransactionComponent";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import {
  handleFetchIncomeExpense,
  MovementItem,
} from "../api/IncomeExpensesServices";
import {
  calculateTotals,
  generateHTMLReport,
} from "../api/utils/IncomeExpensesUtils";
import homeStyles from "@/styles/HomeStyles";

interface Props {
  type: string;
}

export default function Home({ type }: Props) {
  const [item, setItem] = useState<MovementItem[]>([]);
  console.log(type);

  // Funcion para obtener los datos del backEnd
  useEffect(() => {
    const fetchData = async () => {
      const data = await handleFetchIncomeExpense();
      console.log(data);
      const combinedItems: MovementItem[] = [
        ...(data.incomes?.map((item: any) => ({ ...item, type: "ingreso" })) ||
          []),
        ...(data.expenses?.map((item: any) => ({ ...item, type: "egreso" })) ||
          []),
      ];
      console.log("Items combinados:", combinedItems);

      setItem(combinedItems);
      console.log("Items filtrados:", combinedItems);
    };
    fetchData();
  }, [type]);

  const createPDF = async () => {
    const htmlContent = generateHTMLReport(item, calculateTotals);

    // Generar el archivo PDF
    const file = await printToFileAsync({
      html: htmlContent,
      base64: false,
    });

    // Compartir el PDF
    await shareAsync(file.uri);
    console.log("PDF generado con éxito");
  };

  return (
    <View style={globalStyles.container}>
      <TopBar title="¡Hola, Usuario!" />
      <View style={globalStylesMenu.container}>
        <ScrollView style={homeStyles.scrollViewContainer}>
          <View style={homeStyles.container}>
            <View style={homeStyles.imageContainer}>
              <Image
                source={require("@/assets/images/smilingIcon.png")}
                style={homeStyles.image}
              />
            </View>

            <BarChartComponent />

            <TransactionComponent />

            <TouchableOpacity
              style={homeStyles.buttonContainer}
              onPress={createPDF}
            >
              <Text style={homeStyles.text}>Generar reporte</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
