import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable , SafeAreaView   } from 'react-native';
import { listItemStyles } from '../styles/ListItemStyle';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Modelliamo list come un oggetto javascript definito in questo modo: 
/*

list:{
        id: id_lista
        title: titolo_lista
        items:[
                {
                    name:nome_prodotto1,
                    price:prezzo_prodotto1,
                    quantity:quantità,
                    category:categoria
                }

                {
                
                ITEM2

                } ...

        ]
}

*/
const ListItem = ({ list , onDelete }) => {

    const navigation = useNavigation(); //Usato quando al press del list item vogliamo navigare nella schermata in cui ci sono tutti i prodotti della lista selezionata 


    //Gestione dell'eliminazione di una lista: 
    const handleDelete = () =>{
        Alert.alert(`Are you sure you want to delete ${list.title}?`, "This operation is irreversible", [
            {
                text:'Cancel',
                onPress:()=>{return;}
            },
            {
                text:'OK',
                onPress:()=>{onDelete(list.id)} //onDelete , funzione passata dalla HomeScreen , in cui ho tutte le liste , quindi passo l'id della lista cliccata e la elimino nella HomeScreen
            }
        ])
    }


    //Al press sulla singola lista , devo poter vedere tutti gli "ShoppingListItem" della lista cliccata , o in una nuova schermata con un navigator o con popup
    const goToDetails = ()=>{
            navigation.navigate("SingleListScreen",list);
    }



    return (
        <TouchableOpacity 
            onPress={goToDetails}
            activeOpacity={0.7}
        >
            <View style={{
                backgroundColor: 'white',
                padding: 19,
                marginVertical: 8,
                marginHorizontal: 16,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#ddd',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0,
                shadowRadius: 3,
                elevation: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    flex: 1 }}>
                    {list.title}
                </Text>

                <TouchableOpacity onPress={goToDetails}>
                    <View style={{
                        marginRight: 15,
                        borderWidth: 1,
                        padding: 5,
                        borderRadius: 6,
                        borderColor: '#33906A',
                        opacity: 0.8,
                        backgroundColor: '#33906A',
                    }}>
                        <Ionicons name="cart" size={24} color="white" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete}>
                    <View style={{
                        borderWidth: 1,
                        padding: 5,
                        borderRadius: 6,
                        borderColor: '#33906A',
                    }}>
                        <Ionicons name="trash" size={24} color="#33906A" />
                    </View>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}



export default ListItem;