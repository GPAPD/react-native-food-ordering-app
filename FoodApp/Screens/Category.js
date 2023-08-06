import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Colors } from "react-native/Libraries/NewAppScreen";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { firebase } from "../firebase";
import CardSlider from "../components/CardSlider";

const Category = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const foodRef = firebase.firestore().collection('Products');

    const unsubscribeProducts = foodRef.onSnapshot((querySnapshot) => {
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    });

    return () => {
      unsubscribeProducts();
    };
  }, []);

  // Function to group products by category
  const groupProductsByCategory = () => {
    const groupedProducts = {};
    products.forEach((product) => {
      if (groupedProducts[product.category]) {
        groupedProducts[product.category].push(product);
      } else {
        groupedProducts[product.category] = [product];
      }
    });
    return groupedProducts;
  };

  const groupedProducts = groupProductsByCategory();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>


      </View>

      {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
        <CardSlider
          key={category}
          title={category}
          data={categoryProducts}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    marginTop: 15,
  },
});

export default Category;
