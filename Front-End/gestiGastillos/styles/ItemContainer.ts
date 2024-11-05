import { StyleSheet } from "react-native"

const itemContainerStyle = StyleSheet.create({
    dataContainer: {
        backgroundColor: "#27C1F9",
        paddingVertical: 12,
        paddingHorizontal: 4,
        flexDirection: "row",
        borderRadius: 10,
        overflow: 'hidden',
        // Sombras en iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Sombras en Android
        elevation: 5,
        marginVertical: 6,
        marginHorizontal: 8,
        borderWidth: 1,
        borderColor: "#1E91BB"
    },
    detailContainer: {
        flexDirection: 'column',
        padding: 8,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: "rgba(39, 193, 249, 0.95)",
        elevation: 5,
        borderWidth: 1,
        borderColor: "rgba(30, 145, 187, 0.95)"
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
    },
    textDetailContainer: {
        margin: 8,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    iconsContainer: {
        flex: 0.5,
        flexDirection: "row",
        alignItems: 'center',
    },
    depositExpenseContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        height: 26,
        width: 26,
        resizeMode: 'contain',
    },
    detailText: {
        fontSize: 12,
        fontWeight: 'semibold',
        color: "#FFFFFF",
        marginBottom: 4,
    },
})

export default itemContainerStyle;