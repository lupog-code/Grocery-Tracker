import React from 'react';
import {View, Text, Image, Touchable, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import commStyle from '../styles/commonStyle';
import {Ionicons} from "@expo/vector-icons";
import {OldProduct, Product} from "../components/listObj";
import { Button } from 'react-native';


const ListsScreen = ({navigation}) => {
    return (
        <View style={commStyle.body}>

            <View style={commStyle.flexView2}>

                <TouchableOpacity style={{width:'28%'}} onPress={() => navigation.goBack()}>
                    <Text style={commStyle.gobackText}>Home</Text>
                </TouchableOpacity>

                <View style={{width:'43%'}}>
                    <Text style={commStyle.homeTitle2} >Home Page</Text>
                </View>

                <View style={{width:'28%'}}/>
            </View>



            <ScrollView>
                <Product name="Prodotto 1" quantity={3} price={2.3} category="Fruit" />
                <Product name="Prodotto 2" quantity={3} price={2.3} category="Vegetables" />
                <Product name="Prodotto 1" quantity={3} price={2.3} category="Meat" />
                <Product name="Prodotto 2" quantity={3} price={2.3} category="Dairy" />

                <View style={{height: 200}}/>
                
            </ScrollView>

        </View>
    );
}

export default ListsScreen;