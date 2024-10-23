import TopBar from "@/components/topBar";
import globalStyles from "@/styles/GlobalStyles";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import ButtonClass from "@/components/buttons";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import cards from "@/json/cards.json";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function Card({ navigation }: Props) {
  const card = cards.cards;

  const renderItem = ({ item }: any) => (
    <View style={styles.cardContainer}>
      <Text>Nombre: {item.name}</Text>
      <Text>Saldo: ${item.saldo}</Text>
      <Text>Deuda Actual: ${item.deudaActual}</Text>
      <Text>{item.digitos}</Text>
      <Text>Fecha de vencimiento:{item.fechaVencimiento}</Text>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <TopBar title="TARJETAS" />
      <View style={globalStylesMenu.container}>
        <View style={globalStylesMenu.containerMiddle}>
          <FlatList
            data={card} // Datos a renderizar
            keyExtractor={(item) => item.id}
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
                    <MaterialCommunityIcons
                      name="pencil"
                      size={30}
                      color="black"
                    />
                    <MaterialCommunityIcons
                      name="trash-can"
                      size={30}
                      color="black"
                    />
                  </View>
                </View>
                <View style={styles.middleCard}>
                  <Text style={styles.digits}>{item.digitos}</Text>
                </View>
                <View style={styles.bottomCard}>
                  <View style={styles.dateContainer}>
                    <Text>{item.fechaVencimiento}</Text>
                  </View>
                  <View style={styles.numberContainer}>
                    <Text>Saldo:</Text>
                    <Text style={styles.textNumber}>{item.saldo}</Text>
                  </View>
                  <View style={styles.numberContainer}>
                    <Text>Deuda:</Text>
                    <Text style={styles.textNumber}>{item.deudaActual}</Text>
                  </View>
                </View>
              </View>
            )} // Método para renderizar cada elemento
          />
        </View>

        <View style={globalStylesMenu.containerBottom}>
          <ButtonClass
            text="Agregar Tarjeta"
            onPressNavigation={() => navigation.navigate("Cardform")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },
  topCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    //backgroundColor: 'purple'
  },
  middleCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    //backgroundColor: 'green'
  },
  bottomCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    //backgroundColor: "blue",
  },
  dataBottomCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateContainer: {
    flex: 1,
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
    flex: 0.2,
    alignItems: 'center',
    flexDirection: "row",
    //backgroundColor: 'yellow'
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    padding: 2,
  },
  textNumber: {
    fontSize: 18,
    padding: 2,
  },
  digits: {
    fontSize: 30,
    padding: 10,
  },
});
