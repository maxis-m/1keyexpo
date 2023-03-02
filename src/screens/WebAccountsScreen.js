import { View, TouchableOpacity, Text, StyleSheet, TextInput, Dimensions, Button, Image } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import React, {useContext, useEffect, useState} from 'react';

const WebAccountsScreen = () => {
  const { state, signout } = useContext(AuthContext);

  return <View style={styles.container}>
        <Text>Website Accounts I'm Logged Into</Text>
        <Button title='logout' onPress={signout}/>
</View>
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
});

export default WebAccountsScreen;