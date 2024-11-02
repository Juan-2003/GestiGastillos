import { View, TextInput, Text } from "react-native";
import globalStyles from "@/styles/GlobalStyles";
import ImagePicker from "@/components/ImagePicker";
import ButtonClass from "@/components/buttons";
import { StackNavigationProp } from "@react-navigation/stack";
import registerStyles from "@/styles/RegisterStyles";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function Register({ navigation }: Props) {
  return (
    <View style={globalStyles.container}>

      <View style={registerStyles.topContainer}>
        <ImagePicker />
      </View>

      <View style={registerStyles.middleContainer}>

        <View style={globalStyles.inputTextContainer}>
          <View style={globalStyles.textContainer}>
            <Text style={registerStyles.text}>Nombre</Text>
          </View>
          <TextInput
            style={globalStyles.textInput}
          />
        </View>
        <View style={registerStyles.buttonContainer}>
          <ButtonClass
            text="CREAR PERFIL"
            onPressNavigation={() => navigation.navigate("Home")}
          />
        </View>
        
      </View>

    </View>
  );
}
