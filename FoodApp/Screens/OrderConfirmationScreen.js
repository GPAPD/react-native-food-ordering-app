import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  CancelButton,
  PrimaryButton,
  SecondaryButton,
} from "../components/Button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { firebase } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/redux/CartReducer";
import Colors from "../constants/colors";
import CustomConfirmModal from "../components/CustomConfirmModal";
import { Formik } from "formik";
import * as Yup from "yup";
import "firebase/compat/database";

const OrderConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { checkoutData } = route.params;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOrderConfirmModal, setIsOrderConfirmModal] = useState(false);
  const [isOrderCancelModal, setIsOrderCancelModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCustomerSaved, setIsCustomerSaved] = useState(false);
  const [cartItems, setCartItems] = useState(checkoutData.items);

  const [currentTime, setCurrentTime] = useState(new Date());

  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  //validations for customer details form
  const validationSchema = Yup.object().shape({
    customerName: Yup.string().required("Customer Name is required"),
    customerPhone: Yup.string()
      .matches(/^\d{10}$/, "Invalid phone number format")
      .required("Customer Phone is required"),
    customerEmail: Yup.string()
      .email("Invalid email format")
      .required("Customer Email is required"),
  });

  //save method
  const saveCustomerDetails = () => {
    setIsCustomerSaved(true);
    toggleModal();
  };

  // order submit method

  const confirmModal = () => {
    setIsOrderConfirmModal(true);
  };

  const cancelOrder = () => {
    setIsOrderCancelModal(true);
  };

  const submitOrder = async () => {
    setIsSubmitting(true);

    // order object with customer details
    setCurrentTime(new Date());
  
    const order = {
      ...checkoutData,
      customer: {
        name: customerName,
        phone: customerPhone,
        email: customerEmail,
      },
      orderStatus: "Pending",
      orderedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    const datetime = currentTime.toLocaleTimeString();
    

    try {
     
     
      const orderRef = await firebase
        .firestore()
        .collection("Orders")
        .add(order);
        const orderId = orderRef.id;
      // Insert into Realtime Database
      const realtimeDatabase = firebase.database();
      const orderLive = {
        ...checkoutData,
        customer: {
          name: customerName,
          phone: customerPhone,
          email: customerEmail,
        },
        orderStatus: "Pending",
        orderID: orderRef.id,
      };
      await realtimeDatabase.ref("Orders/" + datetime).set(orderLive);

      navigation.navigate("OrderStatusScreen", {
        orderId,
        customerName,
        customerEmail,
      });
      dispatch(clearCart());
      setIsSubmitting(false);
      //alert("Order placed successfully");

      // Alert.alert(
      //   "Confirm Order",
      //   "Are you sure you want to place this order?",
      //   [
      //     {
      //       text: "Cancel",
      //       style: "cancel",
      //     },
      //     {
      //       text: "Confirm",
      //       onPress: async () => {
      //         try {
      //           await firebase.firestore().collection("Orders").add(order);
      //           dispatch(clearCart());
      //           setIsSubmitting(false);
      //           alert("Order placed successfully");
      //           navigation.navigate("OrderStatusScreen");
      //         } catch (error) {
      //           setIsSubmitting(false);
      //           console.error("Error submitting order:", error);
      //         }
      //       },
      //     },
      //   ]
      // );
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error displaying confirmation dialog:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.orderSummary}>
          <CustomConfirmModal
            isVisible={isOrderCancelModal}
            title="Cancel Order"
            ConfirmText="Yes"
            CancelText="No"
            message="Are you sure you want to cancel this order?"
            onClose={() => setIsOrderCancelModal(false)}
            onConfirm={() => navigation.navigate("Cart")}
          />
          <Text style={styles.orderSummaryText}>Order Summary</Text>

          {checkoutData.items.map((item, index) => (
            <View
              style={[
                styles.itemContainer,
                {
                  borderBottomWidth:
                    index !== checkoutData.items.length - 1 ? 1 : 0,
                },
              ]}
              key={item.id}
            >
              <View style={{ flexDirection: "row" }}>
                {/* <Image source={{ uri: item.image }} style={styles.itemImage} /> */}

                <View style={styles.quantityContainer}>
                  <Text style={styles.itemText1}>{item.quantity} </Text>
                </View>

                <Text
                  style={{
                    color: Colors.primary3,
                    fontSize: 25,
                    marginRight: 30,
                  }}
                >
                  x
                </Text>
                <Text style={styles.itemText2}>{item.itemName}</Text>
              </View>
              <Text style={styles.priceText}>
                Rs. {item.price * item.quantity}
              </Text>
            </View>
          ))}

          <View style={styles.itemContainer}>
            <Text style={styles.text}>Total: </Text>
            <Text style={styles.text}>
              {" "}
              Rs. {checkoutData.totalPrice.toFixed(2)}
            </Text>
          </View>

          <View style={styles.orderingMethodContainer}>
            <Text style={styles.orderingMethodText}>
              Ordering Method: {checkoutData.orderingMethod}
            </Text>
            {checkoutData.tableNumber !== "" && (
              <Text style={styles.orderingMethodText}>
                Table Number: {checkoutData.tableNumber}
              </Text>
            )}
          </View>

          <View style={styles.customerContainer}>
            {isCustomerSaved ? (
              // Display Customer Details
              <View style={styles.customerDetails}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.savedText}>Customer Details: </Text>
                  <TouchableOpacity
                    style={styles.changeButton}
                    onPress={toggleModal}
                    disabled={isSubmitting}
                  >
                    <Icon
                      name="square-edit-outline"
                      color={Colors.black}
                      size={32}
                      fontWeight={"bold"}
                    />
                    <Text
                      style={{
                        color: Colors.primary1,
                        fontSize: 25,
                        fontWeight: "500",
                      }}
                    >
                      Edit
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.savedDetail}>Name: {customerName}</Text>
                <Text style={styles.savedDetail}>Phone: {customerPhone}</Text>
                <Text style={styles.savedDetail}>Email: {customerEmail}</Text>
              </View>
            ) : (
              // Enter Customer Details

              <View style={styles.enterDetailsButton}>
                <View style={{ width: 400 }}>
                  <PrimaryButton
                    title="Enter Customer Details"
                    onPress={toggleModal}
                    disabled={isSubmitting}
                  />
                </View>

                <CancelButton
                  title="Cancel"
                  onPress={() => navigation.navigate("Cart")}
                />
              </View>
            )}
          </View>

          <View style={styles.confirmButtonContainer}>
            {isCustomerSaved && (
              <View style={styles.enterDetailsButton}>
                <View>
                  <PrimaryButton
                    title="Confirm Order"
                    onPress={submitOrder}
                    disabled={isSubmitting}
                  />
                </View>
                <CancelButton title="Cancel" onPress={cancelOrder} />
              </View>
            )}
            {/* <CustomConfirmModal
              isVisible={isOrderConfirmModal}
              title="Confirm Order"
              ConfirmText="Confirm"
              CancelText="Cancel"
              message="Are you sure you want to place this order?"
              onClose={() => setIsOrderConfirmModal(false)}
              onConfirm={submitOrder}
            /> */}
          </View>

          {/* Modal for Customer Details */}
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
                  <Icon name="close-box" color={Colors.primary3} size={40} />
                </TouchableOpacity>
                <Formik
                  initialValues={{
                    customerName: customerName,
                    customerPhone: customerPhone,
                    customerEmail: customerEmail,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    setCustomerName(values.customerName);
                    setCustomerPhone(values.customerPhone);
                    setCustomerEmail(values.customerEmail);
                    saveCustomerDetails();
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
                        placeholder="Customer Name"
                        value={values.customerName}
                        onChangeText={handleChange("customerName")}
                      />
                      {touched.customerName && errors.customerName ? (
                        <Text style={styles.errorText}>
                          {errors.customerName}
                        </Text>
                      ) : null}
                      <TextInput
                        style={styles.input}
                        placeholder="Customer Phone"
                        value={values.customerPhone}
                        onChangeText={handleChange("customerPhone")}
                        keyboardType="phone-pad"
                      />
                      {touched.customerPhone && errors.customerPhone ? (
                        <Text style={styles.errorText}>
                          {errors.customerPhone}
                        </Text>
                      ) : null}
                      <TextInput
                        style={styles.input}
                        placeholder="Customer Email"
                        value={values.customerEmail}
                        onChangeText={handleChange("customerEmail")}
                      />
                      {touched.customerEmail && errors.customerEmail ? (
                        <Text style={styles.errorText}>
                          {errors.customerEmail}
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
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
    backgroundColor: Colors.white,
  },
  orderSummary: {
    backgroundColor: Colors.white,
    padding: 26,
    elevation: 20,
    top: 50,
  },

  orderSummaryText: {
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 50,
    backgroundColor: Colors.primary2,
    color: Colors.white,
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    margin: 20,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderBottomWidth: 3,
    padding: 20,
  },

  quantityContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },

  itemImage: {
    width: 60,
    height: 60,
    marginRight: 20,
  },

  itemText1: {
    fontSize: 23,
  },
  itemText2: {
    fontSize: 28,
  },
  priceText: {
    fontSize: 25,
    fontWeight: "800",
    color: Colors.primary1,
  },
  text: {
    fontSize: 33,
    fontWeight: "bold",
    marginBottom: 8,
  },
  customerContainer: {
    marginLeft: 40,
    top: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  customerDetails: {
    marginBottom: 16,
    paddingBottom: "10%",
  },
  savedText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 8,
  },
  savedDetail: {
    fontSize: 26,
    marginBottom: 4,
  },
  changeButton: {
    padding: 5,
    borderRadius: 4,
    marginRight: 20,
    flexDirection: "row",
  },
  changeButtonText: {
    color: Colors.white,
    fontSize: 22,
  },
  enterDetailsButton: {
    //margin: 70,
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "center",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },

  // Adjust modalContainer style for centered display
  modalContainer: {
    padding: 20,
    backgroundColor: Colors.white,
    width: "80%",
    elevation: 10,
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
    borderRadius: 4,
    padding: 25,
    marginBottom: 35,
    fontSize: 16,
    width: "95%",
    fontSize: 25,
  },
  confirmButtonContainer: {
    paddingBottom: "10%",
  },
  orderingMethodContainer: {
    marginLeft: 39,
    top: 10,
    marginBottom: 20,
  },
  orderingMethodText: {
    color: Colors.primary3,
    fontSize: 25,
  },
});

export default OrderConfirmationScreen;
