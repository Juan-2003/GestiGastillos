import { View, Text, StyleSheet, Image } from "react-native";

interface Props {
    text?: string;
}

export default function ContextContainer({ text }: Props) {
    return (
        <View style={styles.depositExpenseContainer}>
            <View style={styles.dataContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{text}</Text>
                </View>
                <View style={styles.iconsContainer}>
                    <Image 
                        source={require('@/assets/images/editIcon.png')}
                        style={styles.image}
                    />
                    <Image 
                        source={require('@/assets/images/deleteIcon.png')}
                        style={styles.image}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dataContainer: {
        backgroundColor: "#A63738",
        padding: 16,
        flexDirection: "row",
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    iconsContainer: {
        flex: 0.5,
        flexDirection: "row",
    },
    depositExpenseContainer: {
        alignItems: "center",
        padding: 2,
        justifyContent: "center",
    },
    image: {
        height: 26,
        width: 26,
        resizeMode: 'contain',
    },
})