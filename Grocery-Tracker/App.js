import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView , View } from 'react-native';
import { createTables } from './src/data/db';
import { use, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './src/navigation/BottomNavigation';
import { insertTestData } from './src/data/db';
import { getAllItems } from './src/data/db';


export default function App() {
useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await createTables();
        console.log('Database initialized');
        // Uncomment the next line to insert test data
        // await insertTestData();
       
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };

    initializeDatabase();
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
