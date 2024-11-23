import React, { useEffect, useState } from "react";
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
import { handleFetchIncomeExpense, MovementItem } from "../api/IncomeExpensesServices";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
  type: string;
}

export default function Home({type}:Props) {
  const [item, setItem] = useState<MovementItem[]>([]);
  console.log(type);

  useEffect(() => {
    const fetchData = async () => {
      const data = await handleFetchIncomeExpense();
      console.log(data);
      const combinedItems: MovementItem[] = [
        ...(data.incomes?.map((item: any) => ({ ...item, type: "ingreso" })) || []),
        ...(data.expenses?.map((item: any) => ({ ...item, type: "egreso" })) || []),
      ];
      console.log("Items combinados:", combinedItems);


      
      setItem(combinedItems);
      console.log("Items filtrados:", combinedItems);
    };
    fetchData();
  }, [type]);

    // Calcular totales e ingresos/egresos más altos
    const calculateTotals = () => {
      // Filtrar ingresos y egresos
      const incomes = item.filter((item) => item.type === "ingreso");
      const expenses = item.filter((item) => item.type === "egreso");
  
      // Calcular el total de ingresos
      const totalIncomes = incomes.reduce((acc, income) => acc + income.amount, 0);
  
      // Calcular el total de egresos
      const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  
      // Calcular el balance
      const balance = totalIncomes - totalExpenses;
  
      // Encontrar el ingreso más alto
      const highestIncome = incomes.reduce(
        (max, income) => (income.amount > max.amount ? income : max),
        { amount: 0, concept: "" } // Valor inicial
      );

      // Encontrar el egreso más alto
      const highestExpense = expenses.reduce(
        (max, expense) => (expense.amount > max.amount ? expense : max),
        { amount: 0, concept: "" } // Valor inicial
      );
  
      return {
        totalIncomes,
        totalExpenses,
        balance,
        highestIncome,
        highestExpense,
      };
    };
    
  const generateHTML = () => {
    // Separar ingresos y egresos
    const incomes = item.filter((item) => item.type === "ingreso");
    const expenses = item.filter((item) => item.type === "egreso");
  
    // Calcular los totales
    const {
      totalIncomes,
      totalExpenses,
      balance,
      highestIncome,
      highestExpense,
    } = calculateTotals();
  
    const modifyConcept = (concept: string) => {
      if (concept === "EDUCATION") {
        return concept.replace("EDUCATION", "Educacion");
      } else if (concept === "ENTRETAIMENT") {
        return concept.replace("ENTRETAIMENT", "Entretenimiento");
      }
      return concept;
    };
  
    // Crear filas de ingresos
    const incomeRows = incomes
      .map(
        (income) => `
      <tr>
        <td>${income.date}</td>
        <td>${income.amount}</td>
        <td>${income.concept}</td>
        <td>${modifyConcept(income.category)}</td>
      </tr>
    `
      )
      .join("");
  
    // Crear filas de egresos
    const expenseRows = expenses
      .map(
        (expense) => `
      <tr>
        <td>${expense.date}</td>
        <td>${expense.amount}</td>
        <td>${expense.concept}</td>
        <td>${modifyConcept(expense.category)}</td>
      </tr>
    `
      )
      .join("");
  
    // HTML del PDF
    return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            h1 {
              text-align: center;
              color: #0078FF;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            table, th, td {
              border: 1px solid #ddd;
            }
            th, td {
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f4f4f4;
            }
          </style>
        </head>
        <body>
          <h1>Reporte de gastos</h1>
          <h2>Ingresos</h2>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Concepto</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              ${incomeRows}
            </tbody>
          </table>
          <h2>Egresos</h2>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Concepto</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              ${expenseRows}
            </tbody>
          </table>
          
          <h2>Totales</h2>
          <table>
            <thead>
              <tr>
                <th>Total Ingresos</th>
                <th>Total Egresos</th>
                <th>Balance General</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${totalIncomes}</td>
                <td>${totalExpenses}</td>
                <td>${balance}</td>
              </tr>
            </tbody>
          </table>
          
          <h2>Mayores Movimientos</h2>
          <table>
            <thead>
              <tr>
                <th>Ingreso Más Alto</th>
                <th>Egreso Más Alto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${highestIncome.concept}-${highestIncome.amount}</td>
                <td>${highestExpense.concept}-${highestExpense.amount}</td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `;
  };

  const createPDF = async () => {
    const htmlContent = generateHTML();

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















   