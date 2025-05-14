import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ListsScreen from '../screens/ListsScreen';
import RecentScreen from '../screens/RecentScreen';
import { Ionicons } from '@expo/vector-icons';
import ListStackNavigator from './MainStackNavigator';
import SingleListScreen from '../screens/SingleListScreen';
import AnalysisScreen from '../screens/AnalysisScreen';

// Import your screens here
// Example:
// 
// ;
// import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#57cb98',
                    tabBarInactiveTintColor: 'black',
                    headerShown: false,
                    animation:'shift'
                }}
            >
                <Tab.Screen 
                    name="Home" 
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Your Lists"
                    component={ListsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="receipt" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Recents"
                    component={RecentScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="file-tray-full" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Stats"
                    component={AnalysisScreen}
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <Ionicons name="stats-chart" size={size} color={color} />
                        )
                    }}
                />
            </Tab.Navigator>
    );
};

export default BottomTabNavigator;