
import React, { useState ,useEffect} from "react";
import { View, Text, Modal, StyleSheet ,TouchableOpacity,TextInput} from "react-native";
import Colors from "../constants/colors";
import { PrimaryButton } from "./Button";
import { firebase } from "../firebase";
import { Ionicons } from "@expo/vector-icons";


const ReviewModal = ({ isVisible, closeModal, customerEmail, onSubmitReview }) => {

  
  const [currentValue, setCurrentValue] = useState(0);
  const [textArea, setTextArea] = useState("");
  const [cEmail, setCemail] = useState("");


  const reviews = firebase.firestore().collection("Reviews");

  const stars = Array(5).fill(0);
  const handleClick = (value) => {
    setCurrentValue(value);
  };

   //current date
   const [currentDate, setCurrentDate] = useState("");

   useEffect(() => {
     var date = new Date().getDate();
     var month = new Date().getMonth();
     var year = new Date().getFullYear();
 
     const monthNames = [
       "January",
       "February",
       "March",
       "April",
       "May",
       "June",
       "July",
       "August",
       "September",
       "October",
       "November",
       "December",
     ];
 
     setCurrentDate(date + " " + monthNames[month] + " , " + year + "");
   }, []);
  const submitHandler = () => {
    const data = {
      stars: currentValue,
      csEmail: customerEmail,
      csComment: textArea,
      createdAt: currentDate,
    };

    if (currentValue != 0 && customerEmail !== "" && textArea !== "") {
      reviews.add(data).then(() => {
        setCurrentValue(0), setTextArea(""), setCemail(""),closeModal();
      });
    }
  };
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
      
    >
       <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title} multiline>
          Rate Us
        </Text>
        <View style={styles.stars}>
          {stars.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleClick(index + 1)}
              style={[
                styles.star,
                {
                  backgroundColor:
                    currentValue > index ? Colors.gold : "#bdbdbd",
                },
              ]}
            >
              <Ionicons name="star" size={40} color="white" />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          placeholder="Enter Your email"
          style={styles.textInput}
         // onChangeText={(customerEmail) => setCemail(customerEmail)}
          defaultValue={customerEmail}
        />
        <TextInput
          style={{ display: "none" }}
          //onChangeText={(cEmail) => setCemail(cEmail)}
          defaultValue={currentDate}
        />
        <TextInput
          placeholder="What's your experience?"
          style={styles.textarea}
          onChangeText={(textArea) => setTextArea(textArea)}
          defaultValue={textArea}
          multiline
        />
        <View style={{ width: 300 }}>
          <PrimaryButton title={"Submit"} onPress={submitHandler} />
        </View>
        <View style={styles.skipButtonContainer}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
          </View>

        <View style={styles.separator} />
        </View>
      
      </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    width: "80%",
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "bold",
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
  textarea: {
    fontSize: 30,
    borderWidth: 1,
    borderColor: Colors.primary3,
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
    minHeight: 200,
    width: 650,
    
  },
  textInput: {
    fontSize: 30,
    borderWidth: 1,
    borderColor: Colors.primary3,
    borderRadius: 5,
    padding: 20,
    marginVertical: 20,
    minHeight: 70,
    width: 650,
  },
  text: {
    fontSize: 28,
  },
  revListContainer: {
    marginTop: 15,
  },
  revList: {
    justifyContent: "center",
    alignItems: "center",
  },
  rewCard: {
    marginHorizontal: -50,
    marginTop: 15,
  },
  
  skipButtonContainer: {
    marginTop: 20,
    marginBottom:30
  },
  skipButtonText: {
    fontSize: 24,
    color: Colors.primary2,
   // textDecorationLine: "underline",
    fontWeight:"bold"
  },
  // ... your other styles
});

export default ReviewModal;




// import React from 'react';
// import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import Colors from '../constants/colors';

// const CategoryList = ({ categories, selectedCategory, onCategorySelect }) => {
//   return (
//     <FlatList
//       style={styles.categoryList}
//       data={categories}
//       renderItem={({ item }) => (
//         <TouchableOpacity
//           style={[
//             styles.categoryItem,
//             selectedCategory === item && styles.selectedCategory,
//           ]}
//           onPress={() => onCategorySelect(item)}
//         >
//           <Text style={styles.categoryText}>{item}</Text>
//         </TouchableOpacity>
//       )}
//       keyExtractor={(item) => item}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   categoryList: {
//     width: 200,
//     backgroundColor: Colors.primary1,
//   },
//   categoryItem: {
//     paddingVertical: 50,
//     paddingHorizontal: 30,
//     borderBottomWidth: 2,
//     borderBottomColor: Colors.primary2,
//   },
//   selectedCategory: {
//     backgroundColor: Colors.primary2,
//   },
//   categoryText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: Colors.white,
//   },
// });

// export default CategoryList;