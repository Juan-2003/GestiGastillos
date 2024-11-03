import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { handleFetchItem, CardItem } from "../api/cardServices";
import TopBar from "@/components/topBar";
import globalStyles from "@/styles/GlobalStyles";
import ButtonClass from "@/components/buttons";
import cardStyles from "@/styles/CardStyles";
import CardItemComponent from "@/components/CardItemComponent";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function Card({ navigation }: Props) {
  const [cards, setCards] = useState<CardItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await handleFetchItem();
      const combinedCards: CardItem[] = [
        ...data.credit_cards?.map(card => ({ ...card, type: 'credit' })), // Añadimos el tipo a las tarjetas de crédito
        ...data.debit_cards?.map(card => ({ ...card, type: 'debit' }))    // Añadimos el tipo a las tarjetas de débito
    ];
      setCards(combinedCards);
      console.log("Datos almacenados en cards:", data); // Verificar los datos aquí
    };
    fetchData();
  }, []);

  console.log("tarjetas: ",cards);
  return (
    <View style={globalStyles.container}>
      <TopBar title="TARJETAS" />
      <View style={cardStyles.middleContainer}>
        <FlatList
          data={cards}
          keyExtractor={(item) => {
            if ('tarjeta_credito_id' in item) {
              return `credit_${item.tarjeta_credito_id?.toString()}`; // Prefijo para tarjeta de crédito
            } else {
              return `debit_${item.tarjeta_debito_id?.toString()}`; // Prefijo para tarjeta de débito
            }
          }}
          renderItem={({ item }) => <CardItemComponent item={item} />}
          ListFooterComponent={
            <View style={cardStyles.bottomContainer}>
              <ButtonClass
                text="Agregar Tarjeta"
                onPressNavigation={() => navigation.navigate("Cardform")}
              />
            </View>
          }
          ListEmptyComponent={
            <Text style={cardStyles.emptyMessage}>
              Aún no has agregado alguna tarjeta :c
            </Text>
          }
        />
      </View>
    </View>
  );
}
