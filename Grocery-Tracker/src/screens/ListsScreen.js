import React, { useEffect, useState } from 'react';
import {View, Text, Image, Touchable, TouchableOpacity, ScrollView, SafeAreaView, FlatList} from 'react-native';
import commStyle from '../styles/commonStyle';
import {Ionicons} from "@expo/vector-icons";
import {List} from "../components/listObj";
import {AddListBtn} from "../components/btnsObj";
import { getListe } from '../data/db';
import { getUltimeDueListe } from '../data/db';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const ListsScreen = () => {
    const [lists, setLists] = useState([]);

    function handleAddList() {
        const fetchUltimeDueListe = async () => {
            try {
                 await getUltimeDueListe();
                const data = await getListe();
                setLists(data); 
            } catch (error) {
                console.error("Error fetching lists:", error);
            }
        };
        fetchUltimeDueListe();
    }

 
useFocusEffect(
  useCallback(() => {
    const fetchLists = async () => {
      try {
        const data = await getListe();
        setLists(data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };
    fetchLists();
  }, [])
);

    return (
        <View style={commStyle.body}>
            <View style={commStyle.flexView2}>
                <View style={{width:'20%'}}/>
                <View style={{width:'60%'}}>
                    <Text style={commStyle.homeTitle2}>📋 Your Lists</Text>
                </View>
                <View style={{width:'20%'}}/>
            </View>

            <FlatList
                data={lists}
                renderItem={({ item }) => <List id={item.id} name={item.name} />}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}/>

            <AddListBtn onAdd={handleAddList} />
        </View>
    );
}

export default ListsScreen;