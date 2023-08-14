import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "./navigation/BottomNavigation";
import ItemDetailScreen from "./Screens/ItemDetailScreen";
import OrderConfirmationScreen from "./Screens/OrderConfirmationScreen";
import HomeScreen from "./Screens/HomeScreen";
import CartScreen from "./Screens/CartScreen";
import ItemScreen from "./Screens/ItemScreen";
import Category from "./Screens/Category";
import CartItemsContextProvider from "./store/context/cart-context";
import IntroScreen from "./Screens/IntroScreen";
import { Provider } from "react-redux";
import store from "./store/store";
import OrderStatusScreen from "./Screens/OrderStatusScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator >
        {/* <Stack.Screen
            options={{ headerShown: false }}
            name="OrderStatusScreen"
            component={OrderStatusScreen}
          /> */}

          <Stack.Screen
            options={{ headerShown: false }}
            name="Intro"
            component={IntroScreen}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="BottomNavigation"
            component={BottomNavigation}
          />
           

          <Stack.Screen
            options={{ headerShown: false }}
            name="IntroS"
            component={IntroScreen}
          />
          
          <Stack.Screen
            options={{ headerShown: false }}
            name="OrderConfirmationScreen"
            component={OrderConfirmationScreen}
          />
         

          <Stack.Screen
            options={{ headerShown: false }}
            name="ItemDetailScreen"
            component={ItemDetailScreen}
          />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="CartScreen"
            component={CartScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ItemScreen"
            component={ItemScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="category"
            component={Category}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="OrderStatusScreen"
            component={OrderStatusScreen}
          />
          
          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
