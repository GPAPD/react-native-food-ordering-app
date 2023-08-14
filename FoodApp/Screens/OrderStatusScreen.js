import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import CountDown from "react-native-countdown-component";
import Colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { PrimaryButton } from "../components/Button";
import { useRoute } from "@react-navigation/native";

const OrderStatusScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { orderId, customerName } = route.params;
  // const handleRestart = () => {
  //   const resetAction = CommonActions.reset({
  //     index: 0, // index of the screen to navigate to
  //     routes: [{ name: 'Intro' }], // name of the first screen
  //   });

  //   navigation.dispatch(resetAction);
  // };

  const [timeLeft, setTimeLeft] = useState(20); // Initial time in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      // Deduct 1 second from timeLeft
      setTimeLeft((prevTime) => prevTime - 1);

      // Check if the timer has finished
      if (timeLeft === 0) {
        clearInterval(interval);
        handleCountdownFinish();
      }
    }, 1000); // Update every 1 second

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [timeLeft]);

  const handleCountdownFinish = () => {
    //navigation.navigate('Intro');
    const resetAction = CommonActions.reset({
      index: 0, // index of the screen to navigate to
      routes: [{ name: "Intro" }], // name of the first screen
    });

    navigation.dispatch(resetAction);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi! {customerName}</Text>
      <Text style={styles.title}>Your Order Is Ready In:</Text>
      <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      {/* <CountDown
        size={60}
        until={10}
        digitStyle={{ backgroundColor: Colors.white }}
        digitTxtStyle={{ color: Colors.primary1 }}
        timeLabelStyle={{ color: "red", fontWeight: "bold" }}
        separatorStyle={{ color: Colors.primary1 }}
        timeToShow={["M", "S"]}
        timeLabels={{ m: null, s: null }}
        showSeparator
        
        onFinish={OnFinish}
      /> */}

      {/* <PrimaryButton title="navigate" onPress={handleRestart}/> */}
      <View>
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
    fontSize: 40,
    marginBottom: 50,
    fontWeight: "bold",
  },
  timer: {
    fontSize: 70,
    fontWeight: "bold",
    color: Colors.primary1,
    marginBottom: 50,
  },
});

export default OrderStatusScreen;
