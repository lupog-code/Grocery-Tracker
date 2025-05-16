import React from 'react';
import {View, TextInput, SafeAreaView} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ✅ Icona importata correttamente
import { useState } from 'react';
import {Button, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';

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



    export const FilterBar = ({ setFiltri }) => {
        const [modalVisible, setModalVisible] = useState(false);
        const [category, setCategory] = useState('');
        const [minPrice, setMinPrice] = useState(null);
        const [maxPrice, setMaxPrice] = useState(null);

        const applyFilters = () => {
            setFiltri({ category, minPrice, maxPrice });
            setModalVisible(false);
        };

        return (
            <View style={styles.container}>
                <Button title="Open Filters" onPress={() => setModalVisible(true)} />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Enter Filters</Text>
                            <TextInput
                                style={styles.filterButton}
                                placeholder="Category"
                                value={category}
                                onChangeText={setCategory}
                            />
                            <TextInput
                                style={styles.filterButton}
                                placeholder="Max Price"
                                value={minPrice}
                                onChangeText={setMinPrice}
                            />
                            <TextInput
                                style={styles.filterButton}
                                placeholder="Max Price"
                                value={maxPrice}
                                onChangeText={setMaxPrice}
                            />
                            <Button title="Apply Filters" onPress={applyFilters} />
                            <Button title="Close" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            margin: 10,
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
            width: '80%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
            alignItems: 'center',
        },
        modalTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 20,
        },
        filterButton: {
            padding: 10,
            marginVertical: 5,
            backgroundColor: '#f0f0f0',
            borderRadius: 5,
            width: '100%',
            alignItems: 'center',
        },
});


