import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from  '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from "./SplashScreen";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";

const Stack = createStackNavigator();
const HomeScreen = () => {
  return (
    <Stack.Navigator>
                  <Stack.Screen name="Splash" component={SplashScreen} />
                  <Stack.Screen name="SignIn" component={SignInScreen} />
                  <Stack.Screen name="SignUp" component={SignUpScreen} />
    </ Stack.Navigator> 
  );
};




const styles = StyleSheet.create({
  
});

export default HomeScreen;
