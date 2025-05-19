import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const FallbackSingleList = () => {
    return (
        <View style={styles.container}>
            <MaterialIcons name="shopping-basket" size={80} color="#cccccc" />
            <Text style={styles.mainText}>No products in the list</Text>
            <Text style={styles.subText}>
                Add new products to start tracking your groceries 
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    mainText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666666',
        marginTop: 20,
        textAlign: 'center',
    },
    subText: {
        fontSize: 16,
        color: '#999999',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default FallbackSingleList;