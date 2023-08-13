import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/colors";
import { PrimaryButton } from "../components/Button";
import { firebase } from "../firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import ReviewCard from "../components/ReviewCard";

function ReviewScreen() {
  const [rev, setRevData] = useState([]);

  useEffect(() => {
    const revi = firebase.firestore().collection("Reviews");

    const unsubscribeProducts = revi.onSnapshot((querySnapshot) => {
      const rewData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRevData(rewData);
    });

    return () => {
      unsubscribeProducts();
    };
  }, []);

  const [currentValue, setCurrentValue] = useState(0);

  const [textArea, setTextArea] = useState("");
  const [cEmail, setCemail] = useState("");

  const reviews = firebase.firestore().collection("Reviews");

  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const submitHandler = () => {
    const data = {
      starts: currentValue,
      csEmail: cEmail,
      csComment: textArea,
    };
    if(currentValue!='' && cEmail !='' && textArea != '')
    {
      reviews.add(data).then(()=>{setCurrentValue(0),setTextArea(''),setCemail('')})
    }
  };

  return (
    <View style={styles.container}>
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
          onChangeText={(cEmail) => setCemail(cEmail)}
          defaultValue={cEmail}
        />
        <TextInput
          placeholder="What's your experience?"
          style={styles.textarea}
          onChangeText={(textArea) => setTextArea(textArea)}
          defaultValue={textArea}
          multiline
        />
        <PrimaryButton title={"Submit"} onPress={submitHandler} />
      </View>

      <ScrollView style={styles.revListContainer}>
        <FlatList
        showsVerticalScrollIndicator
          data={rev}
          renderItem={({ item }) => (
            <ReviewCard
              style={styles.rewCard}
              star={item.starts}
              email={item.csEmail}
              comment={item.csComment}
            />
          )}
        />
      </ScrollView>
    </View>
  );
}
export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 40,
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
    borderColor: "#a9a9a9",
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
    minHeight: 200,
    width: 800,
  },
  textInput: {
    fontSize: 30,
    borderWidth: 1,
    borderColor: "#a9a9a9",
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
    minHeight: 70,
    width: 800,
  },
  text: {
    fontSize: 30,
  },
  revListContainer: {

    marginHorizontal: -50,
    marginTop: 15,
  },
  revList: {
    justifyContent: "center",
    alignItems: "center",
  },
});
