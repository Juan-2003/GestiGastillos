import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import BarChartTitle from "./BarChartTitle";

export default function BarChartComponent() {

  
  
  const data = [
    {
      value: 10000,
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
      frontColor: "rgba(39, 193, 249, 0.5)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 3000, frontColor: "rgba(39, 193, 249, 1)" },
    {
      value: 4500,
      label: "Marzo",
      frontColor: "rgba(39, 193, 249, 0.5)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(39, 193, 249, 1)" },
    {
      value: 4500,
      label: "Abril",
      frontColor: "rgba(39, 193, 249, 0.5)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(39, 193, 249, 1)" },
    {
      value: 4500,
      label: "Mayo",
      frontColor: "rgba(39, 193, 249, 0.5)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(39, 193, 249, 1)" },
    {
      value: 4500,
      label: "Junio",
      frontColor: "rgba(39, 193, 249, 0.5)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(39, 193, 249, 1)" },
    {
      value: 4500,
      label: "Julio",
      frontColor: "rgba(39, 193, 249, 0.5)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(39, 193, 249, 1)" },
    {
      value: 4500,
      label: "Agosto",
      frontColor: "rgba(39, 193, 249, 0.5)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(39, 193, 249, 1)" },
    {
      value: 4500,
      label: "Septiembre",
      frontColor: "rgba(39, 193, 249, 0.5)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(39, 193, 249, 1)" },
    {
      value: 4500,
      label: "Octubre",
      frontColor: "rgba(39, 193, 249, 0.5)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(39, 193, 249, 1)" },
    {
      value: 4500,
      label: "Noviembre",
      frontColor: "rgba(39, 193, 249, 0.5)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(39, 193, 249, 1)" },
    {
      value: 4500,
      label: "Diciembre",
      frontColor: "rgba(39, 193, 249, 0.5)",
      spacing: 1,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
    },
    { value: 4000, frontColor: "rgba(39, 193, 249, 1)" },
  ];

  return (
    <View style={styles.graphContainer}>
      <BarChartTitle />
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
          isAnimated
          // Funcion para mostrar el valor
          renderTooltip={(item: any) => {
            return (
              <View
                style={{
                  marginLeft: -12,
                  position: 'absolute',
                  bottom: -55,
                  backgroundColor: '#F8F8F8F4',
                  elevation: 2,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 2,
                }}>
                <Text style={{color: 'grey'}}>{item.value}</Text>
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
