import TopBar from "@/components/topBar";
import globalStyles from "@/styles/GlobalStyles";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import ButtonClass from "@/components/buttons";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
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
