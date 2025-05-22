import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView , View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './src/navigation/BottomNavigation';
import { createTables , DropTabelle} from './src/data/db';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import { Gesture } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [dbReady, setDbReady] = useState(false);
  useEffect(() => {
    const createTablesAsync = async () => {
      try {
        await createTables();
        setDbReady(true); // ora il DB è pronto
      } catch (error) {
        console.error('Error creating tables:', error);
      }
    };

    createTablesAsync();
  }, []);

  if (!dbReady) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
     <MainStackNavigator />
    </NavigationContainer>
  </GestureHandlerRootView>
  );
}