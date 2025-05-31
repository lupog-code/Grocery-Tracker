import React, { useEffect, useState } from 'react';
import {View, Text, ScrollView , FlatList, Alert} from 'react-native';
import commStyle from '../styles/commonStyle';
import {FixedCategory, ModifiableCategory} from "../components/listObj";
import {getFixedCategorie, getModifiableCategorie} from '../data/db';
import { addCategory } from '../data/db';
import { rimuoviCategoria } from '../data/db';
import {AddCategoryBtn} from "../components/btnsObj";

const CategoriesScreen = () => {

    const [modCategory, setModCategory] = useState([]);
    const [fixedCategory, setFixedCategory] = useState([]);

    useEffect(() => {
            const fetchMod = async () => {
                try {
                    const data = await getModifiableCategorie();
                    console.log("Fetched lists:", data);
                    setModCategory(data);
                } catch (error) {
                    console.error("Error fetching lists:", error);
                }
            };
            fetchMod();
        }
        , [])

    useEffect(() => {
            const fetchMod = async () => {
                try {
                    const data = await getFixedCategorie();
                    console.log("Fetched lists:", data);
                    setFixedCategory(data);
                } catch (error) {
                    console.error("Error fetching lists:", error);
                }
            };
            fetchMod();
        }
        , [])

        //Funzione per aggiungere una categoria
        const handleAddCategory = async (categoryName) => {
            try {
                
                // Aggiungi la categoria al database
                await addCategory(categoryName);
                setModCategory((prevCategories) => [...prevCategories, { name: categoryName }]);
            } catch (error) {
                console.error("Error adding category:", error);
            }
        };

         //Funzione per eliminare una categoria
    const handledeleteCategory = async (categoryName) => {
        Alert.alert(
            "Delete Category",
            `Are you sure you want to delete ${categoryName}?\nAll tasks associated with this category will be deleted.`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            await rimuoviCategoria(categoryName);
                            //Refresha la lista delle categorie
                            const data = await getModifiableCategorie();
                            setModCategory(data);
                        } catch (error) {
                            console.error("Error deleting category:", error);
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <View style={commStyle.body}>

            <View style={commStyle.flexView2}>

                <View style={{width:'20%'}}/>

                <View style={{width:'60%'}}>
                    <Text style={commStyle.homeTitle2}>All Categories</Text>
                </View>

                <View style={{width:'20%'}}/>
            </View>


            <ScrollView
                style={{width: '100%'}}
                showsVerticalScrollIndicator={false}
            >

                <FlatList
                    data={modCategory}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <ModifiableCategory name={item.name} onDelete={handledeleteCategory} />
                    )}
                    keyExtractor={(item) => item.name.toString()}
                />

                <FlatList
                    data={fixedCategory}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <FixedCategory name={item.name} />
                    )}
                    keyExtractor={(item) => item.name.toString()}
                />

                <View style={{height:150}}/>
              
            </ScrollView>

            <AddCategoryBtn categories={modCategory} onAddCategory={handleAddCategory} />

        </View>
    );
}

export default CategoriesScreen;