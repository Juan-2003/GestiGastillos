import { ip } from "../IP/Ip";
import TopBar from "@/components/topBar";
import globalStyles from "@/styles/GlobalStyles";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import ButtonClass from "@/components/buttons";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import SavingPlansEmoji from "@/components/SavingPlansEmoji";
import SavingPlansItem from "@/components/SavingPlansItem";

import { useState } from "react";
import { getSavingList} from "../api/savingPlanServices";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function SavingPlans({ navigation }: Props) {
  const [Saving, setSavingPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSavingPlans = async () => {
    try {
      setLoading(true);
      const data = await getSavingList();
      console.log("Data from API:", data);  // Verifica lo que se recibe
      console.log(Saving.length)
      setSavingPlans(data);
    } catch (error) {
      console.error("Error al cargar los planes de ahorro:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteSavingPlan = (id: number) => {
    setSavingPlans((prevSaving) => prevSaving.filter(saving => saving.saving_id !== id));
  };

  useFocusEffect(
    useCallback(() => {
      loadSavingPlans();
    }, [])
  );

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.saving}>
        <SavingPlansItem
        saving_id={item.saving_id}
        name= {item.name} 
        target_amount={item.target_amount}
        current_balance= {item.current_balance}
        status= {item.status}
        debit_card_id= {item.debit_card_id}
        debit_card_name={item.debit_card_name}
        last_digits={item.last_digits}
        onDelete={handleDeleteSavingPlan}
        />
      </View>
    );
  };

  return (
    <View style={globalStyles.container}>
      <TopBar title="PLANES DE AHORRO" />
      <View style={globalStylesMenu.container}>
        <View style={globalStylesMenu.containerMiddle}>
        <View style={styles.emojiContainer}>
        <SavingPlansEmoji />
        </View>
        <View  style={styles.dataContainer}>
        <FlatList
            data={Saving}
            renderItem={renderItem}
            keyExtractor={(item) => item.saving_id.toString()} // Usar savingId
          />
        </View>

         
        </View>

        <View style={globalStylesMenu.containerBottom}>
          <ButtonClass
            text="Agregar plan de ahorro"
            onPressNavigation={() => navigation.navigate('SavingPlansForm')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  saving: {

  
    paddingBottom:10,
  },
  emojiContainer:{
    flex:1
  },
  dataContainer:{
    flex:3
  }
});
