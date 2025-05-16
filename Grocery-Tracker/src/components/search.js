import React from 'react';
import {View, TextInput, SafeAreaView,Icon} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ✅ Icona importata correttamente

export const SearchBar = ({setSearchText}) => {
    return (
        <SafeAreaView>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    margin: 10,
                    backgroundColor: 'white', // Aggiunto per lo sfondo bianco
                }}
            >
                <TextInput
                    style={{
                        flex: 1,
                        height: 40,
                    }}
                    onChangeText={setSearchText}
                    placeholder="Search..."
                />
                <View style={{ marginLeft: 10 }}>
                    <Ionicons name="search" size={20} color="gray" /> {/* ✅ Icona corretta */}
                </View>
            </View>
        </SafeAreaView>
    );

}