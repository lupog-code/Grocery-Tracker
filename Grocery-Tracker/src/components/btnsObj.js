import React, {useState} from 'react';
import {View, Text, Image, Switch, TouchableOpacity, Touchable} from 'react-native';
import btnStyle from '../styles/btnStyle';
import {PopUp_AddList, PopUp_AddProduct} from "./modalObj";

export const AddListBtn = () => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            {/* Modal separato dal bottone */}
            <PopUp_AddList visible={visible} setVisible={setVisible} items={null} />

            {/* Bottone */}
            <TouchableOpacity onPress={() => setVisible(true)}>
                <View style={btnStyle.insertBtnView}>
                    <Text style={btnStyle.insertBtnText}>+ Add List</Text>
                </View>
            </TouchableOpacity>
        </>
    );
}

export const AddProductBtn = () => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            {/* Modal separato dal bottone */}
            <PopUp_AddProduct visible={visible} setVisible={setVisible} items={null} />

            {/* Bottone */}
            <TouchableOpacity onPress={() => setVisible(true)}>
                <View style={btnStyle.insertBtnView}>
                    <Text style={btnStyle.insertBtnText}>+ Add Product</Text>
                </View>
            </TouchableOpacity>
        </>
    );
}
