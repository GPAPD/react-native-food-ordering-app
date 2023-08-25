import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from "../constants/colors";



const SecondaryButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{ ...style.btnContainer, backgroundColor:Colors.primary1 }}>
        <Text style={{ ...style.title, color:Colors.white }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const DetailButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{ ...style.btnContainer, backgroundColor:Colors.white }}>
        <Text style={{ ...style.title, color:Colors.primary1}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const PrimaryButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{ ...style.primaryButton, backgroundColor: Colors.primary1}}>
        <Text style={{ ...style.title, color: Colors.white }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DecrementButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity style={style.actionBtn} onPress={onPress}>
      <Icon name="remove" size={30} color={Colors.white} />
    </TouchableOpacity>
  );
};

const IncrementButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity style={style.actionBtn} onPress={onPress}>
      <Icon name="add" size={30} color={Colors.white} />
    </TouchableOpacity>
  );
};

const CancelButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{ ...style.CancelButton}}>
        <Text style={{ ...style.title, color: Colors.primary1 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};


const GetStartButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{ ...style.primaryButton, backgroundColor: Colors.white,height: 75, borderRadius:40,width:380 }}>
        <Text style={{ ...style.title1, color: Colors.primary1 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};


const OutOfStcokButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} //onPress={onPress}
    >
      <View style={{ ...style.btnContainer, backgroundColor:Colors.white}}>
        <Text style={{ ...style.title, color:Colors.grey2}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};



const style = StyleSheet.create({
  title: { color:Colors.white, fontWeight: "bold", fontSize: 25 },
  btnContainer: {
    height: 60,
    marginLeft: 120,
    marginRight: 120,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtn: {
    width: 75,
    height: 50,
    margin: 5,
    backgroundColor: Colors.primary1,
    borderRadius: 18,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  primaryButton: {
    backgroundColor: Colors.primary1,
    width: "auto",
    //height: 60,
    padding: 16,
    borderRadius: 20,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    
  },
  title1: { color: Colors.white, fontWeight: "bold", fontSize: 30 },
  btnContainer: {
    height: 60,
    marginLeft: 120,
    marginRight: 120,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  CancelButton:{
    
    width:150,
    borderColor:Colors.primary1,
    borderWidth:2,
    //height: 60,
    padding: 15,
    borderRadius: 20,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export {
  SecondaryButton,
  IncrementButton,
  DecrementButton,
  PrimaryButton,
  DetailButton,
  GetStartButton,
  CancelButton,
  OutOfStcokButton,
};
