import React from 'react';
import {View, Text, Image, Touchable, TouchableOpacity, ScrollView, SafeAreaView, FlatList, Alert} from 'react-native';
import commStyle from '../styles/commonStyle';
import {Ionicons} from "@expo/vector-icons";
import {OldProduct , Product} from "../components/listObj";
import { Button } from 'react-native';
import { getItemsByListId ,getByName, modificaItem} from '../data/db';
import { useState, useEffect } from 'react';
import { SearchBar ,FilterBar} from '../components/search';
import { AddProductBtn } from '../components/btnsObj';
import { rimuoviItem, rimuoviLista } from '../data/db';

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
    }, [products]);

    const handleDeleteList = (listId) => {
        Alert.alert(
            "Sei sicuro di voler eliminare questa lista?", 
            "Questa azione non può essere annullata", 
            [
                {
                    text: "Annulla",
                    style: "cancel"
                },
                {
                    text: "Elimina",
                    onPress: async () => {
                        try {
                            await rimuoviLista(listId);
                            navigation.goBack();
                        } catch (error) {
                            console.error("Error deleting product:", error);
                        }
                    }
                }
            ]
        );
    };

    const [visualizableProducts, setVisualizableProducts] = useState(products);
    const [searchText, setSearchText] = useState('');
    const [filtri, setFiltri] = useState({ category: '', minPrice: null, maxPrice: null });

    useEffect(() => {
        const { category, minPrice, maxPrice } = filtri;
        
        const filteredProducts = products.filter(item => {
            const matchName = item.name.toLowerCase().includes(searchText.toLowerCase());

            const matchCategory = category.trim() === '' 
                || item.category.toLowerCase().includes(category.toLowerCase());

            const matchMinPrice = minPrice === null || item.price >= minPrice;
            const matchMaxPrice = maxPrice === null || item.price <= maxPrice;

            return matchName && matchCategory && matchMinPrice && matchMaxPrice;
        });

        setVisualizableProducts(filteredProducts);
    }, [filtri, searchText, products]);

    
    
    
    return (
        <View style={commStyle.body}>

            <View style={commStyle.flexView2}>
                <TouchableOpacity style={commStyle.sideBlock} onPress={() => navigation.goBack()}>
                    <Text style={commStyle.gobackText}>Home</Text>
                </TouchableOpacity>

                <View style={commStyle.titleBlock}>
                    <Text style={commStyle.homeTitle2}>{listName}</Text>
                </View>

                <TouchableOpacity style={commStyle.sideBlock} onPress={() => handleDeleteList(listId)}>
                    <Text style={commStyle.deleteText}>Delete List</Text>
                </TouchableOpacity>
            </View>

            <SearchBar setSearchText={setSearchText} />
            <FilterBar setFiltri={setFiltri} />

            <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={visualizableProducts}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                item.comprato ?
                <OldProduct
                  id={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  price={item.price}
                  category={item.category}
                  data={item.data_compera}
                />
                :
                <Product
                  id={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  price={item.price}
                  category={item.category}
                />
              )}
            />

            </ScrollView>
                
           <AddProductBtn setItems={setProducts} listID={listId} /> 

        </View>
    );
}

export default ListsScreen;