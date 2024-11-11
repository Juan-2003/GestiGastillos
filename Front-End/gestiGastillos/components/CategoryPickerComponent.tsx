import globalStyles from "@/styles/GlobalStyles";
import { useState } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";

interface Props {
    type: string;
    setCategory: (category: string) => void;
}

export default function CategoryPickerComponent({ type, setCategory }: Props) {
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

    const handlePress = (iconName: string) => {
        // Establecer el icono seleccionado
        setSelectedIcon(iconName);
        setCategory(iconName);
    };

    return (
        <>
            {type === 'income' ? (
                <View style={styles.imageSelectionContainer}>
                    <View style={styles.imageContainer}>
                        <Text style={globalStyles.imagetext}>Quincena</Text>
                        <TouchableOpacity onPress={() => handlePress('Quincena')}>
                            <Image
                                source={require("@/assets/images/payDateIcon.png")}
                                style={[styles.image, selectedIcon === 'Quincena' && styles.selectedImage]}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageContainer}>
                        <Text style={globalStyles.imagetext}>Deposito</Text>
                        <TouchableOpacity onPress={() => handlePress('Deposito')}>
                            <Image
                                source={require("@/assets/images/receiveCashIcon.png")}
                                style={[styles.image, selectedIcon === 'Deposito' && styles.selectedImage]}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageContainer}>
                        <Text style={globalStyles.imagetext}>Pago</Text>
                        <TouchableOpacity onPress={() => handlePress('Pago')}>
                            <Image
                                source={require("@/assets/images/briberyIcon.png")}
                                style={[styles.image, selectedIcon === 'Pago' && styles.selectedImage]}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageContainer}>
                        <Text style={globalStyles.imagetext}>Otros</Text>
                        <TouchableOpacity onPress={() => handlePress('Otros')}>
                            <Image
                                source={require("@/assets/images/othersIcon.png")}
                                style={[styles.image, selectedIcon === 'Otros' && styles.selectedImage]}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.imageSelectionContainer}>
                    <View style={styles.imageContainer}>
                        <Text style={globalStyles.imagetext}>Comida</Text>
                        <TouchableOpacity onPress={() => handlePress('Comida')}>
                            <Image
                                source={require("@/assets/images/foodIcon.png")}
                                style={[styles.image, selectedIcon === 'Comida' && styles.selectedImage]}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageContainer}>
                        <Text style={globalStyles.imagetext}>Entretenimiento</Text>
                        <TouchableOpacity onPress={() => handlePress('Entretenimiento')}>
                            <Image
                                source={require("@/assets/images/enterteimentIcon.png")}
                                style={[styles.image, selectedIcon === 'Entretenimiento' && styles.selectedImage]}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageContainer}>
                        <Text style={globalStyles.imagetext}>Educacion</Text>
                        <TouchableOpacity onPress={() => handlePress('Educacion')}>
                            <Image
                                source={require("@/assets/images/educationIcon.png")}
                                style={[styles.image, selectedIcon === 'Educacion' && styles.selectedImage]}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    )
};

const styles = StyleSheet.create({
    imageSelectionContainer: {
        width: "70%",
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20,
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        marginTop: 5,
    },
    selectedImage: {
        width: 70,
        height: 70,
        borderWidth: 2,
        borderColor: '#27C1F9',
        borderRadius: 25,
    },
});
