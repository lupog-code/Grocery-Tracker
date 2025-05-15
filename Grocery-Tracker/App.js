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
    console.log('Creating database tables...');
    createTables();
    console.log('Database tables created successfully');
  }, []);
  useEffect(() => {
    console.log('Inserting test data...');
    insertTestData();
    console.log('Test data inserted successfully');
  }, []);
  useEffect(() => {
    console.log('Fetching all items...');
    getAllItems()
      .then((items) => {
        console.log('Fetched items:', items);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
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
