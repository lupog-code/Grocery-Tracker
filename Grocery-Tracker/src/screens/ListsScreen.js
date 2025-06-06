import React, { useState, useCallback, useRef } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import commStyle from '../styles/commonStyle';
import { List } from "../components/listObj";
import { AddListBtn } from "../components/btnsObj";
import { getListe, rimuoviLista } from '../data/db';
import { useFocusEffect } from '@react-navigation/native';
import { FallbackList } from '../components/fallback';
import * as Animatable from 'react-native-animatable';

const ListsScreen = () => {
  const [lists, setLists] = useState([]);
  const openRef = useRef(null); //useRef restituisce un oggetto js che ha una proprietà detta: current , che 
  //quando viene settato all'inizio è null , e poi può essere assegnata ad un riferimento costante , infatti il valore non cambia per mezzo di re-rendering  


  //Funzione per gestire un solo elemento swipeable aperto alla volta. Infatti 
  //se esiste un elemento già aperto(openRef) ed è diverso da quello che stiamo per aprire(ref) , 
  //allora chiudiamo quello attualmente aperto 
  const onSwipeableOpen = (ref) => {
    if (openRef.current && openRef.current !== ref) {
      openRef.current.close();
    }
    openRef.current = ref;
  };


  //Funzione di callback ogni volta che si metta a focus la pagina 
  const fetchLists = async () => {
    try {
      const data = await getListe();
      setLists(data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLists();
    }, [])
  );



  const confirmDelete = async (id) => {
    try {
      await rimuoviLista(id);
      const data = await getListe();
      setLists(data);
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };


//Funzione di callback per eliminare una lista passata al componento List
  const handleDeleteList = async (id) => {
    try {
      Alert.alert(
        "Are you sure?",
        "This action cannot be undone.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            onPress: () => confirmDelete(id),
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
        <View style={{ width: '20%' }} />
        <View style={{ width: '60%' }}>
          <Text style={commStyle.homeTitle2}>📋 Your Lists</Text>
        </View>
        <View style={{ width: '20%' }} />
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
              <AddListBtn onAdd={fetchLists} />
            </Animatable.View>
          </View>
        </>
      ) : (
        <>
          <FlatList
            data={lists}
            renderItem={({ item }) => (
              <List onSwipeableOpen={onSwipeableOpen} onDelete={handleDeleteList} id={item.id} name={item.name} />
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            initialNumToRender={8}
          />
          <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
            <AddListBtn onAdd={fetchLists} />
          </View>
        </>
      )}
    </View>
  );
};

export default ListsScreen;