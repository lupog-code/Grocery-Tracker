import React, {useState} from 'react';
import {View, Text, Image, Switch, TouchableOpacity} from 'react-native';
import compStyle from '../styles/componentStyle';
import {Ionicons} from "@expo/vector-icons";
import {PopUp_editProduct} from "./modalObj";
import { useNavigation } from '@react-navigation/native';

function getRandomBlue() {
    const hue = Math.floor(Math.random() * 30) + 210;
    const saturation = 50 + Math.random() * 20;
    const lightness = 30 + Math.random() * 10;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

const getEmoji = ({ category }) => {
    if (category === "Fruits") {
        return "🍎";
    } else if (category === "Vegetables") {
        return "🥬";
    } else if (category === "Dairy") {
        return "🧈";
    } else if (category === "Meat") {
        return "🥩";
    } else if (category === "Snacks") {
        return "🍫";
    } else if (category === "Beverages") {
        return "🍶";
    } else if (category === "Other") {
        return "🍽️";
    }
    return "❓"; // fallback se nessuna corrispondenza
};

export const List = ({id , name}) => {
    const navigation = useNavigation();
    const backgroundColor = getRandomBlue();
    function goToDetailsOfList(id) {
        navigation.navigate("SingleListScreen", { id , name });
    }


    return(
        <TouchableOpacity onPress={() => {goToDetailsOfList(id)}}>
            <View style={[compStyle.listContainer, {backgroundColor: '#244B6E'}]}>
                <Text style={compStyle.listTitle}>{name}</Text>
                <Ionicons name="arrow-forward-outline" style={compStyle.arrow} />
            </View>
        </TouchableOpacity>
    );
}

export const Product = ({id, name, quantity, price, category ,onDelete}) => {
   
    const [isEnabled, setIsEnabled] = useState(false);
    const [visible, setVisible] = useState(false);

    return(
        <>
        <PopUp_editProduct idProduct={id} namein={name} quantityin={quantity} pricein={price} categoryin={category} visible={visible} setVisible={setVisible} items={null} onDelete={()=>onDelete(id)} />

        <View style={compStyle.ProductContainer}>

            <View style={compStyle.Cont20}>
                <Text style={compStyle.categoryEmoji}>{getEmoji({ category })}</Text>

                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Ionicons style={compStyle.modifyProduct} name="pencil-outline" />
                </TouchableOpacity>
            </View>

            <View style={compStyle.Cont60}>
                <Text style={compStyle.ProductTitle}>{name}</Text>
                <Text style={compStyle.ProductSubTitle}>Quantity: {quantity}</Text>
                <Text style={compStyle.ProductSubTitle}>{category}</Text>
            </View>

            <View style={compStyle.Cont20}>
                <Switch
                    style={compStyle.switch}
                    trackColor={{false: '#767577', true: '#35C758'}}
                    onValueChange={() => setIsEnabled(previousState => !previousState)}
                    value={isEnabled}
                />
                <Text style={compStyle.price}>{price} $</Text>
            </View>
        </View>
        </>
    );
}

export const OldProduct = ({id, name, quantity, price, category, data , onDelete}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [visible, setVisible] = useState(false);

    return(
        <>
            <PopUp_editProduct onDelete={()=>onDelete(id)} idProduct={id} namein={name} quantityin={quantity} pricein={price} categoryin={category} visible={visible} setVisible={setVisible} items={null} />
            <View style={compStyle.ProductContainer}>

                <View style={compStyle.Cont20}>
                    <Text style={compStyle.categoryEmoji}>{getEmoji({ category })}</Text>

                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <Ionicons style={compStyle.modifyProduct} name="pencil-outline" />
                    </TouchableOpacity>
                </View>


            <View style={compStyle.Cont60}>
                <Text style={compStyle.ProductTitle}>{name}</Text>
                <Text style={compStyle.ProductSubTitle}>Quantity: {quantity}</Text>
                <Text style={compStyle.ProductSubTitle}>{category}</Text>
            </View>


                <View style={compStyle.Cont20}>
                    <Text style={compStyle.data}>{data}</Text>
                    <Text style={compStyle.price}>{price} $</Text>
                </View>
            </View>
        </>
    );
}

export const SmallOldProduct = ({id , name, quantity, price, category, data}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [visible, setVisible] = useState(false);

    return(
        <>
            <PopUp_editProduct idProduct={id} namein={name} quantityin={quantity} pricein={price} categoryin={category} visible={visible} setVisible={setVisible} items={null} />

            <View style={compStyle.SmallProductContainer}>
                <View style={{width: '100%'}}>
                    <Text style={compStyle.SmallCategoryEmoji}>{getEmoji({ category })}</Text>
                    <Text style={compStyle.SmallProductTitle}>{quantity}x {name}</Text>
                    <Text style={compStyle.SmallPrice}>{price} $</Text>
                </View>
            </View>

        </>
    );
}

