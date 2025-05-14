import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView , View } from 'react-native';
import { createTables } from './src/data/db';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './src/navigation/BottomNavigation';

export default function App() {
  useEffect(() => {
    console.log('Creating database tables...');
    createTables();
    console.log('Database tables created successfully');
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
