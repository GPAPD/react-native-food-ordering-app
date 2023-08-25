import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import React from "react";
import CartScreen from "../Screens/CartScreen";
import ItemScreen from "../Screens/ItemScreen";
import Category from "../Screens/Category";
import ReviewScreen from "../Screens/ReviewScreen"
import ItemDetailScreen from "../Screens/ItemDetailScreen";
import { TabActions } from "@react-navigation/native";
import OrderStatusScreen from "../Screens/OrderStatusScreen";
import IntroScreen from "../Screens/IntroScreen";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from "../constants/colors";


const Tab = createBottomTabNavigator();
const shouldShowOrderStatusScreen = false;
const BottomNavigation = () => {
  return (
    
    <Tab.Navigator
      screenOptions={{
        style: {
          height: 100,
          borderTopWidth: 0,
          elevation: 0,
        },
        showLabel: false,
        tabBarActiveTintColor:Colors.primary1,
        tabBarShowLabel:false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Category}
        options={{
            
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="home-filled" color={color} size={50} marginLeft={-20} />
          ),
        }}
      />
      

      <Tab.Screen
        name="Review"
        component={ReviewScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            //
            <Icon name="star" color={color} size={50} marginLeft={-20} />
            
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        // options={ {headerShown: false} }
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon
              name="shopping-cart"
              color={color}
              size={50}
              marginLeft={-20}
            />
          ),
        }}
      />

{/* 
        <Tab.Screen
          name="OrderStatus"
          component={OrderStatusScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon name="home-filled" color={color} size={50} marginLeft={-20} />
            ),
            tabBarVisibility: false, // Hide the tab bar icon and label
          }}
        /> */}


      
    </Tab.Navigator>
  );
};

export default BottomNavigation;
