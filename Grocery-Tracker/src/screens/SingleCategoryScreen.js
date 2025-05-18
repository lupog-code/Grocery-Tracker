import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Product } from '../components/listObj';
import { getFiltroCategorie } from '../data/db';
import commStyle from '../styles/commonStyle';

const CategoryScreen = ({ navigation, route }) => {
  const category = route.params.name;

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
    console.log("Category:", category);
      const data = await getFiltroCategorie(category);
      setProducts(data);
      console.log("Fetched products per category:", data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={commStyle.body}>
      <View style={commStyle.flexView2}>
        <TouchableOpacity style={commStyle.sideBlock} onPress={() => navigation.goBack()}>
          <Text style={commStyle.gobackText}>Categories</Text>
        </TouchableOpacity>

        <View style={commStyle.titleBlock}>
          <Text style={commStyle.homeTitle2}>{category}</Text>
        </View>
      </View>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Product
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              category={item.category}
              state={item.comprato}
            />
          )}
        />

    </View>
  );
};

export default CategoryScreen;