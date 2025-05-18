import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListsScreen from "../screens/ListsScreen";
import BottomNavigation from "./BottomNavigation";
import SingleListScreen from "../screens/SingleListScreen";
import RecentProducts from "../screens/RecentProducts";
import SingleCategoryScreen from "../screens/SingleCategoryScreen";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
            <Stack.Screen name ="SingleListScreen" component={SingleListScreen} />
            <Stack.Screen name="RecentProducts" component={RecentProducts} />
            <Stack.Screen name="SingleCategoryScreen" component={SingleCategoryScreen} />

        </Stack.Navigator>
    );
}



export default MainStackNavigator;