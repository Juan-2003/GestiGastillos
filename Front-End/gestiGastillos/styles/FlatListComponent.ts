import { StyleSheet } from "react-native";

const flatListComponent = StyleSheet.create({
    flatListContainer: {
        flex: 1,
    },
    containerBottom: {
        flex: 0.1,
        paddingTop: 20,
        alignItems: "center",
    },
    incomeContainer: {
        flex: 1,
        borderRightWidth: 1,
        borderColor: '#27C1F9',
    },
    expenseContainer: {
        flex: 1,
        borderLeftWidth: 1,
        borderColor: '#27C1F9'
    },
    emptyMessage: {
        fontSize: 20,
        color: "#F80000FF",
        textAlign: 'center',
        marginVertical: 230,
    },
});

export default flatListComponent;