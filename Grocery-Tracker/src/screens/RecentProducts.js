import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import RecentProductItem from '../components/RecentProduct';
import { getUltimiDieciItemComprati } from '../data/db';
import {FlatList} from 'react-native';
import commStyle from "../styles/commonStyle";


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
        <View style={commStyle.body}>

            <View style={commStyle.flexView2}>
                <TouchableOpacity style={commStyle.sideBlock}>
                    <Text style={commStyle.gobackText}>Home</Text>
                </TouchableOpacity>

                <View style={commStyle.titleBlock}>
                    <Text style={commStyle.homeTitle2}>Recent Products</Text>
                </View>

                <View style={commStyle.sideBlock} />
            </View>

        <SafeAreaView style={{ flex: 1, padding: 20 }}>

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


        </View>

    );
}
export default RecentProducts;
