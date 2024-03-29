import createDataContext from "./createDataContext";
import loginApi from "../api/login";
import * as WebBrowser from 'expo-web-browser';
import { Buffer } from 'buffer'
import axios from 'axios';
import { sendAuthCSRToCA, makeCSR } from "../server/ServerFacade";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
var forge = require('node-forge');
var pki=forge.pki;



const authReducer = (state,action) => {
    switch (action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'signup':
            return {errorMessage:'', token: action.payload};
        case 'signin':
            return {errorMessage:'', token: action.payload};
        case 'clear_error_message':
            return { ...state, errorMessage: '' }
        case 'signout':
            return { ...state, token: null, publicKey: null, privateKey:null}
        case 'public_key_gen':
            return { ... state, publicKey: action.payload}
        case 'private_key_gen':
            return { ... state, privateKey: action.payload}
        default:
            return state;
    }
};


const tryLocalSignIn = dispatch => async () => {
    //attempt to get token to see if user is logged in
    const token = await SecureStore.getItemAsync('token');
    if(token){
        dispatch({type: 'signin', payload: token});
        try{navigate('mainFlow');}
        catch(err){console.log("navigation error, try local sign in with token")}
    } else{
        try{navigate('loginFlow');}
        catch(err){console.log("navigation error, try local sign in without token")}
    }
};

const clearErrorMessage = dispatch => () => {
    //clean error message state
    dispatch({ type: 'clear_error_message' });
};

const signup = (dispatch) => {
    return async ( { username, password } ) => {
        const navigator = useNavigation();
        try{
            console.log('reaches generatekeys');
            try{
               let keys = pki.rsa.generateKeyPair(2048);
               let pemAuthPublic = forge.pki.publicKeyToPem(keys.publicKey);
               let publicKey= Buffer.from(pemAuthPublic).toString('base64');
               
                let url = "https://api.letsauth.org/register/" + username + "?authPublicKey=" + publicKey;
                await WebBrowser.openBrowserAsync(url);
                let email =  username + "@letsauth.org"
                const csr = makeCSR(keys.privateKey, keys.publicKey, username, email);
                let responseCert = await sendAuthCSRToCA(username, csr);
                if(responseCert == null){
                    console.log('AuthCertificate Generation Failed');
                    
                    try{navigator.navigate('Splash');}
                    catch(err){console.log("failed navigating back to splash screen" + err);}
                    throw new Error('Failed at generation');
                    return;
                }
                const authCertificate = forge.pki.certificateFromPem(responseCert.data.certificate);
                let vault = {
                    authKeyPublic: keys.publicKey,
                    authKeyPrivate: keys.privateKey,
                    authCertificate: authCertificate
                }
                let vaultString = encodeVault(vault);
                let promise = await SecureStore.setItemAsync(username, vaultString);
                promise.catch((err) => {
                    console.error("error saving item");
                  });
                
            }
            catch(err){
                dispatch({ type: 'add_error', payload: 'Problem generating keys'});
                console.log(err);
            }
            try{navigate('mainFlow');}
            catch(err){console.log("navigation error, signup")}
        }
        catch (err) {
            dispatch({ type: 'add_error', payload: 'Something went wrong when signing up'});
            console.log(err.response.data);
        }

    };
};

const signin = (dispatch) => {
    return async ( { username, password } ) => {
        try {
            try{
                //TODO add some actual encrption and password checking in here and then decrypt the vault and save the string in the storage
                const vaultString = await SecureStore.getItemAsync(username);
                const vault = decodeVault(vaultString);
                const kAuth = vault.authKeyPublic
                //TODO call CA signin endpoint when ready
                let url = "https://api.letsauth.org/login/" + username + "?authPublicKey=" + kAuth;
                await WebBrowser.openBrowserAsync(url);
            }
            catch(err){
               console.log(err);
            }
            //move to main flow(account page, landing page, etc)
            try{navigate('mainFlow');}
            catch(err){console.log("navigation error, signin")}
        }
        catch (err) {
            dispatch({ type: 'add_error', payload: 'Incorrect username or password'});
            console.log(err.response.data);
        }
    };
};


const signout = dispatch => {
    return async () => {
        const token = await SecureStore.getItemAsync('token');
        if(token){
            try{
                //try to remove the token to log them out
                await SecureStore.deleteItemAsync('publicKey');
                await SecureStore.deleteItemAsync('privateKey');
                await SecureStore.deleteItemAsync('authcsr');
                dispatch({type: 'signout', payload: token});
            }
            catch(err){
                dispatch({ type: 'add_error', payload: 'Problem removing JWT'});
                console.log(err.response.data);
            }  
        }
        try{navigate('loginFlow');}
        catch(err){console.log("navigation error, signout")}
        
    };
};
const isLoggedIn = dispatch => {
    return async () => {
    const token = await SecureStore.getItemAsync('token');
    if(token){
        return true;
    }
    return false;
    };
};


/**
 * Makes a certificate signing request (CSR).
 *
 * @param privateKey private key object (NOT a pem string)
 * @param publicKey public key object (NOT a pem string)
 * @param nameValue string to put in commonName field of certificate
 *
 * @returns PEM string format of certificate signing request.
 
 export function makeCSR(privateKey, publicKey, nameValue, emailValue) {
    let forge = require("node-forge");
  
    //make csr certificate using given name, email, and keys
    let csr = forge.pki.createCertificationRequest();
    csr.publicKey = publicKey;
    csr.setSubject([
      {
        name: "commonName",
        value: nameValue
      }
    ]);
    csr.setAttributes([
      {
        name: "emailAddress",
        value: emailValue
      }
    ]);
  
    console.log("signing")
    csr.sign(privateKey);
    console.log("back from signing")
  
    //return csr in PEM format
    let pem = forge.pki.certificationRequestToPem(csr);
    return pem;
  }

*/

function encodeVault(vault) {
    const encodedVault = {
      authKeyPrivate: forge.pki.privateKeyToPem(vault.authKeyPrivate),
      authKeyPublic: forge.pki.publicKeyToPem(vault.authKeyPublic),
      authCertificate: forge.pki.certificateToPem(vault.authCertificate),
    }
    const vaultString = JSON.stringify(encodedVault);
    return vaultString;
  }
  
export function decodeVault(vaultString) {
    let vault = JSON.parse(vaultString);
    vault.authKeyPrivate = forge.pki.privateKeyFromPem(vault.authKeyPrivate);
    vault.authKeyPublic = forge.pki.publicKeyFromPem(vault.authKeyPublic);
    vault.authCertificate = forge.pki.certificateFromPem(vault.authCertificate);
    return vault;
  }



export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout, clearErrorMessage, tryLocalSignIn, isLoggedIn },
    { token:null, errorMessage:'', publicKey:null, privateKey:null }
);

