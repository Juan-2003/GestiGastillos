import { Pressable, Text } from "react-native";
import globalStyles from "@/styles/GlobalStyles";

interface Props{
    text: string;
    onPressNavigation?: () => void;
}

export default function ButtonClass({text, onPressNavigation}: Props){

    return(
        <Pressable 
            style={globalStyles.button}
            onPress = {onPressNavigation} 
        >
          <Text style={globalStyles.text}>{text}</Text>
        </Pressable>
    )
}