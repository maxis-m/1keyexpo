import React from 'react';
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return  (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen 
            name="Splash" 
            component={SplashScreen} 
            options={{headerShown: false}}
            />
            <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen} 
            options={{headerShown: false}}
            />
            <Stack.Screen 
            name="SignIn" 
            component={SignInScreen} 
            options={{headerShown: false}}
            />
          </Stack.Navigator>
    )
}
export default AuthStack;