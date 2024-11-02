import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useState } from "react";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import globalStyles from "@/styles/GlobalStyles";
import { Picker } from "@react-native-picker/picker";
import TextClass from "@/components/TextClass";
import TopBarForms from "@/components/TopBarForms";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function Cardform({ navigation }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [digitos, setDigitos] = useState("");
  const [limite, setLimite] = useState("");
  const [deudaActual, setDeudaActual] = useState<number>();
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const user_id = 1;

  const handleSubmit = async () => {
    fetch("http://192.168.100.17:8080/gestiGastillos/creditCard/register", {
      // Reemplaza con la IP y el puerto del backend
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        credit_limit: limite,
        debt: deudaActual,
        card: {
          name,
          last_digits: digitos,
          expiration_date: fechaVencimiento,
        },
      }),
    }).then((response) => {
      console.log(response.status);
      if (response.ok) {
        console.log("Usuario creado satisfactoriamente!!");
        navigation.navigate("Card");
        return response.json();
      } else {
        return response.json().then((data) => {
          if (response.status == 409) {
            console.log(data);
          }
        });
      }
    });
  };

  return (
    <View style={globalStyles.container}>
      <TopBarForms title="TARJETAS" />
      <View style={globalStylesMenu.container}>
        <ScrollView style={globalStylesMenu.containerMiddle}>
          <View style={globalStyles.inputTextContainer}>

            <TextClass text="Nombre de la tarjeta" />
            <TextInput
              style={globalStyles.textInput}
              value={name}
              onChangeText={setName}
            />

            <TextClass text="Últimos 4 dígitos" />
            <TextInput
              style={globalStyles.textInput}
              value={digitos}
              onChangeText={setDigitos}
              keyboardType="numeric"
            />

            <TextClass text="Saldo actual" />
            <TextInput
              style={globalStyles.textInput}
              value={limite}
              onChangeText={setLimite}
              keyboardType="numeric"
            />

            <TextClass text="Selecciones el tipo de tarjeta" />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={type}
                onValueChange={(itemValue) => setType(itemValue)}
                style={styles.picker}

              >
                <Picker.Item label="Seleccionar" value="" />
                <Picker.Item label="Tarjeta de Crédito" value="credito" />
                <Picker.Item label="Tarjeta de Débito" value="debito" />
              </Picker>
            </View>

            {type === 'credito' && (
              <>
                <TextClass text="Deuda actual" />
                <TextInput
                  style={globalStyles.textInput}
                  value={deudaActual ? deudaActual.toString() : ""}
                  onChangeText={(text) => setDeudaActual(parseFloat(text))}
                  keyboardType="numeric"
                />
              </>
            )}

            <TextClass text="Fecha de vencimiento" />
            <TextInput
              style={globalStyles.textInput}
              placeholder="YYYY-MM-DD"
              value={fechaVencimiento}
              onChangeText={setFechaVencimiento}
            />
          </View>
          <View style={globalStylesMenu.containerBottom}>
            <Pressable style={globalStyles.button} onPress={handleSubmit}>
              <Text style={globalStyles.text}>Agregar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: '100%',
  },
  
  pickerContainer: {
    width: "70%",
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderColor: "black",
    marginBottom: 40,
  },
})