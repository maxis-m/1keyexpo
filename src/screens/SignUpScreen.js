import React, {useContext, useState} from 'react';
import { View, Button, Text, StyleSheet, TextInput, Image, Dimensions, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';

const SignUpScreen = ({navigation}) => {

    const { state, signup, clearErrorMessage } = useContext(AuthContext);
    const  [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [confirm_secureTextEntry, setConfirmSecureTextEntry] = useState(true);
    const [loading, setLoading] = useState(false);

  return <View style={styles.container}>
    <NavigationEvents 
        onWillBlur={[clearErrorMessage,()=>{setLoading(false)
            clearErrorMessage}]}
      />
      <StatusBar backgroundColor='#009387' barStyle='light-content' />
      <View style={styles.header}>
        {loading ? <Text style={styles.text_header}>Loading...</Text>:
            <Text style={styles.text_header}>Register Now!</Text>}
      </View>
      {loading ? <Image style={styles.container} source={require('../loadingGif.gif')} />:
      <View
        style={styles.footer}>
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name='user-o' color='#05375a' size={20} />
            <TextInput
                placeholder='Your Username'
                style={styles.textInput}
                autoCapitalize='none'
                onChangeText={setUsername}
            />
          </View>
          <Text style={[styles.text_footer, { marginTop: 35}]}>Password</Text>
          <View style={styles.action}>
            <FontAwesome name='lock' color='#05375a' size={20} />
            <TextInput
                placeholder='Your Password'
                style={styles.textInput}
                autoCapitalize='none'
                secureTextEntry={secureTextEntry}
                onChangeText={setPassword}

            />
            
          </View>
          <Text style={[styles.text_footer, { marginTop: 35}]}>Confirm Password</Text>
          <View style={styles.action}>
            <FontAwesome name='lock' color='#05375a' size={20} />
            <TextInput
                placeholder='Confirm Your Password'
                style={styles.textInput}
                autoCapitalize='none'
                secureTextEntry={confirm_secureTextEntry}
                onChangeText={setConfirmPassword}

            />
            
          </View>
          {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
          <View style={styles.button}>
                <TouchableOpacity
                    onPress={()=> {
                        setLoading(true);
                        signup({ username, password });
                    }}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}>
                    <LinearGradient
                        colors={['#08d4c4', '#01ab9d']}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign, {color: '#fff'}]}>Sign Up</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('SignIn')}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {color: '#009387'}]}>Sign In</Text>
                </TouchableOpacity>
          </View>
      </View>}
  </View>;
};


const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft:15,
    marginTop:15
  },  
  container: {
      flex: 1,
      backgroundColor: '#009387'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius:30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
});

export default SignUpScreen;
