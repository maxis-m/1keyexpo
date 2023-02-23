import axios from "axios";
let forge = require("node-forge");
var hostName =  "https://letsauth.org";

export function makeRpCSR(accountID, sAccount, kAccount) {
  //make csr certificate using given name, email, and keys
  //public key and private key here are the account keys NOT the auth ones. 
  let csr = forge.pki.createCertificationRequest();
  csr.publicKey = kAccount;
  csr.setSubject([
    {
      name: "accountID",
      value: accountID
    }
  ]);

console.log("signing")
csr.sign(sAccount);
console.log("back from signing")

//return csr in PEM format
let pem = forge.pki.certificationRequestToPem(csr);
return pem;
}
export async function sendLoginToCA(usr, authCSR) {
    try {
      let response = await axios.post(hostName + "/la3/password/login", {
      username: usr,
      CSR: authCSR
    });
      return response;
    } catch (error) {
      console.log(error.response);
      if (!error.response) {
        alert("1Key Server is not responding. Please try again later.");
      } else {
        console.log(error.response.data);
        //possible errors: 403 (unable to sign csr) or 500 (internal server error)
        // TODO: maybe differentiate error message based on error type...
      }
      return null;
    }
  }

  /**
 * Completes registering a 1Key account with the CA.
 *
 * @param usr string of desired username for the new 1Key account
 * @param pwd plain text string of desired master password for the new 1Key account
 * @param authCSR certificate signing request for an authenticator certificate that contains the public key from this authenticator's keypair
 *
 * @returns response if successful or null if error occurs
 */
export async function sendRegisterToCA(usr, pwd, authCSR) {
    try {
      let [options, status] = await axios.get(hostName + "/la3/account/create-begin/"+usr);
      //response contains return code (200, 403, or 50X), as well as credential creation options. like jsonResponse(w, options, http.StatusOK)
      let response2 = await axios.post(hostName + "/la3/account/create-finish/" + usr, {
        options
      });
      return response2;
    } catch (error) {
      console.log(error);
      if (!error.response) {
        alert("1Key Server is not responding. Please try again later.");
      } else {
        alert(error.response.data);
        //possible errors: 403 (unable to sign csr) or 500 (internal server error)
        // TODO: maybe differentiate error message based on error type...
      }
      return null;
    }
  }

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
    sign(privateKey);
  }


    /* The app will call the CA with a Certificate Signing Request, containing the accountID*, and K_Account*. 
 * It will be signed with S_Auth and sent with a copy of the authenticator's cert.
 * Also will pass the Authenticators Certificate
 */
    

  export async function sendAuthCSRToCA(username, authCSR) {
    try {
      let response = await axios.post(
         "https://api.letsauth.org/la3/account/sign-csr/" + username, 
         {
            CSR: authCSR
         }
      );
      return response;
    } catch (error) {
      console.log('Error response: ' + error);
      if (!error.response) {
        alert("1Key Server is not responding. Please try again later.");
      } else {
        console.log(error.response.data);
        //possible errors: 403 (unable to sign csr) or 500 (internal server error)
      }
      return null;
    }
  }
  export async function sendAccountCSRToCA(csr, signature, cert) {
    try {
      let response = await axios.post(
         "https://api.letsauth.org/la3/account/sign-csr/" + csr, signature, cert
      );
      return response;
    } catch (error) {
      console.log('Error response: ' + error);
      if (!error.response) {
        alert("1Key Server is not responding. Please try again later.");
      } else {
        console.log(error.response.data);
        //possible errors: 403 (unable to sign csr) or 500 (internal server error)
      }
      return null;
    }
  }
  