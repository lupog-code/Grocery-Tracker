import React, {useState} from 'react';
import {View, Text, TextInput, Modal, TouchableOpacity} from 'react-native';
import btnStyle from '../styles/btnStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import {Ionicons} from "@expo/vector-icons";
import {Button} from 'react-native'
import { inserisciLista , inserisciItem , getItemsByListId} from '../data/db';
import { useEffect } from 'react';
import { rimuoviItem } from '../data/db';



export const PopUp_AddProduct = ({ visible, setVisible, setItems , listID}) => {

    const addProduct = async () => {
        try {
            // Inserisci il nuovo prodotto
            await inserisciItem(name, quantity, price, category, listID);
            
            // Recupera la lista aggiornata dei prodotti
            const data = await getItemsByListId(listID);
            setItems(data);
            
            // Resetta i campi del form
            setName('');
            setQuantity('');
            setPrice('');
            setCategory('');
            
            // Chiudi il modal
            setVisible(false);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };



    const [name,setName] = React.useState('');
    const [quantity,setQuantity] = React.useState();
    const [price,setPrice] = React.useState('');
    const [category,setCategory] = React.useState('');
    const [open, setOpen] = React.useState(false);
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
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={()=> setVisible(false)}
            animationType="slide">

            <TouchableOpacity
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
                activeOpacity={1}
                onPressOut={() => setVisible(false)} // chiude se clicchi fuori
            >

                <View style={btnStyle.popUp_product}>
                    <View style={btnStyle.topModal}>
                        <Text style={btnStyle.TopModalTitle}>New Product</Text>
                    </View>

                    <TextInput style={btnStyle.textInput} placeholder={"Name"} onChangeText={(val)=>{setName(val)}} />
                    <TextInput style={btnStyle.textInput} placeholder={"Quantity"} onChangeText={(val)=>{setQuantity(val)}} keyboardType="numeric" />
                    <TextInput style={btnStyle.textInput} placeholder={"Price"} onChangeText={(val)=>{setPrice(val)}} keyboardType="numeric" />
                    <View>
                        <DropDownPicker
                            open={open}
                            value={category}
                            items={pickerItems}
                            setOpen={setOpen}
                            setValue={setCategory}
                            setItems={setPickerItems}
                            placeholder="Select a category..."
                            style={[
                                btnStyle.pickerInput
                            ]}
                            dropDownContainerStyle={{ borderColor: '#20385E', marginTop: 20 }}
                            textStyle={{ fontSize: 20, color: '#20385E' }}
                            placeholderStyle={{ color: 'gray' }}
                            selectedItemLabelStyle={{ color: 'white' }}
                            selectedItemContainerStyle={{ backgroundColor: '#20385E'}}
                            selectedItemTextStyle={{ color: 'white' }}
                        />
                    </View>

                    <TouchableOpacity
                        style={btnStyle.saveButton}
                        onPress={()=>{addProduct()}}
                        activeOpacity={0.7}
                    >
                        <Text style={btnStyle.saveButtonText}>Add Product</Text>
                    </TouchableOpacity>

                </View>
            </TouchableOpacity>

        </Modal>
    );
}

