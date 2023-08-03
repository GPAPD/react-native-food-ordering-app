import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React from "react";
import Lottie from "lottie-react-native";
import { useNavigation } from '@react-navigation/native';

const OrderConfirmationScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.v1}>
        <Text style={styles.Text1}> WE MUST SAY, </Text>
        <Text style={styles.Text2}> YOU'VE GREAT </Text>
        <Text style={styles.Text2}> CHOICE OF TASTE </Text>
      </View>
      {/* <Image source={require('../assets/dineIn.png')}  style={{ width: 100, height: 100}} /> */}
      <Lottie source={require('../assets/84128-cart-order-confirmed.json')} autoPlay loop style={{ width: 300, height: 250}} />
      <View style={styles.v1}>
        <Text style={styles.Text2}> YOUR ORDER NUMBER IS </Text>
        <Text style={styles.Text3}> 23 </Text>
      </View>
      <View style={styles.v1}>
        <Text style={styles.Text1}>PAY AT COUNTER WHEN  </Text>
        <Text style={styles.Text1}>YOUR ORDER WILL BE READY </Text>
      </View>

      <TouchableOpacity
        style={styles.Btn}
        onPress={() => navigation.navigate("BottomNavigation")} >
       <Icon name="arrow-back-ios" size={30} />
       </TouchableOpacity>

    </View>
  );
};

export default OrderConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 56,
    fontWeight: "bold",
  },

  v1: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  Btn: {
    backgroundColor: "#f07048",
    width: 50,
    height:60,
    padding: 15,
    borderRadius: 10,
    marginTop: 50,
    marginRight: 70,
    marginLeft: 90,
    marginBottom: 20,
  },
  Text1: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
    color: "grey",
  },
  Text2: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
  },
  Text3: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 60,
    fontWeight: "bold",
    color: "black",
  },

});
