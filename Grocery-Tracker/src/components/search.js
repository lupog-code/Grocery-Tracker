import React from 'react';
import {View, TextInput, SafeAreaView} from 'react-native';

export const SearchBar = ({searchText, setSearchText}) => {
    return (
        <SafeAreaView>
            <TextInput onChangeText={setSearchText}> </TextInput>
        </SafeAreaView>

    );

}