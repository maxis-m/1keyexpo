import { View, TouchableOpacity, Text, StyleSheet, TextInput, Dimensions, Button, Linking, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as WebBrowser from 'expo-web-browser';
import rpRegister from '../context/RPContext';
import axios from 'axios';

const LandingScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');
  const [session, setSession] = useState('Not yet scanned');
  const [signature, setSignature] = useState('Not yet scanned');
  const [result, setResult] = useState(null);
  //const [domain, setDomain] = useState(null);
  //const [sessionID, setSessionID] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  /**
   * 
   * QR code will have session and signature encoded as a json object.
   * We need to handle the signature somehow to verify that the rp was the person who did it.
   * Next session is an object with sessionid, domain, and method
   * So double decode?
   * Can call api to get rp's public key and then we can use node crypto to verify signature with the public key
   */

  const handleBarCodeScanned = ({ type, data }) => {
    let jsonObj = JSON.parse(data);

    setScanned(true);
    setSession(jsonObj.session);
    setSignature(jsonObj.signature);
    console.log(signature);
  };


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const sendRP = async () => {
    let sessionID = session.sessionID;
    let domain = session.domain;
    let method = session.method;
    console.log(sessionID);
    console.log(domain);
    console.log(method);

    //CALL API 
    //let [domain, sessionID] = await axios.get(text);
    rpRegister(domain, sessionID, method);
    setResult(domain);
    console.log(domain);
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{height: 400, width: 400}}
        />
      </View>
      <Text style={styles.maintext}>{result}</Text>
      <Button title="Register" onPress={sendRP} />
      {scanned && <Button title={'Scan Again'} onPress={() => setScanned(false)} color='tomato'/>}
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
    alignItems: 'center',
    justifyContent:'center',
  },
  barcodebox: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300, 
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  }
});

export default LandingScreen;
