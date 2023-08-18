import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import React, { useState, useRef, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { DetailButton, OutOfStcokButton } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { CartItemsContext } from "../store/context/cart-context";
import { addToCart } from "../store/redux/CartReducer";
import { firebase } from "../firebase";

import { useDispatch, useSelector } from "react-redux";
import Colors from "../constants/colors";

export const SLIDER_WIDTH = Dimensions.get("window").width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const ItemDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const cartItemCtx = useContext(CartItemsContext);

  //set data
  const data = route.params;
  if (route.params === undefined) {
    navigation.navigate("Home");
  }

  const idsLength = cartItemCtx.ids.length;
  const cart = useSelector((state) => state.cart.cart);
  //console.log(cart);

  const itemid = data.id;
  // const cartItemChecker = cartItemCtx.ids.includes(itemid);

  //add to cart
  // const addToCart = () => {
  //   // if (!cartItemChecker) {
  //   //   cartItemCtx.addToCart(itemid);
  //   // }
  //  // addToCart(itemid);
  //   console.log(cart);
  // };

  //add to cart
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
    navigation.navigate("Cart");
  };

  // imageSliders
  const imageSlider = [
    {
      id: 1,
      name: "Slide 1",
      images: data.image,
    },
    {
      id: 2,
      name: "Slide 2",
      images: data.image1,
    },
    {
      id: 3,
      name: "Slide 3",
      images: data.image2,
    },
  ];

  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          padding: 20,
          borderRadius: 20,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: item.images }}
          style={{ width: 700, height: 500 }}
        />

        {/* <Text style={{ marginVertical: 10, fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text> */}
      </View>
    );
  };

  return (
    <SafeAreaView styles={{ backgroundColor: Colors.white }}>
      {/* heder */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="arrow-back-ios" size={30} style={{ paddingLeft: 20 }} />
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Details</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* carousel */}
        <View style={{ paddingTop: 10, alignItems: "center" }}>
          <Carousel
            ref={isCarousel}
            data={imageSlider}
            renderItem={renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            // loop
            // autoplay
           // autoplayInterval={3000} 
            onSnapToItem={(index) => setIndex(index)}

          />
          {/* Pagination */}
          <Pagination
            dotsLength={imageSlider.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 10,
              marginHorizontal: 0,
            }}
          />
        </View>

        <View style={styles.details}>
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 50,
                  fontWeight: "bold",
                  color: Colors.white,
                }}
              >
                {data.itemName}
              </Text>
              <Text
                style={{
                  fontSize: 50,
                  fontWeight: "bold",
                  color: Colors.primary1,
                }}
              >
                {data.quantity}
              </Text>
              <Text
                style={{
                  fontSize: 35,
                  fontWeight: "bold",
                  color: Colors.white,
                }}
              >
                {"Rs. " + data.price}
              </Text>
            </View>
            <View>
              <Text style={styles.detailText}>{data.description}</Text>
            </View>
            <View style={{ marginTop: 40, marginBottom: 30 }}>
              {data.IsLive == 0 ? (
                <OutOfStcokButton
                  onPress={() => addItemToCart(data)}
                  title="Stock Out"
                />
              ) : (
                <DetailButton
                  onPress={() => addItemToCart(data)}
                  title="Add To Cart"
                />
              )}
            </View>
          </>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: "20%",
    backgroundColor: Colors.primary1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  detailText: {
    marginTop: 30,
    lineHeight: 30,
    fontSize: 25,
    color: Colors.white,
  },
});

export default ItemDetailScreen;
