import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
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
import { useMyContext } from "@/app/contextProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import MainEmojiComponent from "@/components/MainEmojiComponent";

interface Props {
  type: string;
}

export default function Home({ type }: Props) {
  const [item, setItem] = useState<MovementItem[]>([]);
  const { userName, userId } = useMyContext(); // Accede al userName desde el contexto
  const [loading, setLoading] = useState(true);

  const loadIncomeExpenses = async () => {
    try {
      setLoading(true);
      const data = await handleFetchIncomeExpense();
      console.log("Data from API:", data); // Verifica lo que se recibe
      setItem(data);
    } catch (error) {
      console.error("Error al cargar los planes de ahorro:", error);
    } finally {
      setLoading(false);
    }
  };
  const createPDF = async () => {
    console.log("hola: ", item);
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
  useFocusEffect(
    useCallback(() => {
      loadIncomeExpenses();
    }, [])
  );

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert("Éxito", "Caché limpiado con éxito.");
    } catch (error) {
      console.error("Error al limpiar AsyncStorage:", error);
      Alert.alert("Error", "Hubo un problema al limpiar el caché.");
    }
  };

  return (
    <View style={globalStyles.container}>
      <TopBar title={`¡Hola ${userName || "Usuario"}!`} />
      <View style={globalStylesMenu.container}>
        <ScrollView style={homeStyles.scrollViewContainer}>
          <View style={homeStyles.container}>
            <MainEmojiComponent />

            <BarChartComponent />

            <TransactionComponent type={"egreso"} />

            <TouchableOpacity
              style={homeStyles.buttonContainer}
              onPress={createPDF}
            >
              <Text style={homeStyles.text}>Generar reporte</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 10 }}>
              <Button title="Limpiar Caché" onPress={clearAsyncStorage} />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
