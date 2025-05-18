import React, { useState, useEffect, use } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import{ OldProduct} from '../components/listObj';
import { getFiltroCategorie } from '../data/db';
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
      console.log("Category:", category);
      const data = await getItemsCompratiPerCategoria(category);
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
          <Text style={commStyle.gobackText}>Categorie</Text>
        </TouchableOpacity>

        <View style={commStyle.titleBlock}>
          <Text style={commStyle.homeTitle2}>{category}</Text>
        </View>
      </View>
<Text style={commStyle.totalSpentText}>Total spent for this category: {totalSpent} $</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            console.log("Data compera:", item.data_compera),
            <OldProduct
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              category={item.category}
              data={new Date(item.data_compera).toISOString().split('T')[0]} // Format the date to YYYY-MM-DD
            />
          )}
        />

    </View>
  );
};

export default CategoryScreen;