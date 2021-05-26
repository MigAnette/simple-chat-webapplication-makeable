// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var config = {
  apiKey: "AIzaSyASclQugqyAdRf9irQRW_F1eBNfCZQiJhs",
  authDomain: "simple-chat-webapp.firebaseapp.com",
  projectId: "simple-chat-webapp",
  storageBucket: "simple-chat-webapp.appspot.com",
  messagingSenderId: "38664395590",
  appId: "1:38664395590:web:70ffef6dadf85495ee2347",
  measurementId: "G-Q9MQ923Y8S"
};

const firebaseApp = firebase.initializeApp(config);


//export firestore database
export default firebaseApp.firestore();
