import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from  '@react-navigation/native';
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./src/screens/HomeScreen";
import AccountScreen from './src/screens/AccountScreen';
import LandingScreen from './src/screens/LandingScreen';
import { DrawerScreen } from './src/screens/DrawerScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, Context } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import * as SecureStore from 'expo-secure-store';
import { Nav } from '@expo/html-elements';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';

const Stack = createStackNavigator();
const AuthContext = React.createContext();

export default function App() {
  const isLoggedIn = false;
  return (
    <Provider>
      <NavigationContainer>
        {isLoggedIn ? (
          <AppStack />
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </Provider>
  );
}
