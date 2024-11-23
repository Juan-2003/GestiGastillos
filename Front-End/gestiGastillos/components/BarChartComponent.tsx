import React from "react";
import { Text, Dimensions, StyleSheet, View } from "react-native";
import globalStyles from "@/styles/GlobalStyles";
import { BarChart } from "react-native-gifted-charts";

export default function BarChartComponent() {
  const data = [
    {
      value: 2500,
      label: "Enero",
      frontColor: "rgba(39, 193, 249, 0.5)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 2400, frontColor: "rgba(39, 193, 249, 1)" },
    {
      value: 3500,
      label: "Febrero",
      frontColor: "rgba(0, 180, 0, 0.9)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 3000, frontColor: "rgba(255, 50, 50, 0.9)" },
    {
      value: 4500,
      label: "Marzo",
      frontColor: "rgba(0, 180, 0, 0.9)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(255, 50, 50, 0.9)" },
    {
      value: 4500,
      label: "Abril",
      frontColor: "rgba(0, 180, 0, 0.9)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(255, 50, 50, 0.9)" },
    {
      value: 4500,
      label: "Mayo",
      frontColor: "rgba(0, 180, 0, 0.9)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(255, 50, 50, 0.9)" },
    {
      value: 4500,
      label: "Junio",
      frontColor: "rgba(0, 180, 0, 0.9)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(255, 50, 50, 0.9)" },
    {
      value: 4500,
      label: "Julio",
      frontColor: "rgba(0, 180, 0, 0.9)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(255, 50, 50, 0.9)" },
    {
      value: 4500,
      label: "Agosto",
      frontColor: "rgba(0, 180, 0, 0.9)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(255, 50, 50, 0.9)" },
    {
      value: 4500,
      label: "Septiembre",
      frontColor: "rgba(0, 180, 0, 0.9)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(255, 50, 50, 0.9)" },
    {
      value: 4500,
      label: "Octubre",
      frontColor: "rgba(0, 180, 0, 0.9)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(255, 50, 50, 0.9)" },
    {
      value: 4500,
      label: "Noviembre",
      frontColor: "rgba(0, 180, 0, 0.9)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(255, 50, 50, 0.9)" },
    {
      value: 4500,
      label: "Diciembre",
      frontColor: "rgba(0, 180, 0, 0.9)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(255, 50, 50, 0.9)" },
  ];

  const renderTitle = () => {
    return (
      <>
        <Text style={globalStyles.title}>Tu balance</Text>
        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionIconTextContainer}>
            <View style={styles.descriptionIconIncomes} />
            <Text>Ingresos</Text>
          </View>
          <View style={styles.descriptionIconTextContainer}>
            <View style={styles.descriptionIconExpenses} />
            <Text>Gastos</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.graphContainer}>
      {renderTitle()}
      <View style={styles.graph}>
        <BarChart
          data={data}
          barWidth={22}
          noOfSections={6}
          xAxisThickness={0}
          yAxisThickness={0}
          // Estilo de la barra
          initialSpacing={10}
          spacing={14}
          dashGap={6}
          rulesColor={"#AEE8FD"}
          yAxisLabelPrefix="$"
          yAxisLabelTexts={["0", "2k", "4k", "6k", "7k", "8k", "10k"]}
          yAxisTextStyle={{ color: "grey" }}
          stepValue={2000}
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
  titleContainer: {
    backgroundColor: "red",
  },
  descriptionContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 24,
  },
  descriptionIconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  descriptionIconIncomes: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "rgba(39, 193, 249, 0.5)",
    marginRight: 8,
  },
  descriptionIconExpenses: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "rgba(39, 193, 249, 1)",
    marginRight: 8,
  },
});
