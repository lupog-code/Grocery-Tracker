import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, Button, Alert } from 'react-native';
import btnStyle from '../styles/btnStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import { inserisciLista, inserisciItem, getItemsByListId, modificaItem, rimuoviItem } from '../data/db';

function checkFields(name, quantity, price, category) {
        if (name === '' || quantity === '' || price === '' || category === '') {
            alert("Please fill in all fields");
            return false;
        }
        if (isNaN(quantity) || isNaN(price)) {
            alert("Quantity and Price must be numbers");
            return false;
        }
        if (parseInt(quantity) <= 0 || parseFloat(price) <= 0) {
            alert("Quantity and Price must be greater than 0");
            return false;
        }
        if (category === '') {
            alert("Please select a category");
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
    const [pickerItems, setPickerItems] = useState([
        { label: 'Fruits', value: 'Fruits' },
        { label: 'Vegetables', value: 'Vegetables' },
        { label: 'Meat', value: 'Meat' },
        { label: 'Dairy', value: 'Dairy' },
        { label: 'Snacks', value: 'Snacks' },
        { label: 'Beverages', value: 'Beverages' },
        { label: 'Other', value: 'Other' },
    ]);

    const addProduct = async () => {
        try {
            if (!checkFields(name, quantity, price, category)) {
                return;
            }

            await inserisciItem(name, quantity, price, category, listID);
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
                    />

                    <TextInput
                        style={btnStyle.textInput}
                        placeholder="Quantity"
                        keyboardType="numeric"
                        onChangeText={val => setQuantity(val)}
                        value={quantity}
                    />

                    <TextInput
                        style={btnStyle.textInput}
                        placeholder="Price"
                        keyboardType="numeric"
                        onChangeText={val => setPrice(val)}
                        value={price}
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
                            textStyle={{ fontSize: 20, color: '#20385E' }}
                            placeholderStyle={{ color: 'gray' }}
                            selectedItemLabelStyle={{ color: 'white' }}
                            selectedItemContainerStyle={{ backgroundColor: '#20385E' }}
                            selectedItemTextStyle={{ color: 'white' }}
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

export const PopUp_editProduct = ({ namein, quantityin, pricein, categoryin, visible, setVisible, idProduct }) => {

    const [name, setName] = useState(namein);
    const [quantity, setQuantity] = useState(quantityin);
    const [price, setPrice] = useState(pricein);
    const [category, setCategory] = useState(categoryin);
    const [open, setOpen] = useState(false);
    const [pickerItems, setPickerItems] = useState([
        { label: 'Fruits', value: 'Fruits' },
        { label: 'Vegetables', value: 'Vegetables' },
        { label: 'Meat', value: 'Meat' },
        { label: 'Dairy', value: 'Dairy' },
        { label: 'Snacks', value: 'Snacks' },
        { label: 'Beverages', value: 'Beverages' },
        { label: 'Other', value: 'Other' },
    ]);

    useEffect(() => {
        if (visible) {
            setName(namein);
            setQuantity(quantityin);
            setPrice(pricein);
            setCategory(categoryin);
        }
    }, [visible, namein, quantityin, pricein, categoryin]);

    const deleteProduct = (idProduct) => {
        Alert.alert(
            "Sei sicuro di voler eliminare questo prodotto?",
            "Questa azione non può essere annullata",
            [
                {
                    text: "Annulla",
                    style: "cancel"
                },
                {
                    text: "Elimina",
                    onPress: async () => {
                        try {
                            await rimuoviItem(idProduct);
                            setVisible(false);
                            console.log("Deleted product with id: " + idProduct);
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
            "Salvare le modifiche?",
            "Sei sicuro di voler aggiornare questo prodotto?",
            [
                {
                    text: "Annulla",
                    style: "cancel"
                },
                {
                    text: "Salva",
                    onPress: async () => {
                        if (!checkFields(name, quantity, price, category)) {
                            return;
                        }

                        try {
                            await modificaItem(idProduct, name, quantity, price, category);
                            setVisible(false);
                            console.log("Saved product with id: " + idProduct);
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
                    />

                    <TextInput
                        style={btnStyle.textInput}
                        placeholder="Quantity"
                        keyboardType="numeric"
                        value={quantity}
                        onChangeText={val => setQuantity(val)}
                    />

                    <TextInput
                        style={btnStyle.textInput}
                        placeholder="Price"
                        keyboardType="numeric"
                        value={price}
                        onChangeText={val => setPrice(val)}
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
                            textStyle={{ fontSize: 20, color: '#20385E' }}
                            selectedItemLabelStyle={{ color: 'white' }}
                            selectedItemContainerStyle={{ backgroundColor: '#20385E' }}
                            selectedItemTextStyle={{ color: 'white' }}
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

export const PopUp_AddList = ({ visible, setVisible }) => {

    const [name, setName] = useState('');

    const inserisciNuovaLista = async () => {
        if (name === '') {
            return;
        }
        try {
            await inserisciLista(name);
            setVisible(false);
            setName('');
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
                    />

                    <Button title="Add List" onPress={inserisciNuovaLista} />
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export const PopUp_editList = ({ namein, visible, setVisible }) => {
    const [name, setName] = useState(namein);

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
                        <Text style={btnStyle.TopModalTitle}>Edit List</Text>
                    </View>

                    <View style={{ marginTop: 30 }} />
                    <TextInput
                        style={btnStyle.textInput}
                        placeholder="Name"
                        value={name}
                        onChangeText={val => setName(val)}
                    />

                    <Text style={btnStyle.addBtn}>Edit List</Text>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};