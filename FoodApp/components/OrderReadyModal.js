import { StyleSheet, Text, View, TouchableOpacity, Modal,Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import Colors from "../constants/colors";

const OrderReadyModal = ({ isVisible, customerName }) => {
  const navigation = useNavigation();

  const handleCountdownFinish = () => {
    //navigation.navigate('Intro');
    const resetAction = CommonActions.reset({
      index: 0, 
      routes: [{ name: "Intro" }], 
    });

    navigation.dispatch(resetAction);
  };
  
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          
 
          <View style={styles.v1}>
            <Text style={styles.Text2}>
              {customerName}, YOUR ORDER IS READY NOW{" "}
            </Text>
          </View>
          <Image
            style={styles.image}
            source={require("../assets/Images/orderReady.png")}
          />
          <View style={styles.v1}>
            <Text style={styles.Text1}>PAY AT COUNTER </Text>
          </View>
  
          <TouchableOpacity
            style={styles.Btn}
            onPress={handleCountdownFinish}
          >
            <Icon name="arrow-back-ios" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default OrderReadyModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    backgroundColor: Colors.white,
    width: "80%",
    padding: 16,
    borderRadius: 10,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image:{
    width:300,height:300
  }
,  Btn: {
    backgroundColor: Colors.primary1,
    width: 50,
    height: 60,
    padding: 15,
    borderRadius: 10,
    margin:50,
    alignItems:"center",justifyContent:"center"
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
    textTransform: "uppercase",
  },
});
