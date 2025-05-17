import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Fallback = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>No lists available</Text>
            <Text style={styles.subText}>Create a new list to get started</Text>
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
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 10,
    },
    subText: {
        fontSize: 16,
        color: '#999',
    },
});

export default Fallback;