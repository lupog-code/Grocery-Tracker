import { SafeAreaView, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createTables } from './src/data/db';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [dbReady, setDbReady] = useState(false);
  useEffect(() => {
    const createTablesAsync = async () => {
      try {
        await createTables();
        setDbReady(true); 
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