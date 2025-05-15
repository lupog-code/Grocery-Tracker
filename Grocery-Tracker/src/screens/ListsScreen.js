import React from 'react';
import {View, Text, Image, Touchable, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import commStyle from '../styles/commonStyle';
import {Ionicons} from "@expo/vector-icons";
import {List} from "../components/listObj";
import {AddListBtn} from "../components/btnsObj";

const ListsScreen = () => {
    return (
        <View style={commStyle.body}>

            <View style={commStyle.flexView2}>

                <TouchableOpacity style={{width:'28%'}}>
                    <Text style={commStyle.gobackText}>Home</Text>
                </TouchableOpacity>

                <View style={{width:'43%'}}>
                    <Text style={commStyle.homeTitle2} >Home Page</Text>
                </View>

                <View style={{width:'28%'}}/>
            </View>

            <ScrollView>
                <List name="Nome lista inserita 1" />
                <List name="Nome lista inserita 2" />
                <List name="Nome lista inserita 3" />
                <List name="Nome lista inserita 4" />

                <View style={{height: 200}}/>

            </ScrollView>

            <AddListBtn/>
        </View>
    );
}

export default ListsScreen;