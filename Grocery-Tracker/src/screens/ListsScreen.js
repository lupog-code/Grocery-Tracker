import React from 'react';
import {Text, View, SafeAreaView, FlatList, TouchableOpacity, Modal, TextInput, Alert} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SingleListScreen from './SingleListScreen'
import ListStackNavigator from '../navigation/MainStackNavigator';
import ListItem from '../components/ListItem';
import { sampleLists } from './HomeScreen';
import listItemStyles from '../styles/ListItemStyle';
import ListItemStyles from "../styles/ListItemStyle";
import {PopUpList} from '../components/PopUp';

function ListsScreen() {


    return (

        <SafeAreaView style={listItemStyles.body}>
            <PopUpList> </PopUpList>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 15,
            }}>
            <Text style={listItemStyles.title}>Lists</Text>

            <TouchableOpacity>
                <View style={listItemStyles.addLista}>
                    <Text style={listItemStyles.plusTextLista}>+</Text>
                </View>
            </TouchableOpacity>
            </View>

            <FlatList
                data={sampleLists}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ListItem list={item} />
                )}
            />
        </SafeAreaView>
    );
}

export default ListsScreen;