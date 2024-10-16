import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/Welcome"; // Asegúrate de que esta ruta sea correcta
import Register from './screens/Registrar';
const Stack = createNativeStackNavigator();


export default function Index() {
  return (
    
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
   
  );
}
