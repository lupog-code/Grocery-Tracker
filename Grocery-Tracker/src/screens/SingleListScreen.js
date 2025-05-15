import React from 'react';
import {View, Text, Image, Touchable, TouchableOpacity, ScrollView, SafeAreaView, FlatList} from 'react-native';
import commStyle from '../styles/commonStyle';
import {Ionicons} from "@expo/vector-icons";
import {OldProduct , Product} from "../components/listObj";
import { Button } from 'react-native';
import { getItemsByListId ,getByName} from '../data/db';
import { useState, useEffect } from 'react';
import { SearchBar } from '../components/search';
import { AddProductBtn } from '../components/btnsObj';

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

    const [visualizableProducts, setVisualizableProducts] = useState(products); //Inizializzo la lista dei prodotti visualizzabili
    const [searchText, setSearchText] = useState(''); 

    useEffect(() => {
        if (searchText.trim() === '') {
            // Se la search bar è vuota, mostra tutti i prodotti
            setVisualizableProducts(products);
        } else {
            // Altrimenti filtra
            const filteredProducts = products.filter(item =>
                item.name.toLowerCase().includes(searchText.toLowerCase())
            );

            //DOVRESTI FILTRARE ANCHE PER CATEGORIA.
            //E PER PREZZO
            setVisualizableProducts(filteredProducts);
        }
    }, [searchText, products]);
    
    
    
    return (
        <View style={commStyle.body}>
            {/*<SearchBar searchText = {searchText} setSearchText={setSearchText}> </SearchBar>
            come data nella flatList ci va visualizableProducts*/}
            <View style={commStyle.flexView2}>

                <TouchableOpacity style={{width:'28%'}} onPress={() => navigation.goBack()}>
                    <Text style={commStyle.gobackText}>Home</Text>
                </TouchableOpacity>

                <View style={{width:'43%'}}>
                    <Text style={commStyle.homeTitle2} >{listName}</Text>
                </View>

                <View style={{width:'28%'}}/>
            </View>


            <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
                //Se l'elemento è stato comprato, mostra OldProduct, altrimenti mostra Product
                 item.comprato ?
                <OldProduct onDelete={handleDelete} id={item.id} name={item.name} quantity={item.quantity} price={item.price} category={item.category} data={item.data_compera} />
                :
                <Product onDelete={handleDelete} id={item.id} name={item.name} quantity={item.quantity} price={item.price} category={item.category} />
            )}
            >

            </FlatList>

            </ScrollView>
                
           <AddProductBtn setItems={setProducts} listID={listId} /> 

        </View>
    );
}

export default ListsScreen;