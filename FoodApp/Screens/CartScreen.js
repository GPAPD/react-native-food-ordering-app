import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import SwitchSelector from "react-native-switch-selector";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../firebase";
import CartFlatlist from "../components/CartFlatlist";
import Colors from "../constants/colors";
import {CartItemsContext} from '../store/context/cart-context'






const CartScreen = () => {
  const navigation = useNavigation();

  const cartItemCtx = useContext(CartItemsContext);
  const cartItems  = cartItemCtx.ids;


  const [cartData, setCartData] = useState([]);
  const docRef = firebase.firestore().collection("Products");

  useEffect(() => {
    const fetchProductsByIds = async () => {
      const cartData = [];
      const snapshotPromises = cartItems.map((itemId) => {
        return docRef.doc(itemId).get();
      });
  
      const snapshots = await Promise.all(snapshotPromises);
  
      snapshots.forEach((snapshot) => {
        if (snapshot.exists) {
          const { itemName, price, image, description, quantity, tableNumber } = snapshot.data();
          cartData.push({
            id: snapshot.id,
            itemName,
            price,
            image,
            description,
            quantity,
            tableNumber,
          });
        }
      });
  
      setCartData(cartData);
    };
  
    fetchProductsByIds();
  }, [cartItems]);

  console.log(cartItems);

console.log("Akash");

  const [selectedOption, setSelectedOption] = useState(0);

  const options = [
    {
      label: "    Take-Away",
      value: 0,
      imageIcon: require("../assets/take-away.png"),
    },
    {
      label: "    Dine-In",
      value: 1,
      imageIcon: require("../assets/dineIn.png"),
    },
  ];

  //popup  popup dialog with textfield
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputTableNumber, setInputTableNumber] = useState("");
  const [savedTableNumber, setSavedTableNumber] = useState("");
  const [isEmptyError, setIsEmptyError] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setIsEmptyError(false);
  };

  const handleSaveButton = () => {
    // Perform actions with the text value
    if (inputTableNumber.trim() === "") {
      setIsEmptyError(true);
    } else {
      // console.log(inputTableNumber);
      toggleModal(isModalVisible);
      setSavedTableNumber(inputTableNumber);
      setInputTableNumber("");
      setIsEmptyError(false);
    }
  };

  const handleInputChange = (inputTableNumber) => {
    setInputTableNumber(inputTableNumber);
    // console.log(inputTableNumber);
    if (isEmptyError && inputTableNumber.trim() !== "") {
      setIsEmptyError(false);
    }
  };

  //checkout
  const checkout = () => {
    if (savedTableNumber === null && selectedOption === "Dine-In") {
      toggleModal();
    } else if (selectedOption === "Take-Away") {
      navigation.navigate("OrderConfirmationScreen");
    } else {
      navigation.navigate("Home");
    }
  };

  //substract cart item qty
  const onDecrement = (item, index) => {
    const nextProducts = [...cartData];
    if (nextProducts[index].quantity > 1) {
      nextProducts[index].quantity -= 1;
      setCartData(nextProducts);
    }
  };

  //increment cart item qty
  const onIncrement = (item, index) => {
    const nextProducts = [...cartData];
    nextProducts[index].quantity += 1;
    setCartData(nextProducts);
  };

  let totalQuantity = 0;
  let totalPrice = 0;
  cartData.forEach((item) => {
    totalQuantity += item.quantity;
    totalPrice += item.quantity * item.price;
  });

  // remove item from cart
  const onDeleteItem = (cartData) => {
    cartItemCtx.removeItemFromCart(cartData.id)
  };


  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="arrow-back-ios" size={30} />

        <Text style={{ fontSize: 30, fontWeight: "bold" }}> Cart </Text>
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: Colors.white,
          flex: 1,
          height: 500,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {cartData == 0 ? (
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              color: Colors.primary800,
            }}
          >
            {" "}
            <Icon name="remove-shopping-cart" color={"black"} size={100} />{" "}
            {"\n"} Empty Cart
          </Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
            data={cartData}
            renderItem={({ item, index }) => (
              <CartFlatlist
                item={item}
                onIncrement={() => onIncrement(item, index)}
                onDecrement={() => onDecrement(item, index)}
                onDeleteItem={() => onDeleteItem(item, index)}
              />
            )}
            keyExtractor={(item) => item.id}
            ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 120 }}
            ListFooterComponent={() => (
              <View>
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 26,
                    fontWeight: "bold",
                    color: Colors.black,
                  }}
                >
                  Choose Your Ordering Method
                </Text>

                <View
                  style={{
                    marginTop: 10,
                    height: 130,
                    width: "70%",
                    padding: 5,
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <SwitchSelector
                  buttonColor= '#ec4a14' 
                  selectedColor="#ffffff"
                  borderColor="#ea4d1d"
                  borderWidth={2}
                  textColor="#ee0d0d"
                  borderRadius={14}
                  fontSize={20}
                  elevation={25}
                  hasPadding
                  height={50}
                  options={options}
                  initial={selectedOption}
                  onPress={(value) => {
                    if (value === 1) {
                      toggleModal();
                    } else {
                      setSavedTableNumber(null);
                    }
                     setSelectedOption(value);
                  }}
                />

                  <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={toggleModal}
                  >
                    <View style={styles.modalContainer}>
                      <Text
                        style={{
                          fontSize: 26,
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        {" "}
                        Please Enter Your Table Number
                      </Text>
                      <TextInput
                        style={styles.InputContainer}
                        placeholder="Enter Table Number"
                        value={inputTableNumber}
                        onChangeText={handleInputChange}
                        
                      />

                      <PrimaryButton
                        title="Save"
                        onPress={handleSaveButton}
                        //onPress={()=>navigation.navigate('HomeScreen')}
                      />
                      {isEmptyError && (
                        <Text style={{ color: "red", fontSize: 18 }}>
                          Please enter a table number.
                        </Text>
                      )}
                    </View>
                  </Modal>
                </View>

                {savedTableNumber !== null ? (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 26,
                      fontWeight: "bold",
                      backgroundColor: "#f07048",
                      color: "white",
                    }}
                  >
                    {"Your Table Number is : " + savedTableNumber}
                  </Text>
                ) : (
                  <Text></Text>
                )}

                <Text style={{}}>{selectedOption} </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 15,
                    margin: 20,
                  }}
                >
                  <Text style={{ fontSize: 26, fontWeight: "bold" }}>
                    Total Quantity:
                  </Text>
                  <Text style={{ fontSize: 26, fontWeight: "bold" }}>
                    {totalQuantity}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    margin: 20,
                    justifyContent: "space-between",
                    marginVertical: 15,
                  }}
                >
                  <Text style={{ fontSize: 27, fontWeight: "bold" }}>
                    Total Price:
                  </Text>
                  <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                    {"Rs. " + totalPrice + ".00"}
                  </Text>
                </View>

                <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                  <SecondaryButton onPress={checkout} title="CHECKOUT" />
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },

  modalContainer: {
    backgroundColor: "white",
    height: 350,
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  InputContainer: {
    borderWidth: 1,
    borderColor: "grey",
    margin: 20,
    padding: 20,
    fontSize: 18,
    width: "100%",
    borderRadius: 1,
    fontSize: 25,
  },
});
export default CartScreen;
