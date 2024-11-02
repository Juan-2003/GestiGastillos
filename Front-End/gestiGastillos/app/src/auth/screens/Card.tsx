import TopBar from "@/components/topBar";
import globalStyles from "@/styles/GlobalStyles";
import { View, Text, FlatList, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import ButtonClass from "@/components/buttons";
import { useEffect, useState } from "react";
import cardStyles from "@/styles/CardStyles";

interface Props {
  navigation: StackNavigationProp<any>;
}

interface User {
  user_id: number;
  name: string;
}

interface Card {
  card_id: number;
  card_name: string;
  last_digits: string;
  expiration_date: string;
}

interface CreditCardItem {
  tarjeta_credito_id: number;
  user: User;
  card: Card;
  debt: number;
  credit_limit: string;
  type: string;
}

interface DebitCardItem {
  tarjeta_credito_id: number;
  user: User;
  card: Card;
  current_balance: number;
  type: string;
}

type CardItem = CreditCardItem | DebitCardItem;

const handleFetchItem = async (): Promise<CardItem[]> => {
  try {
    const response = await fetch(
      "http://192.168.100.17:8080/gestiGastillos/cards",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      console.log("Se obtuvieron las tarjetas satisfactoriamente!!");
      return await response.json();
    } else {
      const errorData = await response.json();
      if (response.status === 409) {
        console.log("Error 409:", errorData);
      }
      console.log(errorData);
      throw new Error("Error al obtener las tarjetas");
    }
  } catch (error) {
    return [];
  }
};

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
          data={cards} // Datos a renderizar
          keyExtractor={(item) => item.tarjeta_credito_id.toString()}
          renderItem={({ item }) => (
            <View style={cardStyles.cardContainer}>

              <View style={cardStyles.topCard}>

                <View style={cardStyles.typeContainer}>
                  <Text style={cardStyles.text}>{item.type}</Text>
                </View>

                <View style={cardStyles.nameContainer}>
                  <Text style={cardStyles.text}>{item.name}</Text>
                </View>

                <View style={cardStyles.iconsContainer}>
                  <Image
                    source={require('@/assets/images/editIcon.png')}
                    style={cardStyles.image}
                  />
                  <Image
                    source={require('@/assets/images/deleteIcon.png')}
                    style={cardStyles.image}
                  />
                </View>
              </View>

              <View style={cardStyles.middleCard}>
                <Text style={cardStyles.digits}>{item.digitos}</Text>
              </View>

              <View style={cardStyles.bottomCard}>

                <View style={cardStyles.dateContainer}>
                  <Text style={cardStyles.dateText}>{item.fechaVencimiento}</Text>
                </View>

                <View style={cardStyles.numberContainer}>
                  <Text style={cardStyles.text}>Saldo:</Text>
                  <Text style={cardStyles.textNumber}>${item.saldo}</Text>
                </View>

                <View style={cardStyles.numberContainer}>
                  <Text style={cardStyles.text}>Deuda:</Text>
                  <Text style={cardStyles.textNumber}>${item.deudaActual}</Text>
                </View>

              </View>
            </View>
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


