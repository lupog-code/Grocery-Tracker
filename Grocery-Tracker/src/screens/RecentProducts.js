import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { getUltimiDieciItemComprati } from '../data/db';
import {FlatList} from 'react-native';
import commStyle from "../styles/commonStyle";
import {OldProduct} from "../components/listObj";


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
                <TouchableOpacity style={commStyle.sideBlock} onPress={() => navigation.goBack()}>
                    <Text style={commStyle.gobackText}>Home</Text>
                </TouchableOpacity>

                <View style={commStyle.titleBlock}>
                    <Text style={commStyle.homeTitle2}>Recent Products</Text>
                </View>

                <View style={commStyle.sideBlock} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

            <FlatList
                data={prodotti}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <OldProduct id={item.id} name={item.name} quantity={item.quantity} price={item.price} category={item.category} data={item.data_compera}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            
        </ScrollView>


        </View>

    );
}
export default RecentProducts;
