import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Fallback = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>🗒️ No Lists Yet</Text>
            <Text style={styles.subText}>Tap the button below to create your first list!</Text>
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
        fontSize: 22,
        fontWeight: '600',
        color: '#20385E',
        marginBottom: 12,
        textAlign: 'center',
    },
    subText: {
        fontSize: 17,
        color: '#506680',
        textAlign: 'center',
    },
});

export default Fallback;