import React , {useState} from 'react';
import {Text, View, SafeAreaView, Button, FlatList, TextInput, TouchableOpacity, Modal, Alert} from 'react-native';
import ShoppingListItem from '../components/ShoppingListItem';
 import ListItemStyles from '../styles/ListItemStyle';
 import {sampleLists} from "./HomeScreen";
import {PopUpItem} from "../components/PopUp";

function SingleListScreen({ navigation,route }) {
  const items = route.params?.items || []; // fallback a array vuoto se non esiste
  const length = items.length;
  const id = route.params?.id;





  if (length !== 0) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <ShoppingListItem
                name={item.name}
                quantity={item.quantity}
                price={item.price}
                category={item.category}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
         <Button title="OK" onPress={()=>navigation.goBack()}></Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <PopUpItem/>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          <View style={ListItemStyles.zeroProd}>
               <Text style={ListItemStyles.zeroProdTitle}>Add Product</Text>
               <Text style={ListItemStyles.zeroProdSub}>Add the first Product to the list by clicking the button below.</Text>

              <TouchableOpacity onPress={()=> setVisible(true)}>
                  <View style={ListItemStyles.addFromZero}>
                      <Text style={ListItemStyles.plusText}>+</Text>
                  </View>
              </TouchableOpacity>
          </View>


        <Text style={ListItemStyles.goBack} onPress={()=>navigation.goBack()}>Go Back</Text>
      </View>
    </SafeAreaView>
  );
}


export default SingleListScreen;