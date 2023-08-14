import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { IncrementButton, DecrementButton } from "../components/Button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../constants/colors";

const CartFlatlist = ({ item, onIncrement, onDecrement, onDeleteItem }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={styles.cartCard}>
        <Image
          source={{ uri: item.image }}
          style={{ width: 170, height: 150 }}
        />
        <View
          style={{
            height: 200,
            marginLeft: 20,
            paddingVertical: 20,
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            
          }}
        >
          <View  >

          
            <Text style={{ fontSize: 32, fontWeight: "bold", color: Colors.black}}>
              {item.itemName}{" "}
            </Text>
          

          {/* <View style={{ height: 54 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "grey" }}>
                {"(" + item.description + ")"}{" "}
              </Text>
            </View> */}
          
            <Text style={{ fontSize: 30,  color: Colors.black }}>
              {"Rs. " + item.price}
            </Text>
          
          </View>
          
        </View>

        <View
          style={{
            marginRight: 10,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 50,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <DecrementButton onPress={onDecrement} />
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: Colors.black,
                alignItems:'center',
                paddingHorizontal: 5,
              }}
            >
              {item.quantity}
            </Text>
            <IncrementButton onPress={onIncrement} />
          </View>
        </View>
        <TouchableOpacity
          onPress={onDeleteItem}
          style={{ marginTop: -35, marginBottom: 145, marginRight: -35 }}
        >
          <Icon name="close-box" color={Colors.grey2} size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartFlatlist;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  cartCard: {
    borderRadius: 10,
    height: 200,
    width: "95%",
    elevation: 25,
    backgroundColor: Colors.white,
    marginVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
  },
});
