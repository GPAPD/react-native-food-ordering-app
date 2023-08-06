import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import React from "react";
import CartScreen from "../Screens/CartScreen";
import ItemScreen from "../Screens/ItemScreen";
import Category from "../Screens/Category";
import ItemDetailScreen from "../Screens/ItemDetailScreen";
import { TabActions } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

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
        activeTintColor: "#f07048",
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

      {/* <Tab.Screen
        name="AddItem"
        component={ItemScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            //
            <Icon name="add" color={color} size={50} marginLeft={-20} />
          ),
        }}
      /> */}

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
    </Tab.Navigator>
  );
};

export default BottomNavigation;
