import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import compStyle from '../styles/componentStyle';
import { Ionicons } from "@expo/vector-icons";
import { PopUp_editProduct } from "./modalObj";
import { useNavigation } from '@react-navigation/native';
import { buyItem, rimuoviItemComprato } from '../data/db';

const getEmoji = ( category ) => {
    switch (category) {
        case "Fruits": return "🍎";
        case "Vegetables": return "🥬";
        case "Dairy": return "🧈";
        case "Meat": return "🥩";
        case "Snacks": return "🍫";
        case "Beverages": return "🍶";
        case "Other": return "🍽️";
        default: return "";
    }
};

export const List = ({ id, name }) => {
    const navigation = useNavigation();

    const goToDetailsOfList = () => {
        navigation.navigate("SingleListScreen", { id, name });
    };

    return (
        <TouchableOpacity onPress={goToDetailsOfList}>
            <View style={[compStyle.listContainer, { backgroundColor: '#244B6E' }]}>
                <Text style={compStyle.listTitle}>{name}</Text>
                <Ionicons name="caret-forward-outline" style={compStyle.arrow} />
            </View>
        </TouchableOpacity>
    );
};

export const Product = ({ id, name, quantity, price, category, state, onUpdate, onEdit }) => {
    const [isEnabled, setIsEnabled] = useState(state === 1);
    const [visible, setVisible] = useState(false);

    const handleSwitch = async (newValue) => {
        try {
            if (newValue) {
                await buyItem(id);
            } else {
                await rimuoviItemComprato(id);
            }
            onUpdate();
            setIsEnabled(newValue);
        } catch (error) {
            console.error("Errore durante l'acquisto:", error);
        }
    };

    return (
        <>
            <PopUp_editProduct
                idProduct={id}
                namein={name}
                quantityin={quantity}
                pricein={price}
                categoryin={category}
                state={state}
                visible={visible}
                setVisible={setVisible}
                items={null}
                onUpdate={onUpdate}
                onEdit={onEdit}
            />
            <View style={compStyle.ProductContainer}>
                <View style={compStyle.Cont20}>
                    <Text style={compStyle.categoryEmoji}>{getEmoji(category)}</Text>
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <Ionicons style={compStyle.modifyProduct} name="pencil-outline" />
                    </TouchableOpacity>
                </View>
                <View style={compStyle.Cont60}>
                    <Text
                        style={[
                            compStyle.ProductTitle,
                            isEnabled && { color: '#35C758' }
                        ]}
                    >
                        {name}
                    </Text>
                    <Text style={compStyle.ProductSubTitle}>Quantity: {quantity}</Text>
                    <Text style={compStyle.ProductSubTitle}>{category}</Text>
                </View>
                <View style={compStyle.Cont20}>
                    <Switch
                        style={compStyle.switch}
                        trackColor={{ false: '#767577', true: '#35C758' }}
                        onValueChange={handleSwitch}
                        value={isEnabled}
                    />
                    <Text style={compStyle.price}>{price} $</Text>
                </View>
            </View>
        </>
    );
};

export const SmallOldProduct = ({ id, name, quantity, price, category }) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <PopUp_editProduct
                idProduct={id}
                namein={name}
                quantityin={quantity}
                pricein={price}
                categoryin={category}
                visible={visible}
                setVisible={setVisible}
                items={null}
            />
            <View style={compStyle.SmallProductContainer}>
                <View style={{ width: '100%' }}>
                    <Text style={compStyle.SmallCategoryEmoji}>{getEmoji(category)}</Text>
                    <Text style={compStyle.SmallProductTitle}>{quantity}x {name}</Text>
                    <Text style={compStyle.SmallPrice}>{price} $</Text>
                </View>
            </View>
        </>
    );
};

export const ModifiableCategory = ({ onDelete, name }) => {
    const navigation = useNavigation();

    return (
        <View style={compStyle.ModCategoryContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("SingleCategoryScreen", { name })}>
                <Text style={compStyle.CategoryTitle}>{getEmoji(name)} {name}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => onDelete(name)}>
                <Ionicons style={compStyle.modifyCategory} name="trash-outline" />
            </TouchableOpacity>
        </View>
    );
};

export const FixedCategory = ({ name }) => {
    const navigation = useNavigation();

    return (
        <View style={compStyle.FixedCategoryContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("SingleCategoryScreen", { name })}>
                <Text style={compStyle.CategoryTitle}>{getEmoji(name)} {name}</Text>
            </TouchableOpacity>
        </View>
    );
};

export const OldProduct = ({ id, name, quantity, price, category, data, onDelete }) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <PopUp_editProduct
                onDelete={() => onDelete(id)}
                idProduct={id}
                namein={name}
                quantityin={quantity}
                pricein={price}
                categoryin={category}
                visible={visible}
                setVisible={setVisible}
                items={null}
            />
            <View style={compStyle.ProductContainer}>
                <View style={compStyle.Cont20}>
                    <Text style={compStyle.categoryEmoji}>{getEmoji(category)}</Text>
                </View>
                <View style={compStyle.Cont60}>
                    <Text style={compStyle.ProductTitle}>{name}</Text>
                    <Text style={compStyle.ProductSubTitle}>Quantity: {quantity}</Text>
                    <Text style={compStyle.ProductSubTitle}>{category}</Text>
                </View>
                <View style={compStyle.Cont20}>
                    <Text style={compStyle.data}>
                        {(() => {
                            const date = new Date(data);
                            const day = String(date.getDate()).padStart(2, '0');
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const year = String(date.getFullYear()).slice(-2);
                            return `${day}/${month}/${year}`;
                        })()}
                    </Text>
                    <Text style={compStyle.price}>{price} $</Text>
                </View>
            </View>
        </>
    );
};