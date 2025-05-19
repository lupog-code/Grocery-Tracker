import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/fallbackStyle';


export const FallbackList = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>No Lists Yet</Text>
            <Text style={styles.subText}>Tap the button below to create your first bucket list!</Text>
        </View>
    );
};


export const FallbackSingleList = () => {
    return (
        <View style={styles.container2}>
            <MaterialIcons name="shopping-basket" size={80} color="#fff" />
            <Text style={styles.mainText}>No products in the list</Text>
            <Text style={styles.subText2}>
                Add new products to start tracking your groceries
            </Text>
        </View>
    );
};


export const FallbackRecents = ()=>{
    return (
        <View style={styles.container2}>
            <MaterialIcons name="history" size={80} color="#fff" />
            <Text style={styles.mainText}>No recent items</Text>
            <Text style={styles.subText2}>
                Start adding items to see your recent activity
            </Text>
        </View>
    );
};

