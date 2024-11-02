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
      setCards(data);
      console.log("Datos almacenados en cards:", data); // Verificar los datos aquí
    };
    fetchData();
  }, []);

  return (
    <View style={globalStyles.container}>
      <TopBar title="TARJETAS" />
      <View style={cardStyles.middleContainer}>
        <FlatList
          data={cards}
          keyExtractor={(item) => item.tarjeta_credito_id.toString()}
          renderItem={({ item }) => (
            <CardItemComponent item={item} /> 
          )}
          ListFooterComponent={
            <View style={cardStyles.bottomContainer}>
              <ButtonClass
                text="Agregar Tarjeta"
                onPressNavigation={() => navigation.navigate("Cardform")}
              />
            </View>
          }
          ListEmptyComponent={
            <Text style={cardStyles.emptyMessage}>Aún no has agregado alguna tarjeta :c</Text>
          }
        />
      </View>
    </View>
  );
}


