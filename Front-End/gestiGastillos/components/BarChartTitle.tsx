import globalStyles from "@/styles/GlobalStyles";
import React from "react"
import { View, Text, StyleSheet } from "react-native";

export default function BarCharTitle() {
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
}

const styles = StyleSheet.create({
    titleContainer: {
        backgroundColor: "red",
    },
    descriptionContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 12,
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
})