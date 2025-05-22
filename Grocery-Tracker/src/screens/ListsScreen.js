import React, { useEffect, useState } from 'react';
import {View, Text, Image, Touchable, TouchableOpacity, ScrollView, SafeAreaView, FlatList, Alert} from 'react-native';
import commStyle from '../styles/commonStyle';
import {Ionicons} from "@expo/vector-icons";
import {List} from "../components/listObj";
import {AddListBtn} from "../components/btnsObj";
import { getListe } from '../data/db';
import { getUltimeDueListe } from '../data/db';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { FallbackList  } from '../components/fallback';
import { rimuoviLista } from '../data/db';
import * as Animatable from 'react-native-animatable';
import { useRef } from 'react';

const ListsScreen = () => {
    const [lists, setLists] = useState([]);
    const openRef = useRef(null); //Riferimento al componente aperto 
    const onSwipeableOpen = (ref) => {
      if (openRef.current && openRef.current !== ref) {
        openRef.current.close();
      }
      openRef.current = ref; //Spostiamo il nuovo riferimento
    };
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
                            // Refresha le liste dopo l'eliminazione
                            const data = await getListe();
                            setLists(data);
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error("Error deleting list:", error);
        }
    };

    return (
        <View style={commStyle.body}>
            <View style={commStyle.flexView2}>
                <View style={{width:'20%'}}/>
                <View style={{width:'60%'}}>
                    <Text style={commStyle.homeTitle2}>📋 Your Lists</Text>
                </View>
                <View style={{width:'20%'}}/>
            </View>

            {lists.length === 0 ? (
                <>
                    <FallbackList />
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
                            <AddListBtn onAdd={handleAddList} />
                        </Animatable.View>
                    </View>
                </>
            ) : (
                <>
                    <FlatList
                        data={lists}
                        renderItem={({ item }) => <List onSwipeableOpen={onSwipeableOpen} onDelete={handleDeleteList} id={item.id} name={item.name} />}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={8}
                    />
                     <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                         <AddListBtn onAdd={handleAddList} />
                     </View>
                </>
            )}
        </View>
    );
}

export default ListsScreen;