import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { handleFetchItem, CardItem, handleDelete, CreditCardItem, DebitCardItem } from "../api/cardServices";
import TopBar from "@/components/topBar";
import globalStyles from "@/styles/GlobalStyles";
import ButtonClass from "@/components/buttons";
import cardStyles from "@/styles/CardStyles";
import CardItemComponent from "@/components/CardItemComponent";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function Card({ navigation }: Props) {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const data = await handleFetchItem();
        const combinedCards: CardItem[] = [
          ...data.credit_cards?.map(card => ({ ...card, type: 'credit' })),
          ...data.debit_cards?.map(card => ({ ...card, type: 'debit' })),
        ];
        setCards(combinedCards);
      };
      fetchData();
    }, []) // Solo se ejecutará cuando la pantalla se enfoque
  );

  const handleDeleteCard = async (cardId: number, cardType: string) => {
    await handleDelete(cardId, cardType, () => {
      // Actualizamos el estado local para eliminar la tarjeta de la lista
      setCards((prevCards) =>
        prevCards.filter((card) =>
          cardType === "credit"
            ? (card as CreditCardItem).tarjeta_credito_id !== cardId
            : (card as DebitCardItem).tarjeta_debito_id !== cardId
        )
      );
    });
  };

  const handleUpdatCard = (item: CardItem) => {
    navigation.navigate("Cardform", {
      card: item
    });
  };

  console.log("tarjetas: ", cards);
  return (
    <>
      <TopBar title="Tus Tarjetas" />
      <View style={globalStyles.middleContainer}>
        <FlatList
          data={cards}
          keyExtractor={(item) => {
            if ("tarjeta_credito_id" in item) {
              return `credit_${(item as CreditCardItem).tarjeta_credito_id?.toString()}`; // Prefijo para tarjeta de crédito
            } else {
              return `debit_${(item as DebitCardItem).tarjeta_debito_id?.toString()}`; // Prefijo para tarjeta de débito
            }
          }}
          renderItem={({ item }) => (
            <CardItemComponent
              item={item}
              onDelete={handleDeleteCard}
              onUpdate={handleUpdatCard}
            />
          )} // Renderizar las tarjetas
          ListFooterComponent={
            <View style={cardStyles.bottomContainer}>
              <ButtonClass
                text="Agregar Tarjeta"
                onPressNavigation={() => navigation.navigate("Cardform")}
              />
            </View>
          }
          ListEmptyComponent={
            loading ? (
              <Text style={cardStyles.emptyMessage}>Cargando tarjetas...</Text>
            ) : (
              <Text style={cardStyles.emptyMessage}>
                Aún no has agregado alguna tarjeta :c
              </Text>
            )
          }
        />
      </View>
    </>
  );
}
