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
import { Timestamp } from "firebase/firestore";
import "firebase/firestore";

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

  // overall rating
  const [selectedTab, setSelectedTab] = useState("recent");
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const reviewsRef = firebase.firestore().collection("Reviews");

    const unsubscribe = reviewsRef.onSnapshot((querySnapshot) => {
      const reviewsData = querySnapshot.docs.map((doc) => doc.data());
      const avgRating = calculateAverageRating(reviewsData);
      setAverageRating(avgRating);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
    const averageRating = totalStars / reviews.length;

    return averageRating; // Return the raw average rating
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

  //review submit

  const submitHandler = () => {
    const data = {
      stars: currentValue,
      csEmail: cEmail,
      csComment: textArea,
      createdAt: currentDate,
    };

    if (currentValue != 0 && cEmail !== "" && textArea !== "") {
      reviews.add(data).then(() => {
        setCurrentValue(0), setTextArea(""), setCemail("");
      });
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

        <View style={styles.separator} />

        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setSelectedTab("overall")}
          >
            <Text
              style={
                selectedTab === "overall"
                  ? styles.selectedNavText
                  : styles.navText
              }
            >
              Overall-Rating
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setSelectedTab("recent")}
          >
            <Text
              style={
                selectedTab === "recent"
                  ? styles.selectedNavText
                  : styles.navText
              }
            >
              Recent
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separator2} />

      {selectedTab === "overall" ? (
        /*  stars percentage here */
        <View style={styles.overallContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.averageRatingText}>
              {averageRating.toFixed(1)}
            </Text>

            <Text style={styles.averageRatingText2}>/5.0</Text>
          </View>

          <View style={styles.stars}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Ionicons
                key={index}
                name={index < averageRating ? "star" : "star-outline"}
                size={60}
                color={Colors.gold}
              />
            ))}
          </View>
        </View>
      ) : (
        /* Render recent review flat list here */
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={rev}
          renderItem={({ item }) => (
            <View style={styles.rewCard}>
              <ReviewCard
                star={item.stars}
                email={item.csEmail}
                comment={item.csComment}
                createdAt={item.createdAt}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
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
    borderColor: Colors.primary3,
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
    minHeight: 200,
    width: 800,
  },
  textInput: {
    fontSize: 30,
    borderWidth: 1,
    borderColor: Colors.primary3,
    borderRadius: 5,
    padding: 20,
    marginVertical: 20,
    minHeight: 70,
    width: 800,
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
  navBar: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  navButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  navText: {
    fontSize: 27,
    color: Colors.black,
  },
  selectedNavText: {
    fontSize: 27,
    color: Colors.primary1,
    borderBottomWidth: 3, // Add a border at the bottom
    borderBottomColor: Colors.primary1,
    paddingBottom: 10,
    borderBottomEndRadius: 10,
    // Color of the border
  },

  averageRatingText: {
    fontSize: 65,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  averageRatingText2: {
    fontSize: 45,
    alignItems: "center",
    justifyContent: "center",
    color: Colors.primary3,
    top: 15,
  },
  overallContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 60,
  },
  separator: {
    width: 750,
    shadowColor: Colors.black,
    borderWidth: 2,
    borderColor: Colors.grey2,
    marginTop: 10,
    marginBottom: 20,
    elevation: 40,
    borderBottomEndRadius: 50,
  },
  separator2: {
    width: 300,
    height: 5,
    shadowColor: Colors.black,
    marginBottom: 10,
  },
});
