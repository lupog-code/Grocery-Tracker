import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, ScrollView , FlatList} from 'react-native';
import commStyle from '../styles/commonStyle';
import {FixedCategory, ModifiableCategory} from "../components/listObj";
import {getFixedCategorie, getModifiableCategorie} from '../data/db';

const ListsScreen = () => {
    const [fixCategory, setFixCategory] = useState([]);
    const [modCategory, setModCategory] = useState([]);

    useEffect(() => {
            const fetchFixed = async () => {
                try {
                    const data = await getFixedCategorie();
                    console.log("Fetched lists:", data);
                    setFixCategory(data);
                } catch (error) {
                    console.error("Error fetching lists:", error);
                }
            };
            fetchFixed();
        }
        , [])

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



    return (
        <View style={commStyle.body}>

            <View style={commStyle.flexView2}>
               

                <View style={commStyle.titleBlock}>
                    <Text style={commStyle.homeTitle2}>Categories</Text>
                </View>

                <View style={commStyle.sideBlock} />
            </View>


            <ScrollView showsVerticalScrollIndicator={false}>

                <FlatList
                    data={fixCategory}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <FixedCategory name={item.name}  />
                    )}
                    keyExtractor={(item) => item.name.toString()}
                />

                <FlatList
                    data={modCategory}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <ModifiableCategory name={item.name}  />
                    )}
                    keyExtractor={(item) => item.name.toString()}
                />

            </ScrollView>


        </View>
    );
}

export default ListsScreen;