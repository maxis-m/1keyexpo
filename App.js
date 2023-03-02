import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from  '@react-navigation/native';
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from "./src/screens/SplashScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import AccountScreen from './src/screens/AccountScreen';
import LandingScreen from './src/screens/LandingScreen';
import { DrawerScreen } from './src/screens/DrawerScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from './src/context/AuthContext';x
import { setNavigator } from './src/navigationRef';


export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator>
        <>
        {isSignedIn ? (
        <>
            <Stack.Screen name="Home" component={LandingScreen} />
        </>
        ) : (
        <>
           <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
        )}
        </>
      </Stack.Navigator>
    </AuthContext.Provider>
    </GestureHandlerRootView>
  );
}


/*import { NavigationContainer } from  '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LandingScreen from './src/screens/LandingScreen';

import * as Linking from 'expo-linking';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen name="Home" component={LandingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};*/
