import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Fallback = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Non ci sono liste disponibili</Text>
            <Text style={styles.subText}>Crea una nuova lista per iniziare</Text>
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