import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView , View } from 'react-native';

import { use, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './src/navigation/BottomNavigation';
import { createTables } from './src/data/db';


export default function App() {
  //Crea le tabelle
  useEffect(() => {
    const createTablesAsync = async () => {
      try {
        await createTables();
        console.log('Tabelle createTables createTablesAsync');
      } catch (error) {
        console.error('Error creating tables:', error);
      }
    };

    createTablesAsync();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}> 
        <StatusBar style="auto" />
        <BottomNavigation />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
