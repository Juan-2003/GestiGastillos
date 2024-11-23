import React from "react";
import { Text, Dimensions, StyleSheet, View } from "react-native";
import globalStyles from "@/styles/GlobalStyles";
import { BarChart } from "react-native-gifted-charts";

export default function BarChartComponent() {

    const data = [
        { value: 2500, label: 'Enero', frontColor: '#0ED418FF' },
        { value: 2400, frontColor: '#F11818FF' },
        { value: 3500, label: 'Febrero', frontColor: '#0ED418FF' },
        { value: 3000, frontColor: '#F11818FF' },
        { value: 4500, label: 'Marzo', frontColor: '#0ED418FF' },
        { value: 4000, frontColor: '#F11818FF' },
        { value: 4500, label: 'Abril', frontColor: '#0ED418FF' },
        { value: 4000, frontColor: '#F11818FF' },
        { value: 4500, label: 'Mayo', frontColor: '#0ED418FF' },
        { value: 4000, frontColor: '#F11818FF' },
        { value: 4500, label: 'Junio', frontColor: '#0ED418FF' },
        { value: 4000, frontColor: '#F11818FF' },
        { value: 4500, label: 'Julio', frontColor: '#0ED418FF' },
        { value: 4000, frontColor: '#F11818FF' },
        { value: 4500, label: 'Agosto', frontColor: '#0ED418FF' },
        { value: 4000, frontColor: '#F11818FF' },
        { value: 4500, label: 'Septiembre', frontColor: '#0ED418FF' },
        { value: 4000, frontColor: '#F11818FF' },
        { value: 4500, label: 'Octubre', frontColor: '#0ED418FF' },
        { value: 4000, frontColor: '#F11818FF' },
        { value: 4500, label: 'Noviembre', frontColor: '#0ED418FF' },
        { value: 4000, frontColor: '#F11818FF' },
        { value: 4500, label: 'Diciembre', frontColor: '#0ED418FF' },
        { value: 4000, frontColor: '#F11818FF' },
    ];

    return (
            <View style={styles.graphContainer}>
                <Text style={globalStyles.title}>Tu balance</Text>
                <View style={{ padding: 20, alignItems: 'center'}}>
                    <BarChart
                        data={data}
                        barWidth={16}
                        initialSpacing={10}
                        spacing={14}
                        barBorderRadius={4}
                        yAxisThickness={0}
                        xAxisType={'dashed'}
                        xAxisColor={'#27C1F9'}
                        yAxisTextStyle={{ color: '#4f4f4f' }}
                        stepValue={1000}
                        maxValue={6000}
                        noOfSections={6}
                        yAxisLabelTexts={['0', '1k', '2k', '3k', '4k', '5k', '6k']}
                        labelWidth={40}
                        xAxisLabelTextStyle={{ color: '#4f4f4f', textAlign: 'center' }}
                    />
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    graphContainer: {
        width: '95%',
        marginVertical: 20,
        elevation: 3,
        backgroundColor: '#f4f4f4'
    },
})