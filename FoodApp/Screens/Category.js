import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { firebase } from "../firebase";
import CardSlider from "../components/CardSlider";
import Colors from '../constants/colors';

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
  const sortedCategories = Object.keys(groupedProducts).sort();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>

      {/* <Text style={styles.headerText1}>Welcome !</Text>
      <Text style={styles.headerText2}> To Laluna Restaurant</Text> */}
    
      </View>

      {sortedCategories.map((category) => (
        <CardSlider
          key={category}
          title={category}
          data={groupedProducts[category]}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection:"column",
    //backgroundColor:Colors.white,
   // elevation:20
   
  },
  headerText1: {
    fontSize: 40,
    fontWeight: "bold",
    marginHorizontal:30,
  },
  headerText2: {
    fontSize: 30,
    fontWeight: "bold",
    color:Colors.primary3,
      marginHorizontal:30,
  },
  container: {
    flex: 1,
    marginTop: 15,
  },
});

export default Category;
