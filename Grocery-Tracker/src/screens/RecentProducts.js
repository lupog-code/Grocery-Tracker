

import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import RecentProductItem from '../components/RecentProduct';
import { getUltimiDieciItemComprati } from '../data/db';
import { FlatList } from 'react-native';

//RecentProducts 
const RecentProducts = ({navigation , route}) => {
    const [prodotti , setProdotti] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getUltimiDieciItemComprati();
                setProdotti(data);
                console.log(data); 
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <Text>Recent Products</Text>
            <FlatList
                data={prodotti}
                renderItem={({ item }) => (
                    <RecentProductItem
                        id={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        date={item.data_compera}
                        category={item.category}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            
            <Button mode="contained" onPress={() => navigation.goBack()}>GO BACK</Button>
        </SafeAreaView>
    );
}
export default RecentProducts;
