import {View, Text, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import AnalysisScreen from '../screens/AnalysisScreen';
import ListsScreen from '../screens/ListsScreen';
import commStyle from '../styles/commonStyle';
import CategoryScreen from "../screens/CategoryScreen";


const Tab = createBottomTabNavigator();

const BottomNavigation = ()=>{
    return(



        <Tab.Navigator screenOptions={commStyle.bottomBar}>
        <Tab.Screen name="Home" component={HomeScreen} 
        options={{
            tabBarIcon: ({color, size}) => (
                <Ionicons name="home" color={color} size={size}/>
            )
        }}/>
        <Tab.Screen name="Lists" component={ListsScreen}
        options={{
            tabBarIcon: ({color, size}) => (
                <Ionicons name="file-tray-full-outline" color={color} size={size}/>
            )
        }}/>
       <Tab.Screen name="Stats" component ={AnalysisScreen}
        options={{
            tabBarIcon: ({color, size}) => (
                <Ionicons name="stats-chart" color={color} size={size}/>
            )
        }}/>
        <Tab.Screen name="Categories" component ={CategoryScreen}
        options={{
            tabBarIcon: ({color, size}) => (
            <Ionicons name="apps-outline" color={color} size={size}/>
            )
        }}/>


    </Tab.Navigator>
    );
    

}


export default BottomNavigation;