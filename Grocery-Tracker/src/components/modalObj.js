import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, Button, Alert } from 'react-native';
import btnStyle from '../styles/btnStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import {inserisciLista, inserisciItem, getItemsByListId, modificaItem, rimuoviItem} from '../data/db';
import { getCategorie } from '../data/db';


function checkFields(name, quantity, price, category) {
    if (name === '' || quantity === '' || price === '' || category === '') {
        Alert.alert("Error", "Please fill in all fields");
        return false;
    }
    if (isNaN(quantity) || isNaN(price)) {
        Alert.alert("Error", "Quantity and Price must be numbers");
        return false;
    }
    if (parseInt(quantity) <= 0 || parseFloat(price) <= 0) {
        Alert.alert("Error", "Quantity and Price must be greater than 0");
        return false;
    }
    if (category === '') {
        Alert.alert("Error", "Please select a category");
        return false;
    }
    return true;
}

export const PopUp_AddProduct = ({ visible, setVisible, setItems, listID }) => {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [open, setOpen] = useState(false);
    const [pickerItems, setPickerItems] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategorie();
                const formattedData = data.map(item => ({
                    label: item.name,
                    value: item.name
                }));
                setPickerItems(formattedData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const addProduct = async () => {
        try {
            if (!checkFields(name, quantity, price, category)) {
                return;
            }

            await inserisciItem(name.trim(), quantity, price, category, listID);
            const data = await getItemsByListId(listID);
            setItems(data);

            setName('');
            setQuantity('');
            setPrice('');
            setCategory('');

            setVisible(false);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={() => setVisible(false)}
            animationType="slide"
        >
            <TouchableOpacity
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
                activeOpacity={1}
                onPressOut={() => setVisible(false)}
            >
                <View style={btnStyle.popUp_product}>
                    <View style={btnStyle.topModal}>
                        <Text style={btnStyle.TopModalTitle}>New Product</Text>
                    </View>

                    <TextInput
                        style={btnStyle.textInput}
                        placeholder="Name"
                        onChangeText={val => setName(val)}
                        value={name}
                        placeholderTextColor="#d0d0d0"
                    />

                    <TextInput
                        style={btnStyle.textInput}
                        placeholder="Quantity"
                        keyboardType="numeric"
                        onChangeText={val => setQuantity(val)}
                        value={quantity}
                        placeholderTextColor="#d0d0d0"
                    />

                    <TextInput
                        style={btnStyle.textInput}
                        placeholder="Price per unit"
                        onChangeText={val => setPrice(val)}
                        value={price}
                        placeholderTextColor="#d0d0d0"
                    />

                    <View>
                        <DropDownPicker
                            open={open}
                            value={category}
                            items={pickerItems}
                            setOpen={setOpen}
                            setValue={setCategory}
                            setItems={setPickerItems}
                            placeholder="Select a category..."
                            style={[btnStyle.pickerInput]}
                            dropDownContainerStyle={{ borderColor: '#20385E', marginTop: 20 }}
                            textStyle={{ fontSize: 15, color: '#20385E' }}
                            placeholderStyle={{ color: '#d0d0d0' }}
                            selectedItemLabelStyle={{ color: 'white' }}
                            selectedItemContainerStyle={{ backgroundColor: '#20385E' }}
                            selectedItemTextStyle={{ color: 'white' }}
                            placeholderTextColor="#d0d0d0"
                        />
                    </View>

                    <TouchableOpacity
                        style={btnStyle.saveButton}
                        onPress={addProduct}
                        activeOpacity={0.7}
                    >
                        <Text style={btnStyle.saveButtonText}>Add Product</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export const PopUp_editProduct = ({ namein, quantityin, pricein, categoryin, visible, setVisible, idProduct, onEdit }) => {

    const [name, setName] = useState(namein);
    const [quantity, setQuantity] = useState(quantityin);
    const [price, setPrice] = useState(pricein);
    const [category, setCategory] = useState(categoryin);
    const [open, setOpen] = useState(false);
    const [pickerItems, setPickerItems] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategorie();
                const formattedData = data.map(item => ({
                    label: item.name,
                    value: item.name
                }));
                setPickerItems(formattedData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

  useEffect(() => {
    if (visible) {
        setName(namein || '');
        setQuantity(String(quantityin || ''));
        setPrice(String(pricein || ''));
        setCategory(categoryin || '');
    }
}, [visible, namein, quantityin, pricein, categoryin]);

    const deleteProduct = (idProduct) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this product? This action cannot be undone.",
            [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Delete",
                onPress: async () => {
                try {
                    await rimuoviItem(idProduct);
                    setVisible(false);
                    onEdit();
                } catch (error) {
                    console.error("Error deleting product:", error);
                }
                }
            }
            ]
        );
    };

    const saveEdits = (idProduct) => {
        Alert.alert(
            "Confirm Edit",
            "Are you sure you want to update this product?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Save",
                    onPress: async () => {
                        if (!checkFields(name, quantity, price, category)) {
                            return;
                        }

                        try {
                            await modificaItem(idProduct, name.trim(), quantity, price, category);
                            setVisible(false);
                            onEdit();
                        } catch (error) {
                            console.error("Error saving product:", error);
                        }
                    }
                }
            ]
        );
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={() => setVisible(false)}
            animationType="slide"
            
        >
            <TouchableOpacity
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
                activeOpacity={1}
                onPressOut={() => setVisible(false)}
            >
                <View style={btnStyle.popUp_productEdit}>
                    <View style={btnStyle.topModal}>
                        <Text style={btnStyle.TopModalTitle}>Edit Product</Text>
                    </View>

                    <TextInput
                        style={btnStyle.textInput}
                        placeholder="Name"
                        value={name}
                        onChangeText={val => setName(val)}
                        placeholderTextColor="#d0d0d0"
                    />

                    <TextInput
                        style={btnStyle.textInput}
                        placeholder="Quantity"
                        keyboardType="numeric"
                        value={quantity}
                        onChangeText={val => setQuantity(val)}
                        placeholderTextColor="#d0d0d0"
                    />

                    <TextInput
                        style={btnStyle.textInput}
                        placeholder="Price"
                        value={price}
                        onChangeText={val => setPrice(val)}
                        placeholderTextColor="#d0d0d0"
                    />

                    <View>
                        <DropDownPicker
                            open={open}
                            value={category}
                            items={pickerItems}
                            setOpen={setOpen}
                            setValue={setCategory}
                            setItems={setPickerItems}
                            placeholder="Select a category..."
                            style={[btnStyle.pickerInput]}
                            dropDownContainerStyle={{ borderColor: '#20385E', marginTop: 20 }}
                            textStyle={{ fontSize: 15, color: '#20385E' }}
                            placeholderStyle={{ color: '#d0d0d0' }}
                            selectedItemLabelStyle={{ color: 'white' }}
                            selectedItemContainerStyle={{ backgroundColor: '#20385E' }}
                            selectedItemTextStyle={{ color: 'white' }}
                            placeholderTextColor="#d0d0d0"
                        />
                    </View>

                    <TouchableOpacity
                        style={btnStyle.saveButton}
                        onPress={() => saveEdits(idProduct)}
                        activeOpacity={0.7}
                    >
                        <Text style={btnStyle.saveButtonText}>Save Edits</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={btnStyle.deleteButton}
                        onPress={() => deleteProduct(idProduct)}
                        activeOpacity={0.7}
                    >
                        <Text style={btnStyle.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export const PopUp_AddList = ({ onAdd, visible, setVisible }) => {

    const [name, setName] = useState('');

    const inserisciNuovaLista = async () => {
        if (name.trim() === '') {
            Alert.alert("Please enter a name for the list");
            return;
        }
        try {
            await inserisciLista(name.trim());
            setVisible(false);
            setName('');
            onAdd(); 
        } catch (error) {
            console.error("Error adding list:", error);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={() => setVisible(false)}
            animationType="slide"
        >
            <TouchableOpacity
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
                activeOpacity={1}
                onPressOut={() => setVisible(false)}
            >
                <View style={btnStyle.popUp_list}>
                    <View style={btnStyle.topModal}>
                        <Text style={btnStyle.TopModalTitle}>New List</Text>
                    </View>

                    <TextInput
                        style={btnStyle.textInput}
                        placeholder="Name"
                        onChangeText={val => setName(val)}
                        value={name}
                        placeholderTextColor="#d0d0d0"
                    />

                    <Button style={{fontSize: 10}} title="Add List" onPress={inserisciNuovaLista} />
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export const PopUp_addCategory = ({ namein, visible, setVisible ,onAddCategory,categories }) => {

    const [name, setName] = useState(namein);
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit =  () => {
        if (categoryName === '') {
            Alert.alert('Error', 'Category name cannot be empty');
            return;
        }

        if (categories.some(category => category.name.toLowerCase() === categoryName.trim().toLowerCase())) {
            Alert.alert('Error', 'Category already exists');
            return;
        }

        try {
            onAddCategory(categoryName.trim());
            setVisible(false);
            setName('');
        } catch (error) {
            console.error("Error adding list:", error);
        }

        setCategoryName('');
        setVisible(false);
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={() => setVisible(false)}
            animationType="slide"
        >
            <TouchableOpacity
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
                activeOpacity={1}
                onPressOut={() => setVisible(false)}
            >
                <View style={btnStyle.popUp_list}>
                    <View style={btnStyle.topModal}>
                        <Text style={btnStyle.TopModalTitle}>Add Category</Text>
                    </View>

                    <TextInput
                        style={btnStyle.textInput}
                        placeholder="Category Name"
                        value={categoryName}
                        onChangeText={setCategoryName}
                        placeholderTextColor="#d0d0d0"
                    />

                    <Button title="Add Category" style={{fontSize: 10}} onPress={() => handleSubmit()} />


                </View>
            </TouchableOpacity>
        </Modal>
    );
};
