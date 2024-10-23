import TopBar from "@/components/topBar";
import globalStyles from "@/styles/GlobalStyles";
import { StyleSheet, View,Text,FlatList, } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import ButtonClass from "@/components/buttons";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import cards from "@/json/cards.json"

interface Props {
  navigation: StackNavigationProp<any>
}

export default function Card({navigation}:Props) {
  
    const card = cards.cards;

    const renderItem = ({ item }: any) => (
      <View style={styles.card}>
        <Text>Nombre: {item.name}</Text>
        <Text>Saldo: ${item.saldo}</Text>
        <Text>Deuda Actual: ${item.deudaActual}</Text>
        <Text>{item.digitos}</Text>
        <Text>Fecha de vencimiento:{item.fechaVencimiento}</Text>
      </View>
    );
    
  return (
    <View style={globalStyles.container}>
      
      <TopBar title="TARJETAS"/>
      <View style={globalStylesMenu.container}>
       
        <View style={globalStylesMenu.containerMiddle}>
          
            <FlatList
              data={card} // Datos a renderizar
              keyExtractor={(item) => item.id}
              renderItem={({item})=>
                <View style={styles.card}>
                  <View style={styles.cardContainer}>
                    <View>
                      <Text>{item.name}</Text>
                      <Text>{item.digitos}</Text>
                      <Text>{item.saldo}</Text>
                    </View>
                    <View>
                      <MaterialCommunityIcons name="pencil" size={24} color="black" />
                      <MaterialCommunityIcons name="trash-can" size={24} color="black" />
                    </View>
                  </View>
                </View>                
              
             } // Método para renderizar cada elemento
            />
            
        </View>

        <View style={globalStylesMenu.containerBottom}>
          <ButtonClass text="Agregar Tarjeta" onPressNavigation={() => navigation.navigate('Cardform')}/>
        </View >
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  card: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
});
