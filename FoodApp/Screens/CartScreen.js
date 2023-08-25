import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import SwitchSelector from "react-native-switch-selector";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../firebase";
import CartFlatlist from "../components/CartFlatlist";
import Colors from "../constants/colors";
import { CartItemsContext } from "../store/context/cart-context";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../store/redux/CartReducer";
import { Formik } from "formik";
import * as Yup from "yup";

const CartScreen = () => {
  const navigation = useNavigation();

  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const cartData = cart.map((item) => ({
    id: item.id, // Assuming this is the unique identifier of the cart item
    itemName: item.itemName,
    price: item.price,
    image: item.image,
    description: item.description,
    quantity: item.quantity,
    tableNumber: item.tableNumber,
  }));

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
  const [savedTableNumber, setSavedTableNumber] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmptyError, setIsEmptyError] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    // setIsEmptyError(false);
  };

  const validationSchema = Yup.object().shape({
    inputTableNumber: Yup.string()
      .matches(
        /^\d{2}$/,
        "Invalid Value ! Please Check the Table Number In Your Table.ex:01 "
      )
      .required("Table Number is required"),
  });

  const handleSaveTableNumber = () => {
    setSavedTableNumber(true);
    toggleModal();
  };

  // const handleInputChange = (inputTableNumber) => {
  //   setInputTableNumber(inputTableNumber);
  //   // console.log(inputTableNumber);
  //   if (isEmptyError && inputTableNumber.trim() !== "") {
  //     setIsEmptyError(false);
  //   }
  // };

  //checkout
  // const checkout = () => {
  //   if (savedTableNumber === null && selectedOption === "Dine-In") {
  //     toggleModal();
  //   } else if (selectedOption === "Take-Away") {
  //     navigation.navigate("OrderConfirmationScreen");
  //   } else {
  //     navigation.navigate("Home");
  //   }
  // };

  const checkout = () => {
    if (inputTableNumber === "" && selectedOption === 1) {
      toggleModal();
    } else {
      const checkoutData = {
        items: cartData.map((item) => ({
          id: item.id,
          //image: item.image,
          itemName: item.itemName,
          quantity: item.quantity,
          price: item.price,
        })),

        orderingMethod: selectedOption === 0 ? "Take-Away" : "Dine-In",
        tableNumber: inputTableNumber,
        totalPrice: totalPrice,
      };

      navigation.navigate("OrderConfirmationScreen", { checkoutData });
    }
  };

  //substract cart item qty
  const onDecrement = (cartData) => {
    dispatch(decrementQuantity(cartData));
  };

  //increment cart item qty
  const onIncrement = (cartData) => {
    dispatch(incrementQuantity(cartData));
  };

  // remove item from cart
  const onDeleteItem = (cartData) => {
    dispatch(removeFromCart(cartData));
  };

  let totalQuantity = 0;
  let totalPrice = 0;

  cartData.forEach((item) => {
    totalQuantity += item.quantity;
    totalPrice += item.quantity * item.price;
  });

  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
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
              color: Colors.black,
            }}
          >
            {" "}
            <Icon name="cart" color={Colors.black} size={100} /> {"\n"} Empty
            Cart
          </Text>
        ) : (
          <ScrollView>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 80 }}
            >
              {cartData.map((item, index) => (
                <CartFlatlist
                  key={item.id}
                  item={item}
                  onIncrement={() => onIncrement(item)}
                  onDecrement={() => onDecrement(item)}
                  onDeleteItem={() => onDeleteItem(item)}
                />
              ))}
            </ScrollView>

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
                  width: "50%",
                  marginLeft:15,
                  padding: 5,
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <SwitchSelector
                  buttonColor={Colors.primary1}
                  selectedColor={Colors.white}
                  borderColor={Colors.primary1}
                  borderWidth={2}
                  textColor={Colors.black}
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
                      setInputTableNumber("");
                    }
                    setSelectedOption(value);
                  }}
                />

                {/* <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={toggleModal}
                  >
                    <View style={styles.modalContainer}>
                      <Text
                        style={{
                          fontSize: 26,
                          fontWeight: "bold",
                          color: Colors.black,
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
                        <Text style={{ color:Colors.red, fontSize: 18 }}>
                          Please enter a table number.
                        </Text>
                      )}
                    </View>
                  </Modal> */}

                <Modal
                  visible={isModalVisible}
                  animationType="slide"
                  transparent={true}
                >
                  <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                      <TouchableOpacity
                        onPress={toggleModal}
                        disabled={isSubmitting}
                        style={styles.closeButton}
                      >
                        <Icon
                          name="close-box"
                          color={Colors.primary3}
                          size={40}
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 26,
                          fontWeight: "bold",
                          color: Colors.black,
                        }}
                      >
                        Please Enter Your Table Number
                      </Text>
                      <Formik
                        initialValues={{
                          inputTableNumber: inputTableNumber,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                          setInputTableNumber(values.inputTableNumber);
                          handleSaveTableNumber();
                        }}
                      >
                        {({
                          values,
                          handleChange,
                          handleSubmit,
                          errors,
                          touched,
                          isSubmitting,
                        }) => (
                          <>
                            <TextInput
                              style={styles.input}
                              placeholder="Table Number"
                              value={values.inputTableNumber}
                              onChangeText={handleChange("inputTableNumber")}
                            />
                            {touched.inputTableNumber &&
                            errors.inputTableNumber ? (
                              <Text style={styles.errorText}>
                                {errors.inputTableNumber}
                              </Text>
                            ) : null}
                            <View style={{ width: 250 }}>
                              <PrimaryButton
                                title="Save"
                                onPress={handleSubmit}
                                disabled={isSubmitting}
                              />
                            </View>
                          </>
                        )}
                      </Formik>
                    </View>
                  </View>
                </Modal>
              </View>

              {selectedOption === 1 && savedTableNumber ? (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 26,
                    fontWeight: "bold",
                    backgroundColor: Colors.primary2,
                    color: Colors.white,
                  }}
                >
                  Your Table Number Is :{inputTableNumber}
                </Text>
              ) : (
                <Text></Text>
              )}

              {/* <Text style={{}}>{selectedOption} </Text> */}

              {/* <View
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
              </View> */}

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

              <View style={{ marginHorizontal: 10, marginTop: 20 ,paddingBottom:20}}>
                <SecondaryButton onPress={checkout} title="CHECKOUT" />
              </View>
            </View>
          </ScrollView>
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

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContainer: {
    padding: 26,
    backgroundColor: Colors.white,
    width: "85%",
    elevation: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  errorText: {
    color: "red",
    fontSize: 22,
    marginBottom: 20,
    marginLeft: 20,
    alignSelf: "flex-start",
  },
  closeButton: {
    alignSelf: "flex-end",
    top: -12,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary3,
    margin: 30,
    padding: 20,
    fontSize: 18,
    width: "95%",
    borderRadius: 1,
    fontSize: 25,
  },
});
export default CartScreen;
