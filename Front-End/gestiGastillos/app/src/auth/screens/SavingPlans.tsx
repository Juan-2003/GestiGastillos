import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

import { getSavingList, getGeneralStatus } from "../api/savingPlanServices";
import TopBar from "@/components/topBar";
import ButtonClass from "@/components/buttons";
import SavingPlansEmoji from "@/components/SavingPlansEmoji";
import SavingPlansItem from "@/components/SavingPlansItem";
import globalStyles from "@/styles/GlobalStyles";
import globalStylesMenu from "@/styles/GlobalStylesMenu";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function SavingPlans({ navigation }: Props) {
  const [Saving, setSavingPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generalStatus, setGeneralStatus] = useState<any>({});
  const [status, setStatus] = useState<string | undefined>("");
  const [error, setError] = useState("");

  const loadSavingPlans = async () => {
    try {
      setLoading(true);
      const data = await getSavingList();
      console.log("Data from API:", data); // Verifica lo que se recibe
      setSavingPlans(data);
    } catch (error) {
      console.error("Error al cargar los planes de ahorro:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSavingPlan = (id: number) => {
    setSavingPlans((prevSaving) =>
      prevSaving.filter((saving) => saving.saving_id !== id)
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadSavingPlans();
    }, [])
  );

  const id = 5;

  useEffect(() => {
    const fetchGeneralStatus = async () => {
      try {
        const status = await getGeneralStatus(id);
        setGeneralStatus(status);
        console.log("el estatus es:", status);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchGeneralStatus();
  }, [id]);

  useEffect(() => {
    if (generalStatus && generalStatus.generalStatus) {
      setStatus(generalStatus.generalStatus);
    }
  }, [generalStatus]); // Actualiza `status` solo cuando cambie `generalStatus`

  const fetchGeneralStatus = async () => {
    try {
      const status = await getGeneralStatus(id);
      setGeneralStatus(status);
      console.log("el estatus es:", status);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchGeneralStatus();
    }, [])
  );

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.saving}>
        <SavingPlansItem
          saving_id={item.saving_id}
          name={item.name}
          target_amount={item.target_amount}
          current_balance={item.current_balance}
          status={item.status}
          debit_card_id={item.debit_card_id}
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
            <SavingPlansEmoji status={status} />
          </View>
          <View style={styles.dataContainer}>
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
            onPressNavigation={() => navigation.navigate("SavingPlansForm")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  saving: {
    paddingBottom: 10,
  },
  emojiContainer: {
    flex: 1,
  },
  dataContainer: {
    flex: 3,
  },
});
