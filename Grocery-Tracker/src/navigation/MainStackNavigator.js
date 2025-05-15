import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListsScreen from "../screens/ListsScreen";
import BottomNavigation from "./BottomNavigation";
import SingleListScreen from "../screens/SingleListScreen";


const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
            <Stack.Screen name ="SingleListScreen" component={SingleListScreen} />
            
        </Stack.Navigator>
    );
}



export default MainStackNavigator;