import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import globalStylesMenu from "@/styles/GlobalStylesMenu";
import globalStyles from "@/styles/GlobalStyles";
import TopBar from "@/components/topBar";
import TextClass from "@/components/TextClass";
import TopBarForms from "@/components/TopBarForms";

export default function Cardform() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [digitos, setDigitos] = useState("");
  const [limite, setLimite] = useState("");
  const [deudaActual, setDeudaActual] = useState<number>();
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const user_id = 1;

  const handleSubmit = async () => {
    fetch("http://10.214.91.96:8080/gestiGastillos/creditCard/register", {
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
        //navigation.navigate("Login");
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
            />

            <TextClass text="Saldo actual" />
            <TextInput
              style={globalStyles.textInput}
              value={limite}
              onChangeText={setLimite}
            />

            <TextClass text="Selecciones el tipo de tarjeta" />
            <TextInput
              style={globalStyles.textInput}
              value={type}
              onChangeText={setType}
            />

            <TextClass text="Fecha de vencimiento" />

            <TextInput
              style={globalStyles.textInput}
              placeholder="DD/MM/YYYY"
              value={fechaVencimiento}
              onChangeText={setFechaVencimiento}
            />

            <TextClass text="Deuda actual" />
            <TextInput
              style={globalStyles.textInput}
              value={deudaActual ? deudaActual.toString() : ""}
              onChangeText={(text) => setDeudaActual(parseFloat(text))}
              keyboardType="numeric"
            />
            <TextClass text="Deuda actual" />
            <TextInput
              style={globalStyles.textInput}
              value={deudaActual ? deudaActual.toString() : ""}
              onChangeText={(text) => setDeudaActual(parseFloat(text))}
              keyboardType="numeric"
            />
            <TextClass text="Deuda actual" />
            <TextInput
              style={globalStyles.textInput}
              value={deudaActual ? deudaActual.toString() : ""}
              onChangeText={(text) => setDeudaActual(parseFloat(text))}
              keyboardType="numeric"
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
