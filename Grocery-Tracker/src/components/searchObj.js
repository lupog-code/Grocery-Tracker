import React from 'react';
import {View, TextInput, SafeAreaView} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useState } from 'react';
import {Button, Modal, Text, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import btnStyle from "../styles/btnStyle";

export const SearchBar = ({setSearchText}) => {
    return (
        <SafeAreaView>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: 'white',
                    borderWidth: 1,
                    borderRadius: 25,
                    paddingHorizontal: 19,
                    margin: 10,
                    backgroundColor: 'rgba(0,0,0,0)',
                }}
            >
                <TextInput
                    style={{
                        flex: 1,
                        height: 40,
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 15,
                    }}
                    onChangeText={setSearchText}
                    placeholder="Search..."
                    placeholderTextColor="#C3E0E5"
                />
                <View style={{ marginLeft: 10 }}>
                    <Text>
                        <Ionicons name="search" size={20} color="white" />
                    </Text>
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
        const [open, setOpen] = useState(false);

        const applyFilters = () => {
            setFiltri({ category, minPrice, maxPrice });
            setModalVisible(false);
        };

        const resetFilters = () => {
            setCategory('');
            setMinPrice(null);
            setMaxPrice(null);
            setFiltri({ category: '', minPrice: null, maxPrice: null });
            setModalVisible(false);
        };

        const [pickerItems, setPickerItems] = React.useState([
                { label: 'Fruits', value: 'Fruits' },
                { label: 'Vegetables', value: 'Vegetables' },
                { label: 'Meat', value: 'Meat' },
                { label: 'Dairy', value: 'Dairy' },
                { label: 'Snacks', value: 'Snacks' },
                { label: 'Beverages', value: 'Beverages' },
                { label: 'Other', value: 'Other' },
            ]);

        return (
            <View>
                <Button title="Open Filter" onPress={() => setModalVisible(true)} color="white" />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    
                >
                    <TouchableOpacity
                        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
                        activeOpacity={1}
                        onPressOut={() => setModalVisible(false)}
                    >
                    <View style={btnStyle.popUp_product}>
                            <Text style={btnStyle.TopModalTitle}>Enter Filters</Text>
                            <TextInput
                                style={btnStyle.textInput}
                                placeholder="Min Price"
                                value={minPrice}
                                onChangeText={setMinPrice}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={btnStyle.textInput}
                                placeholder="Max Price"
                                value={maxPrice}
                                onChangeText={setMaxPrice}
                                keyboardType="numeric"
                            />
                            <View>
                                <DropDownPicker
                                    open={open}
                                    value={category}
                                    items={pickerItems}
                                    setOpen={setOpen}
                                    setValue={setCategory}
                                    setItems={setPickerItems}
                                    placeholder="Category"

                                    style={btnStyle.pickerInput}
                                    dropDownContainerStyle={{ borderColor: '#20385E', marginTop: 20 }}
                                    textStyle={{ fontSize: 15, color: '#20385E' }}
                                    placeholderStyle={{ color: '#d0d0d0' }}
                                    selectedItemLabelStyle={{ color: 'white' }}
                                    selectedItemContainerStyle={{ backgroundColor: '#20385E' }}
                                    selectedItemTextStyle={{ color: 'white' }}
                                />
                            </View>

                        <TouchableOpacity
                            style={btnStyle.saveButton}
                            onPress={applyFilters}
                            activeOpacity={0.7}
                        >
                            <Text style={btnStyle.saveButtonText}>Apply Filter</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={btnStyle.deleteButton}
                            onPress={resetFilters}
                            activeOpacity={0.7}
                        >
                            <Text style={btnStyle.deleteButtonText}>Reset Filter</Text>
                        </TouchableOpacity>

                    </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    };