export const PopUp_editProduct = ({namein, quantityin, pricein, categoryin, visible, setVisible, items , idProduct , onDelete }) => {
//Functions
 async function deleteProduct(id){
        try {
           
            setVisible(false);
            if (onDelete) {
                onDelete(); // Call the refresh callback
            }
            console.log("Deleted product with id: " + id);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }

    //States
    const [name,setName] = React.useState(namein);
    const [quantity,setQuantity] = React.useState(quantityin);
    const [price,setPrice] = React.useState(pricein);
    const [category,setCategory] = React.useState(categoryin);
    const [open, setOpen] = React.useState(false);
    const [pickerItems, setPickerItems] = React.useState([
        { label: 'Fruits', value: 'Fruits' },
        { label: 'Vegetables', value: 'Vegetables' },
        { label: 'Meat', value: 'Meat' },
        { label: 'Dairy', value: 'Dairy' },
        { label: 'Snacks', value: 'Snacks' },
        { label: 'Beverages', value: 'Beverages' },
        { label: 'Other', value: 'Other' },
    ]);

//ComponentDidMount
    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={()=> setVisible(false)}
            animationType="slide">

            <TouchableOpacity
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
                activeOpacity={1}
                onPressOut={() => setVisible(false)} // chiude se clicchi fuori
            >

                <View style={btnStyle.popUp_productEdit} >
                    <View style={btnStyle.topModal}>
                        <Text style={btnStyle.TopModalTitle}>Edit Product</Text>
                    </View>

                    <TextInput style={btnStyle.textInput} value={name} onChangeText={(val)=>{setName(val)}} placeholder={"Name"}  />
                    <TextInput style={btnStyle.textInput} placeholder={"Quantity"} onChangeText={(val)=>{setQuantity(val)}}  keyboardType="numeric" />
                    <TextInput style={btnStyle.textInput} placeholder={"Price"} onChangeText={(val)=>{setPrice(val)}} keyboardType="numeric" />
                    <View>
                        <DropDownPicker
                            onChangeValue={(val)=>{setCategory(val)}}
                            open={open}
                            value={category}
                            items={pickerItems}
                            setOpen={setOpen}
                            setValue={setCategory}
                            setItems={setPickerItems}
                            placeholder="Select a category..."
                            style={[
                                btnStyle.pickerInput
                            ]}
                            dropDownContainerStyle={{ borderColor: '#20385E', marginTop: 20 }}
                            textStyle={{ fontSize: 20, color: '#20385E' }}

                            selectedItemLabelStyle={{ color: 'white' }}
                            selectedItemContainerStyle={{ backgroundColor: '#20385E'}}
                            selectedItemTextStyle={{ color: 'white' }}
                        />
                    </View>

                    <TouchableOpacity
                        style={btnStyle.saveButton}
                        onPress={() => saveEdits()}
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
}

export const PopUp_AddList = ({ visible, setVisible, items }) => {
    
   const inserisciNuovaLista = async () => {
    try {
        await inserisciLista(name);
        setVisible(false); // magari nascondi il popup dopo l'aggiunta
    } catch (error) {
        console.error("Error adding list:", error);
    }
};
    
    const [name,setName] = useState('');


    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={()=> setVisible(false)}
            animationType="slide">

            <TouchableOpacity
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
                activeOpacity={1}
                onPressOut={() => setVisible(false)} // chiude se clicchi fuori
            >

                <View style={btnStyle.popUp_list}>
                    <View style={btnStyle.topModal}>
                        <Text style={btnStyle.TopModalTitle}>New List</Text>
                    </View>

                    <TextInput style={btnStyle.textInput} placeholder={"Name"} onChangeText={(val)=>{setName(val)}} />

                    <Button  title="Add List" onPress={()=>{inserisciNuovaLista()}}></Button>
                </View>
            </TouchableOpacity>

        </Modal>
    );
}

export const PopUp_editList = ({ namein, visible, setVisible, items }) => {
    const [name,setName] = React.useState(namein);


    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={()=> setVisible(false)}
            animationType="slide">

            <TouchableOpacity
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
                activeOpacity={1}
                onPressOut={() => setVisible(false)} // chiude se clicchi fuori
            >

                <View style={btnStyle.popUp_list}>
                    <View style={btnStyle.topModal}>
                        <Text style={btnStyle.TopModalTitle}>Edit List</Text>
                    </View>

                    <View style={{marginTop: 30}}/>
                    <TextInput style={btnStyle.textInput} placeholder={"Name"} value={name} onChangeText={(val)=>{setName(val)}} />

                    <Text style={btnStyle.addBtn}>Edit List</Text>
                </View>
            </TouchableOpacity>

        </Modal>
    );
}