import { View,Text } from "react-native";
import globalStyles from "@/styles/GlobalStyles";
interface Props{
    text: string;
   
}
export default function TextClass({text}: Props){
    return(
        <View style={globalStyles.textContainer}>
            <Text>{text}</Text>
        </View>

    )
}