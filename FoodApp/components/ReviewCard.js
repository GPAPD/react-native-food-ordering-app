import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/colors";

const ReviewCard = ({ star, email, comment }) => {
    const stars = Array.from({ length: star }); 
  return (
    <View style={styles.card}>
      <View style={styles.stars}>
        {stars.map((_, index) => (
          <Ionicons name="star" size={50} color="#FFD700" />
        ))}
      </View>
      <Text style = {styles.cardText}>{email}</Text>
      <Text multiline style = {styles.cardcomment} >{comment}</Text>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({

  card: {
    
    //justifyContent: "center",
    //alignItems: "center",
    backgroundColor:"#d7bfbf",
    padding: 16,
    marginHorizontal: 100,
    width:800,
    marginTop: 36,
    borderRadius: 8,
    elevation: 4,
    shadowColor:'#c8c8c8',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  stars: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  star: {
    marginRight: 10,
    borderRadius: 10,
    padding: 5,
  },
  cardText:{
   color:'#ffffff',
   fontSize:35, 
  },
  cardcomment:{
    color:'#ffffff',
   fontSize:30, 
  }

});
