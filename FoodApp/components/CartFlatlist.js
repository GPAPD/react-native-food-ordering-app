import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { IncrementButton, DecrementButton } from "../components/Button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
          }}
        >
          <Text style={{ fontSize: 32, fontWeight: "bold", color: "black" }}>
            {item.itemName}{" "}
          </Text>
          <View style={{ height: 54 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "grey" }}>
              {"(" + item.description + ")"}{" "}
            </Text>
          </View>

          <Text style={{ fontSize: 30, fontWeight: "bold", color: "black" }}>
            {"Rs. " + item.price}
          </Text>
        </View>

        <View
          style={{
            marginRight: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 28, fontWeight: "bold", color: "black" }}>
            {item.quantity}
          </Text>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <DecrementButton onPress={onDecrement} />
            <IncrementButton onPress={onIncrement} />
          </View>
        </View>
        <TouchableOpacity
          onPress={onDeleteItem}
          style={{ marginTop: -35, marginBottom: 145, marginRight: -35 }}
        >
          <Icon name="close-box" color={"#c3b9b9"} size={50} />
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
