

import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import RecentProductItem from '../components/RecentProduct';
import { getItemsRecenti } from '../data/db';
//RecentProducts 
const RecentProducts = ({navigation , route}) => {
    return (
        <SafeAreaView>
            <Text>Recent Products</Text>
            <Button mode="contained" onPress={() => navigation.goBack()}>GO BACK</Button>
        </SafeAreaView>
    );
}
export default RecentProducts;
