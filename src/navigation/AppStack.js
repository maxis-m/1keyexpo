import React from 'react';
import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import LandingScreen from '../screens/LandingScreen';
import AccountScreen from '../screens/AccountScreen';

const Drawer = createDrawerNavigator(); 

const AppStack = () => {
    return  (
          <Drawer.Navigator screenOptions={{headerShown: false}}>
            <Drawer.Screen 
            name="Landing" 
            component={LandingScreen} 
            options={{headerShown: false}}
            />
            <Drawer.Screen 
            name="Account" 
            component={AccountScreen} 
            options={{headerShown: false}}
            />
          </Drawer.Navigator>
    )
}

export default AppStack;