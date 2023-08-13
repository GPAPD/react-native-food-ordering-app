import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import CountDown from "react-native-countdown-component";
import Colors from "../constants/colors";
import { useRoute } from "@react-navigation/native";

const OrderStatusScreen = () => {
  const route = useRoute();
  const { orderId } = route.params;

  const navigation=useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Order {orderId} Is Ready In:</Text>
      <CountDown
        size={60}
        until={5}
        // onComplete = {()=> alert('Order is completed')}
        onFinish={() => (navigation.navigate("Intro"),alert('Order is completed')) }
        digitStyle={{ backgroundColor: Colors.white }}
        digitTxtStyle={{ color: Colors.primary1 }}
        timeLabelStyle={{ color: "red", fontWeight: "bold" }}
        separatorStyle={{ color: Colors.primary1 }}
        timeToShow={["M", "S"]}
        timeLabels={{ m: null, s: null }}
        showSeparator
      />

      <View >
        <Image
          style={styles.image}
          source={require("../assets/Images/chef-cooking-in-kitchen.gif")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 30,
    marginBottom: 50,
    fontWeight: "bold",
  },
  timer: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FF5F6D",
  },
});

export default OrderStatusScreen;
