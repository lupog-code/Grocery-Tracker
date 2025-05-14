import React, {useState} from "react";
import {Alert, Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import ListItemStyles from "../styles/ListItemStyle";


export const PopUpItem = () => {
    const [visible, setVisible] = useState(false);
    const [name,setName] = React.useState('');
    const [quantity,setQuantity] = React.useState('');
    const [price,setPrice] = React.useState('');
    const [category,setCategory] = React.useState('');

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

                <View style={ListItemStyles.popUp}>
                    <View style={ListItemStyles.topModal}>
                        <Text style={ListItemStyles.TopModalTitle}>New Product</Text>
                    </View>

                    <View style={{marginTop: 30}}/>
                    <TextInput style={ListItemStyles.textInput} placeholder={"Name"} onChangeText={(val)=>{setName(val)}}></TextInput>
                    <TextInput style={ListItemStyles.textInput} placeholder={"Quantity"} onChangeText={(val)=>{setQuantity(val)}} keyboardType="numeric"></TextInput>
                    <TextInput style={ListItemStyles.textInput} placeholder={"Price"} onChangeText={(val)=>{setPrice(val)}} keyboardType="numeric"></TextInput>
                    <TextInput style={ListItemStyles.textInput} placeholder={"Category"} onChangeText={(val)=>{setCategory(val)}}></TextInput>

                    <Text style={ListItemStyles.addProdBtn} onPress={()=>{
                        if(name !== "" && price !== "" && quantity !== "" && category!== ""){
                            items.push({name:name,price:price,quantity:quantity,category:category})
                            setVisible(false);
                            return;
                        }
                        Alert.alert("Error", "Please fill all fields to add a product");
                        return;
                    }}>Add Product</Text>
                </View>
            </TouchableOpacity>

        </Modal>
    );
}

export const PopUpList = () => {
    const [visible, setVisible] = useState(false);
    const [name,setName] = React.useState('');


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

                <View style={ListItemStyles.popUp}>
                    <View style={ListItemStyles.topModal}>
                        <Text style={ListItemStyles.TopModalTitle}>New Product</Text>
                    </View>

                    <View style={{marginTop: 30}}/>
                    <TextInput style={ListItemStyles.textInput} placeholder={"Name"} onChangeText={(val)=>{setName(val)}}></TextInput>


                    <Text style={ListItemStyles.addProdBtn} onPress={()=>{
                        if(name !== "" && price !== "" && quantity !== "" && category!== ""){
                            items.push({name:name,price:price,quantity:quantity,category:category})
                            setVisible(false);
                            return;
                        }
                        Alert.alert("Error", "Please fill all fields to add a product");
                        return;
                    }}>Add List </Text>
                </View>
            </TouchableOpacity>

        </Modal>
    );
}