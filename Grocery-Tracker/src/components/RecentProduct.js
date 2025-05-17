import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const RecentProductItem = ({ id, name, quantity, date , category }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.details}>Quantity: {quantity}</Text>
      <Text style={styles.details}>Purchased on: {date}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
});


export default RecentProductItem;