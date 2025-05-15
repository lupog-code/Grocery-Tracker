import React from 'react';
import {View, Text, Image, Touchable, TouchableOpacity, ScrollView, SafeAreaView, FlatList} from 'react-native';
import commStyle from '../styles/commonStyle';
import {Ionicons} from "@expo/vector-icons";
import {OldProduct , Product} from "../components/listObj";
import { Button } from 'react-native';
import { getItemsByListId } from '../data/db';
import { useState, useEffect } from 'react';

const ListsScreen = ({navigation , route}) => {
    const listId = route.params.id; //Ricevo l'id della lista
    const listName = route.params.name; //Ricevo il nome della lista
    const [products, setProducts] = useState([]); //Inizializzo la lista dei prodotti
    
    const fetchProducts = async () => {
        try {
            const data = await getItemsByListId(listId);
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

      const handleDelete = () => {
        fetchProducts(); // Refresh the list after deletion
    };

    return (
        <View style={commStyle.body}>

            <View style={commStyle.flexView2}>

                <TouchableOpacity style={{width:'28%'}} onPress={() => navigation.goBack()}>
                    <Text style={commStyle.gobackText}>Home</Text>
                </TouchableOpacity>

                <View style={{width:'43%'}}>
                    <Text style={commStyle.homeTitle2} >{listName}</Text>
                </View>

                <View style={{width:'28%'}}/>
            </View>



            <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                //Se l'elemento è stato comprato, mostra OldProduct, altrimenti mostra Product
                 item.comprato ?
                <OldProduct onDelete={handleDelete} id={item.id} name={item.name} quantity={item.quantity} price={item.price} category={item.category} data={item.data_compera} />
                :
                <Product onDelete={handleDelete} id={item.id} name={item.name} quantity={item.quantity} price={item.price} category={item.category} />
            )}
            >

            </FlatList>

                


        </View>
    );
}

export default ListsScreen;