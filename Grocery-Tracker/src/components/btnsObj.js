import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import btnStyle from '../styles/btnStyle';
import {PopUp_addCategory, PopUp_AddList, PopUp_AddProduct} from "./modalObj";

export const AddListBtn = ({onAdd}) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <PopUp_AddList onAdd={onAdd} visible={visible} setVisible={setVisible} items={null} />
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
            <PopUp_AddProduct visible={visible} setVisible={setVisible} setItems={setItems} listID={listID}/>
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
                 <PopUp_addCategory visible={visible} setVisible={setVisible}  onAddCategory={onAddCategory} categories={categories} />
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <View style={btnStyle.insertBtnCat}>
                        <Text style={btnStyle.insertBtnText}>+ Add Category</Text>
                    </View>
                </TouchableOpacity>
            </>
    );
}
