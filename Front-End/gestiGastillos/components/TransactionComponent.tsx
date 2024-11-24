import globalStyles from "@/styles/GlobalStyles";
import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useFocusEffect } from "@react-navigation/native";
import { handleFetchIncomeExpense, MovementItem } from "@/app/src/auth/api/IncomeExpensesServices";

interface Props {
    type: string;
}

export default function TransactionComponent({ type }: Props) {
    const [item, setItem] = useState<MovementItem[]>([]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                const data = await handleFetchIncomeExpense();

                const combinedItems: MovementItem[] = [
                    ...(data.incomes?.map((item) => ({ ...item, type: "ingreso" })) || []),
                    ...(data.expenses?.map((item) => ({ ...item, type: "egreso" })) || []),
                ];

                // Filtrar los items según el tipo de prop recibido
                const filteredItems = combinedItems.filter((item) => item.type === "egreso" && item.amount >= 1000);

                // Solo actualiza el estado si los datos han cambiado
                setItem((prevItems) => {
                    // Si los datos son iguales, no se hace nada
                    if (JSON.stringify(prevItems) !== JSON.stringify(filteredItems)) {
                        return filteredItems;
                    }
                    return prevItems;
                });
            };

            fetchData();
        }, [type]) // Ahora 'type' es una dependencia, se ejecutará cada vez que 'type' cambie
    );

    return (
        <>
            <Text style={globalStyles.title}>Tus gastos mas caros</Text>
            <View style={styles.expensesMainContainer}>
                <View style={styles.expensesContainer}>
                    <View style={styles.itemContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}></Text>
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
        flexDirection: 'row',
        justifyContent: 'space-evenly',
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