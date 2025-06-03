import React, { useState, useCallback, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, ScrollView, Alert } from 'react-native';
import commStyle from '../styles/commonStyle';
import { Ionicons } from "@expo/vector-icons";
import { List } from "../components/listObj";
import { AddListBtn } from "../components/btnsObj";
import { FallbackList } from '../components/fallback';
import { getUltimeDueListe, getUltimiDieciItemComprati, getListe, rimuoviLista } from '../data/db';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const HomeScreen = () => {
  const openRef = useRef(null);
  const onSwipeableOpen = (ref) => {
    if (openRef.current && openRef.current !== ref) {
      openRef.current.close();
    }
    openRef.current = ref;
  };

  const [lists, setLists] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchLists = async () => {
    try {
      const data = await getUltimeDueListe();
      setLists(data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await getUltimiDieciItemComprati();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

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
  };

  useFocusEffect(
    useCallback(() => {
      fetchLists();
      fetchProducts();
    }, [])
  );

  const navigation = useNavigation(); //Avremmo potuto mettere anche navigation passata come prop 
  
  const goToRecentProducts = () => {
    navigation.navigate("RecentProducts", { products: products }); //Quando andiamo ai prodotti recenti , passiamo a questa schermata la lista dei prodotti recenti
  };


  //Funzione per scrivere il saluto 
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
  };

  return (
    <View style={commStyle.body}>
      <View style={commStyle.flexView}>
        <Text style={commStyle.homeTitle}>{saluto()}</Text>
        <TouchableOpacity onPress={goToRecentProducts}>
          <View style={commStyle.recentButton}>
            <Ionicons name="time" style={commStyle.recentButtonIcon} />
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
        {lists.length !== 0 && (
          <Text style={commStyle.subTitle}>📝 Recent Lists</Text>
        )}
        {lists.length === 0 && <FallbackList />}
        <FlatList
          scrollEnabled={false}
          data={lists}
          renderItem={({ item }) => (
            <List
              onSwipeableOpen={onSwipeableOpen}
              id={item.id}
              name={item.name}
              onDelete={handleDeleteList}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>

      <AddListBtn onAdd={fetchLists} /*Funzione di callback per refreshare la home e prendere solo le ultime due aggiunte*/ />
    </View>
  );
};

export default HomeScreen;