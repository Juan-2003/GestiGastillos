import TopBar from "@/components/topBar";
import globalStyles from "@/styles/GlobalStyles";
import { StyleSheet, View,Text,FlatList, } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import ButtonClass from "@/components/buttons";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import SavingPlansEmoji from "@/components/SavingPlansEmoji";
import SavingPlansItem from "@/components/SavingPlansItem";
import cards from "@/json/cards.json"

interface Props {
  navigation: StackNavigationProp<any>
}



export default function SavingPlans({navigation}:Props) {
  
   
  return (
    <View style={globalStyles.container}>
      
      <TopBar title="PLANES DE AHORRO"/>
      <View style={globalStylesMenu.container}>
       
        <View style={globalStylesMenu.containerMiddle}>
            <SavingPlansEmoji />
            <SavingPlansItem />
              
             
        </View>

        <View style={globalStylesMenu.containerBottom}>
          <ButtonClass text="Agregar plan de ahorro" onPressNavigation={() => navigation.navigate('SavingPlansForm')}/>
          
        </View >
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 
 
    
  
});
