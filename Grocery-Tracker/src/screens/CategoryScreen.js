import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, ScrollView , FlatList} from 'react-native';
import commStyle from '../styles/commonStyle';
import {FixedCategory, ModifiableCategory} from "../components/listObj";
import {getCategorie} from '../data/db';

const ListsScreen = (navigation , route) => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
            const fetchLists = async () => {
                try {
                    const data = await getCategorie();
                    console.log("Fetched lists:", data);
                    setCategory(data);
                } catch (error) {
                    console.error("Error fetching lists:", error);
                }
            };
            fetchLists();
        }
        , [])

    return (
        <View style={commStyle.body}>

            <View style={commStyle.flexView2}>
                <TouchableOpacity style={commStyle.sideBlock} onPress={() => navigation.go()}>
                    <Text style={commStyle.gobackText}>Home</Text>
                </TouchableOpacity>

                <View style={commStyle.titleBlock}>
                    <Text style={commStyle.homeTitle2}>Categories</Text>
                </View>

                <View style={commStyle.sideBlock} />
            </View>


            <ScrollView showsVerticalScrollIndicator={false}>

                <FlatList
                    data={category}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <FixedCategory name={item.name}  />
                    )}
                    keyExtractor={(item) => item.name.toString()}
                />

            </ScrollView>


        </View>
    );
}

export default ListsScreen;