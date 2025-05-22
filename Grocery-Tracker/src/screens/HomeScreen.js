import React from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, ScrollView} from 'react-native';
import commStyle from '../styles/commonStyle';
import {Ionicons} from "@expo/vector-icons";
import {List, Product, OldProduct, SmallOldProduct} from "../components/listObj";
import {AddListBtn} from "../components/btnsObj";
import { getUltimeDueListe } from '../data/db';
import { useState, useEffect, useCallback } from 'react';
import Fallback, {FallbackList} from '../components/fallback';
import { getUltimiDieciItemComprati } from '../data/db';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getListe } from '../data/db';
import { rimuoviLista } from '../data/db';
import { Alert } from 'react-native';
import { useRef } from 'react';

const HomeScreen = () => {
    const openRef = useRef(null);
    //Riceve il riferimento corrente 
   const onSwipeableOpen = (ref) => {
  if (openRef.current && openRef.current !== ref) {
    openRef.current.close();
  }
  openRef.current = ref; //Sposta il riferimento aperto a quello passato come corrente
};
    const [lists, setLists] = useState([]);
    const [products, setProducts] = useState([]);

    const handleDeleteList = async (id) => {
        try {
            Alert.alert(
                "Are you sure?",
                "This action cannot be undone.",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Delete",
                        onPress: async () => {
                            await rimuoviLista(id);
                            //Refresha le liste dopo l'eliminazione
                            const data = await getUltimeDueListe();
                            setLists(data);
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error("Error deleting list:", error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            const fetchLists = async () => {
                try {
                    const data = await getUltimeDueListe();
                    setLists(data);
                } catch (error) {
                    console.error("Error fetching lists:", error);
                }
            };
            fetchLists();
        }, [])
    );

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getUltimiDieciItemComprati();
                if(JSON.stringify(data) === JSON.stringify(products)) return;  //Controlla se i dati sono cambiati;
                setProducts(data); //Inizializza le due liste 
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [products])

    const handleAddList = () => {
        const fetchLists = async () => {
            try {
                const data = await getUltimeDueListe(); //Aggiorna le ultime due liste
                await getListe(); //Refresh delle liste totali 
                setLists(data);
            } catch (error) {
                console.error("Error fetching lists:", error);
            }
        };
        fetchLists();
    }

    const navigation = useNavigation();
    const goToRecentProducts = () => {
        navigation.navigate("RecentProducts", {products: products});
    }


    const saluto = () => {
        const data = new Date();
        const ora = data.getHours();
        if (ora < 12) {
            return "Good morning 🌅";
        } else if (ora < 18) {
            return "Good afternoon 🌞";
        } else {
            return "Good evening 🌙";
        }
    }

    return (
        <View style={commStyle.body}>

            <View style={commStyle.flexView}>
                <Text style={commStyle.homeTitle}>{saluto()}</Text>
                <TouchableOpacity onPress={() => {goToRecentProducts()}} >
                    <View style={commStyle.recentButton}>
                        <Ionicons name="time" style={commStyle.recentButtonIcon}/>
                    </View>
                </TouchableOpacity>
            </View>


            <SafeAreaView>
                <Image
                    source={require("../styles/background.png")}
                    style={commStyle.imgBackground}
                />
            </SafeAreaView>

            <ScrollView showsVerticalScrollIndicator={false}>


             {lists.length !== 0 && <Text style={commStyle.subTitle}>📝 Recent Lists</Text>}
             {lists.length === 0 && <FallbackList />}
                <FlatList
                scrollEnabled={false}
                data={lists}
                renderItem={({ item }) => (
                    <List onSwipeableOpen={onSwipeableOpen} id={item.id} name={item.name} onDelete={handleDeleteList} />
                )}
                keyExtractor={(item) => item.id.toString()}
                />

           




            </ScrollView>

            <AddListBtn onAdd={handleAddList} />

        </View>
    );
}

export default HomeScreen;