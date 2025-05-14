import {View, Text, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import AnalysisScreen from '../screens/AnalysisScreen';
    



const Tab = createBottomTabNavigator();

const BottomNavigation = ()=>{
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} 
        options={{
            tabBarIcon: ({color, size}) => (
                <Ionicons name="home" color={color} size={size}/>
            )
        }}/>
       <Tab.Screen name="Stats" component ={AnalysisScreen}
        options={{
            tabBarIcon: ({color, size}) => (
                <Ionicons name="stats-chart" color={color} size={size}/>
            )
        }}/>
       
    </Tab.Navigator>

}


export default BottomNavigation;