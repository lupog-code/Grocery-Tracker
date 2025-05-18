import React, { useState } from 'react';
import { Modal, TouchableOpacity, Text, TextInput, View, StyleSheet } from 'react-native';
import { Alert } from 'react-native';
const AddCategoryButton = ({ categories, onAddCategory }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = () => {
        if (categoryName.trim() === '') {
            Alert.alert('Error', 'Category name cannot be empty');
            return;
        }

        //Controlla se la categoria esiste già , occorre usare some perchè categories è un array di oggetti
        if (categories.some(category => category.name.toLowerCase() === categoryName.trim().toLowerCase())) {
            Alert.alert('Error', 'Category already exists');
            return;
        }
        onAddCategory(categoryName.trim());
        setCategoryName('');
        setModalVisible(false);
    };

    return (
        <>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.buttonText}>Add New Category</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter category name"
                            value={categoryName}
                            onChangeText={setCategoryName}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.submitButton]}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.buttonText}>Add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: '#2196F3',
    },
    cancelButton: {
        backgroundColor: '#ff4444',
    },
});

export default AddCategoryButton;