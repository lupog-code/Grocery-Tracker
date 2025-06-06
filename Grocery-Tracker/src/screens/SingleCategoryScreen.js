import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import{ OldProduct} from '../components/listObj';
import commStyle from '../styles/commonStyle';
import { getItemsCompratiPerCategoria } from '../data/db';
import { getTotalSpentForCategory } from '../data/db';
const CategoryScreen = ({ navigation, route }) => {
  const category = route.params.name;
  const [totalSpent, setTotalSpent] = useState(0);
  
  useEffect(() => {
    const fetchTotalSpent = async () => {
      const spent = await getTotalSpentForCategory(category);
      setTotalSpent(spent);
    };
    fetchTotalSpent();
  }, [category]);

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await getItemsCompratiPerCategoria(category);
      setProducts(data);
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

        <View style={{width:'25%'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={commStyle.gobackText}>Categories</Text>
          </TouchableOpacity>
        </View>

        <View style={{width:'50%'}}>
          <Text style={commStyle.homeTitle2}>{category}</Text>
        </View>

        <View style={{width:'25%'}}/>
      </View>
      
      <View style={commStyle.categoryCounterBar}>
        <Text style={commStyle.categoryCounterText}>
          Total spent: ${totalSpent.toFixed(2)}
        </Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <OldProduct
            id={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            category={item.category}
            data={new Date(item.data_compera).toISOString().split('T')[0]}
          />
        )}
      />
    </View>
  );
};

export default CategoryScreen;