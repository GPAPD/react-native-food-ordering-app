import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "../constants/colors";
import { GetStartButton } from "../components/Button";
import { useNavigation } from "@react-navigation/native";


const IntroScreen = ({route }) => {
    const navigation = useNavigation();
  return (
    
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
           source={require("../assets/Images/itroImage2.gif")}
        />
      </View>
      <View>
        <Text style={styles.summaryText}>
        <Text
            style={{
              marginTop: 20,
              fontSize: 28,
              textAlign: 'center',
              color:Colors.white,
            }}>
            Savor Bliss: Where Flavors Dance!
          </Text>
          {/* Your Phone Need <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
          Rounds to find <Text style={styles.highlight}>{userNumber}</Text> */}
        </Text>
      </View>
      <GetStartButton title={'Get Started'} onPress={ ()=> navigation.navigate('BottomNavigation') }/>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:Colors.primary1,
  },
  imageContainer: {
    width: 700,
    height: 700,
    borderRadius: 350,
    borderWidth: 5,
    borderColor: Colors.primary2,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
   // fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",

    marginBottom: 24,
  },
  highlight: {
    //fontFamily: "open-sans-bold",
    //color: Colors.primary500,
  },
});
