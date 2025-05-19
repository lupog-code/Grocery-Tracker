import React, {useState} from 'react';
import {View, Text, Image, Switch, TouchableOpacity, Touchable} from 'react-native';
import btnStyle from '../styles/btnStyle';
import {PopUp_addCategory, PopUp_AddList, PopUp_AddProduct} from "./modalObj";

export const AddListBtn = ({onAdd}) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            {/* Modal separato dal bottone */}
            <PopUp_AddList onAdd={onAdd} visible={visible} setVisible={setVisible} items={null} />

            {/* Bottone */}
            <TouchableOpacity onPress={() => setVisible(true)}>
                <View style={btnStyle.insertBtnView}>
                    <Text style={btnStyle.insertBtnText}>+ Add List</Text>
                </View>
            </TouchableOpacity>
        </>
    );
}

export const AddProductBtn = ({setItems,listID}) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            {/* Modal separato dal bottone */}
            <PopUp_AddProduct visible={visible} setVisible={setVisible} setItems={setItems} listID={listID}/>

            {/* Bottone */}
            <TouchableOpacity onPress={() => setVisible(true)}>
                <View style={btnStyle.insertBtnSqrt}>
                    <Text style={[btnStyle.insertBtnText, {fontSize: 30, fontWeight: 300}]}>+</Text>
                </View>
            </TouchableOpacity>
        </>
    );
}


export const AddCategoryBtn = ({onAddCategory ,categories}) => {
    const [visible, setVisible] = useState(false);

    return (
            <>
                {/* Modal separato dal bottone */}
                 <PopUp_addCategory visible={visible} setVisible={setVisible}  onAddCategory={onAddCategory} categories={categories} />

                {/* Bottone */}
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <View style={btnStyle.insertBtnCat}>
                        <Text style={btnStyle.insertBtnText}>+ Add Category</Text>
                    </View>
                </TouchableOpacity>
            </>
    );
}
