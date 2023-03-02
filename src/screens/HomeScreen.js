import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from  '@react-navigation/native';
import AccountScreen from './AccountScreen';
import LandingScreen from './LandingScreen';

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Account" component={AccountScreen} />
        <Drawer.Screen name="Landing" component={LandingScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};




const styles = StyleSheet.create({
  
});

export default HomeScreen;
