import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, FlatList, Alert, TextInput} from 'react-native';
import commStyle from '../styles/commonStyle';
import { Product} from "../components/listObj";
import { getItemsByListId } from '../data/db';
import { useState, useEffect } from 'react';
import { SearchBar ,FilterBar} from '../components/searchObj';
import { AddProductBtn } from '../components/btnsObj';
import { rimuoviLista } from '../data/db';
import { getCostoTotalePerLista, getItemsCompratiByListId, modificaLista } from '../data/db';
import {FallbackSingleList} from '../components/fallback';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/native';


const ListsScreen = ({navigation , route}) => {
    const listId = route.params.id;
    const listName = route.params.name; 
    const [isEditingName, setIsEditingName] = useState(false);
    const [editableName, setEditableName] = useState(listName);
    const [products, setProducts] = useState([]); 
    const [productsComprati, setProductsComprati] = useState([]);
    const [costoTotale, setCostoTotale] = useState(0);

    const fetchCostoTotale = async () => {
        try {
            const costo = await getCostoTotalePerLista(listId);
            setCostoTotale(costo || 0); 
        } catch (error) {
            console.error("Error fetching total cost:", error);
        }
    };

    useFocusEffect(
      React.useCallback(() => {
          fetchCostoTotale();
      }, [listId, productsComprati])
    );

    const refreshComprati = async () => {
        try {
            const data = await getItemsCompratiByListId(listId);
            setProductsComprati(data);
        } catch (error) {
            console.error("Error refreshing comprati items:", error);
        }
    };

    const fetchProducts = async () => {
        try {
            const data = await getItemsByListId(listId);
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useFocusEffect(
      React.useCallback(() => {
          fetchProducts();
      }, [])
    );

    const confirmDeleteList = async () => {
        try {
            await rimuoviLista(listId);
            navigation.goBack();
        } catch (error) {
            console.error("Error deleting list:", error);
            Alert.alert(
                "Error",
                "Could not delete the list. Please try again."
            );
        }
    };

    const handleDeleteList = () => {
        Alert.alert(
            "Delete List",  
            "Are you sure you want to delete this list? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: confirmDeleteList
                }
            ],
            {
                cancelable: true,
                onDismiss: () => {}
            }
        );
    };

    useEffect(() => {
        const updateListName = async () => {
            try {
                if (editableName == listName && editableName.trim() == '') {
                    return;
                }
                await modificaLista(listId, editableName.trim());
                setEditableName(editableName.trim());
            } catch (error) {
                console.error("Error updating list name:", error);
            }
        };
        updateListName();
    }, [isEditingName]);

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
                    <Text style={commStyle.gobackText}>Back</Text>
                </TouchableOpacity>

                <View style={commStyle.titleBlock}>
                  {isEditingName ? (
                    <TextInput
                      style={[commStyle.homeTitle2, { borderBottomWidth: 1 }]}
                      value={editableName}
                      onChangeText={setEditableName}
                      autoFocus
                      onBlur={() => setIsEditingName(false)}
                      onSubmitEditing={() => setIsEditingName(false)}
                    />
                  ) : (
                    <TouchableOpacity onPress={() => setIsEditingName(true)}>
                      <Text style={commStyle.homeTitle2}>{editableName}</Text>
                    </TouchableOpacity>
                  )}
                </View>
                
                <TouchableOpacity style={commStyle.sideBlock} onPress={() => handleDeleteList(listId)}>
                    <Text style={commStyle.deleteText}>Delete</Text>
                </TouchableOpacity>
            </View>
            
           {products.length !== 0 ? (
                <>
                    <SearchBar setSearchText={setSearchText} />
                    <FilterBar setFiltri={setFiltri} />

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <FlatList
                          data={visualizableProducts}
                          keyExtractor={(item) => item.id.toString()}
                          scrollEnabled={false}
                          renderItem={({ item }) => (
                            <Product
                              id={item.id}
                              name={item.name}
                              quantity={item.quantity}
                              price={item.price}
                              category={item.category}
                              state={item.comprato}
                              onUpdate={refreshComprati}
                              onEdit={() => { fetchProducts(); fetchCostoTotale(); }}
                            />
                          )}
                        />

                        <View style={{height: 150}} />
                    </ScrollView>

                    <View style={commStyle.bottomInfoBar}>
                        <AddProductBtn setItems={setProducts} listID={listId} />

                        <View style={commStyle.totalCostContainer}>
                            <Text style={commStyle.totalCostText}>${costoTotale.toFixed(2)}</Text>
                        </View>
                    </View>

                </>
            ) : (
                <View style={{ flex: 1 }}>
                    <FallbackSingleList />
                    <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                        <Animatable.View 
                            animation="swing" 
                            easing="ease-in-out" 
                            duration={1000} 
                            iterationCount="infinite" 
                            iterationDelay={1000}
                            useNativeDriver={true}
                            delay={300}
                            style={{ alignSelf: 'flex-end', borderRadius: 30, padding: 4 }}
                        >
                            <AddProductBtn setItems={setProducts} listID={listId} /> 
                        </Animatable.View>
                    </View>
                </View>
            )}
        </View>
    );
}

export default ListsScreen;