import React, {useContext, useEffect} from 'react';
import { View, Button, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Context as AuthContext } from '../context/AuthContext';



const SplashScreen = ({ navigation }) => {
    const { state, tryLocalSignIn } = useContext(AuthContext);
    useEffect(() => {
        tryLocalSignIn();
    }, []);

  return <View style={styles.container}>
    <View style={styles.footer}>
        <Text style={styles.title}>Passwordless Login at your fingertips!</Text>
        <Text style={styles.text}>Sign in!</Text>
        <View style={styles.button}>
        <TouchableOpacity onPress={()=> navigation.navigate('SignIn')}>
            <LinearGradient
            colors={['#08d4c4', '#01ab9d']}
            style={styles.signIn}>
                <Text style={styles.textSigns}>Get Started</Text>
                <MaterialIcons name="navigate-next" size={20}/>
            </LinearGradient>
        </TouchableOpacity>
        </View>
    </View>
  </View>;
};

const {height} = Dimensions.get("screen");
const height_logo = height * 0.15;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#009387'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex:1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop: 5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  backdrop: {
    flex:1,
    flexDirection: 'column'
  },
});

export default SplashScreen;


/*
<Image
                source = {require('../../assets/background.png')}
                resizeMode = 'cover'
                style = {styles.backdrop}
            />*/