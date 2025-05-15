

import React, { use } from 'react';
import { View, Text } from 'react-native';
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
        console.log('Data fetched:', data);
    return (

        
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{data}</Text>
        </SafeAreaView>
    );
}

export default HomeScreen;