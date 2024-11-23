import React from "react";
import {
  ExpenseItem,
  IncomeItem,
  MovementItem,
} from "@/app/src/auth/api/IncomeExpensesServices";
import itemContainerStyle from "@/styles/ItemContainer";
import { useState } from "react";
import { View, Text, Image, LayoutAnimation } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const categoryMap: { [key: string]: string} = {
    PAYDATE: "Quincena",
    ENTRETAIMENT: "Entretenimiento",
    EDUCATION: "Educación"
}

const paymethodMap: { [key: string]: string} = {
    CASH: "Efectivo",
    DEBIT_CARD: "Tarjeta de débito",
    CREDIT_CARD: "Tarjeta de crédito"
}

interface ItemComponentProps {
  item: MovementItem;
  onDelete: (itemId: number, itemType: string) => void;
  onUpdate: (item: MovementItem) => void;
}

const ItemComponent: React.FC<ItemComponentProps> = ({
  item,
  onDelete,
  onUpdate,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  // Funcion para manejar el toque del item
  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowDetails(!showDetails);
  };

  // Mapeo de Enums
  const category = categoryMap[item.category] || item.category;
  const paymentMethod = paymethodMap[item.payment_method] || item.payment_method;

  return (
    <TouchableOpacity
      style={itemContainerStyle.depositExpenseContainer}
      onPress={handlePress}
      activeOpacity={1}
    >
      <View style={itemContainerStyle.dataContainer}>
        <View style={itemContainerStyle.textContainer}>
          <Text style={itemContainerStyle.text}>{item.type}</Text>
        </View>

        <View style={itemContainerStyle.iconsContainer}>
          <TouchableOpacity onPress={() => onUpdate(item)}>
            <Image
              source={require("@/assets/images/editIcon.png")}
              style={itemContainerStyle.image}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const id =
                item.type === "ingreso"
                  ? (item as IncomeItem).transaction_id
                  : (item as ExpenseItem).transaction_id;
              if (id !== undefined) {
                onDelete(id, item.type);
              }
            }}
          >
            <Image
              source={require("@/assets/images/deleteIcon.png")}
              style={itemContainerStyle.image}
            />
          </TouchableOpacity>
        </View>
      </View>
      {showDetails && (
        <View style={itemContainerStyle.detailContainer}>
          <View style={itemContainerStyle.textDetailContainer}>
            <Text style={itemContainerStyle.detailText}>
              Monto: ${item.amount}
            </Text>
            <Text style={itemContainerStyle.detailText}>
              Concepto: {item.concept}
            </Text>
            <Text style={itemContainerStyle.detailText}>
              Categoría: {category}
            </Text>
            <Text style={itemContainerStyle.detailText}>
              Método de pago: {paymentMethod}
            </Text>
            <Text style={itemContainerStyle.detailText}>
              Fecha: {item.date}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ItemComponent;
