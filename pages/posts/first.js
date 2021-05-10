import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from "react";
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import firebase from 'firebase'
export default function Aadhar() {

  const router = useRouter()
  
  const [query, setQuery] = useState({
    name: "",
    email: ""
  });

  // Update inputs value
  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  var aadhaar_no_phone_no = {
    "256176228242":"7522911650",
    "123412341234":"9403366997",
  	"7382537xxxxx": "915801xxxx",
  	"300000000000": "7276xxxxxx",
	"<replace your aadhaar no here>": "<your phone number>",
  }
  
  
    
 
  const getotp=() => (e) => {
    e.preventDefault();
    alert("Clicked")
    if (!firebase.apps.length) {
 
    firebase.initializeApp({
  apiKey: 'AIzaSyAtg_DuUO5sO0yl3GQlYvEYM6oWjxuJTVM',
  authDomain: '...',
  databaseURL: '...',
  projectId: 'evoting-225bb',
  storageBucket: '...',
  messagingSenderId: '...'
})
 window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('captcha', {
        'size': 'invisible',
        'callback': function(response) {
            console.log("success", response);
        },
        'expired-callback': function() {
            console.log("expired-callback");
        }
    });
    recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    //  updateSignInButtonUI();
    });

}
  formSubmit(e)
  }
  // Form Submit function
  const formSubmit = (e) => {
    e.preventDefault();
    
    console.log(query.aadhar)
    
   
   // updateSignInButtonUI();
    var phoneNumber = "+91" + aadhaar_no_phone_no[query.aadhar];
    // username=query.name
    // email=query.email
    console.log("phone no is "+phoneNumber);
   

    
  var applicationVerifier = window.recaptchaVerifier;
    
var provider = new firebase.auth.PhoneAuthProvider();   
   


// provider.verifyPhoneNumber(phoneNumber, applicationVerifier)
//     .then(function(verificationId) {
//       var verificationCode = window.prompt('Please enter the verification ' +
//           'code that was sent to your mobile device.');
//           console.log("VCODE IS "+verificationCode)
//       return firebase.auth.PhoneAuthProvider.credential(verificationId,
//           verificationCode);
//     })
//     .then(function(phoneCredential) {
//       return firebase.auth().signInWithCredential(phoneCredential);
//     });
    firebase.auth().signInWithPhoneNumber(phoneNumber, applicationVerifier)
  .then(function (confirmationResult) {
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    window.confirmationResult = confirmationResult;
    console.log("confirmation result is "+confirmationResult)
     var verificationCode = window.prompt('Please enter the verification code that was sent to your mobile device.');
         console.log("VCODE IS "+verificationCode)
         confirmationResult.confirm(verificationCode).then(function (result) {
  // User signed in successfully.
  var user = result.user;
  console.log("Signed in successfully")
  alert("Signing in")
   router.push('/posts/second')
  // ...
}).catch(function (error) {
  // User couldn't sign in (bad verification code?)
  // ...
});
  }).catch(function (error) {
    // Error; SMS not sent
    // ...
    console.log("Not sent")
  });

    // router.push('/posts/second')
  };
  return (
     <main className={styles.main}>
    <div className="App" className="styles.m-t">
      <h1></h1>
     
      <form onSubmit={getotp()}>
      
        <div>
          <label>Enter you aadhar number (12 digits)</label>
          <input
            type="text"
            name="aadhar"
            required
            placeholder="Aadhar"
            className="form-control"
            value={query.aadhar}
            onChange={handleParam()}
          />
        </div>
        <br></br>
        <input id='captcha' type='button'></input>
        <br></br>
        <button id="getotp" className="styles.btn btn-primary block full-width m-b login">Submit</button>
      </form>
    </div>
    {/* <!-- The core Firebase JS SDK is always required and must be listed first --> */}
<script src="/__/firebase/8.5.0/firebase-app.js"></script>

{/* <!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries --> */}
<script src="/__/firebase/8.5.0/firebase-analytics.js"></script>

{/* <!-- Initialize Firebase --> */}
<script src="/__/firebase/init.js"></script>
    </main>
  );
}