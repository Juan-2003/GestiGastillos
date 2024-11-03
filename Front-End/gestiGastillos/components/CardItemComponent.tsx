import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  DebitCardItem,
  CreditCardItem,
  CardItem,
  isDebitCardItem,
  handleDelete,
  handleEdit,
} from "../app/src/auth/api/cardServices";
import cardStyles from "@/styles/CardStyles";

interface CardItemComponentProps {
  item: CardItem;
}

const CardItemComponent: React.FC<CardItemComponentProps> = ({ item }) => {
  return (
    <View style={cardStyles.cardContainer}>
      <View style={cardStyles.topCard}>
        <View style={cardStyles.typeContainer}>
          <Text style={cardStyles.text}>{item.type}</Text>
        </View>

        <View style={cardStyles.nameContainer}>
          <Text style={cardStyles.text}>{item.card.card_name}</Text>
        </View>

        <View style={cardStyles.iconsContainer}>
          <TouchableOpacity onPress={handleEdit}>
            <Image
              source={require("@/assets/images/editIcon.png")}
              style={cardStyles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.type === 'credit' ? item.tarjeta_credito_id : item.tarjeta_debito_id, item.type)}>
            <Image
              source={require("@/assets/images/deleteIcon.png")}
              style={cardStyles.image}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={cardStyles.middleCard}>
        <Text style={cardStyles.digits}>{item.card.last_digits}</Text>
      </View>

      <View style={cardStyles.bottomCard}>
        <View style={cardStyles.dateContainer}>
          <Text style={cardStyles.dateText}>{item.card.expiration_date}</Text>
        </View>

        {isDebitCardItem(item) ? (
          <View style={cardStyles.numberContainer}>
            <Text style={cardStyles.text}>Balance:</Text>
            <Text style={cardStyles.textNumber}>
              ${(item as DebitCardItem).current_balance}
            </Text>
          </View>
        ) : (
          <>
            <View style={cardStyles.numberContainer}>
              <Text style={cardStyles.text}>Limite:</Text>
              <Text style={cardStyles.textNumber}>
                ${(item as CreditCardItem).credit_limit}
              </Text>
            </View>

            <View style={cardStyles.numberContainer}>
              <Text style={cardStyles.text}>Deuda:</Text>
              <Text style={cardStyles.textNumber}>
                ${(item as CreditCardItem).debt}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default CardItemComponent;
