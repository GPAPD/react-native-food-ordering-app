import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/colors";
import { format } from "date-fns";

const ReviewCard = ({ star, email, comment,createdAt }) => {

  //const formattedCreatedAt = format(createdAt.toDate ? createdAt.toDate() : createdAt, "MM, dd, yyyy");


    const stars = Array.from({ length: star }); 
  return (
    <View style={styles.card}>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <Text style = {styles.cardText}>{email}</Text>
   
      <View style={styles.stars}>
        {stars.map((_, index) => (
          <Ionicons name="star" key={index} size={40} color={Colors.gold} />
        ))}
      </View>
     
      </View>
      <Text style={styles.dateText}>Posted on: {createdAt}</Text>
      <Text multiline style = {styles.cardcomment} >{comment}</Text>
      
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({

  card: {
    
    //justifyContent: "center",
    //alignItems: "center",
    backgroundColor:Colors.white,
    padding: 26,
    marginHorizontal: 100,
    width:800,
    marginTop: 36,
    borderRadius: 8,
    elevation: 20,
    shadowColor:Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    
  },
  stars: {
    flexDirection: "row",
    paddingVertical: 10,
    alignSelf:"flex-end"
  },
  star: {
    marginRight: 10,
    borderRadius: 10,
    padding: 5,
  },
  cardText:{
   color:Colors.black,
   fontSize:33, 
   marginTop:20
   
  },
  cardcomment:{
    color:Colors.black,
   fontSize:26, 
   top:10
  },
  dateText:{
  color:Colors.primary3,
  fontSize:25
  }

});
