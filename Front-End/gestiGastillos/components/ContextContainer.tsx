import { useState } from "react";
import { View, Text, StyleSheet, Image, LayoutAnimation } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
    item: {
        type: string;
        amount: number;
        concept: string;
        category: string;
        payment_method: string;
    };
}


export default function ContextContainer({ item }: Props) {
    const [showDetails, setShowDetails] = useState(false);

    const handlePress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowDetails(!showDetails);
    };

    return (
        <TouchableOpacity style={styles.depositExpenseContainer} onPress={handlePress} activeOpacity={1}>
            <View style={styles.dataContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.type}</Text>
                </View>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity>
                        <Image
                            source={require('@/assets/images/editIcon.png')}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require('@/assets/images/deleteIcon.png')}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {showDetails && (
                <View style={styles.detailContainer}>
                    <View style={styles.textDetailContainer}>
                        <Text style={styles.detailText}>Monto: ${item.amount}</Text>
                        <Text style={styles.detailText}>Concepto: {item.concept}</Text>
                        <Text style={styles.detailText}>Categoría: {item.category}</Text>
                        <Text style={styles.detailText}>Método de pago: {item.payment_method}</Text>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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