import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import CategoryBadge from './CategoryBadge';
import { styles } from '../styles/ShoppingListItemStyle';
const ShoppingListItem = ({ name , quantity , price , category }) => {
    const [isChecked, setIsChecked] = useState(false);
    
    return (
        <View style={styles.item}>
            <View style={styles.titleRow}>
                <Pressable 
                    style={[styles.checkbox, isChecked && styles.checked]}
                    onPress={() => {
                        setIsChecked(prevValue=>!prevValue)
                    }
                }
                >
                    {isChecked && <Text style={styles.checkmark}>✓</Text>} {/* Solo quando è selezionato mi da la spunta , perchè altrimenti il componente nativo non lo prevederebbe di per sè */}
                </Pressable>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <View style={styles.details}>
                        <Text style={styles.detailText}>Quantity: {quantity}</Text>
                        <Text style={styles.detailText}>Price: €{price}</Text>
                        <CategoryBadge category={category} />
                    </View>
                </View>
            </View>
        </View>
    );
};



export default ShoppingListItem;