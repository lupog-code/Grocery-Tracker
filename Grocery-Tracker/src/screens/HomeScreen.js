import React from 'react';
import {View, Text, Image, Touchable, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import commStyle from '../styles/commonStyle';
import {Ionicons} from "@expo/vector-icons";
import {List, Product, OldProduct} from "../components/listObj";
import {AddListBtn} from "../components/btnsObj";

const HomeScreen = () => {
    return (
        <View style={commStyle.body}>

            <View style={commStyle.flexView}>
                <Text style={commStyle.homeTitle}>Home Page</Text>
                <TouchableOpacity>
                    <View style={commStyle.recentButton}>
                        <Ionicons name="time" style={commStyle.recentButtonIcon}/>
                    </View>
                </TouchableOpacity>
            </View>


            <SafeAreaView>
                <Image
                    source={require("../styles/background.png")}
                    style={commStyle.imgBackground}
                />
            </SafeAreaView>

            <ScrollView>
            <Text style={commStyle.subTitle}>Recent Lists</Text>
                <List name="Nome lista inserita 1" />
                <List name="Nome lista inserita 2" />


            <Text style={commStyle.subTitle}>Recent Products</Text>
                <Product name="Prodotto 1" quantity={3} price={2.3} category="Fruit" />
                <OldProduct name="Prodotto 2" quantity={3} price={2.3} category="Vegetables" data="11/07/25" />

                <View style={{height: 400}}/>

            </ScrollView>

            <AddListBtn />

        </View>
    );
}

export default HomeScreen;