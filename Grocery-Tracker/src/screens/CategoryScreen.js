import React, { useEffect, useState } from 'react';
import {View, Text, Image, Touchable, TouchableOpacity, ScrollView, SafeAreaView, FlatList} from 'react-native';
import commStyle from '../styles/commonStyle';
import {Ionicons} from "@expo/vector-icons";
import {List} from "../components/listObj";
import {AddListBtn} from "../components/btnsObj";
import { getListe } from '../data/db';

const ListsScreen = () => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
            const fetchLists = async () => {
                try {
                    const data = await getListe();
                    console.log("Fetched lists:", data);
                    setLists(data);
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
                <TouchableOpacity style={commStyle.sideBlock}>
                    <Text style={commStyle.gobackText}>Home</Text>
                </TouchableOpacity>

                <View style={commStyle.titleBlock}>
                    <Text style={commStyle.homeTitle2}>Categories</Text>
                </View>

                <View style={commStyle.sideBlock} />
            </View>


        </View>
    );
}

export default ListsScreen;