import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {styles} from '../styles/CategoryBadgeStyle';

const categoryColors = {
    Fruits: '#f39c12',
    Vegetables: '#27ae60',
    Dairy: '#3498db',
    Meat: '#e74c3c',
    Snacks: '#9b59b6',
    Beverages: '#1abc9c',
    Other: '#95a5a6',
};

const CategoryBadge = ({ category }) => {
    const backgroundColor = categoryColors[category]; 

    return (
        <View style={[styles.badge, { backgroundColor }]}>
            <Text style={styles.text}>{category}</Text>
        </View>
    );
};



export default CategoryBadge;
