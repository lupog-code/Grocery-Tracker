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

                <TouchableOpacity style={{width:'28%'}}>
                    <Text style={commStyle.gobackText}>Home</Text>
                </TouchableOpacity>

                <View style={{width:'43%'}}>
                    <Text style={commStyle.homeTitle2} >Home Page</Text>
                </View>

                <View style={{width:'28%'}}/>
            </View>

                <FlatList
                    data={lists}
                    renderItem={({ item }) => <List id={item.id} name={item.name} />}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}/>

            <AddListBtn/>
        </View>
    );
}

export default ListsScreen;