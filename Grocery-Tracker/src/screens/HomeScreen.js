

import React, { use } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useEffect } from 'react';
import { getNumeroItemPerCategoria } from '../data/db';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';



const HomeScreen = () => {
  



    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const newData = await getNumeroItemPerCategoria();
                setData(newData);
               
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    
        return (

        
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                        <Text style={{ fontSize: 18 }}>{item.category}</Text>
                        <Text style={{ fontSize: 16 }}>Numero di prodotti: {item.count}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

export default HomeScreen;