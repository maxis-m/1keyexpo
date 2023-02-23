//import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from  '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
//import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LandingScreen from './src/screens/LandingScreen';

//import { Provider } from './src/context/AuthCçntext';
import * as Linking from 'expo-linking';
/**const prefix = Linking.createURL('/');
const linking = {
  prefixes: [prefix],
};

const Drawer = createDrawerNavigator();
function drawerScreen(){
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerScreen {...props} /> } screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Account" component={AccountScreen} />
        <Drawer.Screen name="Landing" component={LandingScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Splash: SplashScreen,
    SignUp: SignUpScreen,
    SignIn: SignInScreen,
  }),
  mainFlow: createStackNavigator({
    Drawer: drawerScreen
  }),
});
 */

//const App = createAppContainer(switchNavigator);

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen name="Home" component={LandingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
