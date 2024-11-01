import TopBar from "@/components/topBar";
import globalStyles from "@/styles/GlobalStyles";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import ButtonClass from "@/components/buttons";
import cards from "@/json/cards.json";
import { useEffect, useState } from "react";

interface Props {
  navigation: StackNavigationProp<any>;
}

interface CardItem {
  id: number;
  type: string;
  name: string;
  digitos: number;
  fechaVencimiento: string;
  saldo: number;
  deudaActual: number;
}

const handleFetchItem = async (): Promise<CardItem[]> => {
  try {
    const response = await fetch("http://192.168.100.19:8080/gestiGastillos/cards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    });

    if(response.ok){
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
  }
  catch (error) {
    return [];
  }
}

export default function Card({ navigation }: Props) {
  const [cards, setCards] = useState<CardItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await handleFetchItem();
      setCards(data);
      console.log("Datos almacenados en cards:", data);  // Verificar los datos aquí
    };
    fetchData();
  }, []);

  return (
    <View style={globalStyles.container}>
      <TopBar title="TARJETAS" />
      <View style={styles.middleContainer}>
        <FlatList
          data={cards} // Datos a renderizar
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>

              <View style={styles.topCard}>

                <View style={styles.typeContainer}>
                  <Text style={styles.text}>{item.type}</Text>
                </View>

                <View style={styles.nameContainer}>
                  <Text style={styles.text}>{item.name}</Text>
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

              <View style={styles.middleCard}>
                <Text style={styles.digits}>{item.digitos}</Text>
              </View>

              <View style={styles.bottomCard}>

                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>{item.fechaVencimiento}</Text>
                </View>

                <View style={styles.numberContainer}>
                  <Text style={styles.text}>Saldo:</Text>
                  <Text style={styles.textNumber}>{item.saldo}</Text>
                </View>

                <View style={styles.numberContainer}>
                  <Text style={styles.text}>Deuda:</Text>
                  <Text style={styles.textNumber}>{item.deudaActual}</Text>
                </View>

              </View>
            </View>
          )}
          ListFooterComponent={
          <View style={styles.bottomContainer}>
            <ButtonClass
              text="Agregar Tarjeta"
              onPressNavigation={() => navigation.navigate("Cardform")}
            />
          </View>
          }
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>Aún no has agregado alguna tarjeta :c</Text>
          }
        />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  middleContainer: {
    flex: 3,
  },
  bottomContainer: {
    alignItems: 'center',
    marginVertical: 50,
  },
  cardContainer: {
    padding: 3,
    backgroundColor: "#B93133FF",
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#9e292b"
  },
  topCard: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 3,
    //backgroundColor: 'purple'
  },
  middleCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 1,
    //backgroundColor: 'green'
  },
  bottomCard: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 3,
    //backgroundColor: "blue",
  },
  dataBottomCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateContainer: {
    flex: 0.8,
    justifyContent: "center",
    paddingLeft: 10,
    //backgroundColor: "red",
  },
  numberContainer: {
    flex: 0.5,
    alignItems: "center",
    //backgroundColor: "blue",
  },
  nameContainer: {
    flex: 0.5,
    alignItems: "center",
    //backgroundColor: "blue",
  },
  typeContainer: {
    flex: 0.3,
    alignItems: "center",
    //backgroundColor: "red",
  },
  iconsContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: "row",
    //backgroundColor: 'yellow'
  },
  text: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: 'center',
    padding: 2,
  },
  emptyMessage: {
    fontSize: 20,
    color: "red",
    textAlign: 'center',
    marginVertical: 100,
  },
  dateText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  textNumber: {
    fontSize: 18,
    color: "#FFFFFF",
    padding: 2,
  },
  digits: {
    fontSize: 30,
    color: "#FFFFFF",
    padding: 10,
  },
  image: {
    height: 38,
    width: 38,
    resizeMode: 'contain',
  },
});
