import cardStyles from "@/styles/CardStyles";
import { Pressable, View, Image } from "react-native";

export default function PressableIcon() {
  return (
    <View>
      <Pressable
        onPress={() => console.log("Presiono")} // Corrección aquí
      >
        <Image
          source={require("@/assets/images/editIcon.png")}
          style={cardStyles.image}
        />
      </Pressable>
    </View>
  );
}
