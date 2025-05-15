import React from 'react';
import {View, Text, Image, Touchable, TouchableOpacity, SafeAreaView, FlatList, ScrollView} from 'react-native';
import commStyle from '../styles/commonStyle';
import {Ionicons} from "@expo/vector-icons";
import {List, Product, OldProduct} from "../components/listObj";
import {AddListBtn} from "../components/btnsObj";
import { getUltimeDueListe } from '../data/db';
import { useState, useEffect } from 'react';
import Fallback from '../components/fallback';

const HomeScreen = () => {
    const [lists, setLists] = useState([]);
    
    
    useEffect(() => {
        const fetchLists = async () => {
            try {
                const data = await getUltimeDueListe();
                setLists(data); //Inizializza le due liste 
            } catch (error) {
                console.error("Error fetching lists:", error);
            }
        };
        fetchLists();
    })


    return (
        <View style={commStyle.body}>

            <View style={commStyle.flexView}>
                <Text style={commStyle.homeTitle}>Home Page</Text>
                <TouchableOpacity>
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

            <ScrollView>
               
                
            <Text style={commStyle.subTitle}>Recent Lists</Text>
             {lists.length === 0 && <Fallback />}
                <FlatList
                scrollEnabled={false}
                data={lists}
                renderItem={({ item }) => (
                    <List id={item.id} name={item.name} />
                )}
                keyExtractor={(item) => item.id.toString()}
                />

            <Text style={commStyle.subTitle}>Recent Products</Text>
                <Product name="Prodotto 1" quantity={3} price={2.3} category="Fruit" />
                <OldProduct name="Prodotto 2" quantity={3} price={2.3} category="Vegetables" data="11/07/25" />

                <View style={{height: 400}}/>

            </ScrollView>

            <AddListBtn />

        </View>
    );
}

export default HomeScreen;