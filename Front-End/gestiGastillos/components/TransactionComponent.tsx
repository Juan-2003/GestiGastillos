import globalStyles from "@/styles/GlobalStyles";
import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function TransactionComponent() {
    return (
        <>
            <Text style={globalStyles.title}>Tus movimientos recientes</Text>
            <View style={styles.expensesMainContainer}>
                <View style={styles.expensesContainer}>
                    <View style={styles.itemContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Item 1</Text>
                        </View>
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Item 1</Text>
                        </View>
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Item 1</Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    expensesMainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 50,
    },
    expensesContainer: {
        height: 150,
        width: 280,
        backgroundColor: "#4FCFFD",
        borderRadius: 3,
        elevation: 8,
        borderWidth: 1,
        borderColor: "#25ADDFFF"
    },
    itemContainer: {
        flex: 0.333,
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBlockColor: '#19B5EEFF'
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: "white",
        fontWeight: 'semibold',
        fontSize: 25,
        textAlign: 'center'
      },
})